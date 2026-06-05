import ReservationCard from "@/components/ReservationCard";
import { getReservations, createReservation, updateReservation, deleteReservation } from "@/services/reservation.service";
import { getSession, isAdmin } from "@/utils";

let user = null;
let container = null;

export const homeController = async () => {
  user = getSession();
  container = document.querySelector("#reservationsContainer");

  if (!user || !container) {
    return;
  }

  await loadReservations();

  document.querySelector("#btnNuevaReserva")?.addEventListener("click", () => {
    showForm();
  });
};

const loadReservations = async () => {
  if (!user || !container) {
    return;
  }

  const all = await getReservations();
  const list = isAdmin() ? all : all.filter((r) => String(r.userId) === String(user.id));

  container.innerHTML = list.length
    ? list.map((r) => ReservationCard(r, user, isAdmin())).join("")
    : `<p class="col-span-2 text-center py-8 text-slate-400">No hay reservas</p>`;

  attachEvents();
};

const attachEvents = () => {
  if (!container) {
    return;
  }

  container.querySelectorAll(".btn-edit").forEach((btn) =>
    btn.addEventListener("click", async () => {
      const all = await getReservations();
      const r = all.find((r) => r.id === btn.dataset.id);
      if (!r) {
        return;
      }

      if (!isAdmin() && String(r.userId) !== String(user.id)) {
        alert("No tienes permiso para editar esta reserva.");
        return;
      }

      if (!isAdmin() && r.status === "approved") {
        alert("No puedes editar una reserva aprobada.");
        return;
      }

      showForm(r);
    })
  );

  container.querySelectorAll(".btn-delete").forEach((btn) =>
    btn.addEventListener("click", async () => {
      if (!isAdmin()) {
        return;
      }

      if (!confirm("¿Eliminar esta reserva?")) return;
      await deleteReservation(btn.dataset.id);
      await loadReservations();
    })
  );

  container.querySelectorAll(".btn-approve").forEach((btn) =>
    btn.addEventListener("click", async () => {
      if (!isAdmin()) {
        return;
      }

      await updateReservation(btn.dataset.id, { status: "approved" });
      await loadReservations();
    })
  );

  container.querySelectorAll(".btn-reject").forEach((btn) =>
    btn.addEventListener("click", async () => {
      if (!isAdmin()) {
        return;
      }

      await updateReservation(btn.dataset.id, { status: "rejected" });
      await loadReservations();
    })
  );

  container.querySelectorAll(".btn-cancel").forEach((btn) =>
    btn.addEventListener("click", async () => {
      const all = await getReservations();
      const r = all.find((r) => r.id === btn.dataset.id);
      if (!r) {
        return;
      }

      if (!isAdmin() && String(r.userId) !== String(user.id)) {
        alert("No tienes permiso para cancelar esta reserva.");
        return;
      }

      await updateReservation(btn.dataset.id, { status: "cancelled" });
      await loadReservations();
    })
  );
};

const showForm = (reservation = null) => {
  const isEditing = !!reservation;

  const modal = document.createElement("div");
  modal.className = "fixed inset-0 bg-black/50 flex justify-center items-center z-50";
  modal.innerHTML = `
    <div class="bg-white rounded-lg p-6 w-full max-w-md flex flex-col gap-3">
      <h2 class="text-xl font-bold">${isEditing ? "Editar Reserva" : "Nueva Reserva"}</h2>
      <input id="f-workspace" type="text" placeholder="Espacio" value="${isEditing ? reservation.workspace : ""}" class="border p-2 rounded"/>

      <label class="flex flex-col gap-1 text-sm text-slate-600">
        Día
        <input
          id="f-date"
          type="date"
          value="${isEditing ? reservation.date : ""}"
          class="border p-2 rounded"
        />
      </label>

      <label class="flex flex-col gap-1 text-sm text-slate-600">
        Hora inicio
        <input
          id="f-startHour"
          type="time"
          min="00:00"
          max="23:59"
          placeholder="08:00"
          value="${isEditing ? reservation.startHour : ""}"
          class="border p-2 rounded"
        />
      </label>

      <label class="flex flex-col gap-1 text-sm text-slate-600">
        Hora fin
        <input
          id="f-endHour"
          type="time"
          min="00:00"
          max="23:59"
          placeholder="09:00"
          value="${isEditing ? reservation.endHour : ""}"
          class="border p-2 rounded"
        />
      </label>
      
      <input id="f-reason" type="text" placeholder="Motivo" value="${isEditing ? reservation.reason : ""}" class="border p-2 rounded"/>
      <p id="formError" class="text-red-500 text-sm hidden"></p>
      <div class="flex gap-2">
        <button id="btnSave" class="bg-blue-600 text-white px-4 py-2 rounded flex-1">${isEditing ? "Guardar" : "Crear"}</button>
        <button id="btnClose" class="bg-slate-200 px-4 py-2 rounded flex-1">Cancelar</button>
      </div>
    </div>
  `;

  document.body.appendChild(modal);

  modal.querySelector("#btnClose").addEventListener("click", () => modal.remove());

  modal.querySelector("#btnSave").addEventListener("click", async () => {
    const workspace = modal.querySelector("#f-workspace").value.trim();
    const date = modal.querySelector("#f-date").value;
    const startHour = modal.querySelector("#f-startHour").value;
    const endHour = modal.querySelector("#f-endHour").value;
    const reason = modal.querySelector("#f-reason").value.trim();
    const errorEl = modal.querySelector("#formError");

    if (!workspace || !date || !startHour || !endHour || !reason) {
      errorEl.textContent = "Todos los campos son obligatorios.";
      errorEl.classList.remove("hidden");
      return;
    }

    const parseTime = (value) => {
      const parts = value.split(":");
      if (parts.length !== 2) return NaN;
      const [hours, minutes] = parts.map(Number);
      return Number.isInteger(hours) && Number.isInteger(minutes)
        ? hours * 60 + minutes
        : NaN;
    };

    const startMinutes = parseTime(startHour);
    const endMinutes = parseTime(endHour);

    if (Number.isNaN(startMinutes) || Number.isNaN(endMinutes)) {
      errorEl.textContent = "La hora de inicio y fin deben estar en formato válido.";
      errorEl.classList.remove("hidden");
      return;
    }

    if (startMinutes >= endMinutes) {
      errorEl.textContent = "La hora de inicio debe ser menor a la de fin.";
      errorEl.classList.remove("hidden");
      return;
    }

    if (isEditing && !isAdmin() && String(reservation.userId) !== String(user.id)) {
      alert("No tienes permiso para modificar esta reserva.");
      return;
    }

    if (isEditing && !isAdmin() && reservation.status === "approved") {
      alert("No puedes modificar una reserva aprobada.");
      return;
    }

    const all = await getReservations();
    const duplicate = all.find(
      (r) => r.workspace === workspace && r.date === date && r.startHour === startHour && r.id !== reservation?.id
    );

    if (duplicate) {
      errorEl.textContent = "Ya existe una reserva para ese espacio y horario.";
      errorEl.classList.remove("hidden");
      return;
    }

    if (isEditing) {
      await updateReservation(reservation.id, { workspace, date, startHour, endHour, reason });
    } else {
      await createReservation({ workspace, date, startHour, endHour, reason, userId: user.id, status: "pending" });
    }

    modal.remove();
    await loadReservations();
  });
};
