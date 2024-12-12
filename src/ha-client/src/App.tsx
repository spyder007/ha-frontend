import "./App.css";
import { Provider } from "react-redux";
import { store } from "./store/store";
import { AppRouter } from "./components/AppRouter";
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <AuthProvider>
      <Provider store={store}>
          <AppRouter />
      </Provider>
    </AuthProvider>
  );
}

export default App;
