import { useState } from "react";
import { ArrowLeft, ArrowRight, Check, Clock3, Instagram, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { recommendWorkout, type Audience, type Goal, type Experience } from "@/lib/workout";

export const INSTAGRAM = "https://www.instagram.com/shark.fitness.club/";

const questions = [
  { title: "Для кого выбираем?", options: [{ value: "adult", label: "Для себя, взрослого", detail: "Время для себя и своих целей" }, { value: "child", label: "Для ребёнка", detail: "Движение, дисциплина и уверенность" }] },
  { title: "Какая у тебя цель?", options: [{ value: "strength", label: "Физическая форма и сила", detail: "Стать сильнее и выносливее" }, { value: "combat", label: "Единоборства и самооборона", detail: "Техника, характер и уверенность" }, { value: "judo", label: "Дзюдо", detail: "Баланс, контроль и мастерство" }, { value: "unsure", label: "Пока не знаю", detail: "Хочу найти своё направление" }] },
  { title: "Какой у тебя опыт?", options: [{ value: "new", label: "Начинаю с нуля", detail: "Раньше не тренировался" }, { value: "returning", label: "Возвращаюсь после перерыва", detail: "Хочу снова войти в ритм" }, { value: "regular", label: "Тренируюсь регулярно", detail: "Готов двигаться дальше" }] },
];

export function WorkoutQuiz({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const question = questions[step];
  const result = step === 3 ? recommendWorkout(answers[0] as Audience, answers[1] as Goal, answers[2] as Experience) : null;
  const reset = () => { setStep(0); setAnswers([]); };
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="quiz-dialog max-w-xl border-border bg-background p-6 sm:p-9">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase text-primary"><Clock3 size={14} /> SHARK · Подбор тренировки</div>
        <DialogTitle className="sr-only">Какая тренировка тебе подходит?</DialogTitle>
        <DialogDescription className="sr-only">Ответь на три коротких вопроса, чтобы подобрать направление тренировок.</DialogDescription>
        <div className="my-3 flex gap-2" aria-label={`Шаг ${Math.min(step + 1, 3)} из 3`}>
          {[0, 1, 2].map(i => <span key={i} className={`h-1 flex-1 ${i <= step ? "bg-primary" : "bg-secondary"}`} />)}
        </div>
        {question && <>
          <span className="text-xs text-muted-foreground">ВОПРОС {step + 1} / 3</span>
          <h2 className="text-3xl font-semibold">{question.title}</h2>
          <div className="my-3 grid gap-3">
            {question.options.map(option => <Button key={option.value} variant="outline" aria-pressed={answers[step] === option.value} onClick={() => setAnswers(old => { const next = [...old]; next[step] = option.value; return next; })} className={`h-auto min-h-20 justify-start whitespace-normal px-5 py-4 text-left ${answers[step] === option.value ? "border-primary bg-primary/10" : "bg-card"}`}>
              <span className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border ${answers[step] === option.value ? "border-primary bg-primary text-primary-foreground" : "border-muted-foreground"}`}>{answers[step] === option.value && <Check size={13} />}</span>
              <span><span className="block text-base">{option.label}</span><span className="mt-1 block text-xs font-normal text-muted-foreground">{option.detail}</span></span>
            </Button>)}
          </div>
          <div className="flex items-center justify-between">
            <Button variant="ghost" disabled={step === 0} onClick={() => setStep(step - 1)}><ArrowLeft />Назад</Button>
            <Button disabled={!answers[step]} onClick={() => setStep(step + 1)}>{step === 2 ? "Мой результат" : "Дальше"}<ArrowRight /></Button>
          </div>
        </>}
        {result && <div className="py-3">
          <span className="mb-6 flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground"><Check /></span>
          <p className="mb-3 text-xs font-medium uppercase text-muted-foreground">Твоё направление</p>
          <h2 className="text-3xl font-semibold">{result.title}</h2>
          <p className="mt-5 leading-relaxed text-muted-foreground">{result.description}</p>
          <p className="mt-3 text-sm text-muted-foreground">{result.note}</p>
          <Button asChild className="mt-7 h-12 w-full"><a href={INSTAGRAM} target="_blank" rel="noreferrer"><Instagram />Обсудить тренировку с клубом<ArrowRight /></a></Button>
          <Button variant="ghost" onClick={reset} className="mt-3 w-full"><RotateCcw />Пройти ещё раз</Button>
        </div>}
      </DialogContent>
    </Dialog>
  );
}