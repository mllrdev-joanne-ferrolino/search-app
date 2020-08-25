import gql from "graphql-tag";
export const GetRepositories = gql`
 query getRepositories($login: String!){
  user(login: $login){
    name
    repositories(first: 5){
      nodes{
        name
        description
      }
    }
  }
}
`;