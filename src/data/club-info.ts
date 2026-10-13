// Transcribed from the club's price and schedule cards (public/price.png, public/schedule.png).

export const INSTAGRAM = "https://www.instagram.com/shark.fitness.club/";

export interface PriceRow {
  label: string;
  value: string;
}

export interface ScheduleBlock {
  title: string;
  rows: { label: string; time: string }[];
}

export const schedule: ScheduleBlock[] = [
  {
    title: "Тренажёрный зал",
    rows: [
      { label: "Понедельник — пятница", time: "09:00 – 21:30" },
      { label: "Суббота — воскресенье", time: "10:00 – 15:00" },
    ],
  },
  {
    title: "Групповые направления",
    rows: [
      { label: "Вт / Чт · HOT BODY", time: "18:30 / 20:00" },
      { label: "Вт · Фитнес бокс (женский)", time: "20:00" },
      { label: "Сб · Тайбо", time: "11:00" },
    ],
  },
];

export const gymPrices: PriceRow[] = [
  { label: "Разовое посещение", value: "15 BYN" },
  { label: "Дневной безлимит (до 16:00)", value: "50 BYN" },
  { label: "Безлимит", value: "70 BYN" },
  { label: "Семейный абонемент", value: "125 BYN" },
  { label: "Абонемент на 3 месяца", value: "180 BYN" },
];

export const groupPrices: PriceRow[] = [
  { label: "HOT BODY (тренаж. зал, группа)", value: "80 BYN" },
  { label: "Фитнес бокс / тай-бо", value: "40 BYN" },
  { label: "Тайский бокс", value: "90 BYN" },
  { label: "Классический бокс", value: "70 BYN" },
];

export const personalTraining = {
  note: "Доп. услуги оплачиваются отдельно",
  coaches: ["Руслан / Люда", "Лиза / Марина", "Влад", "Оксана"],
  rows: [
    { label: "1 тренировка", values: ["15 BYN", "15 BYN", "15 BYN", "20 BYN"] },
    { label: "8 тренировок", values: ["75 BYN", "85 BYN", "100 BYN", "120 BYN"] },
    { label: "12 тренировок", values: ["90 BYN", "120 BYN", "150 BYN", "180 BYN"] },
  ],
};
