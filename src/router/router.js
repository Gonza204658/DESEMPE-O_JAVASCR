import loginView from "@/views/loginView";
import homeView from "@/views/homeView";
import { isAuthenticated, isAdmin } from "@/utils";

const routes = {
  "/": loginView,
  "/home": homeView,
};

// Rutas que requieren estar autenticado
const protectedRoutes = ["/home"];

// Rutas solo para admin
const adminRoutes = [];

export const navigateTo = (path) => {
  history.pushState({}, "", path);
  router();
};

export const router = () => {
  const app = document.querySelector("#app");
  const path = window.location.pathname;

  // Si no está autenticado e intenta entrar a ruta protegida
  if (protectedRoutes.includes(path) && !isAuthenticated()) {
    history.replaceState({}, "", "/");
    app.innerHTML = loginView();
    return;
  }

  // Si ya está autenticado e intenta ir al login
  if (path === "/" && isAuthenticated()) {
    history.replaceState({}, "", "/home");
    app.innerHTML = homeView();
    return;
  }

  // Si intenta entrar a ruta de admin sin serlo
  if (adminRoutes.includes(path) && !isAdmin()) {
    app.innerHTML = `
      <div class="min-h-screen flex justify-center items-center bg-slate-100">
        <div class="bg-white p-8 rounded-lg shadow text-center">
          <h1 class="text-2xl font-bold text-red-500 mb-2">Acceso denegado</h1>
          <p class="text-slate-500">No tienes permisos para ver esta página.</p>
          <button onclick="history.back()" class="mt-4 bg-blue-600 text-white px-4 py-2 rounded">
            Volver
          </button>
        </div>
      </div>
    `;
    return;
  }

  const view = routes[path] || loginView;
  app.innerHTML = view();
};

window.addEventListener("popstate", router);