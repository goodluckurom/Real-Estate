import { configureStore, combineReducers } from "@reduxjs/toolkit";
import themeReducer from "./reducers/themeSlice";
import userReducer from "./user/userSlice";
import storage from "redux-persist/lib/storage";
import { persistStore, persistReducer } from "redux-persist";

// Combine your reducers
const rootReducer = combineReducers({
  theme: themeReducer,
  user: userReducer,
});

// Configure persistence
const persistConfig = {
  key: "root",
  storage,
  version: 1,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
