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

export { GET_CHARACTERS };
