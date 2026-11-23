import { createFileRoute } from "@tanstack/react-router";
import { AdGeneratorTool } from "@/components/ads/AdGeneratorTool";
import { PageIntro } from "@/components/ads/PageIntro";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "IA para Anúncios Inteligentes — Crie anúncios melhores" },
      { name: "description", content: "Transforme as informações do seu produto em um anúncio completo para marketplaces." },
      { property: "og:title", content: "IA para Anúncios Inteligentes" },
      { property: "og:description", content: "Crie títulos, descrições e características para seus anúncios." },
    ],
  }),
  component: () => (
    <main className="mx-auto max-w-6xl px-4 py-12"><PageIntro /><AdGeneratorTool /></main>
  ),
});
