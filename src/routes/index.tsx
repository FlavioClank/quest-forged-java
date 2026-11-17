import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "JavaQuest — Aprenda Java Puro" },
      { name: "description", content: "Trilha gamificada para aprender Java Puro: fundamentos, POO, Collections e projetos reais." },
      { property: "og:title", content: "JavaQuest — Aprenda Java Puro" },
      { property: "og:description", content: "Trilha gamificada para aprender Java Puro com XP, moedas e IDE simulada." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: JavaQuest,
});

type Lesson = { id: string; title: string; text: string[]; code: string; output: string };
type Module = { id: string; title: string; icon: string; lessons: Lesson[] };

const MODULES: Module[] = [
  { id: "fund", title: "Fundamentos", icon: "☕", lessons: [
    { id: "hello", title: "Olá, Mundo", text: ["Todo programa Java começa por uma classe com o método main.", "System.out.println imprime texto no console e pula linha."],
      code: `public class Main {\n    public static void main(String[] args) {\n        System.out.println("Olá, JavaQuest!");\n    }\n}`, output: "Olá, JavaQuest!" },
    { id: "vars", title: "Variáveis e Tipos", text: ["Java é fortemente tipado: int, double, boolean, char e String.", "Declare o tipo antes do nome da variável."],
      code: `public class Main {\n    public static void main(String[] args) {\n        int idade = 25;\n        double altura = 1.78;\n        String nome = "Ana";\n        System.out.println(nome + " tem " + idade + " anos e " + altura + "m");\n    }\n}`, output: "Ana tem 25 anos e 1.78m" },
    { id: "loops", title: "Condicionais e Laços", text: ["if/else decide caminhos; for e while repetem blocos.", "Use o operador % para verificar pares."],
      code: `public class Main {\n    public static void main(String[] args) {\n        for (int i = 1; i <= 5; i++) {\n            if (i % 2 == 0) System.out.println(i + " é par");\n            else System.out.println(i + " é ímpar");\n        }\n    }\n}`, output: "1 é ímpar\n2 é par\n3 é ímpar\n4 é par\n5 é ímpar" },
  ]},
  { id: "poo", title: "Orientação a Objetos", icon: "🧱", lessons: [
    { id: "classes", title: "Classes e Objetos", text: ["Uma classe é o molde; o objeto é a instância criada com new.", "O construtor inicializa os atributos."],
      code: `class Carro {\n    String modelo;\n    Carro(String modelo) { this.modelo = modelo; }\n    void acelerar() { System.out.println(modelo + " acelerando!"); }\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        Carro c = new Carro("Fusca");\n        c.acelerar();\n    }\n}`, output: "Fusca acelerando!" },
    { id: "heranca", title: "Herança e Polimorfismo", text: ["extends permite reaproveitar comportamento de outra classe.", "@Override redefine um método na subclasse."],
      code: `class Animal { void som() { System.out.println("..."); } }\nclass Cachorro extends Animal {\n    @Override void som() { System.out.println("Au au!"); }\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        Animal a = new Cachorro();\n        a.som();\n    }\n}`, output: "Au au!" },
  ]},
  { id: "coll", title: "Collections", icon: "📦", lessons: [
    { id: "list", title: "ArrayList", text: ["ArrayList é uma lista dinâmica que cresce conforme necessário.", "Use add, get, size e for-each."],
      code: `import java.util.ArrayList;\n\npublic class Main {\n    public static void main(String[] args) {\n        ArrayList<String> linguagens = new ArrayList<>();\n        linguagens.add("Java");\n        linguagens.add("Kotlin");\n        for (String l : linguagens) System.out.println("- " + l);\n        System.out.println("Total: " + linguagens.size());\n    }\n}`, output: "- Java\n- Kotlin\nTotal: 2" },
    { id: "map", title: "HashMap", text: ["HashMap guarda pares chave → valor.", "put insere, get busca pela chave."],
      code: `import java.util.HashMap;\n\npublic class Main {\n    public static void main(String[] args) {\n        HashMap<String, Integer> notas = new HashMap<>();\n        notas.put("Ana", 9);\n        notas.put("Bruno", 7);\n        System.out.println("Nota da Ana: " + notas.get("Ana"));\n    }\n}`, output: "Nota da Ana: 9" },
  ]},
  { id: "proj", title: "Projetos Reais", icon: "🚀", lessons: [
    { id: "calc", title: "Calculadora", text: ["Combine métodos e switch para criar uma calculadora.", "Trate divisão por zero!"],
      code: `public class Calculadora {\n    static double calc(double a, char op, double b) {\n        switch (op) {\n            case '+': return a + b;\n            case '-': return a - b;\n            case '*': return a * b;\n            case '/': if (b == 0) throw new ArithmeticException("Divisão por zero"); return a / b;\n            default: throw new IllegalArgumentException("Operador inválido");\n        }\n    }\n    public static void main(String[] args) {\n        System.out.println("10 + 5 = " + calc(10, '+', 5));\n        System.out.println("10 / 4 = " + calc(10, '/', 4));\n    }\n}`, output: "10 + 5 = 15.0\n10 / 4 = 2.5" },
    { id: "login", title: "Sistema de Login", text: ["Valide usuário e senha com equals (nunca ==) para Strings.", "Limite tentativas para mais segurança."],
      code: `public class Login {\n    static boolean autenticar(String u, String s) {\n        return "admin".equals(u) && "1234".equals(s);\n    }\n    public static void main(String[] args) {\n        System.out.println(autenticar("admin", "0000") ? "Bem-vindo!" : "Acesso negado");\n        System.out.println(autenticar("admin", "1234") ? "Bem-vindo!" : "Acesso negado");\n    }\n}`, output: "Acesso negado\nBem-vindo!" },
    { id: "crud", title: "CRUD com JDBC", text: ["JDBC conecta Java a bancos via DriverManager.", "Use PreparedStatement para evitar SQL Injection e try-with-resources para fechar conexões."],
      code: `import java.sql.*;\n\npublic class Crud {\n    public static void main(String[] args) throws SQLException {\n        String url = "jdbc:mysql://localhost:3306/escola";\n        try (Connection con = DriverManager.getConnection(url, "root", "senha")) {\n            PreparedStatement ins = con.prepareStatement("INSERT INTO aluno(nome) VALUES (?)");\n            ins.setString(1, "Ana");\n            ins.executeUpdate();\n            System.out.println("Aluno inserido!");\n            ResultSet rs = con.createStatement().executeQuery("SELECT id, nome FROM aluno");\n            while (rs.next()) System.out.println(rs.getInt("id") + " - " + rs.getString("nome"));\n        }\n    }\n}`, output: "Aluno inserido!\n1 - Ana" },
  ]},
];

const LEVELS = ["Padawan Java", "Aprendiz de Classes", "Cavaleiro dos Objetos", "Mestre das Collections", "Jedi do JDBC"];
const XP_PER_LEVEL = 100;
const KEY = "javaquest-progress";
type Progress = { xp: number; coins: number; done: string[]; current: string };
const initial: Progress = { xp: 0, coins: 0, done: [], current: "hello" };

function JavaQuest() {
  const [p, setP] = useState<Progress>(initial);
  const [loaded, setLoaded] = useState(false);
  const [out, setOut] = useState<string | null>(null);
  const [running, setRunning] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => { try { const s = localStorage.getItem(KEY); if (s) setP({ ...initial, ...JSON.parse(s) }); } catch {} setLoaded(true); }, []);
  useEffect(() => { if (loaded) localStorage.setItem(KEY, JSON.stringify(p)); }, [p, loaded]);

  const all = MODULES.flatMap((m) => m.lessons);
  const lesson = all.find((l) => l.id === p.current) ?? all[0];
  const level = Math.floor(p.xp / XP_PER_LEVEL);
  const xpIn = p.xp % XP_PER_LEVEL;

  const select = (id: string) => { setP({ ...p, current: id }); setOut(null); };
  const copy = async () => { await navigator.clipboard.writeText(lesson.code); setCopied(true); setTimeout(() => setCopied(false), 1500); };
  const run = () => {
    setRunning(true); setOut(null);
    setTimeout(() => {
      setRunning(false);
      setOut(`$ javac Main.java && java Main\n${lesson.output}\n\nProcess finished with exit code 0`);
      if (!p.done.includes(lesson.id)) setP((s) => ({ ...s, xp: s.xp + 25, coins: s.coins + 10, done: [...s.done, lesson.id] }));
    }, 700);
  };
  const next = () => { const i = all.findIndex((l) => l.id === lesson.id); if (i < all.length - 1) select(all[i + 1].id); };

  return (
    <div className="dark min-h-screen bg-background text-foreground font-sans">
      <header className="sticky top-0 z-10 flex items-center justify-between gap-4 border-b border-border bg-card/90 px-6 py-3 backdrop-blur">
        <div className="flex items-center gap-2 text-xl font-extrabold"><span>☕</span><span className="text-primary">Java</span>Quest</div>
        <div className="flex flex-1 max-w-md items-center gap-3">
          <span className="whitespace-nowrap rounded-full bg-primary/15 px-3 py-1 text-xs font-bold text-primary">Nível {level + 1}: {LEVELS[Math.min(level, LEVELS.length - 1)]}</span>
          <div className="h-3 flex-1 overflow-hidden rounded-full bg-muted">
            <div className="h-full rounded-full bg-primary transition-all duration-500" style={{ width: `${xpIn}%` }} />
          </div>
          <span className="text-xs text-muted-foreground">{xpIn}/{XP_PER_LEVEL} XP</span>
        </div>
        <div className="flex items-center gap-4 font-bold">
          <span className="text-gold">🪙 {p.coins}</span>
          <button onClick={() => { if (confirm("Resetar progresso?")) setP(initial); }} className="text-xs text-muted-foreground hover:text-foreground">Resetar</button>
        </div>
      </header>

      <div className="flex">
        <aside className="hidden md:block w-72 shrink-0 border-r border-border bg-card/50 p-4 min-h-[calc(100vh-57px)]">
          {MODULES.map((m) => {
            const d = m.lessons.filter((l) => p.done.includes(l.id)).length;
            return (
              <div key={m.id} className="mb-5">
                <div className="mb-2 flex items-center justify-between text-sm font-bold">
                  <span>{m.icon} {m.title}</span><span className="text-xs text-muted-foreground">{d}/{m.lessons.length}</span>
                </div>
                <div className="space-y-1">
                  {m.lessons.map((l) => {
                    const active = l.id === lesson.id, ok = p.done.includes(l.id);
                    return (
                      <button key={l.id} onClick={() => select(l.id)}
                        className={`flex w-full items-center gap-3 rounded-xl px-3 py-2 text-left text-sm transition ${active ? "bg-primary text-primary-foreground font-semibold" : "hover:bg-muted"}`}>
                        <span className={`flex h-6 w-6 items-center justify-center rounded-full text-xs ${ok ? "bg-success text-primary-foreground" : active ? "bg-primary-foreground/20" : "bg-muted"}`}>{ok ? "✓" : "•"}</span>
                        {l.title}
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </aside>

        <main className="flex-1 p-6">
          <select className="md:hidden mb-4 w-full rounded-lg bg-muted p-2" value={lesson.id} onChange={(e) => select(e.target.value)}>
            {all.map((l) => <option key={l.id} value={l.id}>{l.title}</option>)}
          </select>
          <div className="grid gap-6 lg:grid-cols-2">
            <section className="rounded-2xl border border-border bg-card p-6">
              <p className="text-xs font-bold uppercase tracking-widest text-primary">{MODULES.find((m) => m.lessons.includes(lesson))?.title}</p>
              <h1 className="mt-1 text-3xl font-extrabold">{lesson.title}</h1>
              <div className="mt-4 space-y-3 leading-relaxed text-muted-foreground">{lesson.text.map((t, i) => <p key={i}>{t}</p>)}</div>
              <div className="mt-6 rounded-xl border border-primary/30 bg-primary/10 p-4 text-sm">
                💡 Execute o código ao lado para ganhar <b className="text-primary">+25 XP</b> e <b className="text-gold">+10 moedas</b>.
                {p.done.includes(lesson.id) && <span className="ml-1 text-success font-semibold">Concluída!</span>}
              </div>
              <button onClick={next} className="mt-6 rounded-xl border-b-4 border-primary/60 bg-primary px-5 py-2 font-bold text-primary-foreground hover:brightness-110">Próxima lição →</button>
            </section>

            <section className="flex flex-col overflow-hidden rounded-2xl border border-border bg-ide">
              <div className="flex items-center justify-between border-b border-border bg-card px-4 py-2">
                <div className="flex items-center gap-2"><span className="h-3 w-3 rounded-full bg-destructive" /><span className="h-3 w-3 rounded-full bg-gold" /><span className="h-3 w-3 rounded-full bg-success" /><span className="ml-3 text-xs text-muted-foreground">Main.java</span></div>
                <div className="flex gap-2">
                  <button onClick={copy} className="rounded-lg bg-muted px-3 py-1 text-xs font-semibold hover:brightness-125">{copied ? "Copiado!" : "📋 Copiar"}</button>
                  <button onClick={run} disabled={running} className="rounded-lg bg-success px-3 py-1 text-xs font-bold text-primary-foreground hover:brightness-110 disabled:opacity-60">{running ? "Executando..." : "▶ Simular Execução"}</button>
                </div>
              </div>
              <pre className="flex-1 overflow-auto p-4 font-mono text-sm leading-6">
                {lesson.code.split("\n").map((ln, i) => (
                  <div key={i} className="flex"><span className="w-8 shrink-0 select-none text-right pr-3 text-muted-foreground/50">{i + 1}</span><span>{ln}</span></div>
                ))}
              </pre>
              <div className="border-t border-border bg-console">
                <div className="px-4 py-1 text-xs text-muted-foreground">Console</div>
                <pre className="min-h-28 px-4 pb-4 font-mono text-sm text-success whitespace-pre-wrap">{running ? "Compilando..." : out ?? "Clique em \"Simular Execução\" para ver o output."}</pre>
              </div>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}
