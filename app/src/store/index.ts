import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";

import authReducer from "../features/auth/store/authSlice";
import journalReducer from "../features/journal/store/journalSlice";
import { mmkvStorage } from "./persistConfig";

const rootReducer = combineReducers({
  auth: authReducer,
  journal: journalReducer,
});

const persistedReducer = persistReducer(
  { key: "root", storage: mmkvStorage, whitelist: ["auth", "journal"] },
  rootReducer,
);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
