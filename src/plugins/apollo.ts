import { ApolloLink } from 'apollo-link';
import { ApolloClient } from 'apollo-client'
import { createHttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'


// HTTP connection to the API
const httpLink = createHttpLink({
  // You should use an absolute URL here
  uri: 'https://api.github.com/graphql',
})

const token = process.env.VUE_APP_GITHUB_GRAPHQL_AUTH_TOKEN;
const auth = new ApolloLink((operation, forward) => {
  operation.setContext({
    headers: {
      authorization: `Bearer ${token}`
    }
  })
  return forward(operation)
})
// Cache implementation
const cache = new InMemoryCache()

// Create the apollo client
export const apolloClient = new ApolloClient({
  link: auth.concat(httpLink),
  cache,
})