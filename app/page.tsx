"use client";

import { useEffect, useMemo, useState, type ReactNode } from "react";

function Shell({
  title,
  subtitle,
  badge = "Portfolio demo · local-only",
  children,
}: {
  title: string;
  subtitle: string;
  badge?: string;
  children: ReactNode;
}) {
  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900 dark:bg-black dark:text-zinc-100">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <header className="mb-8">
          <p className="text-xs font-medium uppercase tracking-wider text-zinc-500">{badge}</p>
          <h1 className="mt-1 text-3xl font-semibold tracking-tight">{title}</h1>
          <p className="mt-2 max-w-2xl text-sm text-zinc-600 dark:text-zinc-400">{subtitle}</p>
        </header>
        {children}
        <footer className="mt-10 border-t border-zinc-200 pt-4 text-xs text-zinc-500 dark:border-zinc-800">
          Honest demo: no multi-tenant backend. State (if any) stays in this browser.
        </footer>
      </div>
    </div>
  );
}

function Button({
  children,
  onClick,
  variant = "primary",
  disabled,
  type = "button",
  className = "",
}: {
  children: ReactNode;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "ghost" | "danger";
  disabled?: boolean;
  type?: "button" | "submit";
  className?: string;
}) {
  const base =
    "inline-flex items-center justify-center rounded-lg px-3 py-2 text-sm font-medium transition disabled:opacity-50 " +
    className;
  const styles =
    variant === "primary"
      ? "bg-zinc-900 text-white hover:bg-zinc-700 dark:bg-zinc-100 dark:text-zinc-900"
      : variant === "secondary"
        ? "bg-white text-zinc-900 ring-1 ring-zinc-200 hover:bg-zinc-100 dark:bg-zinc-900 dark:text-zinc-100 dark:ring-zinc-700"
        : variant === "danger"
          ? "bg-red-600 text-white hover:bg-red-500"
          : "text-zinc-600 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-900";
  return (
    <button type={type} disabled={disabled} onClick={onClick} className={`${base} ${styles}`}>
      {children}
    </button>
  );
}

const inputClass =
  "w-full rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm outline-none ring-zinc-400 focus:ring-2 dark:border-zinc-700 dark:bg-zinc-950";

function useLocalStorage<T>(key: string, initial: T) {
  const [value, setValue] = useState<T>(initial);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    try {
      const raw = localStorage.getItem(key);
      if (raw != null) setValue(JSON.parse(raw) as T);
    } catch {
      /* ignore */
    }
    setReady(true);
  }, [key]);
  useEffect(() => {
    if (!ready) return;
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value, ready]);
  return [value, setValue] as const;
}

function uid() {
  return crypto.randomUUID();
}

async function copyText(text: string) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    return false;
  }
}


type Rule = { id: string; from: string; to: string; code: string };
export default function Home() {
  const [rules, setRules] = useLocalStorage<Rule[]>("redirect-manager-v1", [
    { id: "1", from: "/old-blog", to: "/writing", code: "301" },
    { id: "2", from: "/go/github", to: "https://github.com/bookchaowalit", code: "302" },
  ]);
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [code, setCode] = useState("301");
  const [test, setTest] = useState("/old-blog");
  const match = rules.find((r) => r.from === test);
  return (
    <Shell title="Redirect Manager" subtitle="Maintain path redirect rules and test matches locally.">
      <div className="mb-4 grid gap-2 md:grid-cols-4">
        <input className={inputClass} placeholder="/from" value={from} onChange={(e) => setFrom(e.target.value)} />
        <input className={inputClass} placeholder="https://to" value={to} onChange={(e) => setTo(e.target.value)} />
        <select className={inputClass} value={code} onChange={(e) => setCode(e.target.value)}><option>301</option><option>302</option><option>307</option></select>
        <Button onClick={() => { if (!from || !to) return; setRules((p) => [{ id: uid(), from, to, code }, ...p]); setFrom(""); setTo(""); }}>Add rule</Button>
      </div>
      <ul className="space-y-2">
        {rules.map((r) => (
          <li key={r.id} className="flex flex-wrap items-center justify-between gap-2 rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm dark:border-zinc-800 dark:bg-zinc-950">
            <span className="font-mono">{r.code} {r.from} → {r.to}</span>
            <Button variant="ghost" onClick={() => setRules((p) => p.filter((x) => x.id !== r.id))}>Delete</Button>
          </li>
        ))}
      </ul>
      <div className="mt-6 rounded-xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-950">
        <h2 className="font-medium">Test path</h2>
        <input className={`${inputClass} mt-2`} value={test} onChange={(e) => setTest(e.target.value)} />
        <p className="mt-2 text-sm">{match ? `Match: ${match.code} → ${match.to}` : "No matching rule"}</p>
      </div>
    </Shell>
  );
}
