import { food, foodCost } from '../constants/index.js';

export const createFoodObj = () => {
  const foodKeys = Object.keys(food);
  const foodObj = new Map();
  foodKeys.forEach((foodType) => {
    const foodValues = food[foodType];
    foodObj.set(foodType, new Map());
    foodValues.forEach((foodValue) => {
      foodObj.get(foodType).set(foodValue, foodCost[foodValue]);
    });
  });
  return foodObj;
};

// 문자열인 주문목록을 Map 객체로 변환
export const createMapObj = (menuStr) => {
  const menuArr = menuStr.split(',');
  const menuObj = new Map();
  menuArr.forEach((menu) => {
    const tmp = menu.split('-');
    menuObj.set(tmp[0], Number(tmp[1]));
  });
  return menuObj;
};

//  총 비용 계산
export const createTotalCost = (menu) => {
  let totalCost = 0;
  menu.forEach((value, key) => {
    totalCost += foodCost[key] * value;
  });
  return totalCost;
};
