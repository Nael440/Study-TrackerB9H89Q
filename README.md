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
git clone https://github.com/Nael440/study-tracker.git
cd study-tracker
```

---

Install dependencies:

```bash
npm install
Create a .env file in the project root with the following variables:

env
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
npm run dev
Navigate to http://localhost:5173 in your browser.

To build the project for production:
```

```bash
npm run build
To preview the production build:
```

```bash
npm run preview
```
---

Implementation Overview
Frontend: SvelteKit

Data Storage: Firebase Firestore

State Management: Svelte Stores

API Integration: RapidAPI for quotes

Design: Neon-themed, responsive layout

UI Enhancements: Svelte transitions, loading animations

---

Code Base Structure
```bash
study-tracker/
├── lib/
│   ├── components/       # UI components (Accordion, Clock, Loader, etc.)
│   ├── services/         # Firebase, timer, and API service logic
│   └── firebase.js       # Firebase configuration
├── routes/               # SvelteKit route pages
│   ├── +layout.svelte    # Main layout with navigation
│   ├── +page.svelte      # Dashboard
│   ├── past-sessions/    # Past sessions page
│   └── today-session/    # Active session page
├── static/               # Static assets
├── .env                  # Environment variables (excluded from Git)
├── package.json          # Project metadata and scripts
├── svelte.config.js      # SvelteKit configuration
├── vite.config.js        # Vite configuration
└── README.md             # Project documentation
```
---

APIs Used
Firebase Firestore
Used for storing study sessions.

Collection: sessions

Operations: addDoc, getDocs, updateDoc, deleteDoc

Each session document includes:

json
```bash
{
  "id": "abc123",
  "subject": "Physics",
  "notes": "Studied Newton's Laws",
  "duration": 2.0,
  "date": "2025-04-29"
}
RapidAPI - Motivational Quotes
Endpoint: https://quotes-inspirational-quotes-motivational-quotes.p.rapidapi.com/quote
```
Method: GET

Used in the QuoteBanner component to display random motivational quotes.

---

Stored Data
Stored in the sessions collection in Firebase Firestore, each record contains:

subject (string): e.g., "Math"

notes (string): topics covered

duration (number): hours (e.g., 1.5)

date (string): ISO date (e.g., "2025-04-29")

These are used to calculate:

Total weekly sessions

Total study time

Number of unique subjects

---

Component Communication
Svelte Stores
timerStore: Manages session timer state (start, end, elapsed time)

toast: Controls user notifications

Event Dispatching
Accordion.svelte: Emits delete and edit events to parent

AddSessionForm.svelte: Emits onStart event to initiate a session

Props and Bindings
Components like Accordion and Card receive data via props

Two-way binding is used in forms to sync user input

---

Author:
Nael Ali Amir
Neptune Code: B9H89Q

---

Contributing
Fork the repository

Create a new branch:

```bash
git checkout -b feature/your-feature
Make changes and commit:
```

```bash
git commit -m "Add your feature"
Push to your branch:
```

```bash
git push origin feature/your-feature
Open a pull request
```
---
License
This software is free to use, modify, and distribute.
