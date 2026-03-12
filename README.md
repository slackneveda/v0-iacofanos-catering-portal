# Iacofanos - Premium Catering & Event Portal

A full-stack web application for premium catering services featuring menu browsing, shopping cart, order management, and user authentication.

## Project Structure

```
├── app/                      # Frontend (Next.js)
│   ├── page.tsx             # Homepage with menu
│   ├── login/               # Login page
│   ├── signup/              # Registration page
│   ├── cart/                # Shopping cart page
│   ├── orders/              # Order tracking dashboard
│   ├── contact/             # Contact form page
│   └── layout.tsx           # Root layout with providers
├── components/              # Reusable React components
│   ├── header.tsx           # Navigation header
│   ├── menu-display.tsx     # Menu items grid
│   └── ui/                  # shadcn/ui components
├── lib/                     # Utilities and helpers
│   ├── auth-context.tsx     # Authentication context
│   ├── cart-context.tsx     # Shopping cart context
│   └── api-client.ts        # API client utility
├── backend/                 # Backend (Node.js/Express)
│   ├── src/
│   │   ├── db/              # Database configuration & schema
│   │   ├── routes/          # API endpoints
│   │   ├── middleware/      # Express middleware
│   │   ├── utils/           # Utility functions
│   │   └── index.js         # Main server file
│   ├── .env.example         # Backend environment variables template
│   └── package.json         # Backend dependencies
├── .env.example             # Frontend environment variables template
└── package.json             # Frontend dependencies
```

## Features

### Frontend
- **Authentication**: JWT-based login/registration with secure session management
- **Menu Browsing**: Category-based filtering and item display
- **Shopping Cart**: Add/remove items with quantity management (localStorage)
- **Order Placement**: Event details form with delivery information
- **Order Tracking**: Real-time order status with progress visualization
- **Contact Form**: Submit inquiries and requests
- **Responsive Design**: Mobile-first design with Tailwind CSS
- **Elegant UI**: Premium aesthetic with custom design tokens

### Backend
- **RESTful API**: Complete REST endpoints for all operations
- **Authentication API**: Register, login, profile management
- **Menu API**: Retrieve menu items with category filtering
- **Orders API**: Create and track orders with items
- **Contact API**: Handle contact form submissions
- **Database**: PostgreSQL with proper schema and relationships
- **Security**: Password hashing (bcryptjs), JWT tokens, request validation

## Setup Instructions

### Prerequisites
- Node.js 18+ and npm/pnpm
- PostgreSQL 12+ database
- Git

### Backend Setup

1. **Navigate to backend directory**
```bash
cd backend
```

2. **Install dependencies**
```bash
npm install
```

3. **Create environment file**
```bash
cp .env.example .env
```

4. **Configure environment variables** in `backend/.env`:
```env
DB_HOST=localhost
DB_PORT=5432
DB_NAME=iacofanos_db
DB_USER=postgres
DB_PASSWORD=your_password
JWT_SECRET=your_jwt_secret_key_here_min_32_characters
JWT_EXPIRE=7d
PORT=5000
NODE_ENV=development
```

5. **Initialize database**
```bash
npm run migrate
```

6. **Start backend server**
```bash
npm run dev
```

Backend will be running at `http://localhost:5000`

### Frontend Setup

1. **Install dependencies** (in root directory)
```bash
npm install
```

2. **Create environment file**
```bash
cp .env.example .env.local
```

3. **Configure environment variables** in `.env.local`:
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

4. **Start frontend development server**
```bash
npm run dev
```

Frontend will be running at `http://localhost:3000`

## Database Schema

### Users
- id (PK)
- email (unique)
- password_hash
- first_name, last_name
- phone, address, city, postal_code, country
- created_at, updated_at

### Menu Items
- id (PK)
- name, description
- category
- price
- image_url
- dietary_info
- min_guests
- available
- created_at, updated_at

### Orders
- id (PK)
- user_id (FK)
- event_date, event_time, event_type
- num_guests
- delivery_address, delivery_city, delivery_postal_code
- special_requests
- status (pending, confirmed, preparing, ready, delivered)
- total_amount
- created_at, updated_at

### Order Items
- id (PK)
- order_id (FK)
- menu_item_id (FK)
- quantity, price
- created_at

### Contact Submissions
- id (PK)
- name, email, phone
- subject, message
- status
- created_at, updated_at

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (requires token)
- `PUT /api/auth/profile` - Update user profile (requires token)

### Menu
- `GET /api/menu` - Get all menu items (with optional category filter)
- `GET /api/menu/categories` - Get all categories
- `GET /api/menu/:id` - Get single menu item

### Orders
- `POST /api/orders` - Create new order (requires token)
- `GET /api/orders` - Get user's orders (requires token)
- `GET /api/orders/:id` - Get order details (requires token)
- `PUT /api/orders/:id/status` - Update order status (requires token)

### Contact
- `POST /api/contact` - Submit contact form
- `GET /api/contact` - Get all submissions

## Authentication Flow

1. User registers/logs in via `/signup` or `/login`
2. Backend returns JWT token and user data
3. Token stored in localStorage
4. Token sent in `Authorization: Bearer <token>` header for protected routes
5. Frontend validates token and shows user info
6. Logout clears token from localStorage

## Deployment

### Backend Deployment (Vercel, Heroku, etc.)
1. Set environment variables in hosting platform
2. Deploy `backend/` directory
3. Update `NEXT_PUBLIC_API_URL` in frontend

### Frontend Deployment (Vercel, Netlify, etc.)
1. Set `NEXT_PUBLIC_API_URL` environment variable
2. Deploy from root directory (Next.js app)

## Tech Stack

### Frontend
- Next.js 16 (React)
- TypeScript
- Tailwind CSS
- shadcn/ui components
- React Context API (auth & cart)

### Backend
- Node.js & Express
- PostgreSQL
- bcryptjs (password hashing)
- jsonwebtoken (JWT)
- pg (PostgreSQL client)

## Development Notes

- Cart data is stored in localStorage (not persistent across browsers)
- Authentication uses JWT with 7-day expiration
- CORS enabled for localhost frontend
- All endpoints use HTTPS in production
- Database migrations run automatically on startup
- Proper error handling and validation on both frontend and backend

## Future Enhancements

- Payment integration (Stripe)
- Email notifications
- Admin dashboard for order management
- Menu item management interface
- Advanced filtering and search
- Order history export
- Customer reviews and ratings
- Multi-language support
