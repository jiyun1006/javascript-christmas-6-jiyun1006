import { magicNumber, food } from '../constants/index.js';
import { EventCheck } from './index.js';

export default class EventDiscount {
  // -------------------
  // 혜택 확인 후 할인 적용하는 메서드
  discount(date, menu) {
    const eventCheck = new EventCheck(date, menu);
    const [eventList, menuObj] = eventCheck.get();
    return this.#checkAndDiscount(date, menuObj, eventList);
  }

  // 외부로 이용할 메서드
  #checkAndDiscount(date, menuObj, eventList) {
    let [ddayDC, weekDayDC, weekEndDC, specialDC, giftDC] = Array.from(
      { length: magicNumber.EVENT_COUNT },
      () => magicNumber.INITIAL_NUM,
    );
    ddayDC = this.#discountDday(date, eventList);
    weekDayDC = this.#discountWeekDay(menuObj, eventList);
    weekEndDC = this.#discountWeekEnd(menuObj, eventList);
    specialDC = this.#discountSpecial(eventList);
    giftDC = eventList.FreeGift
      ? magicNumber.CHAMPAGNE_COST
      : magicNumber.INITIAL_NUM;
    return [ddayDC, weekDayDC, weekEndDC, specialDC, giftDC];
  }

  // 1. 크리스마스 디데이 할인
  #discountDday(date, eventList) {
    return eventList.Dday
      ? magicNumber.DDAY_DISCOUNT + magicNumber.DISCOUNT_UNIT * (date - 1)
      : magicNumber.INITIAL_NUM;
  }

  // 2. 평일할인(일~목) : 디저트메뉴 2023원 할인
  #discountWeekDay(menu, eventList) {
    let discountCost = magicNumber.INITIAL_NUM;
    menu.forEach((value, key) => {
      if (food.DESSERT.includes(key))
        discountCost += magicNumber.DESSERT_DISCOUNT * value;
    });
    return eventList.WeekDay ? discountCost : magicNumber.INITIAL_NUM;
  }

  // 3. 주말할인(금,토) : 메인메뉴 2023원 할인
  #discountWeekEnd(menu, eventList) {
    let discountCost = magicNumber.INITIAL_NUM;
    menu.forEach((value, key) => {
      if (food.MAIN.includes(key))
        discountCost += magicNumber.MAIN_DISCOUNT * value;
    });
    return eventList.WeekEnd ? discountCost : magicNumber.INITIAL_NUM;
  }

  // 4. 특별할인 : 별 표시 있는 날짜에 1000원 할인
  #discountSpecial(eventList) {
    return eventList.Special
      ? magicNumber.SPECIAL_DISCOUNT
      : magicNumber.INITIAL_NUM;
  }
}
