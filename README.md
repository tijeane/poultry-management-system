# Poultry Management System

A complete web application for managing poultry farming operations.

## Features
- Lot management
- Egg production tracking
- Feeding records
- Financial tracking

## Installation

### Prerequisites
- Docker and Docker Compose
- Node.js (for development)

### With Docker (Recommended)
1. Clone this repository
2. Run: `docker-compose up --build`
3. Access the app at `http://localhost:3000`

### Without Docker
1. Install MongoDB and start the service
2. Configure `.env` file in server directory
3. Install server dependencies: `cd server && npm install`
4. Start server: `npm start`
5. Open client/index.html in browser

## Configuration
Create `.env` file in server directory: