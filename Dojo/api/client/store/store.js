import { createStore, applyMiddleware, compose } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import root from './reducers/root';

const persistConfig = {
  key: 'main-root',
  storage
}
const composedEnhancer = compose(
  applyMiddleware(),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)
const persistedReducer = persistReducer(persistConfig, root);

const store = createStore(
  persistedReducer, 
  composedEnhancer
  );

const Persistor = persistStore(store);

export {Persistor};
export default store;