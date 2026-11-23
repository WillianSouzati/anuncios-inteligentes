import { useState, type FormEvent } from "react";
import { AlertCircle, Loader2, Sparkles, WandSparkles } from "lucide-react";
import type { AdResult, ProductInput } from "@/lib/ads/types";
import { productSchema, type FieldErrors } from "@/lib/ads/validation";
import { aiGenerator } from "@/lib/ads/ai-generator";
import { AdResultView } from "./AdResultView";

const empty: ProductInput = { nome: "", categoria: "", marca: "", modelo: "", estado: "", preco: "", caracteristicas: "", detalhes: "" };
const categorias = ["Eletrônicos", "Celulares e telefones", "Informática", "Casa e decoração", "Moda e acessórios", "Esportes e lazer", "Veículos e peças", "Brinquedos", "Outros"];
const estados = ["Novo", "Seminovo", "Usado - excelente", "Usado - bom", "Usado - com detalhes", "Para retirada de peças"];

const field = "w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-ring/30";

export function AdGeneratorTool() {
  const [form, setForm] = useState<ProductInput>(empty);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<AdResult | null>(null);

  const set = (k: keyof ProductInput) => (e: { target: { value: string } }) => {
    setForm((f) => ({ ...f, [k]: e.target.value }));
    if (errors[k]) setErrors((er) => ({ ...er, [k]: undefined }));
  };

  async function run() {
    const parsed = productSchema.safeParse(form);
    if (!parsed.success) {
      const fe: FieldErrors = {};
      for (const i of parsed.error.issues) { const k = i.path[0] as keyof FieldErrors; fe[k] ??= i.message; }
      setErrors(fe);
      return;
    }
    setLoading(true); setError(null);
    try {
      setResult(await aiGenerator(parsed.data));
      setTimeout(() => document.getElementById("resultado")?.scrollIntoView({ behavior: "smooth" }), 50);
    } catch (e) {
      setError(e instanceof Error && e.message ? e.message : "Não foi possível gerar o anúncio agora. Tente novamente em instantes.");
    } finally { setLoading(false); }
  }

  const onSubmit = (e: FormEvent) => { e.preventDefault(); void run(); };
  const err = (k: keyof FieldErrors) => errors[k] && <p className="mt-1 text-xs text-destructive">{errors[k]}</p>;
  const label = (t: string, req = false) => <span className="mb-1.5 block text-sm font-medium">{t}{req && <span className="text-destructive"> *</span>}</span>;

  return (
    <div className="grid gap-8 lg:grid-cols-[1.1fr_1fr]">
      <form onSubmit={onSubmit} noValidate className="space-y-4 rounded-2xl border bg-card p-6 shadow-soft">
        <div className="flex items-center gap-2"><WandSparkles className="size-5 text-primary" /><h2 className="text-lg font-semibold">Dados do produto</h2></div>
        <label className="block">{label("Nome do produto", true)}
          <input className={field} value={form.nome} onChange={set("nome")} placeholder="Ex.: Smartphone Galaxy S23" aria-invalid={!!errors.nome} />{err("nome")}</label>
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block">{label("Categoria")}
            <select className={field} value={form.categoria} onChange={set("categoria")}><option value="">Selecione</option>{categorias.map((c) => <option key={c}>{c}</option>)}</select></label>
          <label className="block">{label("Estado de conservação")}
            <select className={field} value={form.estado} onChange={set("estado")}><option value="">Selecione</option>{estados.map((c) => <option key={c}>{c}</option>)}</select></label>
          <label className="block">{label("Marca")}<input className={field} value={form.marca} onChange={set("marca")} placeholder="Ex.: Samsung" />{err("marca")}</label>
          <label className="block">{label("Modelo")}<input className={field} value={form.modelo} onChange={set("modelo")} placeholder="Ex.: S23 128GB" />{err("modelo")}</label>
        </div>
        <label className="block">{label("Preço (R$)")}
          <div className="relative"><span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">R$</span>
            <input className={`${field} pl-10`} inputMode="decimal" value={form.preco} onChange={set("preco")} placeholder="0,00" /></div>{err("preco")}</label>
        <label className="block">{label("Características")}
          <textarea className={`${field} min-h-20`} value={form.caracteristicas} onChange={set("caracteristicas")} placeholder="Separe por vírgula ou linha. Ex.: 128GB, câmera tripla, 5G" />{err("caracteristicas")}</label>
        <label className="block">{label("Detalhes adicionais")}
          <textarea className={`${field} min-h-20`} value={form.detalhes} onChange={set("detalhes")} placeholder="Acompanha caixa, nota fiscal, garantia..." />{err("detalhes")}</label>
        {Object.values(errors).some(Boolean) && <p className="flex items-center gap-2 text-sm text-destructive"><AlertCircle className="size-4" />Corrija os campos destacados.</p>}
        <button type="submit" disabled={loading} className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-gradient-brand px-4 py-3 text-sm font-semibold text-primary-foreground shadow-soft transition hover:opacity-95 disabled:opacity-60">
          {loading ? <Loader2 className="size-4 animate-spin" /> : <Sparkles className="size-4" />}{loading ? "Gerando anúncio..." : "Gerar meu anúncio"}
        </button>
        <p className="text-center text-xs text-muted-foreground">Os resultados são gerados por inteligência artificial (Google Gemini).</p>
      </form>
      <div id="resultado" className="scroll-mt-20">
        {error && <div className="mb-4 flex gap-2 rounded-lg border border-destructive/40 bg-destructive/10 p-3 text-sm text-destructive"><AlertCircle className="size-4 shrink-0" />{error}</div>}
        {result ? <AdResultView result={result} loading={loading} onRegenerate={() => void run()} /> : loading ? (
          <div className="space-y-4">{[1, 2, 3].map((i) => <div key={i} className="h-28 animate-pulse rounded-xl bg-muted" />)}</div>
        ) : (
          <div className="grid h-full min-h-64 place-items-center rounded-2xl border border-dashed p-8 text-center text-muted-foreground">
            <div><Sparkles className="mx-auto mb-3 size-8 text-primary/60" /><p className="font-medium text-foreground">Seu anúncio aparecerá aqui</p><p className="mt-1 text-sm">Preencha os dados e clique em “Gerar meu anúncio”.</p></div>
          </div>
        )}
      </div>
    </div>
  );
}
