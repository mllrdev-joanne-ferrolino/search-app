import gql from "graphql-tag";
export const Sample = gql`
  query SearchRepositories($query: String!, $type: SearchType!) {
    search(query: $query, type: $type, first: 5) {
      nodes {
        ... on User {
          name
          repositories(first: 5, privacy: PUBLIC) {
            nodes {
              name
              description
            }
            totalCount
          }
        }
      }
    }
  }
`;
