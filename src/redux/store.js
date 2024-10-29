import { createStore } from 'redux';
import rootReducer from './reducers/index';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';


const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['videos', 'cachedFiles','activeCollectionId','titles','muted'],  // specify which reducers you want to persist
};

const persistedReducer = persistReducer(persistConfig, rootReducer);
const store = createStore(persistedReducer);
const persistor = persistStore(store);

export { store, persistor };
