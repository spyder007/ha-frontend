import { combineReducers } from "redux";
import { userMessageReducer } from "./slices/UserMessage";
import { clientListReducer } from "./slices/ClientList";

export const rootReducer = combineReducers({
  userMessage: userMessageReducer,
  clientList: clientListReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
