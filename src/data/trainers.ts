export interface Trainer {
  name: string;
  photo: string;
}

export const trainers: Trainer[] = [
  { name: "Марина", photo: "/trainers/Марина.jpg" },
  { name: "Влад", photo: "/trainers/Влад.jpg" },
  { name: "Людмила", photo: "/trainers/людмила.jpg" },
  { name: "Руслан", photo: "/trainers/Руслан.jpg" },
  { name: "Оксана", photo: "/trainers/Оксана.jpg" },
  { name: "Лиза", photo: "/trainers/лиза.jpg" },
];

export const judoCoaches: Trainer[] = [
  { name: "Марк", photo: "/trainers/МаркДзюдо.jpg" },
  { name: "Егор", photo: "/trainers/ЕгорДзюдо.jpg" },
];

export const gymPlaceholders = [
  { label: "Тренажёрная зона", photo: "/placeholder.svg" },
  { label: "Групповые занятия", photo: "/placeholder.svg" },
  { label: "Зона дзюдо", photo: "/placeholder.svg" },
];
