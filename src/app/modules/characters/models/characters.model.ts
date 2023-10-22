import { CharacterModel } from '../../models/character.model';

export interface CharactersModel {
  offset: number;
  limit: number;
  total: number;
  count: number;
  results: CharacterModel[];
}
