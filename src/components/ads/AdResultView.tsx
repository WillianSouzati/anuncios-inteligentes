import { Lightbulb, RefreshCw } from "lucide-react";
import type { ReactNode } from "react";
import type { AdResult } from "@/lib/ads/types";
import { CopyButton } from "./CopyButton";

function Section({ title, copy, children }: { title: string; copy: string; children: ReactNode }) {
  return (
    <section className="rounded-xl border bg-card p-5 shadow-soft">
      <div className="mb-3 flex items-center justify-between gap-2">
        <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">{title}</h3>
        <CopyButton text={copy} label={title} />
      </div>
      {children}
    </section>
  );
}

export function AdResultView({ result, onRegenerate, loading }: { result: AdResult; onRegenerate: () => void; loading: boolean }) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Seu anúncio</h2>
        <button type="button" onClick={onRegenerate} disabled={loading} className="inline-flex items-center gap-2 rounded-md border px-3 py-2 text-sm font-medium hover:bg-accent disabled:opacity-50">
          <RefreshCw className={`size-4 ${loading ? "animate-spin" : ""}`} /> Gerar novamente
        </button>
      </div>
      <Section title="Título sugerido" copy={result.titulo}>
        <p className="text-lg font-medium">{result.titulo}</p>
      </Section>
      <Section title="Descrição" copy={result.descricao}>
        <p className="whitespace-pre-line text-sm leading-relaxed">{result.descricao}</p>
      </Section>
      <Section title="Características" copy={result.caracteristicas.map((c) => `• ${c}`).join("\n")}>
        <ul className="list-disc space-y-1 pl-5 text-sm">{result.caracteristicas.map((c) => <li key={c}>{c}</li>)}</ul>
      </Section>
      <Section title="Sugestões de melhoria" copy={result.sugestoes.map((c) => `• ${c}`).join("\n")}>
        <ul className="space-y-2 text-sm">{result.sugestoes.map((s) => (
          <li key={s} className="flex gap-2"><Lightbulb className="mt-0.5 size-4 shrink-0 text-primary" />{s}</li>
        ))}</ul>
      </Section>
    </div>
  );
}
