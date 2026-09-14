import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState, type FormEvent, type MouseEvent } from "react";
import {
  ArrowDown, ArrowUpRight, BadgeCheck, BarChart3, Camera, ChevronRight,
  Clapperboard, Download, Globe2, Instagram, Linkedin, Mail, MapPin,
  MessageCircle, Play, Sparkles, X, Zap,
} from "lucide-react";

import cvAsset from "@/assets/curriculo-mateus-lana.pdf.asset.json";
import portraitAsset from "@/assets/mateus-lana.jpg.asset.json";
import p01 from "@/assets/projeto-01.jpg.asset.json";
import p04 from "@/assets/projeto-04.jpg.asset.json";
import p09 from "@/assets/projeto-09.jpg.asset.json";
import p11 from "@/assets/projeto-11.jpg.asset.json";
import p15 from "@/assets/projeto-15.jpg.asset.json";
import p16 from "@/assets/projeto-16.jpg.asset.json";
import p17 from "@/assets/projeto-17.jpg.asset.json";
import p18 from "@/assets/projeto-18.jpg.asset.json";

export const Route = createFileRoute("/")({
  head: () => ({ meta: [
    { title: "Mateus Lana | Marketing, Comunicação & Audiovisual" },
    { name: "description", content: "Portfólio de Mateus Lana: branding, mídias sociais, audiovisual, turismo e comunicação pública." },
    { property: "og:title", content: "Mateus Lana | Marketing, Comunicação & Audiovisual" },
    { property: "og:description", content: "Direção criativa e execução técnica para marcas, cultura, turismo e gestão pública." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ]}),
  component: Portfolio,
});

const skillGroups = [
  { name: "Design & Identidade", tools: "Photoshop · Illustrator · Canva · Figma", value: 100 },
  { name: "Edição & Color", tools: "Premiere Pro · DaVinci Resolve · CapCut", value: 100 },
  { name: "Motion Graphics", tools: "After Effects", value: 80 },
  { name: "3D & Movimento", tools: "Blender · Motion 3D", value: 70 },
];

const competencies = [
  { icon: Clapperboard, title: "Audiovisual", text: "Drone DJI, edição cinematográfica, motion graphics e fotografia." },
  { icon: Sparkles, title: "Criatividade & Inovação", text: "Inteligência artificial, gestão de projetos, branding e copywriting." },
  { icon: BarChart3, title: "Tráfego & Dados", text: "Google Ads, Analytics, Meta, TikTok, LinkedIn Ads e Power BI." },
  { icon: Globe2, title: "Idiomas", text: "Espanhol C1 · Inglês B1" },
];

const projects = [
  { title: "Copa Melo Viana", category: "Branding", image: p01.url, label: "Campanha esportiva" },
  { title: "Saúde Pública", category: "Gestão Pública & Turismo", image: p04.url, label: "Comunicação de serviço" },
  { title: "Semana Santa", category: "Gestão Pública & Turismo", image: p09.url, label: "Patrimônio e cultura" },
  { title: "Odontopediatria", category: "Branding", image: p11.url, label: "Campanha institucional" },
  { title: "Novembro Negro", category: "Motion", image: p15.url, label: "Memória e reparação" },
  { title: "Museu do Escravo", category: "Gestão Pública & Turismo", image: p16.url, label: "Programação cultural" },
  { title: "Desafio Xtreme", category: "Audiovisual / Drone", image: p17.url, label: "Esporte e território" },
  { title: "Quilombano Século XXI", category: "Gestão Pública & Turismo", image: p18.url, label: "Cultura e identidade" },
];

function AnimatedNumber({ value, suffix = "" }: { value: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let frame = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const progress = Math.min((now - start) / 1100, 1);
      setCount(Math.round(value * (1 - Math.pow(1 - progress, 3))));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [value]);
  return <>{count}{suffix}</>;
}

function TiltCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const move = (event: MouseEvent<HTMLElement>) => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const card = event.currentTarget;
    const rect = card.getBoundingClientRect();
    const rx = ((event.clientY - rect.top) / rect.height - .5) * -6;
    const ry = ((event.clientX - rect.left) / rect.width - .5) * 6;
    card.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-4px)`;
  };
  return <article onMouseMove={move} onMouseLeave={(e) => { e.currentTarget.style.transform = ""; }} className={`transition-[transform,box-shadow,border-color] duration-300 hover:border-primary/40 hover:shadow-[0_18px_65px_color-mix(in_oklab,var(--primary)_12%,transparent)] ${className}`}>{children}</article>;
}

function Portfolio() {
  const [scrolled, setScrolled] = useState(false);
  const [filter, setFilter] = useState("Todos");
  const [selected, setSelected] = useState<(typeof projects)[number] | null>(null);
  const [sent, setSent] = useState(false);
  const categories = ["Todos", "Audiovisual / Drone", "Branding", "Gestão Pública & Turismo", "Motion"];
  const visible = useMemo(() => filter === "Todos" ? projects : projects.filter((p) => p.category === filter), [filter]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll(); window.addEventListener("scroll", onScroll, { passive: true });
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add("revealed")), { threshold: .12 });
    document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
    return () => { window.removeEventListener("scroll", onScroll); observer.disconnect(); };
  }, []);

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (event.currentTarget.checkValidity()) setSent(true);
  };

  return (
    <main className="mesh-bg min-h-screen text-foreground">
      <div aria-hidden className="grid-lines pointer-events-none fixed inset-0 z-0 opacity-30" />
      <div aria-hidden className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        {[12,28,44,61,77,91].map((left, i) => <i key={left} className="absolute size-1 rounded-full bg-primary" style={{ left:`${left}%`, top:`${18 + (i%3)*29}%`, animation:`float-particle ${5+i}s ease-in-out ${i*.4}s infinite` }} />)}
      </div>

      <header className={`fixed inset-x-0 top-0 z-40 mx-auto transition-all duration-500 ${scrolled ? "py-3" : "py-6"}`}>
        <div className={`glass-panel mx-auto flex max-w-7xl items-center justify-between px-5 transition-all duration-500 ${scrolled ? "h-14 rounded-lg shadow-xl" : "h-16 border-transparent bg-transparent backdrop-blur-none"}`}>
          <a href="#inicio" className="font-extrabold text-foreground">ML<span className="text-primary">.</span></a>
          <nav aria-label="Navegação principal" className="hidden items-center gap-7 text-xs font-semibold text-muted-foreground md:flex">
            <a href="#expertise" className="transition-colors hover:text-primary">Expertise</a><a href="#experiencia" className="transition-colors hover:text-primary">Experiência</a><a href="#projetos" className="transition-colors hover:text-primary">Projetos</a><a href="#contato" className="transition-colors hover:text-primary">Contato</a>
          </nav>
          <a href="#contato" className="rounded-md border border-primary/35 px-4 py-2 text-xs font-bold text-primary transition-colors hover:bg-cyan-soft">Vamos conversar</a>
        </div>
      </header>

      <section id="inicio" className="relative z-10 mx-auto grid min-h-[94svh] max-w-7xl items-center gap-12 px-5 pb-16 pt-32 lg:grid-cols-[1.2fr_.8fr] lg:px-8">
        <div className="reveal max-w-4xl">
          <div className="mb-7 flex flex-wrap items-center gap-3 text-xs font-semibold text-muted-foreground"><span className="text-primary">PORTFÓLIO / 2026</span><span className="h-px w-12 bg-border"/><span className="inline-flex items-center gap-1.5"><MapPin className="size-3.5"/> Belo Vale — MG</span></div>
          <h1 className="text-glow text-[clamp(3.4rem,9vw,8.2rem)] font-extrabold leading-[.82] text-foreground">MATEUS<br/><span className="text-primary">LANA</span></h1>
          <p className="mt-8 max-w-3xl text-[clamp(1.15rem,2.1vw,1.8rem)] font-medium leading-tight text-foreground">Especialista em Marketing, Comunicação <span className="text-muted-foreground">& Audiovisual.</span></p>
          <p className="mt-5 max-w-2xl text-sm leading-7 text-muted-foreground md:text-base">Direção criativa e execução técnica de campanhas que conectam fotografia, edição cinematográfica, design, cultura e inovação na gestão pública.</p>
          <div className="mt-7 flex flex-wrap gap-3 text-xs"><span className="glass-panel inline-flex items-center gap-2 rounded-full px-4 py-2.5"><i className="size-2 animate-[pulse-ring_2s_infinite] rounded-full bg-primary"/>Disponibilidade flexível de horário</span><span className="glass-panel inline-flex items-center gap-2 rounded-full px-4 py-2.5"><Globe2 className="size-3.5 text-primary"/>Aberto à mudança de cidade</span></div>
          <div className="mt-9 flex flex-wrap gap-3"><a href="#projetos" className="shimmer-button inline-flex items-center gap-2 rounded-md bg-primary px-6 py-3.5 text-sm font-extrabold text-primary-foreground">Explorar projetos <ArrowDown className="size-4"/></a><a href={cvAsset.url} download target="_blank" rel="noreferrer" className="glass-panel inline-flex items-center gap-2 rounded-md px-6 py-3.5 text-sm font-bold text-foreground transition-colors hover:border-primary/40"><Download className="size-4"/> Baixar CV</a></div>
        </div>
        <div className="reveal relative mx-auto w-full max-w-md" style={{ transitionDelay:"120ms" }}>
          <div className="absolute -inset-5 rounded-full bg-cyan-soft blur-3xl" />
          <div className="glass-panel neon-shadow relative overflow-hidden rounded-lg p-2"><img src={portraitAsset.url} alt="Retrato profissional de Mateus Lana" className="aspect-[4/5] w-full rounded-md object-cover object-top grayscale transition duration-700 hover:grayscale-0"/><div className="absolute inset-x-5 bottom-5 flex items-end justify-between rounded-md border border-border bg-background/75 p-4 backdrop-blur-xl"><div><p className="text-[10px] font-bold text-primary">DIREÇÃO CRIATIVA</p><p className="mt-1 text-sm font-semibold">27 anos · Minas Gerais</p></div><BadgeCheck className="size-5 text-primary"/></div></div>
        </div>
      </section>

      <section aria-label="Destaques" className="relative z-10 border-y border-border bg-surface/45"><div className="mx-auto grid max-w-7xl grid-cols-2 divide-x divide-y divide-border px-5 lg:grid-cols-4 lg:divide-y-0 lg:px-8">{[["03+","anos em comunicação"],["18","peças selecionadas"],["04","núcleos de expertise"],["C1","espanhol"]].map(([n,l])=><div key={l} className="reveal px-5 py-8"><strong className="text-3xl text-primary">{n}</strong><p className="mt-1 text-[10px] font-bold uppercase text-muted-foreground">{l}</p></div>)}</div></section>

      <section id="expertise" className="relative z-10 mx-auto max-w-7xl px-5 py-28 lg:px-8">
        <SectionTitle index="01" label="Domínio técnico" title="Ferramentas que transformam intenção em impacto." />
        <div className="mt-14 grid gap-4 md:grid-cols-2">{skillGroups.map((skill, i)=><TiltCard key={skill.name} className="reveal glass-panel rounded-lg p-6" ><div className="flex items-start justify-between gap-4"><div><p className="text-lg font-bold">{skill.name}</p><p className="mt-2 text-xs leading-5 text-muted-foreground">{skill.tools}</p></div><span className="text-3xl font-extrabold text-primary"><AnimatedNumber value={skill.value} suffix="%"/></span></div><div className="mt-7 h-1 overflow-hidden rounded-full bg-muted"><div className="h-full rounded-full bg-primary transition-[width] duration-1000" style={{ width:`${skill.value}%`, transitionDelay:`${i*100}ms` }}/></div></TiltCard>)}</div>
        <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-4">{competencies.map((item)=><TiltCard key={item.title} className="reveal glass-panel rounded-lg p-6"><item.icon className="size-6 text-primary"/><h3 className="mt-8 font-bold">{item.title}</h3><p className="mt-3 text-xs leading-6 text-muted-foreground">{item.text}</p></TiltCard>)}</div>
      </section>

      <section id="experiencia" className="relative z-10 border-y border-border bg-surface/40 py-28"><div className="mx-auto max-w-7xl px-5 lg:px-8"><SectionTitle index="02" label="Trajetória" title="Experiência construída no território."/><div className="relative mt-16 max-w-4xl before:absolute before:bottom-0 before:left-[7px] before:top-0 before:w-px before:bg-border">{[
        {date:"2023 — ATUAL", role:"Assessor de Comunicação", org:"Prefeitura Municipal de Belo Vale · Secretaria de Cultura e Turismo", text:"Gestão de comunicação institucional, campanhas e relatórios visuais. Administração de editais PNAB via Fundo Municipal de Cultura, coordenação de eventos e promoção de patrimônios históricos, incluindo o Museu do Escravo."},
        {date:"2022 — 2024", role:"Instrutor de Arte e Cultura", org:"APPA Arte e Cultura", text:"Interpretação do patrimônio, acompanhamento de visitantes e elaboração de atividades socioculturais educativas, além da gestão da comunicação e redação oficial para visitas técnicas."}
      ].map((job)=><article key={job.role} className="reveal relative mb-14 pl-12"><span className="absolute left-0 top-1 size-[15px] rounded-full border-4 border-background bg-primary shadow-[0_0_20px_var(--primary)]"/><p className="text-xs font-bold text-primary">{job.date}</p><h3 className="mt-3 text-2xl font-bold">{job.role}</h3><p className="mt-2 text-sm font-semibold text-foreground/75">{job.org}</p><p className="mt-4 max-w-3xl text-sm leading-7 text-muted-foreground">{job.text}</p></article>)}</div></div></section>

      <section className="relative z-10 mx-auto max-w-7xl px-5 py-28 lg:px-8"><SectionTitle index="03" label="Formação" title="Conhecimento em movimento."/><div className="mt-14 grid gap-px overflow-hidden rounded-lg border border-border bg-border md:grid-cols-2">{[
        ["Tecnólogo em Marketing","Multivix Serra · 2019 — 2021"],["Operador de Drone","FAEMG/SENAR · Abr/2026 · SARPAS RUXHSB"],["Operador de Escavadeira","FAEMG/SENAR · Abr/2024"],["CNH Categoria B","Habilitação para mobilidade em campo"]
      ].map(([title,desc],i)=><div key={title} className="reveal bg-background p-7"><span className="text-xs font-bold text-primary">0{i+1}</span><h3 className="mt-8 text-lg font-bold">{title}</h3><p className="mt-2 text-xs text-muted-foreground">{desc}</p></div>)}</div></section>

      <section id="projetos" className="relative z-10 border-y border-border bg-surface/40 py-28"><div className="mx-auto max-w-7xl px-5 lg:px-8"><SectionTitle index="04" label="Portfólio selecionado" title="Comunicação que ocupa espaço."/><div className="mt-10 flex gap-2 overflow-x-auto pb-3">{categories.map(cat=><button key={cat} onClick={()=>setFilter(cat)} className={`shrink-0 rounded-full border px-4 py-2 text-xs font-bold transition-colors ${filter===cat?"border-primary bg-primary text-primary-foreground":"border-border text-muted-foreground hover:border-primary/40 hover:text-foreground"}`}>{cat}</button>)}</div><div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{visible.map((project)=><TiltCard key={project.title} className="group relative cursor-pointer overflow-hidden rounded-lg border border-border bg-card" ><button onClick={()=>setSelected(project)} className="block w-full text-left" aria-label={`Abrir projeto ${project.title}`}><div className="relative aspect-[4/5] overflow-hidden"><img src={project.image} alt={`Peça do projeto ${project.title}`} loading="lazy" className="size-full object-cover transition-transform duration-700 group-hover:scale-105"/><span className="absolute right-4 top-4 grid size-10 place-items-center rounded-full border border-border bg-background/75 text-primary backdrop-blur-md"><Play className="size-4 fill-current"/></span><div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-background via-background/80 to-transparent p-5 pt-20"><p className="text-[10px] font-bold uppercase text-primary">{project.category}</p><h3 className="mt-2 text-lg font-bold">{project.title}</h3><p className="mt-1 text-xs text-muted-foreground">{project.label}</p></div></div></button></TiltCard>)}</div></div></section>

      <section id="contato" className="relative z-10 mx-auto grid max-w-7xl gap-14 px-5 py-28 lg:grid-cols-[.8fr_1.2fr] lg:px-8"><div className="reveal"><p className="text-xs font-bold text-primary">05 / CONTATO</p><h2 className="mt-5 text-4xl font-extrabold leading-tight md:text-6xl">Uma boa ideia merece ganhar o mundo.</h2><p className="mt-5 max-w-md text-sm leading-7 text-muted-foreground">Projetos de marca, campanhas, audiovisual e comunicação territorial começam com uma conversa.</p><div className="mt-10 flex gap-3">{[[Linkedin,"LinkedIn"],[Instagram,"Instagram"],[MessageCircle,"WhatsApp"],[Mail,"E-mail"]].map(([Icon,label])=><a key={String(label)} href="#contato" aria-label={String(label)} title={String(label)} className="glass-panel grid size-11 place-items-center rounded-md text-muted-foreground transition-all hover:-translate-y-1 hover:border-primary/40 hover:text-primary"><Icon className="size-4"/></a>)}</div></div><form onSubmit={submit} className="reveal glass-panel rounded-lg p-6 md:p-8"><div className="grid gap-5 md:grid-cols-2"><Field label="Nome" name="name" placeholder="Seu nome"/><Field label="E-mail" name="email" type="email" placeholder="voce@empresa.com"/><div className="md:col-span-2"><label className="text-xs font-bold text-muted-foreground" htmlFor="message">Mensagem</label><textarea id="message" name="message" required minLength={10} rows={5} placeholder="Conte um pouco sobre o projeto" className="mt-2 w-full resize-none rounded-md border border-input bg-background/55 px-4 py-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/15"/></div></div><button type="submit" className="shimmer-button mt-6 inline-flex w-full items-center justify-center gap-2 rounded-md bg-primary px-6 py-3.5 text-sm font-extrabold text-primary-foreground">{sent?"Mensagem preparada":"Enviar mensagem"}<ArrowUpRight className="size-4"/></button>{sent&&<p role="status" className="mt-3 text-center text-xs text-primary">Tudo certo — seus dados foram validados.</p>}</form></section>

      <footer className="relative z-10 border-t border-border px-5 py-8"><div className="mx-auto flex max-w-7xl flex-col justify-between gap-3 text-xs text-muted-foreground md:flex-row"><p>© 2026 Mateus Lana. Todos os direitos reservados.</p><p>Marketing · Comunicação · Audiovisual</p></div></footer>

      {selected&&<div role="dialog" aria-modal="true" aria-label={selected.title} className="fixed inset-0 z-50 grid place-items-center bg-background/90 p-4 backdrop-blur-xl" onClick={()=>setSelected(null)}><div className="glass-panel relative max-h-[92vh] w-full max-w-4xl overflow-auto rounded-lg" onClick={(e)=>e.stopPropagation()}><button onClick={()=>setSelected(null)} aria-label="Fechar" className="absolute right-4 top-4 z-10 grid size-10 place-items-center rounded-full bg-background/80 text-foreground backdrop-blur"><X className="size-5"/></button><div className="grid md:grid-cols-[1.1fr_.9fr]"><img src={selected.image} alt={selected.title} className="h-full max-h-[82vh] w-full object-contain bg-background"/><div className="flex flex-col justify-end p-8"><p className="text-xs font-bold text-primary">{selected.category}</p><h2 className="mt-3 text-3xl font-extrabold">{selected.title}</h2><p className="mt-4 text-sm leading-7 text-muted-foreground">{selected.label}. Projeto visual desenvolvido para comunicação pública e conexão direta com a comunidade.</p><button onClick={()=>setSelected(null)} className="mt-8 inline-flex items-center gap-2 text-sm font-bold text-primary">Voltar à galeria <ChevronRight className="size-4"/></button></div></div></div></div>}
    </main>
  );
}

function SectionTitle({ index, label, title }: { index: string; label: string; title: string }) {
  return <div className="reveal grid gap-5 md:grid-cols-[.32fr_1fr]"><p className="text-xs font-bold text-primary">{index} / {label.toUpperCase()}</p><h2 className="max-w-3xl text-3xl font-extrabold leading-tight md:text-5xl">{title}</h2></div>;
}

function Field({ label, name, type="text", placeholder }: { label:string; name:string; type?:string; placeholder:string }) {
  return <div><label className="text-xs font-bold text-muted-foreground" htmlFor={name}>{label}</label><input id={name} name={name} type={type} required className="mt-2 w-full rounded-md border border-input bg-background/55 px-4 py-3 text-sm outline-none transition invalid:not-placeholder-shown:border-destructive focus:border-primary focus:ring-2 focus:ring-primary/15" placeholder={placeholder}/></div>;
}