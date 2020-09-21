export interface IAddress{
  user?: string;
  street: string;
  number: string;
  entrance: string;
  housing: string;
  door: string;
  floor: string;
}

export interface IAddressEdit{
  user?: string;
  street: string;
  number: string;
  entrance?: string;
  housing?: string;
  door?: string;
  floor?: string;
}

export interface IArrayAddresses extends Array<IAddress> {}
