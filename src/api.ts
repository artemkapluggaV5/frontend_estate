// Базовый URL для API-запросов.
// В режиме разработки (npm run dev) — берётся из .env (http://127.0.0.1:8000)
// В продакшене (npx vite build) — берётся из .env.production (http://45.134.38.100)
export const API_BASE = import.meta.env.VITE_API_BASE || '';
