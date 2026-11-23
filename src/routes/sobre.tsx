import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/sobre")({
  head: () => ({
    meta: [
      { title: "Sobre — IA para Anúncios Inteligentes" },
      { name: "description", content: "Conheça a ferramenta que ajuda vendedores a criar anúncios melhores." },
      { property: "og:title", content: "Sobre — IA para Anúncios Inteligentes" },
      { property: "og:description", content: "O que é e como funciona a ferramenta." },
    ],
  }),
  component: () => (
    <main className="mx-auto max-w-3xl space-y-6 px-4 py-12">
      <h1 className="text-3xl font-bold">Sobre a ferramenta</h1>
      <p className="text-muted-foreground">A IA para Anúncios Inteligentes ajuda vendedores a transformarem informações simples de um produto em anúncios completos e atrativos para marketplaces.</p>
      <div className="rounded-xl border bg-card p-5 shadow-soft">
        <h2 className="mb-2 font-semibold">Versão atual: demonstração</h2>
        <p className="text-sm text-muted-foreground">Nesta primeira versão, os resultados são <strong>dados fictícios</strong> gerados localmente para demonstrar o fluxo. Ainda não há integração com inteligência artificial. A integração com a API Gemini será feita futuramente por meio de um servidor seguro, sem expor chaves no navegador.</p>
      </div>
      <Link to="/criar-anuncio" className="inline-flex rounded-md bg-gradient-brand px-4 py-2.5 text-sm font-semibold text-primary-foreground">Criar meu anúncio</Link>
    </main>
  ),
});
