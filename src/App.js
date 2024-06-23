import { Provider } from "react-redux";
import { persistor, store } from "./app/store";
import { PersistGate } from "redux-persist/integration/react";
import { ThemeProvider } from "@mui/material";
import { GoogleOAuthProvider } from "@react-oauth/google";
import Routers from "./services/routers";
import theme from "./Theme";
import "./App.css";

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider theme={theme}>
          <GoogleOAuthProvider clientId="64922668229-bc2pgibso8i0aq3ul9gl3d0q1ahkt67s.apps.googleusercontent.com">
            <Routers />
          </GoogleOAuthProvider>
        </ThemeProvider>
      </PersistGate>
    </Provider>
  );
};

export default App;
