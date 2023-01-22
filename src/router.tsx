import { Routes, Route } from "react-router-dom";
import { Provider as ReduxProvider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import store, { persistor } from "./store";

import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";

const Router = () => {
  return (
    <ReduxProvider store={store}>
      <PersistGate persistor={persistor}>
        <Routes>
          <Route index element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </PersistGate> 
    </ReduxProvider>
  );
};

export default Router