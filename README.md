# DESEMPE-O_JAVASCR

# Workspace Reservation System

## Description

Single Page Application (SPA) for managing workspace reservations. Users can create and manage reservations, while administrators can approve, reject, edit, and delete reservations.

## Technologies Used

* JavaScript
* Vite
* Tailwind CSS
* JSON Server
* Fetch API

## Installation

```bash
npm install
```

## Running the Project

```bash
npm run dev
```

## Running JSON Server

```bash
npx json-server db.json --port 3000
```

## Test Users

### Admin

```text
Email: your-admin-email
Password: your-admin-password
```

### User

```text
Email: your-user-email
Password: your-user-password
```

## Project Structure

```text
src/
├── components/
├── controllers/
├── router/
├── services/
├── views/
└── main.js
```

## Role Permissions

### Admin

* View all reservations
* Create reservations
* Edit reservations
* Delete reservations
* Approve reservations
* Reject reservations
* Cancel reservations

### User

* Create reservations
* View own reservations
* Edit pending reservations
* Cancel own reservations

## Technical Decisions

* SPA navigation using JavaScript routing.
* Session persistence with localStorage.
* Role-based access control.
* Modular architecture using components, services, controllers, and views.
* CRUD operations through Fetch API and JSON Server.
