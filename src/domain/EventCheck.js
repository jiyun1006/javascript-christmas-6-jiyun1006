import { specialDay, magicNumber } from '../constants/index.js';
import { createMapObj, createTotalCost } from '../utils/index.js';

// 혜택 확인하는 클래스
export default class EventCheck {
  #eventList;

  #menuObj;

  constructor(date, menu) {
    this.#menuObj = createMapObj(menu);
    const totalCost = createTotalCost(this.#menuObj);
    this.#eventList = this.#fillBoolean(false);
    if (this.#checkTotalAmount(totalCost)) {
      this.#eventList = this.#checkEvent(date, totalCost);
    }
  }

  // getter 하나사용.......
  get() {
    return [this.#eventList, this.#menuObj];
  }

  // -------------------
  // 이벤트 혜택 체크하는 부분.
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

  // 혜택 확인하는 메서드
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
    return !!(total >= magicNumber.GIFT_COST);
  }
}
