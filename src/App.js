import { InputView, OutputView } from './utils/index.js';
import { PlannerPrint } from './domain/index.js';
import { magicNumber, foodCost, food } from './constants/index.js';

class App {
  async run() {
    OutputView.printGreeting();
    const date = await InputView.readDate();
    const menu = await InputView.orderMenu();
    OutputView.printPreviewEvent(date);
    const plannerPrint = new PlannerPrint(date, menu);
    plannerPrint.preview();
  }
}

export default App;
