# Commerce Bank Appointment Booking System

A full-stack appointment booking system for Commerce Bank, built with **React** (frontend) and **Spring Boot** (backend). Customers can book appointments at Kansas City area branches, receive confirmation emails, and download PDF confirmations.

---

## 📋 Table of Contents

- [Features](#features)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
  - [1. Clone the Repository](#1-clone-the-repository)
  - [2. Set Up the Backend](#2-set-up-the-backend)
  - [3. Set Up the Frontend](#3-set-up-the-frontend)
  - [4. Run the Application](#4-run-the-application)
- [Configuration](#configuration)
  - [Email Setup](#email-setup)
  - [Environment Variables](#environment-variables)
- [Development Workflow](#development-workflow)
- [Troubleshooting](#troubleshooting)

---

## ✨ Features

- 6-step appointment booking wizard
- 8 real Commerce Bank branches in the Kansas City area
- Distance calculation from any MO/KS ZIP code within 100 miles of Kansas City
- Service filtering — branches only show appointment types they support
- Real-time time slot availability — booked slots are greyed out for all users
- Confirmation email sent via Gmail upon booking
- PDF confirmation download
- Monday–Friday scheduling, up to 14 business days ahead

---

## 📁 Project Structure

```
commerce-bank-appointment-booking/
├── frontend/          ← React + Vite application
└── backend/           ← Spring Boot REST API
```

---

## 🔧 Prerequisites

Before running this project, make sure you have the following installed:

### Required for Everyone

| Tool | Version | Download |
|------|---------|----------|
| Java JDK | 17 or higher | [adoptium.net](https://adoptium.net) |
| Node.js | 18 or higher | [nodejs.org](https://nodejs.org) |
| Git | Any recent version | [git-scm.com](https://git-scm.com) |

### Required for Developers

| Tool | Purpose | Download |
|------|---------|----------|
| IntelliJ IDEA | Running the Spring Boot backend | [jetbrains.com](https://www.jetbrains.com/idea/) |
| Maven | Building the backend (usually bundled with IntelliJ) | Included with IntelliJ |

### Verify Your Installation

Open a terminal and run these commands to confirm everything is installed:

```bash
java -version        # Should show 17 or higher
node -v              # Should show 18 or higher
git --version        # Should show any version
```

---

## 🚀 Getting Started

### 1. Clone the Repository

Open a terminal and run:

```bash
git clone https://github.com/YOUR_USERNAME/commerce-bank-appointment-booking.git
cd commerce-bank-appointment-booking
```

Replace `YOUR_USERNAME` with the actual GitHub username.

---

### 2. Set Up the Backend

#### Open in IntelliJ IDEA

1. Open **IntelliJ IDEA**
2. Click **"Open"**
3. Navigate to the `backend/` folder inside the cloned repository and select it
4. Click **"Trust Project"** if prompted
5. Wait for IntelliJ to finish downloading Maven dependencies (watch the progress bar at the bottom — this may take a few minutes the first time)

#### Configure Email (Required)

The app sends confirmation emails via Gmail. You need to provide your own Gmail credentials:

1. Open `backend/src/main/resources/application.properties`
2. Update these two lines with your Gmail address and App Password:

```properties
spring.mail.username=your-gmail@gmail.com
spring.mail.password=yourapppaswordhere
```

> **How to get a Gmail App Password:**
> 1. Go to [myaccount.google.com](https://myaccount.google.com)
> 2. Click **Security** → enable **2-Step Verification** if not already on
> 3. Search for **"App Passwords"** and click it
> 4. Type any app name and click **Create**
> 5. Copy the 16-character password (no spaces) into `application.properties`

---

### 3. Set Up the Frontend

Open a terminal in the `frontend/` folder:

**Windows (PowerShell):**
```powershell
cd frontend
npm install
```

**Linux:**
```bash
cd frontend
npm install
```

Then create your environment file:

**Windows:**
```powershell
copy .env.example .env
```

**Linux:**
```bash
cp .env.example .env
```

The default `.env` file will work as-is for local development:
```
VITE_API_BASE_URL=http://localhost:8080/api
```

---

### 4. Run the Application

You have two options for running the app:

---

#### Option A — Integrated (Recommended)

This runs everything through Spring Boot on a single port (`8080`). Best for testing the complete system.

**Step 1:** Build the React frontend

```bash
# In the frontend/ folder
npm run build
```

**Step 2:** Copy the build output into Spring Boot

**Windows:**
```powershell
# Clear old static files
Remove-Item -Recurse -Force backend\src\main\resources\static\*

# Copy new build
Copy-Item -Recurse frontend\dist\* backend\src\main\resources\static\
```

**Linux:**
```bash
rm -rf backend/src/main/resources/static/*
cp -r frontend/dist/* backend/src/main/resources/static/
```

**Step 3:** Start Spring Boot in IntelliJ

- Open `backend/src/main/java/com/commercebank/appointmentbooking/AppointmentBookingApplication.java`
- Click the green **▶ Run** button or press **Shift+F10**
- Wait until you see `Started AppointmentBookingApplication` in the console

**Step 4:** Open the app

```
http://localhost:8080
```

---

#### Option B — Split (For Development)

This runs the frontend and backend on separate ports. Best when actively making changes to the React code.

**Terminal 1 — Start Spring Boot** (in IntelliJ, press Shift+F10)

**Terminal 2 — Start React dev server:**
```bash
# In the frontend/ folder
npm run dev
```

Then open:
```
http://localhost:5173
```

> With this option, changes to React files appear instantly without rebuilding.

---

## ⚙️ Configuration

### Email Setup

Email is configured in `backend/src/main/resources/application.properties`:

```properties
spring.mail.host=smtp.gmail.com
spring.mail.port=587
spring.mail.username=your-gmail@gmail.com
spring.mail.password=your-app-password
spring.mail.properties.mail.smtp.auth=true
spring.mail.properties.mail.smtp.starttls.enable=true
```

> ⚠️ Never commit real credentials to GitHub. Always use placeholder values in the repository and enter real values locally.

### Environment Variables

The frontend uses a `.env` file in the `frontend/` folder:

| Variable | Default | Description |
|----------|---------|-------------|
| `VITE_API_BASE_URL` | `http://localhost:8080/api` | URL of the Spring Boot backend |

---

## 💻 Development Workflow

### Making Frontend Changes

1. Edit files in `frontend/src/`
2. Run `npm run dev` to see changes live at `http://localhost:5173`
3. When ready to test with Spring Boot:
   ```bash
   npm run build
   # Then copy dist/ contents to backend/src/main/resources/static/
   # Then restart Spring Boot
   ```

### Making Backend Changes

1. Edit Java files in `backend/src/main/java/`
2. IntelliJ will auto-reload if DevTools is enabled, otherwise press **Shift+F10** to restart

### Database

The app uses an **H2 in-memory database** by default. This means:
- ✅ No database setup required
- ✅ Works out of the box
- ⚠️ All data is wiped when Spring Boot restarts

To view the database while the app is running:
1. Go to `http://localhost:8080/h2-console`
2. Enter JDBC URL: `jdbc:h2:mem:commercebank`
3. Username: `sa` | Password: *(leave blank)*
4. Click **Connect**

---

## 🐛 Troubleshooting

### "Site can't be reached" at localhost:8080
- Make sure Spring Boot is running in IntelliJ
- Check the IntelliJ console for error messages
- Verify port 8080 is not being used by another application

### Blank page at localhost:8080
- Make sure you copied the `dist/` contents into `backend/src/main/resources/static/`
- Verify `index.html` is directly inside `static/`, not in a subfolder
- Restart Spring Boot after copying

### Email not sending
- Double-check your Gmail address and App Password in `application.properties`
- Make sure the App Password has no spaces
- Verify 2-Step Verification is enabled on your Google account
- Check the IntelliJ console for error messages starting with `❌`

### Branches not loading
- Make sure Spring Boot is running
- Check browser console (F12) for error messages
- Try visiting `http://localhost:8080/api/appointments/branches?zipCode=64105` directly

### Time slots not blocking correctly
- This resets when Spring Boot restarts (H2 limitation)
- Make sure you are not refreshing the Spring Boot server between bookings

### npm install fails
- Make sure Node.js 18 or higher is installed: `node -v`
- Try deleting `node_modules/` and `package-lock.json` then running `npm install` again

### Java version errors
- Make sure Java 17 or higher is installed: `java -version`
- In IntelliJ, go to **File → Project Structure → SDK** and set it to Java 17+

---

## 📞 Support

For questions about the project:
- **Frontend issues:** Check files in `frontend/src/app/components/`
- **Backend issues:** Check files in `backend/src/main/java/`
- **API reference:** See `frontend/SPRING_BOOT_API_DOCUMENTATION.md`

---

*Last updated: March 2026*
