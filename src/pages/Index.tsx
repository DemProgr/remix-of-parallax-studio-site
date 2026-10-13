import { useState } from "react";
import { ArrowDown, ArrowRight, ArrowUpRight, Check, Clock3, Dumbbell, Instagram, Menu, Plus, Shield, Target, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { WorkoutQuiz, INSTAGRAM } from "@/components/WorkoutQuiz";
import { clubMedia } from "@/data/club-media";
import "@/shark.css";

const directions = [
  { id: "strength" as const, number: "01", name: "Физическая подготовка", tag: "СИЛА · ВЫНОСЛИВОСТЬ", text: "Движение к сильному телу и хорошему самочувствию.", Icon: Dumbbell },
  { id: "combat" as const, number: "02", name: "Единоборства", tag: "ТЕХНИКА · ХАРАКТЕР", text: "Уверенность в себе начинается с работы над собой.", Icon: Shield },
  { id: "judo" as const, number: "03", name: "Дзюдо", tag: "БАЛАНС · ДИСЦИПЛИНА", text: "Искусство управлять движением, силой и вниманием.", Icon: Target },
];
const nav = [{ href: "#directions", label: "Направления" }, { href: "#club", label: "О клубе" }, { href: "#start", label: "Как начать" }, { href: "#contacts", label: "Контакты" }];
const faqs = [
  { title: "Можно начать без опыта?", answer: "Даже если вы только начинаете, опрос поможет определиться с направлением. Обсудите с клубом свой опыт: тренер подскажет, какая группа и нагрузка вам подойдут." },
  { title: "Как выбрать тренировку для ребёнка?", answer: "Выберите «Для ребёнка» в опросе. Затем напишите в клуб и укажите возраст ребёнка, его опыт и интересы — подходящую группу необходимо уточнить индивидуально." },
  { title: "Где посмотреть расписание и стоимость?", answer: "Актуальное расписание, стоимость и условия посещения уточняйте напрямую в Instagram клуба: @shark.fitness.club." },
  { title: "Что взять на первую тренировку?", answer: "Уточните у клуба требования к одежде и экипировке для выбранного направления перед первым посещением." },
];

export default function Index() {
  const [quizOpen, setQuizOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const openQuiz = () => setQuizOpen(true);
  return <div className="shark-site min-h-screen bg-background text-foreground">
    <header className="border-b border-border/60 bg-background">
      <div className="shark-container shark-nav flex items-center justify-between gap-6">
        <a href="#" className="shark-logo" aria-label="SHARK fitness club — главная">SHARK<span className="text-primary">.</span><small>FITNESS CLUB</small></a>
        <nav aria-label="Основная навигация" className="hidden items-center gap-7 text-xs font-medium lg:flex">{nav.map(item => <a key={item.href} href={item.href} className="transition-colors hover:text-primary">{item.label}</a>)}</nav>
        <div className="flex items-center gap-3">
          <a href={INSTAGRAM} target="_blank" rel="noreferrer" aria-label="Instagram клуба" className="hidden p-2 text-muted-foreground hover:text-primary sm:block"><Instagram size={19} /></a>
          <Button variant="outline" onClick={openQuiz} className="hidden h-10 border-foreground/40 px-5 text-xs sm:flex">Подобрать тренировку<ArrowUpRight /></Button>
          <Button size="icon" variant="ghost" aria-label={menuOpen ? "Закрыть меню" : "Открыть меню"} aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)} className="lg:hidden">{menuOpen ? <X /> : <Menu />}</Button>
        </div>
      </div>
      {menuOpen && <nav aria-label="Мобильная навигация" className="shark-container flex flex-col gap-5 border-t border-border py-6">{nav.map(item => <a key={item.href} href={item.href} onClick={() => setMenuOpen(false)}>{item.label}</a>)}<Button onClick={() => { setMenuOpen(false); openQuiz(); }}>Подобрать тренировку<ArrowUpRight /></Button></nav>}
    </header>

    <main>
      <section className="shark-hero" aria-labelledby="hero-title">
        {clubMedia.hero && <img src={clubMedia.hero} alt="Тренировки в SHARK fitness club" className="shark-hero-image" fetchPriority="high" />}
        <div className="shark-container shark-hero-content">
          <p className="shark-eyebrow mb-7 text-foreground/80">SHARK FITNESS CLUB</p>
          <h1 id="hero-title" className="shark-heading shark-hero-title">ТВОЙ ХАРАКТЕР.<br /><span className="text-primary">ТВОЯ СИЛА.</span></h1>
          <p className="mt-6 max-w-md text-sm leading-7 text-foreground/75 sm:text-base">Неважно, с чего ты начинаешь.<br />Важно, куда ты хочешь прийти. Найди свою<br className="hidden sm:block" /> тренировку вместе с SHARK.</p>
          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4">
            <Button onClick={openQuiz} className="shark-cta text-sm font-bold">Подобрать тренировку<ArrowUpRight className="ml-3" /></Button>
            <span className="flex items-center gap-2 text-xs text-muted-foreground"><Clock3 size={15} />Всего 30 секунд</span>
          </div>
          <a href="#directions" className="mt-12 inline-flex items-center gap-3 text-[11px] text-foreground/65"><span className="flex h-7 w-7 items-center justify-center rounded-full border border-foreground/30"><ArrowDown size={13} /></span>Твой следующий шаг — здесь</a>
        </div>
        <span className="absolute bottom-8 right-12 hidden text-[10px] uppercase text-muted-foreground md:block">Становись сильнее. Оставайся собой.</span>
      </section>

      <div className="bg-primary text-primary-foreground" aria-hidden="true"><div className="shark-container shark-stripe"><span>БОЛЬШЕ, ЧЕМ ТРЕНИРОВКА</span><Plus size={18} /><span>СИЛА ВНУТРИ ТЕБЯ</span><Plus size={18} /><span>ТВОЙ РИТМ. ТВОЙ SHARK.</span><Plus size={18} /></div></div>

      <section id="directions" className="shark-section shark-container scroll-mt-8">
        <div className="mb-9 flex flex-wrap items-end justify-between gap-5"><div><p className="shark-eyebrow mb-4 text-muted-foreground">01 / НАПРАВЛЕНИЯ</p><h2 className="shark-heading shark-section-title">НАЙДИ СВОЮ СТИХИЮ</h2></div><p className="max-w-xs text-sm leading-6 text-muted-foreground">Разные цели. Разные пути.<br />Один первый шаг — начать.</p></div>
        <div className="grid gap-5 md:grid-cols-3">{directions.map(({ id, number, name, tag, text, Icon }) => <article key={id} className="shark-direction bg-card p-6">
          {clubMedia[id] && <img src={clubMedia[id]} alt={name + " — SHARK fitness club"} loading="lazy" className="shark-direction-image" />}
          <div className="flex items-start justify-between"><span className="text-xs font-medium text-foreground/60">/{number}</span><Icon size={23} className="text-primary" /></div>
          <div className="mt-auto pt-20"><p className="mb-3 text-[9px] font-semibold tracking-[1.5px] text-primary">{tag}</p><h3 className="shark-heading text-3xl leading-tight">{name}</h3><p className="mt-3 max-w-xs text-xs leading-5 text-foreground/70">{text}</p><Button onClick={openQuiz} variant="ghost" className="mt-5 h-8 w-full justify-between border-t border-foreground/20 px-0 pt-4 text-xs hover:bg-transparent hover:text-primary">Это моё направление<ArrowUpRight /></Button></div>
        </article>)}</div>
      </section>

      <section className="shark-quiz-band bg-secondary/40" id="start"><div className="shark-container grid items-center gap-10 py-14 md:grid-cols-[1fr_1.1fr]">
        <div><p className="shark-eyebrow mb-5 text-muted-foreground">НЕ ЗНАЕШЬ, ЧТО ВЫБРАТЬ?</p><h2 className="shark-heading shark-section-title">ТВОЯ ТРЕНИРОВКА.<br /><span className="text-primary">БЕЗ ДОГАДОК.</span></h2><p className="mt-5 max-w-sm text-sm leading-6 text-muted-foreground">Три коротких вопроса — и направление, которое ближе к твоим целям.</p></div>
        <div className="flex items-center gap-8 md:justify-end"><div className="text-center"><div className="shark-quiz-number">30<span className="text-2xl">сек</span></div><p className="mt-2 text-[10px] uppercase text-muted-foreground">ДЛЯ ПЕРВОГО ШАГА</p></div><div className="flex flex-col gap-3"><span className="flex items-center gap-2 text-xs"><Check size={14} className="text-primary" />Для себя или ребёнка</span><span className="flex items-center gap-2 text-xs"><Check size={14} className="text-primary" />С учётом твоего опыта</span><Button onClick={openQuiz} className="shark-cta mt-3">Начать подбор<ArrowUpRight /></Button></div></div>
      </div></section>

      <section id="club" className="shark-section shark-container"><div className="grid gap-12 md:grid-cols-2"><div><p className="shark-eyebrow mb-5 text-muted-foreground">02 / О КЛУБЕ</p><h2 className="shark-heading shark-section-title">НЕ ПРОСТО ФОРМА.<br />ТВОЙ НОВЫЙ <span className="text-primary">РИТМ.</span></h2><p className="mt-7 max-w-md text-sm leading-7 text-muted-foreground">SHARK — место, где начинается твоя работа над собой. Не сравнивай себя с другими. Выбирай свою цель, двигайся в своём темпе и становись сильнее, чем вчера.</p><Button asChild variant="link" className="mt-6 px-0 text-xs"><a href={INSTAGRAM} target="_blank" rel="noreferrer">Жизнь клуба в Instagram<ArrowUpRight /></a></Button></div><div className="divide-y divide-border">{[{ number: "01", title: "Твой старт", text: "С нуля или после перерыва — начни со своего уровня." }, { number: "02", title: "Твоя цель", text: "Форма, сила, техника или уверенность. Выбор за тобой." }, { number: "03", title: "Твой прогресс", text: "Шаг за шагом. Тренировка за тренировкой." }].map(item => <div key={item.number} className="flex gap-6 py-6 first:pt-0"><span className="pt-1 text-xs text-primary">{item.number}</span><div><h3 className="text-xl font-semibold">{item.title}</h3><p className="mt-3 text-sm leading-6 text-muted-foreground">{item.text}</p></div></div>)}</div></div></section>

      <section className="shark-container border-t border-border py-16"><div className="grid gap-10 md:grid-cols-[.8fr_1.2fr]"><div><p className="shark-eyebrow mb-4 text-muted-foreground">03 / ВОПРОСЫ</p><h2 className="shark-heading shark-section-title">ПЕРЕД СТАРТОМ</h2></div><div>{faqs.map(faq => <details key={faq.title} className="shark-faq border-b border-border"><summary className="flex min-h-16 items-center justify-between gap-4 py-5 text-sm font-medium">{faq.title}<Plus className="faq-plus h-4 w-4 shrink-0 text-primary transition-transform" /></summary><p className="pb-6 pr-8 text-sm leading-6 text-muted-foreground">{faq.answer}</p></details>)}</div></div></section>

      <section id="contacts" className="border-t border-border bg-card"><div className="shark-container flex flex-wrap items-center justify-between gap-8 py-14"><div><p className="shark-eyebrow mb-4 text-muted-foreground">04 / СЛЕДУЮЩИЙ ШАГ</p><h2 className="shark-heading shark-section-title">УВИДИМСЯ <span className="text-primary">НА ТРЕНИРОВКЕ.</span></h2><p className="mt-4 text-sm text-muted-foreground">Напиши нам. Расписание, условия и всё, что важно для старта.</p></div><Button asChild className="shark-cta"><a href={INSTAGRAM} target="_blank" rel="noreferrer"><Instagram />Написать в Instagram<ArrowUpRight /></a></Button></div></section>
    </main>
    <footer className="shark-container"><div className="flex flex-wrap items-center justify-between gap-5 py-8 text-[10px] text-muted-foreground"><a href="#" className="shark-logo text-foreground">SHARK<span className="text-primary">.</span><small>FITNESS CLUB</small></a><span>© {new Date().getFullYear()} SHARK Fitness Club</span><a href={INSTAGRAM} target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-primary">@shark.fitness.club<ArrowUpRight size={13} /></a></div></footer>
    <WorkoutQuiz open={quizOpen} onOpenChange={setQuizOpen} />
  </div>;
}