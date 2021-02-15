import {IArrayAddresses} from './address.interface';
import {IDishData} from './menu.interface';

export interface IUser {
  id?: number;
  last_login?: string;
  is_superuser?: number;
  username: string;
  password?: string;
  first_name: string;
  last_name: string;
  phone: string;
  sex?: string;
  birthday?: string;
  date_joined?: string;
}

export interface IUserData {
  user: {
    id: number;
    username: string;
    first_name: string;
    last_name: string;
    is_staff: boolean;
  };
  fav_dishes?: Array<IDishData>;
  order_history?: Array<any>;
  birthday: string;
  phone: string;
  sex: string;
  address: IArrayAddresses;
}

export interface IUserEdit {
  user?: {
    username?: string;
    first_name?: string;
    last_name?: string;
  };
  birthday?: string;
  phone?: string;
  sex?: string;

}

export interface IChangePasswords {
  old_password: string;
  new_passwords: string;
}

export interface SocialUser {
  provider: string;
  id: string;
  email: string;
  name: string;
  image: string;
  token?: string;
  idToken?: string;
}
