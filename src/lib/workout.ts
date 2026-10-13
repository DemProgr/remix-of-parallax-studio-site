export type Audience = "adult" | "child";
export type Goal = "strength" | "judo" | "unsure";
export type Experience = "new" | "returning" | "regular";

export function recommendWorkout(audience: Audience, goal: Goal, experience: Experience) {
  const names: Record<Goal, string> = {
    strength: "Физическая подготовка",
    judo: "Дзюдо",
    unsure: "Знакомство с тренировками",
  };
  const level: Record<Experience, string> = {
    new: "Начните с базовых движений и знакомства с техникой под руководством тренера.",
    returning: "Постепенно возвращайтесь к нагрузке и восстановите технику вместе с тренером.",
    regular: "Обсудите с тренером свою подготовку и подходящий уровень нагрузки.",
  };
  return {
    title: audience === "child" ? `Для ребёнка: ${names[goal].toLowerCase()}` : names[goal],
    description: level[experience],
    note: audience === "child" ? "Возраст ребёнка и подходящую группу уточните у клуба." : "Расписание и доступность направления уточните у клуба.",
  };
}