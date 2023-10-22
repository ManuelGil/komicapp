export interface CharacterModel {
  id?: number;
  name?: string;
  description: string;
  modified?: string;
  resourceURI?: string;
  urls?: Url[];
  thumbnail?: Image;
  comics?: ComicList;
  stories?: StoryList;
  events?: EventList;
  series?: SeriesList;
}

export interface Url {
  type?: string;
  url?: string;
}

export interface Image {
  path?: string;
  extension?: string;
}

export interface ComicList {
  available?: number;
  collectionURI?: string;
  items?: ComicSummary[];
  returned?: number;
}

export interface ComicSummary {
  resourceURI?: string;
  name?: string;
}

export interface StoryList {
  available?: number;
  collectionURI?: string;
  items?: StorySummary[];
  returned?: number;
}

export interface StorySummary {
  resourceURI?: string;
  name?: string;
  type?: string;
}

export interface EventList {
  available?: number;
  collectionURI?: string;
  items?: EventSummary[];
  returned?: number;
}

export interface EventSummary {
  resourceURI?: string;
  name?: string;
}

export interface SeriesList {
  available?: number;
  collectionURI?: string;
  items?: SeriesSummary[];
  returned?: number;
}

export interface SeriesSummary {
  resourceURI?: string;
  name?: string;
}
