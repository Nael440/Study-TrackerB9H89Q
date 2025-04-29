# Study Tracker

Study Tracker is a web application built with SvelteKit that helps students and self-learners track study sessions, manage time effectively, and review weekly progress. It features a neon-green modern UI, real-time timers, Firebase integration, and motivational quotes.

---

## Table of Contents

- [Purpose of the Project](#purpose-of-the-project)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running the Project](#running-the-project)
- [Implementation Overview](#implementation-overview)
- [Code Base Structure](#code-base-structure)
- [APIs Used](#apis-used)
- [Stored Data](#stored-data)
- [Component Communication](#component-communication)
- [Author](#author)
- [Contributing](#contributing)
- [License](#license)

---

## Purpose of the Project

Study Tracker enables users to:

- Start and stop study sessions using a timer
- Log session details such as subject, notes, duration, and date
- View, edit, and delete past sessions
- Analyze weekly study statistics (total sessions, time spent, and unique subjects)
- Stay motivated with daily inspirational quotes

It is designed with a responsive neon-green aesthetic and intuitive user interface to enhance the study experience.

---

## Prerequisites

To run the project locally, ensure the following are installed:

- Node.js (v18 or higher)
- npm (v8 or higher)
- A Firebase project with Firestore enabled
- A RapidAPI key for quotes
- A code editor (e.g., Visual Studio Code)

Basic knowledge of Svelte, Firebase, and JavaScript is recommended.

---

## Installation

1. Clone the repository:

```bash
git clone https://github.com/your-username/study-tracker.git
cd study-tracker
```

---

Install dependencies:

```bash
Copy
Edit
npm install
Create a .env file in the project root with the following variables:

env
Copy
Edit
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
VITE_FIREBASE_PROJECT_ID=your_firebase_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
VITE_FIREBASE_APP_ID=your_firebase_app_id
VITE_FIREBASE_MEASUREMENT_ID=your_firebase_measurement_id
VITE_RAPIDAPI_KEY=your_rapidapi_key
```

---

Running the Project
To start the development server:

```bash
Copy
Edit
npm run dev
Navigate to http://localhost:5173 in your browser.

To build the project for production:
```

```bash
Copy
Edit
npm run build
To preview the production build:
```

```bash
Copy
Edit
npm run preview
```
