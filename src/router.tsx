import { Routes, Route } from "react-router-dom";
import { Provider as ReduxProvider } from "react-redux";
import store from "./store";

import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
// import NotFound from "./pages/NotFound";

export const Router = () => {
  return (
    <ReduxProvider store={store}>
      <main className='min-h-screen bg-slate-800 text-white'>
        <Routes>
            <Route index element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
            {/* <Route path="*" element={<NotFound />} /> */}
        </Routes>
      </main>
    </ReduxProvider>
  );
};