import { DefaultType } from '../../defaultType';

export interface IMovie extends DefaultType {
  title: string;
  release: string;
  time: string;
  originCountry: string;
  productionCompany: string;
}
