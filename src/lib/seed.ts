import { sql } from "@vercel/postgres"
import bcrypt from "bcryptjs"
import dotenv from "dotenv"

dotenv.config()

async function seed() {
  try {
    // Create a schema auth
    await sql`
      CREATE SCHEMA IF NOT EXISTS auth;
    `

    // Create users table
    await sql`
      CREATE TABLE IF NOT EXISTS auth.users (
        id SERIAL PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        name VARCHAR(255) NOT NULL,
        surname VARCHAR(255) NOT NULL,
        role VARCHAR(50) NOT NULL DEFAULT 'user',
        avatar_url VARCHAR(255),
        language VARCHAR(2) NOT NULL DEFAULT 'en',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT
      );
    `

    // Get admin email and password from environment variables
    const adminEmail = process.env.ADMIN_EMAIL
    const adminPassword = process.env.ADMIN_PASSWORD

    if (!adminEmail || !adminPassword) {
      throw new Error(
        "Admin email or password is not set in environment variables",
      )
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(adminPassword, 10)

    // Insert initial user data
    await sql`
      INSERT INTO auth.users (email, password, name, surname, role) VALUES
      (${adminEmail}, ${hashedPassword}, 'Admin', 'User', 'admin');
    `

    // Create a table with invited users
    await sql`
      CREATE TABLE IF NOT EXISTS auth.invited_users (
        id SERIAL PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        role VARCHAR(50) NOT NULL DEFAULT 'user',
        invited_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        expired_at TIMESTAMP,
        enrolled_at TIMESTAMP
      );
    `

    // Add a test user to the invited users table. Set to be user by default
    await sql`
      INSERT INTO auth.invited_users (email) VALUES
      ('test@admin.com');
    `

    console.log("Seeding completed successfully.")
  } catch (error) {
    console.error("Error seeding data:", error)
  }
}

seed().catch(console.error)
