import { Link } from "@tanstack/react-router";
import { Sparkles } from "lucide-react";

const links = [
  { to: "/", label: "Início" },
  { to: "/criar-anuncio", label: "Criar anúncio" },
  { to: "/sobre", label: "Sobre" },
] as const;

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-10 border-b bg-background/85 backdrop-blur">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-3">
        <Link to="/" className="flex items-center gap-2 font-semibold text-foreground">
          <span className="grid size-8 place-items-center rounded-lg bg-gradient-brand text-primary-foreground"><Sparkles className="size-4" /></span>
          IA para Anúncios Inteligentes
        </Link>
        <nav className="flex gap-1 text-sm">
          {links.map((l) => (
            <Link key={l.to} to={l.to} activeOptions={{ exact: true }} className="rounded-md px-3 py-1.5 text-muted-foreground hover:bg-accent hover:text-accent-foreground" activeProps={{ className: "bg-accent text-accent-foreground font-medium" }}>
              {l.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
