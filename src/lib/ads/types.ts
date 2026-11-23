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
  demonstracao: boolean;
};

/** Contrato do gerador. A versão futura chamará um backend seguro (Gemini) sem expor chaves no navegador. */
export type AdGenerator = (input: ProductInput) => Promise<AdResult>;
