export interface ITokens {
  access: string;
  refresh: string;
}
export interface ResponseAccessToken {
  access: string;
}
export interface ResponseTokens {
  data: {ITokens};
}
