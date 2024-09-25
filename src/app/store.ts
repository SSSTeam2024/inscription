import { configureStore } from "@reduxjs/toolkit";

import { setupListeners } from "@reduxjs/toolkit/query";

import { inscriptionsSlice } from "features/inscriptions/inscriptionSlice";
import { classeSlice } from "features/classes/classeSlice";
import { fileSlice } from "features/file/fileSlice";

export const store = configureStore({
  reducer: {
    [inscriptionsSlice.reducerPath]: inscriptionsSlice.reducer,
    [classeSlice.reducerPath]: classeSlice.reducer,
    [fileSlice.reducerPath]: fileSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat([
      inscriptionsSlice.middleware,
      classeSlice.middleware,
      fileSlice.middleware
    ]);
  },
});
// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
setupListeners(store.dispatch);
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
