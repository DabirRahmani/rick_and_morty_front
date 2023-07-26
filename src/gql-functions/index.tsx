import { gql } from "@apollo/client";

const GET_CHARACTERS = (page: number = 1) => gql`
  query {
    characters(page: ${page}) {
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

const GET_EPISODES = (page: number = 1) => gql`
  query {
    episodes(page: ${page}) {
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
        created
      }
    }
  }
`;

const GET_LOCATIONS = (page: number = 1) => gql`
  query {
    locations(page: ${page}) {
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
        residents{
          id
        }
      }
    }
  }
`;

export { GET_CHARACTERS, GET_EPISODES, GET_LOCATIONS };
