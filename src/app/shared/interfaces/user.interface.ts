import {IArrayAddresses} from './address.interface';

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
    address: IArrayAddresses;
  };
  birthday: string;
  phone: string;
  sex: string;
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

