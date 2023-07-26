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
