import {
  magicNumber,
  foodCost,
  food,
  uiConstants,
} from '../constants/index.js';
import { createFoodObj, OutputView } from '../utils/index.js';
import { Event } from './index.js';

// 전체적인 이벤트를 출력해주는 플래너 클래스
export default class Planner {
  #date;

  #menu;

  constructor(date, menu) {
    this.#date = Number(date);
    this.#menu = menu;
  }

  preview() {
    const event = new Event(this.#date, this.#menu);
    const discountTotal = event.discountTotal(this.#date);

    event.printOrderMenu();
    event.printTotal();
    event.printGift();
    event.printDiscountDetail(discountTotal);
    event.printEventCost(discountTotal);
    event.printExpectaion(discountTotal);
    event.printBadge(discountTotal);
  }
}
