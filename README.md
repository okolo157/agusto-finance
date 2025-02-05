# Data Visualization Web App Setup Guide

This guide will help you set up and run the data visualization web application locally. The project uses Next.js, Prisma ORM, and MySQL.

## Prerequisites

- Node.js 18.x or later
- MySQL 8.x or later
- Git
- npm or yarn

## Step-by-Step Setup

### 1. Clone the Repository

```bash
git clone <your-repository-url>
cd <project-directory>
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Database Setup

1. Create a MySQL database on your local machine:

```sql
CREATE DATABASE your_database_name;
```

2. Create a `.env` file in the project root:

```env
# Database URL format: mysql://USER:PASSWORD@HOST:PORT/DATABASE
DATABASE_URL="mysql://root:password@localhost:3306/your_database_name"
```

3. Run Prisma migrations:

```bash
npx prisma generate
npx prisma migrate dev
```

### 4. Run seed to instantly populate db with provided financial_data.csv dataset

```bash
npx prisma db seed
```

### 5. Start the Development Server

```bash
npm run dev
```

The application should now be running at `http://localhost:3000`

## Common Issues & Troubleshooting

1. **Database Connection Issues**

   - Verify MySQL is running
   - Check credentials in `.env`
   - Ensure database exists
   - Check firewall settings

2. **Prisma Issues**

   - Make sure you run `npx prisma generate` if you intend to change the schema
   - Check DATABASE_URL format
   - Clear Prisma cache: `npx prisma generate --force` and generate again

3. **Next.js Start Issues**
   - If version conflicts arise, stop the server and restart it.

## Available Scripts

- `npm run dev`: Start development server
- `npm run build`: Build for production
- `npm start`: Start production server
- `npx prisma studio`: Open Prisma database GUI
