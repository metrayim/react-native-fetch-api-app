import rootReducer from '../reducers/RootReducer'
import AsyncStorage from '@react-native-community/async-storage';
import { createStore, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist'
import { createLogger } from 'redux-logger'
import thunk from 'redux-thunk';
import reducerApi from '../reducers/reducerApi'
const persistConfig = {
    // Root?
    key: 'root',
   
    storage: AsyncStorage,
    blacklist: [reducerApi]
    
  };
  const persistedReducer = persistReducer(persistConfig, rootReducer)


  const store = createStore(
    persistedReducer,
    applyMiddleware(
      createLogger(),
      thunk
    ),
  );

  let persistor = persistStore(store);

  export {
    store,
    persistor,
  };