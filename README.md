# Mywoods — Forest Retreat Booking Platform

Full-stack application with a clean **frontend / backend** separation.

## Project Structure

```
Mywoods.website/
├── frontend/           ← React 19 + Vite (port 5173)
│   ├── src/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   ├── global.css
│   │   ├── components/
│   │   ├── features/
│   │   ├── routes/
│   │   ├── services/api.js
│   │   └── sampleData/
│   ├── index.html
│   ├── vite.config.js  ← Proxies /api → http://localhost:5000
│   └── package.json
│
└── backend/            ← Node.js + Express + MongoDB (port 5000)
    ├── config/db.js    ← Mongoose connection
    ├── models/
    │   ├── Wood.js     ← Stay schema
    │   └── Contact.js  ← Contact form schema
    ├── routes/
    │   ├── woods.js    ← GET/POST/PUT/DELETE /api/woods
    │   └── contacts.js ← POST /api/contacts
    ├── index.js        ← Express entry point
    ├── seed.js         ← Seeds 6 stays into MongoDB
    ├── .env            ← MONGO_URI + PORT (gitignored)
    └── package.json
```

## How to Run

### Terminal 1 — Backend (start first)
```bash
cd backend
npm run dev      # nodemon auto-restarts on file changes
# OR
npm start        # production
```

### Terminal 2 — Frontend
```bash
cd frontend
npm run dev      # → http://localhost:5173
```

### Seed the database (one-time)
```bash
cd backend
npm run seed
```

## API Reference

| Method | Route | Description |
|---|---|---|
| `GET` | `/api/woods` | List all stays |
| `GET` | `/api/woods?limit=3` | Fetch N stays |
| `POST` | `/api/woods` | Create a stay |
| `PUT` | `/api/woods/:id` | Update a stay |
| `DELETE` | `/api/woods/:id` | Delete a stay |
| `POST` | `/api/contacts` | Submit contact form |
| `GET` | `/api/health` | Health check |

## Tech Stack

| Layer | Technology |
|---|---|
| **Frontend** | React 19, React Router 8, Vite 8 |
| **Styling** | Vanilla CSS, Poppins (Google Fonts) |
| **Backend** | Node.js, Express 5 |
| **Database** | MongoDB Atlas via Mongoose |
