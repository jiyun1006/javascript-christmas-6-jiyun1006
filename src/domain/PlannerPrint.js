import {
  magicNumber,
  foodCost,
  food,
  uiConstants,
} from '../constants/index.js';
import { createFoodObj, OutputView, createTotalCost } from '../utils/index.js';
import { EventDiscount, EventCheck, Planner } from './index.js';

// 전체적인 이벤트를 출력해주는 플래너 클래스
export default class PlannerPrint {
  #date;

  #menu;

  constructor(date, menu) {
    this.#date = Number(date);
    this.#menu = menu;
  }

  preview() {
    const event = new EventDiscount();
    const discountTotal = event.discount(this.#date, this.#menu);
    const [totalCost, eventList, menuObj] = this.#createObj(
      this.#date,
      this.#menu,
    );
    this.#print(new Planner(), [menuObj, totalCost, eventList, discountTotal]);
  }

  #print(obj, variable) {
    const [menuObj, totalCost, eventList, discountTotal] = [...variable];
    obj.outputOrderMenu(menuObj);
    obj.outputTotalCost(totalCost);
    obj.outputFreeGift(eventList);
    obj.outputDiscountDetail(discountTotal, eventList);
    obj.outputTotalEventCost(discountTotal);
    obj.outputExpectaion(discountTotal, totalCost);
    obj.outputBadge(discountTotal);
  }

  #createObj(date, menu) {
    const eventCheck = new EventCheck(date, menu);
    const [eventList, menuObj] = eventCheck.get();
    const totalCost = createTotalCost(menuObj);
    return [totalCost, eventList, menuObj];
  }
}
