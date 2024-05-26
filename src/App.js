import { Provider } from "react-redux";
import { persistor, store } from "./app/store";
import { PersistGate } from "redux-persist/integration/react";
import Routers from "./services/routers";
import "./App.css";

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Routers />
      </PersistGate>
    </Provider>
  );
};

export default App;
