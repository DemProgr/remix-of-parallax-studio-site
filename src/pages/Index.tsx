import { useState, type ReactNode } from "react";
import { ArrowDown, ArrowUpRight, Clock3, Dumbbell, Instagram, Menu, Plus, Star, Target, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { INSTAGRAM, schedule, gymPrices, groupPrices, personalTraining, type PriceRow } from "@/data/club-info";
import { clubMedia } from "@/data/club-media";
import { reviews, type Review } from "@/data/reviews";
import { trainers, judoCoaches, gymPlaceholders } from "@/data/trainers";
import { useSharkMotion } from "@/hooks/use-shark-motion";
import "@/shark.css";

const directions = [
  { id: "strength" as const, number: "01", name: "Физическая подготовка", tag: "СИЛА · ВЫНОСЛИВОСТЬ", text: "Движение к сильному телу и хорошему самочувствию.", Icon: Dumbbell },
  { id: "judo" as const, number: "02", name: "Дзюдо", tag: "БАЛАНС · ДИСЦИПЛИНА", text: "Искусство управлять движением, силой и вниманием.", Icon: Target },
];
const nav = [{ href: "#directions", label: "Направления" }, { href: "#trainers", label: "Тренеры" }, { href: "#schedule", label: "Расписание" }, { href: "#prices", label: "Цены" }, { href: "#club", label: "О клубе" }, { href: "#contacts", label: "Контакты" }];
const faqs = [
  { title: "Можно начать без опыта?", answer: "Да. Обсудите с клубом свой опыт: тренер подскажет, какая группа и нагрузка вам подойдут, и поможет начать с правильного уровня." },
  { title: "Как выбрать тренировку для ребёнка?", answer: "Напишите в клуб и укажите возраст ребёнка, его опыт и интересы — подходящую группу необходимо уточнить индивидуально." },
  { title: "Где посмотреть расписание и стоимость?", answer: "Расписание и прайс-лист опубликованы на этой странице в разделах «Расписание» и «Цены». Актуальные изменения и свободные места уточняйте напрямую в Instagram клуба: @shark.fitness.club." },
  { title: "Что взять на первую тренировку?", answer: "Уточните у клуба требования к одежде и экипировке для выбранного направления перед первым посещением." },
];

function SectionHead({ number, label, title, note }: { number: string; label: string; title: string; note?: ReactNode }) {
  return <div className="mb-9 flex flex-wrap items-end justify-between gap-5"><div><p className="shark-eyebrow mb-4 text-muted-foreground">{number} / {label}</p><h2 className="shark-heading shark-section-title">{title}</h2></div>{note && <p className="max-w-xs text-sm leading-6 text-muted-foreground">{note}</p>}</div>;
}

function PriceList({ rows }: { rows: PriceRow[] }) {
  return <ul className="divide-y divide-border">{rows.map(row => <li key={row.label} className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 py-4 first:pt-0 last:pb-0"><span className="text-sm">{row.label}</span><span className="shark-heading shark-gradient-text text-base text-primary">{row.value}</span></li>)}</ul>;
}

function TrainerCard({ name, photo, alt }: { name: string; photo: string; alt: string }) {
  return <figure className="shark-panel bg-card p-3">
    <img src={photo} alt={alt} loading="lazy" className="aspect-[3/4] w-full rounded-[3px] object-cover" />
    <figcaption className="shark-heading px-1 pb-1 pt-3 text-lg">{name}</figcaption>
  </figure>;
}

function ReviewCard({ name, program, rating, text }: Review) {
  return <figure className="shark-panel flex h-full flex-col bg-card p-6">
    <div className="flex gap-1 text-primary" aria-label={`Оценка ${rating} из 5`}>
      {Array.from({ length: 5 }, (_, index) => <Star key={index} size={13} className={index < rating ? "fill-current shark-gradient-icon" : "opacity-30"} />)}
    </div>
    <blockquote className="mb-5 mt-4 text-sm leading-6 text-muted-foreground">«{text}»</blockquote>
    <figcaption className="mt-auto flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1 border-t border-border pt-4">
      <span className="shark-heading text-base">{name}</span>
      <span className="text-[10px] uppercase tracking-[1.5px] text-muted-foreground">{program}</span>
    </figcaption>
  </figure>;
}

export default function Index() {
  const motionRef = useSharkMotion();
  const [menuOpen, setMenuOpen] = useState(false);
  return <div ref={motionRef} className="shark-site min-h-screen bg-background text-foreground">
    <svg aria-hidden="true" focusable="false" className="pointer-events-none absolute h-0 w-0 overflow-hidden">
      <defs>
        <linearGradient id="shark-blue-grad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="hsl(219 95% 52%)" />
          <stop offset="100%" stopColor="hsl(190 100% 58%)" />
        </linearGradient>
      </defs>
    </svg>
    <header className={`shark-site-header border-b border-border/60 bg-background${menuOpen ? " shark-header-pinned" : ""}`}>
      <div className="shark-container shark-nav flex items-center justify-between gap-4 sm:gap-6">
        <a href="#" className="shark-logo" aria-label="SHARK fitness club — главная">SHARK<span className="text-primary">.</span><small>FITNESS CLUB</small></a>
        <nav aria-label="Основная навигация" className="hidden items-center gap-5 text-xs font-medium lg:flex xl:gap-7">{nav.map(item => <a key={item.href} href={item.href} className="transition-colors hover:text-primary">{item.label}</a>)}</nav>
        <div className="flex items-center gap-3">
          <a href={INSTAGRAM} target="_blank" rel="noreferrer" aria-label="Instagram клуба" className="hidden p-2 text-muted-foreground hover:text-primary sm:block"><Instagram size={19} /></a>
          <Button asChild variant="outline" className="hidden h-10 border-foreground/40 px-5 text-xs sm:flex"><a href="#contacts">Записаться<ArrowUpRight /></a></Button>
          <Button size="icon" variant="ghost" aria-label={menuOpen ? "Закрыть меню" : "Открыть меню"} aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)} className="lg:hidden">{menuOpen ? <X /> : <Menu />}</Button>
        </div>
      </div>
      {menuOpen && <nav aria-label="Мобильная навигация" className="shark-container flex flex-col gap-5 border-t border-border py-6">{nav.map(item => <a key={item.href} href={item.href} onClick={() => setMenuOpen(false)}>{item.label}</a>)}<Button asChild className="shark-gradient-bg" onClick={() => setMenuOpen(false)}><a href="#contacts">Записаться<ArrowUpRight /></a></Button></nav>}
    </header>

    <main>
      <section className="shark-hero" aria-labelledby="hero-title">
        {clubMedia.hero && <img src={clubMedia.hero} alt="Тренировки в SHARK fitness club" className="shark-hero-image" fetchPriority="high" />}
        <div className="shark-container shark-hero-content">
          <p className="shark-eyebrow mb-7 text-foreground/80">SHARK FITNESS CLUB</p>
          <h1 id="hero-title" className="shark-heading shark-hero-title">ТВОЙ ХАРАКТЕР.<br /><span className="shark-gradient-text text-primary">ТВОЯ СИЛА.</span></h1>
          <p className="mt-6 max-w-md text-sm leading-7 text-foreground/75 sm:text-base">Неважно, с чего ты начинаешь.<br />Важно, куда ты хочешь прийти. Найди свою<br className="hidden sm:block" /> тренировку вместе с SHARK.</p>
          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4">
            <Button asChild className="shark-cta text-sm font-bold"><a href={INSTAGRAM} target="_blank" rel="noreferrer">Написать в Instagram<ArrowUpRight className="ml-3" /></a></Button>
            <a href="#schedule" className="flex items-center gap-2 text-xs text-muted-foreground transition-colors hover:text-primary"><Clock3 size={15} />Смотреть расписание</a>
          </div>
          <a href="#directions" className="mt-12 inline-flex items-center gap-3 text-[11px] text-foreground/65"><span className="flex h-7 w-7 items-center justify-center rounded-full border border-foreground/30"><ArrowDown size={13} /></span>Твой следующий шаг — здесь</a>
        </div>
        <span className="absolute bottom-8 right-12 hidden text-[10px] uppercase text-muted-foreground md:block">Становись сильнее. Оставайся собой.</span>
      </section>

      <div className="bg-primary shark-gradient-bg text-primary-foreground" aria-hidden="true"><div className="shark-container shark-stripe"><span>БОЛЬШЕ, ЧЕМ ТРЕНИРОВКА</span><Plus size={18} /><span>СИЛА ВНУТРИ ТЕБЯ</span><Plus size={18} /><span>ТВОЙ РИТМ. ТВОЙ SHARK.</span><Plus size={18} /></div></div>

      <section id="directions" className="shark-section shark-container scroll-mt-8">
        <div className="mb-9 flex flex-wrap items-end justify-between gap-5"><div><p className="shark-eyebrow mb-4 text-muted-foreground">01 / НАПРАВЛЕНИЯ</p><h2 className="shark-heading shark-section-title">НАЙДИ СВОЮ СТИХИЮ</h2></div><p className="max-w-xs text-sm leading-6 text-muted-foreground">Разные цели. Разные пути.<br />Один первый шаг — начать.</p></div>
        <div className="grid gap-5 sm:grid-cols-2">{directions.map(({ id, number, name, tag, text, Icon }) => <article key={id} className="shark-direction bg-card p-6">
          {clubMedia[id] && <img src={clubMedia[id]} alt={name + " — SHARK fitness club"} loading="lazy" className="shark-direction-image" />}
          <div className="flex items-start justify-between"><span className="text-xs font-medium text-foreground/60">/{number}</span><Icon size={23} className="shark-gradient-icon text-primary" /></div>
          <div className="mt-auto pt-20"><p className="shark-gradient-text mb-3 text-[9px] font-semibold tracking-[1.5px] text-primary">{tag}</p><h3 className="shark-heading text-3xl leading-tight">{name}</h3><p className="mt-3 max-w-xs text-xs leading-5 text-foreground/70">{text}</p><Button asChild variant="ghost" className="mt-5 h-8 w-full justify-between border-t border-foreground/20 px-0 pt-4 text-xs hover:bg-transparent hover:text-primary"><a href="#trainers">Это моё направление<ArrowUpRight /></a></Button></div>
        </article>)}</div>
      </section>

      <section id="trainers" className="shark-section shark-container scroll-mt-8">
        <SectionHead number="02" label="ТРЕНЕРЫ" title="КТО РЯДОМ С ТОБОЙ" note={<>Команда SHARK.<br />Опыт и подход для каждого.</>} />
        <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-6">{trainers.map(trainer => <TrainerCard key={trainer.name} name={trainer.name} photo={trainer.photo} alt={`Тренер ${trainer.name} — SHARK fitness club`} />)}</div>
        <div className="mt-12">
          <p className="shark-eyebrow mb-5 text-muted-foreground">ШКОЛА ДЗЮДО</p>
          <div className="grid grid-cols-2 gap-5 sm:max-w-md">{judoCoaches.map(coach => <TrainerCard key={coach.name} name={coach.name} photo={coach.photo} alt={`Тренер школы дзюдо ${coach.name} — SHARK fitness club`} />)}</div>
        </div>
      </section>

      <section id="schedule" className="shark-section shark-container scroll-mt-8">
        <SectionHead number="03" label="РАСПИСАНИЕ" title="КОГДА ТРЕНИРУЕМСЯ" note={<>Занятость групп<br />и часы работы зала.</>} />
        <div className="grid gap-5 md:grid-cols-2">{schedule.map(block => <article key={block.title} className="shark-panel bg-card p-6">
          <h3 className="shark-heading shark-gradient-text mb-5 text-xl text-primary">{block.title}</h3>
          <ul className="divide-y divide-border">{block.rows.map(row => <li key={row.label} className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 py-4 first:pt-0 last:pb-0"><span className="text-sm">{row.label}</span><span className="shark-heading text-lg">{row.time}</span></li>)}</ul>
        </article>)}</div>
      </section>

      <section id="prices" className="shark-section shark-container scroll-mt-8">
        <SectionHead number="04" label="ЦЕНЫ" title="ПРАЙС-ЛИСТ" note={<>Цены в BYN.<br />Актуальные условия — у клуба.</>} />
        <div className="grid gap-5 lg:grid-cols-2">
          <article className="shark-panel bg-card p-6"><h3 className="shark-heading shark-gradient-text mb-5 text-xl text-primary">Тренажёрный зал</h3><PriceList rows={gymPrices} /></article>
          <article className="shark-panel bg-card p-6"><h3 className="shark-heading shark-gradient-text mb-5 text-xl text-primary">Групповые тренировки</h3><PriceList rows={groupPrices} /></article>
        </div>
        <article className="shark-panel mt-5 bg-card p-6">
          <div className="mb-5 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2">
            <h3 className="shark-heading shark-gradient-text text-xl text-primary">Индивидуальные тренировки</h3>
            <span className="text-[10px] uppercase tracking-[1.5px] text-muted-foreground">{personalTraining.note}</span>
          </div>
          <div className="shark-table-scroll overflow-x-auto">
            <table className="w-full min-w-[540px] border-collapse text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th scope="col" className="py-3 pr-4 text-left text-[10px] font-semibold uppercase tracking-[1.5px] text-muted-foreground">Тренировка</th>
                  {personalTraining.coaches.map(coach => <th key={coach} scope="col" className="px-3 py-3 text-center text-[10px] font-semibold uppercase tracking-[1.5px] text-muted-foreground">{coach}</th>)}
                </tr>
              </thead>
              <tbody>{personalTraining.rows.map(row => <tr key={row.label} className="border-b border-border/60 last:border-0">
                <th scope="row" className="py-4 pr-4 text-left text-sm font-medium">{row.label}</th>
                {row.values.map((value, index) => <td key={index} className="shark-heading shark-gradient-text px-3 py-4 text-center text-base text-primary">{value}</td>)}
              </tr>)}</tbody>
            </table>
          </div>
        </article>
      </section>

      <section id="club" className="shark-section shark-container"><div className="grid gap-12 md:grid-cols-2"><div><p className="shark-eyebrow mb-5 text-muted-foreground">05 / О КЛУБЕ</p><h2 className="shark-heading shark-section-title">НЕ ПРОСТО ФОРМА.<br />ТВОЙ НОВЫЙ <span className="shark-gradient-text text-primary">РИТМ.</span></h2><p className="mt-7 max-w-md text-sm leading-7 text-muted-foreground">SHARK — место, где начинается твоя работа над собой. Не сравнивай себя с другими. Выбирай свою цель, двигайся в своём темпе и становись сильнее, чем вчера.</p><Button asChild variant="link" className="mt-6 px-0 text-xs"><a href={INSTAGRAM} target="_blank" rel="noreferrer">Жизнь клуба в Instagram<ArrowUpRight /></a></Button></div><div className="divide-y divide-border">{[{ number: "01", title: "Твой старт", text: "С нуля или после перерыва — начни со своего уровня." }, { number: "02", title: "Твоя цель", text: "Форма, сила, техника или уверенность. Выбор за тобой." }, { number: "03", title: "Твой прогресс", text: "Шаг за шагом. Тренировка за тренировкой." }].map(item => <div key={item.number} className="flex gap-6 py-6 first:pt-0"><span className="shark-gradient-text pt-1 text-xs text-primary">{item.number}</span><div><h3 className="text-xl font-semibold">{item.title}</h3><p className="mt-3 text-sm leading-6 text-muted-foreground">{item.text}</p></div></div>)}</div></div>      </section>

      <section id="gallery" className="shark-section shark-container scroll-mt-8">
        <SectionHead number="06" label="ЗАЛ" title="НАШ ЗАЛ" note={<>Фото зала появятся<br />совсем скоро.</>} />
        <div className="grid gap-5 sm:grid-cols-3">{gymPlaceholders.map(item => <figure key={item.label} className="shark-panel bg-card p-3">
          <img src={item.photo} alt={`Фото зала «${item.label}» — скоро появится`} loading="lazy" className="aspect-[4/3] w-full rounded-[3px] object-cover" />
          <figcaption className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1 px-1 pb-1 pt-3"><span className="text-sm">{item.label}</span><span className="text-[10px] uppercase text-muted-foreground">Фото скоро</span></figcaption>
        </figure>)}</div>
      </section>

      <section id="reviews" className="shark-section shark-container scroll-mt-8">
        <SectionHead number="07" label="ОТЗЫВЫ" title="ЧТО ГОВОРЯТ ПОСЛЕ ТРЕНИРОВОК" note={<>Мнение тех, кто уже<br />тренируется в SHARK.</>} />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{reviews.map(review => <ReviewCard key={review.id} {...review} />)}</div>
      </section>

      <section className="shark-container border-t border-border py-16"><div className="grid gap-10 md:grid-cols-[.8fr_1.2fr]"><div><p className="shark-eyebrow mb-4 text-muted-foreground">08 / ВОПРОСЫ</p><h2 className="shark-heading shark-section-title">ПЕРЕД СТАРТОМ</h2></div><div>{faqs.map(faq => <details key={faq.title} className="shark-faq border-b border-border"><summary className="flex min-h-16 items-center justify-between gap-4 py-5 text-sm font-medium">{faq.title}<Plus className="faq-plus shark-gradient-icon h-4 w-4 shrink-0 text-primary transition-transform" /></summary><p className="pb-6 pr-8 text-sm leading-6 text-muted-foreground">{faq.answer}</p></details>)}</div></div></section>

      <section id="contacts" className="border-t border-border bg-card"><div className="shark-container flex flex-wrap items-center justify-between gap-8 py-14"><div><p className="shark-eyebrow mb-4 text-muted-foreground">09 / СЛЕДУЮЩИЙ ШАГ</p><h2 className="shark-heading shark-section-title">УВИДИМСЯ <span className="shark-gradient-text text-primary">НА ТРЕНИРОВКЕ.</span></h2><p className="mt-4 text-sm text-muted-foreground">Напиши нам. Расписание, условия и всё, что важно для старта.</p></div><Button asChild className="shark-cta"><a href={INSTAGRAM} target="_blank" rel="noreferrer"><Instagram />Написать в Instagram<ArrowUpRight /></a></Button></div></section>
    </main>
    <footer className="shark-container"><div className="flex flex-wrap items-center justify-between gap-5 py-8 text-[10px] text-muted-foreground"><a href="#" className="shark-logo text-foreground">SHARK<span className="text-primary">.</span><small>FITNESS CLUB</small></a><span>© {new Date().getFullYear()} SHARK Fitness Club</span><a href={INSTAGRAM} target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-primary">@shark.fitness.club<ArrowUpRight size={13} /></a></div></footer>
  </div>;
}