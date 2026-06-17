import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import App from "./App.jsx";
import Home from "./pages/Home.jsx";
import CadAnimal from "./pages/CadAnimal.jsx";
import AlterarPerfil from "./pages/AlterarPerfil.jsx";
import ListaAnimais from "./pages/ListaAnimais.jsx";
import Solicitacoes from "./pages/solicitacoes.jsx";
import "bootstrap/dist/css/bootstrap.min.css";

function PrivateRoute({ children }) {
  const usuario = localStorage.getItem("usuario");
  return usuario ? children : <Navigate to="/" replace />;
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },

  {
    path: "/home",
    element: (
      <PrivateRoute>
        <Home />
      </PrivateRoute>
    ),
  },
  {
    path: "/cadAnimal",
    element: (
      <PrivateRoute>
        <CadAnimal />
      </PrivateRoute>
    ),
  },

  {
    path: "/perfil",
    element: (
      <PrivateRoute>
        <AlterarPerfil />
      </PrivateRoute>
    ),
  },

  {
    path: "/animais",
    element: (
      <PrivateRoute>
        <ListaAnimais />
      </PrivateRoute>
    ),
  },

  {
    path: "/solicitacoes",
    element: (
      <PrivateRoute>
        <Solicitacoes />
      </PrivateRoute>
    ),
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
