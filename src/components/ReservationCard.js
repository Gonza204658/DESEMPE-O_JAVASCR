export default function ReservationCard(reservation, currentUser, isAdmin) {
  const {
    id,
    workspace,
    date,
    startHour,
    endHour,
    reason,
    status,
    userId,
  } = reservation;

  const ownReservation = String(userId) === String(currentUser?.id);
  const canEdit = isAdmin || (ownReservation && status !== "approved" && status !== "cancelled");
  const canCancel = (isAdmin || ownReservation) && status !== "cancelled";
  const canDelete = isAdmin;
  const canApproveOrReject = isAdmin && status === "pending";

  return `
    <article class="rounded border p-4 shadow-sm">
      <h3 class="font-bold text-lg">
        ${workspace}
      </h3>

      <div>
        <p>
          <strong>Fecha:</strong>
          ${date}
        </p>

        <p>
          <strong>Horario:</strong>
          ${startHour} - ${endHour}
        </p>

        <p>
          <strong>Motivo:</strong>
          ${reason}
        </p>

        <p>
          <strong>Estado:</strong>
          <span>
            ${status}
          </span>
        </p>
      </div>

      <div class="flex gap-2 mt-4 flex-wrap">
        ${canEdit ? `
        <button
          type="button"
          class="btn-edit"
          data-id="${id}"
        >
          Editar
        </button>
        ` : ""}

        ${canDelete ? `
        <button
          type="button"
          class="btn-delete"
          data-id="${id}"
        >
          Eliminar
        </button>
        ` : ""}

        ${canApproveOrReject ? `
        <button
          type="button"
          class="btn-approve"
          data-id="${id}"
        >
          Aprobar
        </button>

        <button
          type="button"
          class="btn-reject"
          data-id="${id}"
        >
          Rechazar
        </button>
        ` : ""}

        ${canCancel ? `
        <button
          type="button"
          class="btn-cancel"
          data-id="${id}"
        >
          Cancelar
        </button>
        ` : ""}
      </div>
    </article>
  `;
}