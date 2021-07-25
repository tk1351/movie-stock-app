import { DefaultType } from '../../defaultType';

export interface IUser extends DefaultType {
  name: string;
  sub: string;
  email: string;
  picture: string;
  role: string;
}

export interface JwtPayload {
  email: string;
}

export interface Token {
  accessToken: string;
}
