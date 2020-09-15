export interface ITokens {
  access: string;
  refresh: string;
}

export interface ResponseTokens {
  data: {ITokens};
}
