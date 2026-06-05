import Sidebar from "@/components/Sidebar";
import { getSession } from "@/utils";
import { homeController } from "@/controllers/home.controller";

export default function homeView() {
  const user = getSession();

  setTimeout(() => {
    homeController();
  });

  return `
    <div class="flex">

      ${Sidebar()}

      <main class="flex-1 bg-slate-100 min-h-screen p-6">

        <div class="mb-6">
          <h1 class="text-2xl font-bold">Bienvenido, ${user?.name}</h1>
          <p class="text-slate-500">Rol: ${user?.role}</p>
        </div>

        <section class="bg-white p-5 rounded-lg shadow">

          <div class="flex justify-between items-center mb-4">
            <h2 class="font-bold text-xl">Reservas</h2>
            <button
              id="btnNuevaReserva"
              class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              + Nueva Reserva
            </button>
          </div>

          <div id="reservationsContainer" class="grid gap-4 md:grid-cols-2">
            <div class="w-full text-center py-8 col-span-2">
              <p class="text-slate-400">Cargando reservas...</p>
            </div>
          </div>

        </section>

      </main>

    </div>
  `;
}