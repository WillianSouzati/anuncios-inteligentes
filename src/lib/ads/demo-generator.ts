import type { AdGenerator, AdResult, ProductInput } from "./types";

function formatPreco(p: string) {
  if (!p) return "";
  const n = Number(p.replace(",", "."));
  return n.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

/** Simulação local com dados fictícios. Não usa IA. */
export const demoGenerator: AdGenerator = async (input: ProductInput) => {
  await new Promise((r) => setTimeout(r, 1400));
  const base = [input.nome, input.marca, input.modelo].filter(Boolean).join(" ");
  const titulo = `${base}${input.estado ? ` - ${input.estado}` : ""}`.slice(0, 60);
  const feats = input.caracteristicas
    .split(/[\n,;]+/)
    .map((s) => s.trim())
    .filter(Boolean);
  const preco = formatPreco(input.preco);
  const result: AdResult = {
    titulo,
    descricao: [
      `[Exemplo fictício] ${base} disponível${input.estado ? ` em estado ${input.estado.toLowerCase()}` : ""}.`,
      input.categoria ? `Ideal para quem procura um bom produto na categoria ${input.categoria}.` : "",
      feats.length ? `Destaques: ${feats.join(", ")}.` : "",
      input.detalhes ? input.detalhes : "",
      preco ? `Valor: ${preco}.` : "",
      "Tire suas dúvidas antes de comprar!",
    ].filter(Boolean).join("\n\n"),
    caracteristicas: feats.length ? feats : ["Exemplo: adicione características para vê-las aqui"],
    sugestoes: [
      !input.marca && "Informe a marca: anúncios com marca costumam aparecer mais nas buscas.",
      !input.modelo && "Inclua o modelo exato do produto.",
      !input.preco && "Defina um preço para facilitar a decisão do comprador.",
      feats.length < 3 && "Liste pelo menos 3 características do produto.",
      "Use fotos nítidas, com boa iluminação e vários ângulos.",
    ].filter((s): s is string => Boolean(s)),
    demonstracao: true,
  };
  return result;
};

// Futuro: substituir por uma função de servidor que chama a API Gemini com a chave guardada no backend.
export const generateAd: AdGenerator = demoGenerator;
