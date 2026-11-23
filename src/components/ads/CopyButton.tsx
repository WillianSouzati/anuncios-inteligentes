import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { toast } from "sonner";

export function CopyButton({ text, label }: { text: string; label: string }) {
  const [ok, setOk] = useState(false);
  async function copy() {
    try {
      await navigator.clipboard.writeText(text);
      setOk(true);
      toast.success(`${label} copiado(a)!`);
      setTimeout(() => setOk(false), 1500);
    } catch {
      toast.error("Não foi possível copiar. Selecione o texto manualmente.");
    }
  }
  return (
    <button type="button" onClick={copy} className="inline-flex items-center gap-1.5 rounded-md border px-2.5 py-1 text-xs font-medium text-muted-foreground hover:bg-accent hover:text-accent-foreground">
      {ok ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
      {ok ? "Copiado" : "Copiar"}
    </button>
  );
}
