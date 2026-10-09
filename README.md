# Food Delivery Platform

A food delivery application with separate services for authentication, restaurants and orders, riders, administration, payments/uploads, and real-time updates.

## Features

- Customer authentication and role selection
- Restaurant discovery, menus, cart, addresses, and orders
- Restaurant management and order status updates
- Rider registration, availability, order assignment, and delivery status updates
- Admin approval of restaurants and riders
- Razorpay and Stripe payments
- Cloudinary image uploads
- Real-time order updates with Socket.IO

## Project structure

```text
frontend/              React + Vite client
services/
  auth/                Authentication service (port 5000)
  restaurant/          Restaurants, menus, carts, addresses, and orders (port 5001)
  utils/               Payments and Cloudinary uploads (port 5002)
  realtime/            Socket.IO real-time service (port 5004)
  rider/               Rider service (port 5005)
  admin/               Admin service (port 5006)
```

The services communicate with MongoDB and RabbitMQ. Payment and image-upload features also require their respective third-party credentials.

## Requirements

- Node.js 22 or later
- npm
- MongoDB
- RabbitMQ
- Cloudinary account
- Razorpay and/or Stripe account for payments

## Configuration

Create a `.env` file in each backend service directory. The application reads these variables:

| Variable | Used by |
| --- | --- |
| `PORT` | All backend services; use `5000`, `5001`, `5002`, `5004`, `5005`, and `5006` respectively |
| `MONGO_URI` | `auth`, `restaurant`, `rider`, `admin` |
| `DB_NAME` | `auth`, `restaurant`, `rider`, `admin` |
| `JWT_SEC` | `auth`, `restaurant`, `rider`, `admin`, `realtime` |
| `RABBITMQ_URL` | `restaurant`, `rider`, `utils` |
| `PAYMENT_QUEUE` | `restaurant`, `rider`, `utils` |
| `RIDER_QUEUE` | `restaurant`, `rider` |
| `ORDER_READY_QUEUE` | `rider` |
| `INTERNAL_SERVICE_KEY` | `restaurant`, `rider`, `utils`, `realtime` |
| `UTILS_SERVICE` | `restaurant`, `rider` |
| `RESTAURANT_SERVICE` | `utils`, `rider` |
| `REALTIME_SERVICE` | `restaurant`, `rider` |
| `FRONTEND_URL` | `utils` |
| `CLOUD_NAME` | `utils` |
| `CLOUD_API_KEY` | `utils` |
| `CLOUD_SECRET_KEY` | `utils` |
| `RAZORPAY_KEY_ID` | `utils` |
| `RAZORPAY_KEY_SECRET` | `utils` |
| `STRIPE_SECRET_KEY` | `utils` |
| `GOOGLE_CLIENT_ID` | `auth` |
| `GOOGLE_CLIENT_SECRET` | `auth` |

Use service URLs that are reachable from the service processes, for example:

```env
UTILS_SERVICE=http://localhost:5002
RESTAURANT_SERVICE=http://localhost:5001
REALTIME_SERVICE=http://localhost:5004
FRONTEND_URL=http://localhost:5173
```

Do not commit `.env` files or secret values.

## Installation

Install dependencies separately in the frontend and each service:

```bash
cd frontend
npm install

cd ../services/auth
npm install

cd ../restaurant
npm install

cd ../utils
npm install

cd ../rider
npm install

cd ../admin
npm install

cd ../realtime
npm install
```

Start MongoDB and RabbitMQ before starting the backend services.

## Run locally

Run each command from the corresponding directory in a separate terminal:

```bash
# frontend
cd frontend
npm run dev

# backend service
cd services/<service-name>
npm run dev
```

The frontend uses these local service addresses:

| Service | URL |
| --- | --- |
| Frontend | `http://localhost:5173` |
| Auth | `http://localhost:5000` |
| Restaurant | `http://localhost:5001` |
| Utils | `http://localhost:5002` |
| Realtime | `http://localhost:5004` |
| Rider | `http://localhost:5005` |
| Admin | `http://localhost:5006` |

The frontend service URLs are currently defined in `frontend/src/main.tsx`.

## Build

Build the frontend:

```bash
cd frontend
npm run build
```

Build a backend service:

```bash
cd services/<service-name>
npm run build
npm start
```

The backend directories include Dockerfiles for building individual service images. There is currently no root Docker Compose configuration.