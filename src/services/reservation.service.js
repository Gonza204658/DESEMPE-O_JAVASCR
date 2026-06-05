import { http } from "@/api/http";

export const getReservations = () =>
  http.get("/reservations");

export const createReservation = (data) =>
  http.post("/reservations", data);

export const updateReservation = (id, data) =>
  http.patch(`/reservations/${id}`, data);

export const deleteReservation = (id) =>
  http.delete(`/reservations/${id}`);

//aqui solo cambiamos la lo ultimo de reservation le agregamos S.