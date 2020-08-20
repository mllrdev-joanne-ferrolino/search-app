import gql from "graphql-tag";
export const Sample = gql`
  # query SearchMostTop10Star($queryString: String!) {
  #   search(query: $queryString, type: REPOSITORY, first: 10) {
  #     edges {
  #       node {
  #         ... on Repository {
  #           owner {
  #             avatarUrl
  #             url
  #           }
  #           name
  #           stargazers {
  #             totalCount
  #           }
  #           forks {
  #             totalCount
  #           }
  #         }
  #       }
  #     }
  #   }
  # }
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
          }
        }
      }
    }
  }
`;
