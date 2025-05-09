import { createRoot } from "react-dom/client";
import "./index.scss";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./RTK/store.jsx";
import { SupabaseProvider } from "./supabase/context/index.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Provider store={store}>
      <SupabaseProvider>
        <App />
      </SupabaseProvider>
    </Provider>
  </BrowserRouter>
);
