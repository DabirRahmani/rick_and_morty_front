import { gql } from "@apollo/client";

const GET_CHARACTERS = gql`
  query GetCharacters(
    $page: Int
    $status: String = null
    $gender: String = null
    $name: String = null
    $species: String = null
    $type: String = null
  ) {
    characters(
      page: $page
      filter: {
        status: $status
        gender: $gender
        name: $name
        species: $species
        type: $type
      }
    ) {
      info {
        count
        pages
        next
        prev
      }
      results {
        id
        name
        status
        species
        type
        gender
        origin {
          id
          name
          type
          dimension
          created
        }
        location {
          id
          name
          type
          dimension
          created
        }
        image
        episode {
          id
          name
        }
        created
      }
    }
  }
`;

const GET_EPISODES = gql`
  query GetEpisodes($page: Int = 1) {
    episodes(page: $page) {
      info {
        count
        pages
        next
        prev
      }
      results {
        id
        name
        air_date
        episode
      }
    }
  }
`;

const GET_LOCATIONS = gql`
  query GetLocations(
    $page: Int = 1
    $name: String = null
    $type: String = null
    $dimension: String = null
  ) {
    locations(
      page: $page
      filter: { name: $name, dimension: $dimension, type: $type }
    ) {
      info {
        count
        pages
        next
        prev
      }
      results {
        id
        name
        type
        dimension
        residents {
          id
        }
      }
    }
  }
`;

const GET_CHARACTER = gql`
  query GetCharacter($id: ID! = 1) {
    character(id: $id) {
      id
      name
      status
      species
      type
      gender
      origin {
        id
        name
      }
      location {
        id
        name
      }
      image
      episode {
        id
        name
        episode
        air_date
      }
    }
  }
`;

export { GET_CHARACTERS, GET_EPISODES, GET_LOCATIONS, GET_CHARACTER };
