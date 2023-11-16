import { MissionUtils } from '@woowacourse/mission-utils';
import { EventDiscount, PlannerPrint } from '../src/domain/index.js';

const getLogSpy = () => {
  const logSpy = jest.spyOn(MissionUtils.Console, 'print');
  logSpy.mockClear();
  return logSpy;
};
describe('이벤트 적용 테스트', () => {
  test('이벤트 혜택이 적용되고 할인이 잘 적용되는지 테스트', () => {
    const event = new EventDiscount();
    const [date, menu] = [3, '타파스-1,티본스테이크-3,레드와인-2,제로콜라-1'];
    const expectedDiscount = [1200, 0, 0, 1000, 25000];
    const totalDiscount = event.discount(date, menu);
    expect(totalDiscount).toEqual(expectedDiscount);
  });

  test('이벤트 혜택의 상세 내역을 발표하는 테스트', () => {
    const logSpy = getLogSpy();
    const scripts = [
      '<주문 메뉴>',
      '티본스테이크 1개',
      '바비큐립 1개',
      '초코케이크 2개',
      '제로콜라 1개',
      '\n',
      '<할인 전 총주문 금액>',
      '142,000원',
      '\n',
      '<증정 메뉴>',
      '샴페인 1개',
      '\n',
      '<혜택 내역>',
      '크리스마스 디데이 할인: -1,200원',
      '평일 할인: -4,046원',
      '특별 할인: -1,000원',
      '증정 이벤트: -25,000원',
      '\n',
      '<총혜택 금액>',
      '-31,246원',
      '\n',
      '<할인 후 예상 결제 금액>',
      '135,754원',
      '\n',
      '<12월 이벤트 배지>',
      '산타',
    ];

    const plannerPrint = new PlannerPrint(
      3,
      '티본스테이크-1,바비큐립-1,초코케이크-2,제로콜라-1',
    );
    plannerPrint.preview();

    scripts.forEach((script) => {
      expect(logSpy).toHaveBeenCalledWith(expect.stringContaining(script));
    });
  });
});
