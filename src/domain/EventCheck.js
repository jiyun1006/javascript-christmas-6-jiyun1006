import { food, foodCost, specialDay, magicNumber } from '../constants/index.js';

export default class EventCheck {
  #eventList;

  constructor(date, total) {
    this.#eventList = this.#fillBoolean(false);
    if (this.#checkTotalAmount(total)) {
      this.#eventList = this.#checkEvent(date, total);
    }
  }

  get() {
    console.log(this.#eventList);
  }

  #checkTotalAmount(total) {
    if (total >= magicNumber.MIN_COST) return true;
    return false;
  }

  #fillBoolean(bool) {
    const eventCheck = [];
    eventCheck.Dday = bool;
    eventCheck.WeekDay = bool;
    eventCheck.WeekEnd = bool;
    eventCheck.Special = bool;
    eventCheck.FreeGift = bool;
    return eventCheck;
  }

  #checkEvent(date, total) {
    const eventCheck = [];
    eventCheck.Dday = this.#checkDiscountDday(date);
    eventCheck.WeekDay = this.#checkDiscountWeekDay(date);
    eventCheck.WeekEnd = this.#checkDiscountWeekEnd(date);
    eventCheck.Special = this.#checkDiscountSpecial(date);
    eventCheck.FreeGift = this.#checkFreeGift(total);
    return eventCheck;
  }

  #checkDiscountDday(date) {
    return !!(date >= magicNumber.EVENT_START && date <= magicNumber.EVENT_END);
  }

  #checkDiscountWeekDay(date) {
    return !!(date % magicNumber.WEEK !== 1 && date % magicNumber.WEEK !== 2);
  }

  #checkDiscountWeekEnd(date) {
    return !!(date % magicNumber.WEEK === 1 || date % magicNumber.WEEK === 2);
  }

  #checkDiscountSpecial(date) {
    return !!specialDay.includes(date);
  }

  #checkFreeGift(total) {
    return !!total >= magicNumber.GIFT_COST;
  }
}
