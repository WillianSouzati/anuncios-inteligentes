import { createFileRoute } from "@tanstack/react-router";
import { AdGeneratorTool } from "@/components/ads/AdGeneratorTool";

export const Route = createFileRoute("/criar-anuncio")({
  head: () => ({
    meta: [
      { title: "Criar anúncio — IA para Anúncios Inteligentes" },
      { name: "description", content: "Preencha os dados do produto e gere seu anúncio para marketplaces." },
      { property: "og:title", content: "Criar anúncio — IA para Anúncios Inteligentes" },
      { property: "og:description", content: "Gere título, descrição e características do seu anúncio." },
    ],
  }),
  component: () => (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="mb-2 text-2xl font-bold sm:text-3xl">Criar anúncio</h1>
      <p className="mb-8 text-muted-foreground">Preencha os dados abaixo. Apenas o nome do produto é obrigatório.</p>
      <AdGeneratorTool />
    </main>
  ),
});
