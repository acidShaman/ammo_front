export interface ICategoryData{
  category: string;
  dishes: IDishArray;
}

export interface IDishData{
  id: number;
  about_dish: string;
  ingredients: string;
  name: string;
  price: number;
}

export interface IDishArray extends Array<IDishData> {}

export interface IMenuData extends Array<ICategoryData> {}

