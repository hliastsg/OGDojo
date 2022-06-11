import { createStore, applyMiddleware, compose } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import { composeWithDevTools } from 'redux-devtools-extension';
import storage from 'redux-persist/lib/storage';
import root from './reducers/root';

const persistConfig = {
  key: 'main-root',
  storage
}
const composedEnhancer = composeWithDevTools(
  applyMiddleware(
  ),
)
const persistedReducer = persistReducer(persistConfig, root);

const store = createStore(
  persistedReducer, 
  composedEnhancer
)

const Persistor = persistStore(store);

export {Persistor};
export default store;