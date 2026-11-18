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

type Quiz = { q: string; options: string[]; answer: number; explain: string };
type Lesson = { id: string; title: string; summary: string[]; analogy: string; code: string; output: string; quiz: Quiz };
type Module = { id: string; title: string; icon: string; lessons: Lesson[] };

const MODULES: Module[] = [
  { id: "fund", title: "Fundamentos", icon: "☕", lessons: [
    { id: "hello", title: "JVM e Olá, Mundo", summary: ["Você escreve .java, o javac traduz para bytecode (.class) e a JVM executa esse bytecode em qualquer sistema.", "Todo programa começa no método public static void main(String[] args)."],
      analogy: "A JVM é um tradutor simultâneo: você fala uma língua só (bytecode) e ela traduz para Windows, Linux ou Mac.",
      code: `public class Main {\n    public static void main(String[] args) {\n        System.out.println("Olá, JavaQuest!");\n    }\n}`, output: "Olá, JavaQuest!",
      quiz: { q: "Quem executa o arquivo .class gerado pelo javac?", options: ["O próprio sistema operacional, direto", "A JVM (Java Virtual Machine)", "O navegador", "O compilador javac"], answer: 1,
        explain: "O javac só compila o código-fonte para bytecode. Quem lê e executa esse bytecode é a JVM, por isso o mesmo .class roda em qualquer sistema que tenha uma JVM: 'escreva uma vez, rode em qualquer lugar'." } },
    { id: "vars", title: "Variáveis e Tipos", summary: ["Java é fortemente tipado: cada variável tem um tipo fixo (int, double, boolean, char, String).", "Tipos primitivos guardam o valor; String é um objeto."],
      analogy: "Variáveis são caixas etiquetadas: numa caixa 'int' só cabem números inteiros. Tentar guardar texto nela é erro de compilação.",
      code: `public class Main {\n    public static void main(String[] args) {\n        int idade = 25;\n        idade = "vinte e cinco";\n        System.out.println(idade);\n    }\n}`, output: "error: incompatible types: String cannot be converted to int",
      quiz: { q: "Encontre o erro: o que acontece ao compilar este código?", options: ["Imprime 'vinte e cinco'", "Imprime 25", "Erro de compilação: tipos incompatíveis", "Erro só na execução"], answer: 2,
        explain: "A variável idade foi declarada como int. Atribuir uma String a ela viola a tipagem forte e o compilador barra antes mesmo de executar: 'incompatible types: String cannot be converted to int'." } },
    { id: "loops", title: "Condicionais e Laços", summary: ["if/else escolhe um caminho; for e while repetem um bloco.", "O operador % devolve o resto da divisão — ótimo para testar pares."],
      analogy: "Um laço for é como dar voltas numa pista: você define onde começa, até quando corre e quanto avança a cada volta.",
      code: `public class Main {\n    public static void main(String[] args) {\n        int soma = 0;\n        for (int i = 1; i <= 4; i++) {\n            if (i % 2 == 0) soma += i;\n        }\n        System.out.println(soma);\n    }\n}`, output: "6",
      quiz: { q: "Qual é a saída do programa?", options: ["10", "4", "6", "2"], answer: 2,
        explain: "O laço passa por 1, 2, 3 e 4. Só entram na soma os pares (resto 0 na divisão por 2): 2 + 4 = 6." } },
  ]},
  { id: "poo", title: "Orientação a Objetos", icon: "🧱", lessons: [
    { id: "classes", title: "Classes e Objetos", summary: ["A classe é o molde; o objeto é a coisa criada a partir dele com new.", "O construtor roda na criação e inicializa os atributos."],
      analogy: "A classe é a planta da casa; cada objeto é uma casa construída. Várias casas, mesma planta, cores diferentes.",
      code: `class Carro {\n    String modelo;\n    Carro(String modelo) { this.modelo = modelo; }\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        Carro a = new Carro("Fusca");\n        Carro b = new Carro("Gol");\n        System.out.println(a.modelo + " e " + b.modelo);\n    }\n}`, output: "Fusca e Gol",
      quiz: { q: "Quantos objetos Carro existem em memória após o main?", options: ["1", "2", "0, classes não criam objetos", "3"], answer: 1,
        explain: "Cada new cria um objeto novo. Há dois new Carro(...), então existem dois objetos independentes, cada um com seu próprio modelo." } },
    { id: "heranca", title: "Herança e Polimorfismo", summary: ["extends faz uma classe herdar atributos e métodos de outra.", "@Override redefine um método; em tempo de execução vale a versão do objeto real."],
      analogy: "Todo animal 'faz som', mas cada espécie faz do seu jeito. Você chama som() sem saber qual bicho é — e ele responde certo.",
      code: `class Animal { void som() { System.out.println("..."); } }\nclass Cachorro extends Animal {\n    @Override void som() { System.out.println("Au au!"); }\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        Animal a = new Cachorro();\n        a.som();\n    }\n}`, output: "Au au!",
      quiz: { q: "A variável é do tipo Animal, mas o objeto é Cachorro. O que imprime?", options: ["...", "Au au!", "Erro de compilação", "Nada"], answer: 1,
        explain: "Isso é polimorfismo: o método executado depende do objeto real (Cachorro), não do tipo da variável (Animal). Como Cachorro sobrescreveu som(), imprime 'Au au!'." } },
  ]},
  { id: "coll", title: "Collections", icon: "📦", lessons: [
    { id: "list", title: "ArrayList", summary: ["ArrayList é uma lista que cresce sozinha conforme você adiciona itens.", "Os índices começam em 0: o primeiro item é get(0)."],
      analogy: "É uma fila de cadeiras que ganha cadeiras novas quando chega gente. A primeira cadeira tem o número 0.",
      code: `import java.util.ArrayList;\n\npublic class Main {\n    public static void main(String[] args) {\n        ArrayList<String> l = new ArrayList<>();\n        l.add("Java");\n        l.add("Kotlin");\n        System.out.println(l.get(2));\n    }\n}`, output: "Exception in thread \"main\" java.lang.IndexOutOfBoundsException: Index 2 out of bounds for length 2",
      quiz: { q: "Encontre o erro: o que acontece ao executar?", options: ["Imprime Kotlin", "Imprime Java", "IndexOutOfBoundsException", "Imprime null"], answer: 2,
        explain: "A lista tem 2 itens, nos índices 0 e 1. Pedir o índice 2 estoura os limites e a JVM lança IndexOutOfBoundsException. Para pegar 'Kotlin', use get(1)." } },
    { id: "map", title: "HashMap", summary: ["HashMap guarda pares chave → valor; as chaves não se repetem.", "put com uma chave que já existe substitui o valor antigo."],
      analogy: "É uma agenda de contatos: o nome é a chave. Salvar o mesmo nome de novo troca o telefone, não cria um contato duplicado.",
      code: `import java.util.HashMap;\n\npublic class Main {\n    public static void main(String[] args) {\n        HashMap<String, Integer> notas = new HashMap<>();\n        notas.put("Ana", 7);\n        notas.put("Ana", 9);\n        System.out.println(notas.get("Ana") + " " + notas.size());\n    }\n}`, output: "9 1",
      quiz: { q: "Qual é a saída?", options: ["7 2", "9 2", "9 1", "7 1"], answer: 2,
        explain: "A chave 'Ana' só pode existir uma vez. O segundo put substitui 7 por 9, e o mapa continua com 1 entrada. Saída: '9 1'." } },
  ]},
  { id: "proj", title: "Projetos Reais", icon: "🚀", lessons: [
    { id: "calc", title: "Calculadora e Exceptions", summary: ["Exceptions sinalizam situações anormais, como dividir por zero.", "try envolve o código arriscado; catch trata o problema sem derrubar o programa."],
      analogy: "try/catch é a rede de segurança do trapezista: se ele cair, a rede segura e o show continua.",
      code: `public class Calculadora {\n    public static void main(String[] args) {\n        try {\n            int r = 10 / 0;\n            System.out.println(r);\n        } catch (ArithmeticException e) {\n            System.out.println("Erro: " + e.getMessage());\n        }\n    }\n}`, output: "Erro: / by zero",
      quiz: { q: "O que este código imprime?", options: ["0", "Infinity", "Erro: / by zero", "O programa trava sem mensagem"], answer: 2,
        explain: "Divisão inteira por zero lança ArithmeticException. O catch captura e imprime a mensagem '/ by zero'. (Com double, 10.0/0 daria Infinity — inteiros não.)" } },
    { id: "login", title: "Sistema de Login", summary: ["Strings são objetos: == compara se é o mesmo objeto na memória, não o texto.", "Para comparar conteúdo, use equals."],
      analogy: "== pergunta 'é a mesma folha de papel?'; equals pergunta 'está escrito a mesma coisa?'.",
      code: `public class Login {\n    public static void main(String[] args) {\n        String digitada = new String("1234");\n        String senha = "1234";\n        System.out.println(digitada == senha);\n        System.out.println(digitada.equals(senha));\n    }\n}`, output: "false\ntrue",
      quiz: { q: "Qual é a saída?", options: ["true / true", "false / true", "true / false", "false / false"], answer: 1,
        explain: "new String cria outro objeto, então == (mesmo objeto?) dá false. equals compara o texto, que é igual: true. Por isso login deve sempre usar equals." } },
    { id: "crud", title: "CRUD com JDBC", summary: ["JDBC conecta Java a bancos de dados via DriverManager.", "PreparedStatement com ? evita SQL Injection; try-with-resources fecha a conexão sozinho."],
      analogy: "PreparedStatement é um formulário com campos fixos: o usuário só preenche os espaços, não consegue reescrever o formulário.",
      code: `import java.sql.*;\n\npublic class Crud {\n    public static void main(String[] args) throws SQLException {\n        String url = "jdbc:mysql://localhost:3306/escola";\n        try (Connection con = DriverManager.getConnection(url, "root", "senha")) {\n            PreparedStatement ps = con.prepareStatement(\n                "INSERT INTO aluno(nome) VALUES (?)");\n            ps.setString(1, "Ana");\n            ps.executeUpdate();\n            System.out.println("Aluno inserido!");\n        }\n    }\n}`, output: "Aluno inserido!",
      quiz: { q: "Por que usar PreparedStatement com '?' em vez de concatenar o nome na SQL?", options: ["Porque é obrigatório no MySQL", "Para evitar SQL Injection", "Para a consulta rodar em paralelo", "Para não precisar fechar a conexão"], answer: 1,
        explain: "Com '?', o valor é enviado separado do comando SQL e tratado só como dado. Assim, um texto malicioso como \"'; DROP TABLE aluno; --\" não vira comando. Concatenar strings abre essa brecha." } },
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
  const [picked, setPicked] = useState<number | null>(null);

  useEffect(() => { try { const s = localStorage.getItem(KEY); if (s) setP({ ...initial, ...JSON.parse(s) }); } catch {} setLoaded(true); }, []);
  useEffect(() => { if (loaded) localStorage.setItem(KEY, JSON.stringify(p)); }, [p, loaded]);

  const all = MODULES.flatMap((m) => m.lessons);
  const lesson: Lesson = all.find((l) => l.id === p.current) ?? all[0]!;
  const level = Math.floor(p.xp / XP_PER_LEVEL);
  const xpIn = p.xp % XP_PER_LEVEL;

  const select = (id: string) => { setP({ ...p, current: id }); setOut(null); setPicked(null); };
  const solved = p.done.includes(lesson.id);
  const answer = (i: number) => {
    if (picked !== null && picked === lesson.quiz.answer) return;
    setPicked(i);
    if (i === lesson.quiz.answer && !solved) setP((s) => ({ ...s, xp: s.xp + 50, coins: s.coins + 10, done: [...s.done, lesson.id] }));
  };
  const copy = async () => { await navigator.clipboard.writeText(lesson.code); setCopied(true); setTimeout(() => setCopied(false), 1500); };
  const run = () => {
    setRunning(true); setOut(null);
    setTimeout(() => {
      setRunning(false);
      setOut(`$ javac Main.java && java Main\n${lesson.output}`);
    }, 700);
  };
  const next = () => { const i = all.findIndex((l) => l.id === lesson.id); if (i < all.length - 1) select(all[i + 1]!.id); };

  return (
    <div className="dark min-h-screen bg-background text-foreground font-sans">
      <header className="sticky top-0 z-10 flex flex-wrap items-center justify-between gap-x-4 gap-y-2 border-b border-border bg-card/90 px-6 py-3 backdrop-blur">
        <div className="flex items-center gap-2 text-xl font-extrabold"><span>☕</span><span className="text-primary">Java</span>Quest</div>
        <div className="order-3 flex w-full items-center gap-3 sm:order-none sm:w-auto sm:flex-1 sm:max-w-md">
          <span className="whitespace-nowrap rounded-full bg-primary/15 px-3 py-1 text-xs font-bold text-primary">Nível {level + 1}: {LEVELS[Math.min(level, LEVELS.length - 1)]}</span>
          <div className="h-3 flex-1 overflow-hidden rounded-full bg-muted">
            <div className="h-full rounded-full bg-primary transition-all duration-500" style={{ width: `${xpIn}%` }} />
          </div>
          <span className="whitespace-nowrap text-xs text-muted-foreground">{xpIn}/{XP_PER_LEVEL} XP</span>
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
              <div className="mt-5 rounded-xl border border-border bg-background/40 p-5">
                <p className="text-xs font-bold uppercase tracking-widest text-gold">⚡ Resumo Rápido & Direto</p>
                <div className="mt-3 space-y-2 leading-relaxed text-muted-foreground">{lesson.summary.map((t, i) => <p key={i}>{t}</p>)}</div>
                <p className="mt-4 rounded-lg border-l-4 border-primary bg-primary/10 p-3 text-sm">💡 <b>Analogia:</b> {lesson.analogy}</p>
              </div>

              <div className="mt-6 rounded-xl border border-border bg-background/40 p-5">
                <div className="flex items-center justify-between gap-2">
                  <p className="text-xs font-bold uppercase tracking-widest text-primary">🎯 Desafio Prático</p>
                  <span className="text-xs font-bold text-success">{solved ? "✓ Concluída" : "+50 XP"}</span>
                </div>
                <p className="mt-2 font-semibold">{lesson.quiz.q}</p>
                <p className="mt-1 text-xs text-muted-foreground">Analise o código na janela Main.java.</p>
                <div className="mt-4 space-y-2">
                  {lesson.quiz.options.map((o, i) => {
                    const isAns = i === lesson.quiz.answer, isPick = i === picked, locked = picked === lesson.quiz.answer;
                    const cls = picked === null ? "border-border hover:border-primary hover:bg-primary/10"
                      : isPick && isAns ? "border-success bg-success/15 text-success"
                      : isPick ? "border-destructive bg-destructive/15 text-destructive"
                      : locked && isAns ? "border-success" : "border-border hover:border-primary hover:bg-primary/10";
                    return (
                      <button key={i} onClick={() => answer(i)} disabled={locked}
                        className={`flex w-full items-center gap-3 rounded-xl border-2 px-4 py-3 text-left text-sm font-medium transition disabled:cursor-default ${cls}`}>
                        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-muted text-xs font-bold text-foreground">{String.fromCharCode(65 + i)}</span>{o}
                      </button>
                    );
                  })}
                </div>
                {picked !== null && (
                  <div className={`mt-4 rounded-xl border p-4 text-sm leading-relaxed ${picked === lesson.quiz.answer ? "border-success/40 bg-success/10" : "border-destructive/40 bg-destructive/10"}`}>
                    <p className={`font-bold ${picked === lesson.quiz.answer ? "text-success" : "text-destructive"}`}>{picked === lesson.quiz.answer ? "✅ Correto! +50 XP" : "❌ Ainda não. Tente outra opção!"}</p>
                    {picked === lesson.quiz.answer && <p className="mt-2 text-muted-foreground">{lesson.quiz.explain}</p>}
                  </div>
                )}
              </div>
              <button onClick={next} disabled={!solved} className="mt-6 rounded-xl border-b-4 border-primary/60 bg-primary px-5 py-2 font-bold text-primary-foreground hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-40">{solved ? "Próxima lição →" : "🔒 Acerte para avançar"}</button>
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
