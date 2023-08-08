import react from 'react'
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

import Container from './pages/Container'
import Radial from './utils/radial'

const httpLink = createHttpLink({
  //for local deployment use 'http://localhost:3001/graphql', for live deployment use '/graphql'

 // uri: '/graphql'
 uri: 'http://localhost:3001/graphql'
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return { headers: { ...headers, authorization: token ? `Bearer ${token}` : '' } };
});

const client =  new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
})

function App() {
  return (
    <ApolloProvider client={client}>
    <div className="App">
     <div>its working!</div>
     <Container/>
     <Radial/>
    </div>
    </ApolloProvider>
  );
}

export default App;
