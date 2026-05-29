# Implementation Plan: RM Kembar Docker Architecture & Missing Features

This document outlines the step-by-step implementation plan for migrating RM Kembar to a fully containerized Docker architecture, along with implementing the missing features from the "LAPORAN AKHIR PROJEK".

## 1. Docker & Container Architecture

**Goal:** Provide a robust, production-ready environment that runs the Laravel application, database, and third-party services (like EvolutionAPI) inside isolated Docker containers.

**New Files & Infrastructure:**
- **`Dockerfile`**: A multi-stage build for the Laravel app.
  - *Stage 1*: Node.js to build frontend assets (`npm run build`).
  - *Stage 2*: PHP 8.2 FPM to run the backend and serve the compiled assets.
- **`docker-compose.yml`**: Will orchestrate the following services:
  1. `app`: The Laravel PHP-FPM application.
  2. `webserver`: Nginx to route traffic to the PHP-FPM container.
  3. `mysql`: Database for the Laravel application.
  4. `redis`: Caching and Queue worker for Laravel (needed for async WhatsApp jobs and WebSockets).
  5. `evolution-api`: The official EvolutionAPI Docker container for WhatsApp processing.
  6. `evolution-postgres`: Dedicated PostgreSQL database required by EvolutionAPI.
  7. `evolution-redis`: Dedicated Redis instance required by EvolutionAPI.
- **`nginx/default.conf`**: Configuration for the Nginx container to serve the Laravel app.

---

## 2. Midtrans / QRIS Integration

**Goal:** Allow customers to pay via Midtrans Snap (QRIS) and automatically update order status.
- **Backend:** Install `midtrans/midtrans-php`. Add `MIDTRANS_*` keys to `.env`. Create a `PaymentCallbackController` to handle incoming Midtrans webhooks.
- **Frontend:** Integrate Midtrans Snap JS in `app.blade.php`. Trigger `window.snap.pay()` during checkout.

---

## 3. WhatsApp Notifications (EvolutionAPI)

**Goal:** Send automated WhatsApp messages when order statuses change, utilizing our new containerized EvolutionAPI service.
- **Network:** Laravel will communicate with EvolutionAPI internally via the Docker network at `http://evolution-api:8080`.
- **Backend:** Create a `WhatsAppService` using Laravel's `Http` facade. Hook it into order lifecycle events (Order Created, Payment Success).

---

## 4. Catering Ordering Flow (✅ Completed)

**Status:** Completed. 
- The catering page now fetches real packages from the database and saves orders successfully.

---

## 5. PDF/Excel Report Exports

**Goal:** Allow admin to download sales reports in PDF and Excel formats.
- **Backend:** Install `maatwebsite/excel` (Excel) and `barryvdh/laravel-dompdf` (PDF) via Composer (inside the Docker container).
- **Frontend:** Add "Export to PDF" and "Export to Excel" buttons in the React Admin panel.

---

## 6. Real-time WebSockets

**Goal:** Use WebSockets for live Kitchen display updates.
- **Backend:** Install Laravel Reverb (`php artisan install:broadcasting`) and run it as a service in `docker-compose.yml`.
- **Frontend:** Install `laravel-echo` and `pusher-js`.

---

## 7. QR Code Generation for Tables (✅ Completed)

**Status:** Completed via client-side generation using `api.qrserver.com`.

---

## Phased Execution Strategy

To manage this safely, we will implement these features in the following order:
1. **Phase 1: Docker Migration** (Highest priority. We must containerize the app, setup Nginx, MySQL, and EvolutionAPI first before installing backend packages).
2. **Phase 2: Midtrans Integration** (Now that Docker is running, Composer installs will succeed).
3. **Phase 3: WhatsApp Notifications** (Connect Laravel to the EvolutionAPI container).
4. **Phase 4: PDF/Excel Exports** (Reporting features).
5. **Phase 5: Real-time WebSockets** (Add Reverb container and Echo).

*Please review this updated plan prioritizing the Docker architecture. Let me know if you approve so we can start Phase 1 (writing the Dockerfile and docker-compose.yml)!*