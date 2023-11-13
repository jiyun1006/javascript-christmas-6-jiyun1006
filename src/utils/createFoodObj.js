import { food, foodCost } from '../constants/index.js';

const createFoodObj = () => {
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

export default createFoodObj;
