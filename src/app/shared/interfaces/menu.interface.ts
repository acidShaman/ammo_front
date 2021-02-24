export interface ICategoryData{
  id?: number;
  category: string;
  name: string;
  image: string;
  isShown: boolean;
  dishes?: IDishArray;
}

export interface IDishData{
  id: number;
  about_dish: string;
  ingredients: string;
  name: string;
  price: number;
  image?: string;
  favorite?: boolean;
  category_name?: string;
}

export interface IDishArray extends Array<IDishData> {}

export interface ICategories extends Array<ICategoryData> {}

