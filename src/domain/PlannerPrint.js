// export default class PlannerPrint {

//   // 혜택 확인 후 할인 적용하는 메서드
//   // 외부로 이용할 메서드
//   discountTotal(date) {
//     let [ddayDC, weekDayDC, weekEndDC, specialDC, giftDC] = Array.from(
//       { length: 5 },
//       () => 0,
//     );
//     const event = new Event();
//     const [eventList, menuObj, totalCost] =
//     if (this.#eventList.Dday) {
//       ddayDC = this.#discountDday(date);
//     }
//     if (this.#eventList.WeekDay) {
//       weekDayDC = this.#discountWeekDay(this.#menuObj);
//     }
//     if (this.#eventList.WeekEnd) {
//       weekEndDC = this.#discountWeekEnd(this.#menuObj);
//     }
//     if (this.#eventList.Special) {
//       specialDC = this.#discountSpecial();
//     }
//     if (this.#eventList.FreeGift) {
//       giftDC = magicNumber.CHAMPAGNE_COST;
//     }
//     return [ddayDC, weekDayDC, weekEndDC, specialDC, giftDC];
//   }

//   // 1. 크리스마스 디데이 할인
//   #discountDday(date) {
//     return magicNumber.DDAY_DISCOUNT + magicNumber.DISCOUNT_UNIT * (date - 1);
//   }

//   // 2. 평일할인(일~목) : 디저트메뉴 2023원 할인
//   #discountWeekDay(menu) {
//     let discountCost = 0;
//     menu.forEach((value, key) => {
//       if (food.DESSERT.includes(key))
//         discountCost += magicNumber.DESSERT_DISCOUNT * value;
//     });
//     return discountCost;
//   }

//   // 3. 주말할인(금,토) : 메인메뉴 2023원 할인
//   #discountWeekEnd(menu) {
//     let discountCost = 0;
//     menu.forEach((value, key) => {
//       if (food.MAIN.includes(key))
//         discountCost += magicNumber.MAIN_DISCOUNT * value;
//     });
//     return discountCost;
//   }

//   // 4. 특별할인 : 별 표시 있는 날짜에 1000원 할인
//   #discountSpecial() {
//     return magicNumber.SPECIAL_DISCOUNT;
//   }

//   // -------------------
//   // 출력 메서드들 이용(외부 이용)

//   // 1. 주문메뉴
//   printOrderMenu() {
//     OutputView.printMenu(this.#menuObj);
//   }

//   // 할인 전 총주문 금액
//   printTotal() {
//     OutputView.printTotalCost(this.#totalCost);
//   }

//   // 증정메뉴
//   printGift() {
//     OutputView.printFreeGift(this.#eventList.FreeGift);
//   }

//   // 혜택 내역
//   printDiscountDetail(discountTotal) {
//     const type = [
//       uiConstants.DDAY_DISCOUNT,
//       uiConstants.WEEKDAY_DISCOUNT,
//       uiConstants.WEEKEND_DISCOUNT,
//       uiConstants.SPECIAL_DISCOUNT,
//       uiConstants.FREE_GIFT_EVENT_DISCOUNT,
//     ];
//     OutputView.printEventDetail(this.#eventList, type, discountTotal);
//   }

//   // 총혜택금액
//   printEventCost(discountTotal) {
//     const sum = this.#sumDiscount(discountTotal);
//     OutputView.printTotalEventCost(sum);
//   }

//   #sumDiscount(discountTotal) {
//     return discountTotal.reduce((tmpSum, current) => tmpSum + current);
//   }

//   // 할인후 예상 결제 금액
//   printExpectaion(discountTotal) {
//     const sum = this.#sumDiscount(discountTotal);
//     OutputView.printExpectCost(this.#totalCost - sum);
//   }

//   // 12월 이벤트 배지
//   printBadge(discountTotal) {
//     const sum = this.#sumDiscount(discountTotal);
//     OutputView.printBadge(this.#checkBadge(sum));
//   }

//   #checkBadge(totalEventCost) {
//     if (totalEventCost >= magicNumber.SANTA_COST) return uiConstants.SANTA;
//     if (totalEventCost >= magicNumber.TREE) return uiConstants.TREE;
//     if (totalEventCost >= magicNumber.STAR) return uiConstants.STAR;
//     return uiConstants.NOTING;
//   }
// }
