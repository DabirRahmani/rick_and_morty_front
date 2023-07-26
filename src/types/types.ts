export interface GET_CHARACTERS_OUTPUT {
  info: GetCharInfo;
  results: CharacterMini[];
}

export interface GetCharInfo {
  count: number;
  pages: number;
  next: null | number;
  prev: null | number;
}


export interface CharacterMini {
  id: string;
  name: string;
  status: string; // enum
  species: string;
  type: string; // enum
  gender: string;
  origin: CharacterMiniLocation;
  location: CharacterMiniLocation;
  image: string;
  episode: CharacterMiniEpisode[];
  created: string;
}

export interface CharacterMiniEpisode {
  id: string;
  name: string;
}

export interface CharacterMiniLocation {
  id: string;
  name: string;
  type: string; //enum
  dimension: string;
  created: string;
}


export interface GET_LOCATIONS_OUTPUT {
  info: Info;
  results: LocationMini[];
}

export interface Info {
  count: number;
  pages: number;
  next: number;
  prev: null;
}

export interface LocationMini {
  id: string;
  name: string;
  type: string;
  dimension: string;
  residents: Resident[];
}

export interface Resident {
  id: string;
}

export interface GET_EPISODES_OUTPUT {
  info: Info;
  results: EpisodeMini[];
}

export interface Info {
  count: number;
  pages: number;
  next: number;
  prev: null;
}

export interface EpisodeMini {
  id: string;
  name: string;
  air_date: string;
  episode: string;
  characters: EpisodeMiniCharacter[];
}

export interface EpisodeMiniCharacter {
  id: string;
  name: string;
}