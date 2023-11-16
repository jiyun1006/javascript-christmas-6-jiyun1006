import { InputView, OutputView } from './view/index.js';
import { PlannerPrint } from './domain/index.js';

class App {
  async run() {
    // 인사말
    OutputView.printGreeting();

    // 식당 방문 날짜와 메뉴 주문 받기
    const date = await InputView.readDate();
    const menu = await InputView.orderMenu();

    // 이벤트 플래너 시작 인사말
    OutputView.printPreviewEvent(date);

    //
    const plannerPrint = new PlannerPrint(date, menu);
    plannerPrint.preview();
  }
}

export default App;
