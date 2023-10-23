import { ComicModel } from '../../models/comic.model';

export interface ComicsModel {
  offset: number;
  limit: number;
  total: number;
  count: number;
  results: ComicModel[];
}
