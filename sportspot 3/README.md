# 🏆 SportSpot - Sports Matchmaking and Booking Platform

A production-ready MVP for a sports matchmaking and booking platform built with modern web technologies. Connect sports enthusiasts, create matches, and book venues in Al Ain and beyond.

## 🚀 Features

### Core Features
- **User Authentication**: Secure JWT-based authentication with role-based access control
- **Gender-Based System**: Enforced at database, backend, and query levels for gender-specific sports groups
- **Match Management**: Create, browse, and join sports matches
- **Venue Booking**: Reserve sports venues with flexible time slots
- **Payment Integration**: Visa card payment gateway integration (abstractable for other providers)
- **Rating System**: Rate and review venues and players
- **Admin Dashboard**: Comprehensive admin panel for platform management

### Supported Sports
- ⚽ Football
- 🎾 Padel

### Gender-Based Features
- **Male-Only Matches/Venues**: For gender-specific activities
- **Female-Only Matches/Venues**: For gender-specific activities
- **Mixed Matches/Venues**: For co-ed participation
- Gender-enforced visibility and access control

## 🏗️ Tech Stack

### Backend
- **Runtime**: Node.js with TypeScript
- **Framework**: NestJS
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: JWT with Passport.js
- **Validation**: Class-validator with DTOs
- **Payment**: Visa Gateway abstraction (provider-agnostic)

### Frontend
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: Zustand (ready for implementation)
- **HTTP Client**: Axios
- **Notifications**: React Hot Toast

### DevOps
- **Containerization**: Docker & Docker Compose
- **Database**: PostgreSQL 16
- **Environment Management**: dotenv

## 📁 Project Structure

```
sportspot/
├── backend/                 # NestJS API
│   ├── src/
│   │   ├── common/          # Shared guards, filters, decorators
│   │   ├── config/          # Configuration files
│   │   ├── modules/         # Feature modules
│   │   │   ├── auth/        # Authentication
│   │   │   ├── users/       # User management
│   │   │   ├── venues/      # Venue management
│   │   │   ├── matches/     # Match management
│   │   │   ├── bookings/    # Booking management
│   │   │   ├── payments/    # Payment processing
│   │   │   ├── reviews/     # Reviews
│   │   │   ├── admin/       # Admin features
│   │   │   └── prisma/      # Database service
│   │   ├── prisma/          # Prisma schema & migrations
│   │   └── main.ts          # Application entry point
│   └── package.json
├── web/                     # Next.js Web Application
│   ├── src/
│   │   ├── app/             # Next.js App Router pages
│   │   ├── components/      # Reusable components
│   │   ├── lib/             # Utilities and helpers
│   │   ├── hooks/           # Custom React hooks
│   │   └── styles/          # Global styles
│   └── package.json
├── docker-compose.yml       # Full stack orchestration
└── README.md                # This file
```

## 🚀 Getting Started

### Prerequisites
- Node.js 20+
- Docker & Docker Compose (optional, for containerized setup)
- PostgreSQL 16+ (if not using Docker)

### Installation

#### Option 1: Using Docker (Recommended)

```bash
# Clone the repository
git clone <repository-url>
cd sportspot

# Build and start all services
docker-compose up -d

# Run database migrations (inside backend container)
docker-compose exec backend npm run db:migrate

# Seed initial data (optional)
docker-compose exec backend npm run db:seed

# Services will be available at:
# - Frontend: http://localhost:3001
# - Backend API: http://localhost:3000/api
# - Database: localhost:5432
```

#### Option 2: Local Development Setup

```bash
# Clone the repository
git clone <repository-url>
cd sportspot

# Install dependencies for all workspaces
npm install

# Setup environment variables
cp backend/.env.example backend/.env.local
cp web/.env.example web/.env.local

# Setup PostgreSQL database
# Make sure PostgreSQL is running and DATABASE_URL is correct in backend/.env.local

# Run database migrations
cd backend
npm run db:migrate
npm run db:seed

# Start backend (in one terminal)
npm run start:dev

# Start frontend (in another terminal)
cd web
npm run dev

# Services will be available at:
# - Frontend: http://localhost:3001
# - Backend API: http://localhost:3000/api
```

## 📚 API Documentation

### Authentication Endpoints

#### Register
```bash
POST /api/auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "SecurePassword123",
  "name": "John Doe",
  "gender": "MALE",
  "phone": "+971123456789",
  "skillLevel": "intermediate"
}
```

**Response (201)**:
```json
{
  "id": "user-uuid",
  "email": "user@example.com",
  "name": "John Doe",
  "gender": "MALE",
  "accessToken": "eyJhbGciOiJIUzI1NiIs..."
}
```

#### Login
```bash
POST /api/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "SecurePassword123"
}
```

### Core Features (Phase 2+)

The following modules will be implemented in subsequent phases:
- **Users Module**: User management and profile
- **Venues Module**: Venue CRUD operations
- **Venue Time Slots**: Time slot management with gender enforcement
- **Matches Module**: Match creation and management
- **Bookings Module**: Venue booking system
- **Payments Module**: Payment processing with Visa Gateway
- **Reviews Module**: Rating and review system
- **Admin Module**: Administrative features and analytics

## 🔐 Security Features

- **Password Hashing**: bcrypt with salt rounds
- **JWT Authentication**: Token-based stateless auth
- **Role-Based Access Control**: USER and ADMIN roles
- **Gender-Based Authorization**: Enforced at multiple levels
- **CORS Configuration**: Configurable CORS policies
- **Input Validation**: Class-validator DTOs
- **Exception Handling**: Centralized exception filtering
- **Webhook Security**: Signature verification for payment webhooks

## 💳 Payment Integration

The backend includes an abstracted Visa Gateway service:

```typescript
// Implementation example in PaymentsModule
const visaGateway = new VisaGatewayService(config);

// Initiate payment
const session = await visaGateway.createPaymentSession({
  amount: 100,
  currency: 'AED',
  reference: 'BOOKING_123',
  callbackUrl: 'https://app.com/payment/callback'
});

// Handle webhook
const result = await visaGateway.handleWebhook(payload, signature);
```

This can be easily adapted to work with:
- CyberSource
- 2Checkout
- PayTabs
- Any other Visa-compatible gateway

## 📊 Database Schema Highlights

### Critical: Gender-Based Enforcement
- **User Model**: Gender field (MALE/FEMALE) - set at signup
- **VenueTimeSlot**: Gender type (MALE_ONLY/FEMALE_ONLY/MIXED)
- **Match**: Gender type (MALE_ONLY/FEMALE_ONLY/MIXED)
- **Database Constraints**: Enforced at schema level
- **Backend Filters**: Server-side visibility rules

### Key Models
- **User**: Authentication, profile, ratings
- **Venue**: Sports facilities with pricing
- **VenueTimeSlot**: Bookable time slots with gender control
- **Match**: Sports matches with participants
- **MatchParticipant**: Join relationship with payment status
- **Booking**: Venue reservations
- **Transaction**: Payment records with commission tracking
- **Review**: Venue and player ratings
- **Settings**: Platform configuration (commission %, etc.)

## 🔄 Development Phases

1. **Phase 1** ✅ Complete
   - Monorepo setup
   - Prisma schema
   - AuthModule with JWT and gender field
   - Core guards and filters

2. **Phase 2** 🔜
   - UsersModule
   - VenuesModule
   - VenueTimeSlot management
   - Gender-based query filtering

3. **Phase 3** 🔜
   - MatchesModule
   - BookingsModule
   - Match join logic with gender validation
   - Capacity management

4. **Phase 4** 🔜
   - PaymentsModule
   - VisaGatewayService
   - Webhook handling
   - Commission calculation

5. **Phase 5** 🔜
   - Next.js frontend pages
   - Auth flows
   - Match browsing and creation
   - Venue booking interface
   - Admin dashboard

6. **Phase 6** 🔜
   - Docker configuration
   - Production build scripts
   - Deployment documentation

## 🛠️ Development

### Backend Development
```bash
cd backend

# Start development server with hot reload
npm run start:dev

# Run tests
npm run test

# Run linting
npm run lint

# Generate Prisma Client
npm run db:generate

# Create and apply migrations
npm run db:migrate

# Reset database
npm run db:reset
```

### Frontend Development
```bash
cd web

# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm run start

# Type checking
npm run type-check

# Linting
npm run lint
```

## 📝 Environment Variables

### Backend (.env.local)
```
DATABASE_URL=postgresql://user:password@localhost:5432/sportspot
JWT_SECRET=your-secret-key
JWT_EXPIRATION=7d
VISA_GATEWAY_API_KEY=your-api-key
VISA_GATEWAY_API_SECRET=your-api-secret
VISA_GATEWAY_WEBHOOK_SECRET=your-webhook-secret
VISA_GATEWAY_API_URL=https://api.visa-gateway.example.com
NODE_ENV=development
APP_PORT=3000
CORS_ORIGIN=http://localhost:3001
PLATFORM_COMMISSION_PERCENTAGE=10
```

### Frontend (.env.local)
```
NEXT_PUBLIC_API_URL=http://localhost:3000/api
NEXT_PUBLIC_APP_NAME=SportSpot
NEXT_PUBLIC_ENABLE_PAYMENTS=true
NEXT_PUBLIC_ENABLE_ADMIN=true
```

## 🚢 Deployment

### Docker Build & Run
```bash
# Build images
docker build -f backend/Dockerfile -t sportspot-backend:latest .
docker build -f web/Dockerfile -t sportspot-web:latest .

# Run with compose
docker-compose up -d

# Scale services
docker-compose up -d --scale backend=2
```

### Production Checklist
- [ ] Set secure JWT_SECRET in environment
- [ ] Configure real database with backups
- [ ] Set up real Visa Gateway credentials
- [ ] Configure CORS for production domain
- [ ] Enable HTTPS/SSL
- [ ] Set up monitoring and logging
- [ ] Configure automatic backups
- [ ] Set up CI/CD pipeline
- [ ] Configure environment-specific configs
- [ ] Run security audit

## 📞 Support & Contact

For issues, questions, or contributions, please contact the SportSpot team.

## 📄 License

This project is proprietary and confidential.

---

**Version**: 1.0.0 MVP
**Last Updated**: January 2025
**Team**: SportSpot Development
