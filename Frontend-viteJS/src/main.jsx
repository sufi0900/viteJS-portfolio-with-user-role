import { BrowserRouter, Route, Routes } from "react-router-dom";
import store from "./redux/store";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Provider } from "react-redux";
import AdminRoutes from "./pages/AdminRoutes.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import PrivateAdminRoute from "./pages/PrivateRoute.jsx";
import SuperAdminPage from "./pages/SuperAdmin.jsx";
import SuperAdminRoute from "./pages/PrivateSuperAdminRoute.jsx";
ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        {/* <Route path="/adminDashboard/*" element={<AdminRoutes />} /> */}
        <Route
          path="/adminDashboard/*"
          element={
            <PrivateAdminRoute>
              <AdminRoutes />
            </PrivateAdminRoute>
          }
        />
        <Route
          path="/superadmin/*"
          element={
            <SuperAdminRoute>
              <SuperAdminPage />
            </SuperAdminRoute>
          }
        />
        <Route path="/register" element={<Register />} />
      </Routes>
      <App />
    </BrowserRouter>
  </Provider>
);
