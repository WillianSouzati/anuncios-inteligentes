import { createServerFn } from "@tanstack/react-start";
import { productSchema } from "./validation";
import type { AdResult } from "./types";

type GenerateListingResult = { ok: true; anuncio: AdResult } | { ok: false; erro: string };

const adResponseSchema = {
  type: "OBJECT",
  properties: {
    titulo: { type: "STRING", description: "Título do anúncio, claro e objetivo, até 60 caracteres" },
    descricao: { type: "STRING", description: "Descrição organizada e natural, em parágrafos curtos" },
    caracteristicas: {
      type: "ARRAY",
      items: { type: "STRING" },
      description: "Lista de características do produto, apenas com base no que foi informado",
    },
    sugestoes: {
      type: "ARRAY",
      items: { type: "STRING" },
      description: "Sugestões de melhoria e informações importantes que estão faltando",
    },
  },
  required: ["titulo", "descricao", "caracteristicas", "sugestoes"],
};

function buildPrompt(p: {
  nome: string;
  categoria: string;
  marca: string;
  modelo: string;
  estado: string;
  preco: string;
  caracteristicas: string;
  detalhes: string;
}): string {
  return [
    "Você é um especialista em criação de anúncios para marketplaces brasileiros.",
    "Gere um anúncio em português brasileiro com base EXCLUSIVA nas informações abaixo.",
    "Regras obrigatórias:",
    "- Nunca invente características, especificações ou condições do produto.",
    "- Não presuma informações que não foram fornecidas.",
    "- Se faltarem informações importantes (marca, modelo, preço, estado, características), sinalize claramente no campo 'sugestoes'.",
    "- Evite exageros publicitários e promessas enganosas.",
    "- O título deve ter no máximo 60 caracteres.",
    "- A descrição deve ser organizada, natural e em parágrafos curtos.",
    "",
    "Informações do produto:",
    `Nome: ${p.nome}`,
    p.categoria ? `Categoria: ${p.categoria}` : "Categoria: (não informada)",
    p.marca ? `Marca: ${p.marca}` : "Marca: (não informada)",
    p.modelo ? `Modelo: ${p.modelo}` : "Modelo: (não informado)",
    p.estado ? `Estado de conservação: ${p.estado}` : "Estado de conservação: (não informado)",
    p.preco ? `Preço: R$ ${p.preco}` : "Preço: (não informado)",
    p.caracteristicas ? `Características: ${p.caracteristicas}` : "Características: (não informadas)",
    p.detalhes ? `Detalhes adicionais: ${p.detalhes}` : "Detalhes adicionais: (não informados)",
  ].join("\n");
}

/**
 * Gera o anúncio chamando a API do Google Gemini exclusivamente no backend.
 * A chave GEMINI_API_KEY é lida de process.env dentro do handler e nunca chega ao navegador.
 */
export const generateListing = createServerFn({ method: "POST" })
  .validator((input: unknown) => productSchema.parse(input))
  .handler(async ({ data }): Promise<GenerateListingResult> => {
    const apiKey = process.env["GEMINI_API_KEY"];
    if (!apiKey) {
      console.error("GEMINI_API_KEY não configurada nos segredos do projeto.");
      return { ok: false, erro: "O serviço de IA ainda não está configurado." };
    }

    // O modelo pode responder 503 em picos de demanda; tentamos algumas vezes
    // com pausa crescente antes de desistir.
    const modelo = "gemini-3.8-flash";
    const tentativas = 4;
    let geminiRes: Response | undefined;
    for (let i = 0; i < tentativas; i++) {
      if (i > 0) await new Promise((r) => setTimeout(r, 2000 * i));
      try {
        geminiRes = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/${modelo}:generateContent`,
          {
            method: "POST",
            redirect: "manual",
            headers: { "Content-Type": "application/json", "x-goog-api-key": apiKey },
            body: JSON.stringify({
              contents: [{ parts: [{ text: buildPrompt(data) }] }],
              generationConfig: {
                responseMimeType: "application/json",
                responseSchema: adResponseSchema,
                temperature: 0.7,
              },
            }),
          },
        );
      } catch (e) {
        console.error(`Falha de rede ao chamar a API Gemini (tentativa ${i + 1}):`, e);
        continue;
      }
      if (geminiRes.ok) break;
      const detail = await geminiRes.text();
      console.error(`Erro da API Gemini (tentativa ${i + 1}, ${geminiRes.status}):`, detail);
      if (geminiRes.status !== 503 && geminiRes.status !== 429) {
        return { ok: false, erro: "O serviço de IA retornou um erro. Tente novamente em instantes." };
      }
    }

    if (!geminiRes || !geminiRes.ok) {
      return { ok: false, erro: "O serviço de IA está com alta demanda. Aguarde alguns segundos e clique em Gerar novamente." };
    }

    try {
      const payload = (await geminiRes.json()) as {
        candidates?: { content?: { parts?: { text?: string }[] } }[];
      };
      const text = payload.candidates?.[0]?.content?.parts?.[0]?.text;
      if (!text) throw new Error("Resposta vazia do Gemini");
      const ad = JSON.parse(text) as Partial<AdResult>;
      return {
        ok: true,
        anuncio: {
          titulo: String(ad.titulo ?? "").slice(0, 120),
          descricao: String(ad.descricao ?? ""),
          caracteristicas: Array.isArray(ad.caracteristicas) ? ad.caracteristicas.map(String) : [],
          sugestoes: Array.isArray(ad.sugestoes) ? ad.sugestoes.map(String) : [],
          demonstracao: false,
        },
      };
    } catch (e) {
      console.error("Resposta inesperada da API Gemini:", e);
      return { ok: false, erro: "A resposta da IA veio em formato inesperado. Tente novamente." };
    }
  });
