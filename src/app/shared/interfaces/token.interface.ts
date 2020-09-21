export interface ITokens {
  access: string;
  refresh: string;
}
export interface ResponseAccessToken {
  data: {access: string};
}
export interface ResponseTokens {
  data: {ITokens};
}
