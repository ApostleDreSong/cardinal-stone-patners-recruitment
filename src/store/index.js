import { createStore } from "redux"; 
import { persistStore, persistReducer } from 'redux-persist';
import storageSession from 'redux-persist/lib/storage/session';
import rootReducer from "./reducers"; 

const persistConfig = {
    key: 'root',
    storage: storageSession
}
 
const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(persistedReducer,window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()); 

let persistor = persistStore(store);
 
export {
    store,
    persistor,
  };

  //change
