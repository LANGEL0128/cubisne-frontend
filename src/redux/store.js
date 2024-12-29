import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './reducers/rootReducer';
import storage from 'redux-persist/lib/storage';
import { persistStore, persistReducer } from 'redux-persist';
import { FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';

const persistConfig = { key: 'root', storage, }; 
const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  // esto del middleware es pq el redux-persist estaba dando problemas en consola
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ 
    serializableCheck: { 
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER], 
    }, 
  }),
});

const persistor = persistStore(store);

export { store, persistor };
