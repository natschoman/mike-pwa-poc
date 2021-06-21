import {
  ApolloClient,
  InMemoryCache,
  NormalizedCacheObject
} from "@apollo/client";
import { CachePersistor } from "apollo-cache-persist";
import { PersistentStorage, PersistedData } from "apollo-cache-persist/types";

const API_HOST = 'https://api.spacex.land/graphql/'
const SCHEMA_VERSION = '1'
const SCHEMA_VERSION_KEY = 'apollo-schema-version'

const getApolloClient = async () => {
const cache = new InMemoryCache()

const persistor = new CachePersistor({
  cache,
  storage: window.localStorage as PersistentStorage<PersistedData<NormalizedCacheObject>>,
})

const currentVersion = window.localStorage.getItem(SCHEMA_VERSION_KEY)

if (currentVersion === SCHEMA_VERSION) {
  await persistor.restore()
} else {
  await persistor.purge()
  window.localStorage.setItem(SCHEMA_VERSION_KEY, SCHEMA_VERSION)
}

return new ApolloClient({ uri: API_HOST, cache })
}

export default getApolloClient;