import { describe, expect, test } from "bun:test";
import { recommendWorkout } from "./workout";

describe("workout selection from the brief", () => {
  test("supports choosing for a child", () => {
    expect(recommendWorkout("child", "judo", "new").title).toBe("Для ребёнка: дзюдо");
  });
  test("supports choosing for an adult", () => {
    expect(recommendWorkout("adult", "strength", "new").title).toBe("Физическая подготовка");
  });
  test("maps self-defense to martial arts", () => {
    expect(recommendWorkout("adult", "combat", "regular").title).toBe("Единоборства");
  });
  test("maps judo to judo", () => {
    expect(recommendWorkout("adult", "judo", "returning").title).toBe("Дзюдо");
  });
  test("supports an undecided goal", () => {
    expect(recommendWorkout("adult", "unsure", "new").title).toBe("Знакомство с тренировками");
  });
});