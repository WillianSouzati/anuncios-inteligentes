export type ProductInput = {
  nome: string;
  categoria: string;
  marca: string;
  modelo: string;
  estado: string;
  preco: string;
  caracteristicas: string;
  detalhes: string;
};

export type AdResult = {
  titulo: string;
  descricao: string;
  caracteristicas: string[];
  sugestoes: string[];
};

/** Contrato do gerador. A implementação real chama o backend seguro (Gemini) sem expor chaves no navegador. */
export type AdGenerator = (input: ProductInput) => Promise<AdResult>;
