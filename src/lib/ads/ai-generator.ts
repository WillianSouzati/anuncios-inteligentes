import type { AdGenerator, AdResult, ProductInput } from "./types";
import { generateListing } from "./generate-listing.functions";

/**
 * Gerador real: chama a função de servidor generateListing, que usa a API Gemini
 * exclusivamente no backend. A chave de API nunca chega ao navegador.
 */
export const aiGenerator: AdGenerator = async (input: ProductInput): Promise<AdResult> => {
  const res = await generateListing({ data: input });
  if (!res.ok) throw new Error(res.erro);
  return res.anuncio;
};
