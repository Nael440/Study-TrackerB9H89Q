Study Tracker


Study Tracker is a web application built with SvelteKit to help users track their study sessions, manage time, and review past study activities. It provides a user-friendly interface with a neon-themed design, real-time timers, and Firebase integration for data persistence. The app includes features like session logging, editing, deletion, and a dashboard for weekly study statistics.
Table of Contents

Purpose of the Project
Prerequisites
Installation
Implementation
Structure of the Code Base
Description of the APIs
Description of the Stored Data
Communication Method between Components/Services
Author
Running the Project
Contributing
License

Purpose of the Project
The Study Tracker aims to assist students and learners in managing their study time effectively. It allows users to:

Start and end study sessions with a timer.
Log session details like subject, notes, duration, and date.
View and edit past sessions.
Display weekly study statistics, including total sessions, unique subjects, and total study time.
Provide motivational quotes to keep users inspired.
Offer a responsive, visually appealing interface with a neon-green aesthetic.

The project is designed to be intuitive, with features like a real-time clock, date display, and a loader animation to enhance user experience.
Prerequisites
To run the Study Tracker locally, ensure you have the following installed:

Node.js (v18 or higher)
npm (v8 or higher)
A Firebase account with Firestore enabled
A RapidAPI key for fetching motivational quotes
A code editor (e.g., VS Code)
Basic knowledge of Svelte, Firebase, and JavaScript

You will also need to set up environment variables for Firebase and RapidAPI:

Create a .env file in the project root with the following:VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
VITE_FIREBASE_PROJECT_ID=your_firebase_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
VITE_FIREBASE_APP_ID=your_firebase_app_id
VITE_FIREBASE_MEASUREMENT_ID=your_firebase_measurement_id
VITE_RAPIDAPI_KEY=your_rapidapi_key



Installation

Clone the repository: git clone https://github.com/Nael440/Study-Tracker.git
cd Study-Tracker


Install dependencies:npm install


Set up the .env file with your Firebase and RapidAPI credentials (see Prerequisites).
Run the development server:npm run dev


Open your browser and navigate to http://localhost:5173.

Implementation
The Study Tracker is implemented using SvelteKit for the frontend, Firebase Firestore for data storage, and RapidAPI for fetching motivational quotes. Key features include:

Session Management: Users can start a session by entering a subject and notes, track time with a real-time timer, and save the session to Firestore upon completion.
Past Sessions: An accordion-based interface displays past sessions grouped by date, with options to edit or delete them.
Dashboard: Displays weekly statistics, a real-time clock, date, and a random motivational quote.
Responsive Design: The app uses a mobile-friendly navbar and CSS media queries for optimal viewing on all devices.
Animations: Svelte transitions (fade, slide) and a custom neon-green loader enhance the UI.
Stores: Svelte stores manage the timer state and toast notifications for real-time updates.

The app follows a component-based architecture, with services handling Firebase operations and API calls.
Structure of the Code Base
The project is organized as follows:
Study-Tracker/
├── lib/
│   ├── components/
│   │   ├── Accordion.svelte       # Displays past sessions with edit/delete options
│   │   ├── AddSessionForm.svelte  # Form to start a new session
│   │   ├── Card.svelte           # Displays dashboard statistics
│   │   ├── Clock.svelte          # Real-time clock display
│   │   ├── DateDisplay.svelte    # Displays current date
│   │   ├── Loader.svelte         # Neon-green loading animation
│   │   ├── Navbar.svelte         # Responsive navigation bar
│   │   └── QuoteBanner.svelte    # Displays random motivational quotes
│   ├── services/
│   │   ├── sessions.js           # Firebase Firestore operations (add, get, update, delete sessions)
│   │   ├── timer.js              # Svelte stores for timer and toast notifications
│   │   └── quotes.js             # Fetches random quotes via RapidAPI
│   └── firebase.js               # Firebase initialization and Firestore setup
├── routes/
│   ├── +layout.svelte            # Root layout with Navbar
│   ├── +page.svelte              # Dashboard page (home)
│   ├── past-sessions/
│   │   └── +page.svelte          # Past sessions page
│   └── today-session/
│       └── +page.svelte          # Today's session page
├── static/                       # Static assets (e.g., images, fonts)
├── .env                          # Environment variables (not committed)
├── package.json                  # Project dependencies and scripts
├── svelte.config.js              # SvelteKit configuration
├── vite.config.js                # Vite configuration
└── README.md                     # Project documentation


lib/components/: Reusable UI components with scoped styles.
lib/services/: Logic for Firebase, timer, and quote fetching.
routes/: SvelteKit route files for different pages.
static/: Static assets like images or fonts (if any).
.env: Stores sensitive Firebase and RapidAPI keys.

Description of the APIs
The project uses the following APIs:

Firebase Firestore API:

Used for storing and retrieving study session data.
Operations:
addDoc: Adds a new session.
getDocs: Retrieves all or filtered sessions.
updateDoc: Updates an existing session.
deleteDoc: Deletes a session.


Collection: sessions (stores session documents with fields: subject, notes, duration, date).
Configured in lib/firebase.js using environment variables.


RapidAPI Quotes API:

Endpoint: https://quotes-inspirational-quotes-motivational-quotes.p.rapidapi.com/quote
Method: GET
Purpose: Fetches a random motivational quote for the QuoteBanner component.
Response: JSON with text (quote) and author fields.
Implemented in lib/services/quotes.js.
Requires VITE_RAPIDAPI_KEY in .env.



Description of the Stored Data
Data is stored in Firebase Firestore in the sessions collection. Each session document has the following fields:

id: Auto-generated Firestore document ID.
subject (string): The subject of the study session (e.g., "Math").
notes (string): Notes or topics covered during the session.
duration (number): Session duration in hours (e.g., 1.5 for 1 hour 30 minutes).
date (string): Session date in ISO format (e.g., "2025-04-29").

Example document:
{
  "id": "abc123",
  "subject": "Physics",
  "notes": "Studied kinematics and Newton's laws",
  "duration": 2.0,
  "date": "2025-04-29"
}

The dashboard aggregates this data to calculate:

Total sessions in the current week.
Number of unique subjects.
Total study time in seconds, formatted as HH:MM:SS.

Communication Method between Components/Services
The Study Tracker uses a combination of Svelte stores, event dispatching, and service-based data fetching for communication:

Svelte Stores (lib/services/timer.js):

timerStore: Manages timer state (isActive, startTime, elapsedTime, subject, notes).
Subscribed to in today-session/+page.svelte to display the timer.
Updated by startTimer and endTimer functions.


toast: Manages toast notifications (message, type, visible).
Used to show success/error messages (e.g., "Session started!").


Components subscribe to these stores for reactive updates.


Event Dispatching:

The Accordion component dispatches delete and edit events to its parent (past-sessions/+page.svelte).
Example: dispatch('delete') triggers handleDelete in the parent.
edit event includes updated session data (dispatch('edit', editedSession)).


The AddSessionForm component emits an onStart event to trigger startSession in today-session/+page.svelte.


Service-Based Data Fetching:

lib/services/sessions.js provides functions (addSession, getSessions, updateSession, deleteSession) to interact with Firestore.
Used by past-sessions/+page.svelte and today-session/+page.svelte.


lib/services/quotes.js fetches quotes via RapidAPI for QuoteBanner.
Services are imported and called directly in components or pages.


Props:

Components like Accordion, Card, and AddSessionForm receive data via props.
Example: Accordion receives a session prop and emits events to modify it.


Two-way binding is used in AddSessionForm (bind:bindSubject, bind:bindNotes) to sync form inputs with parent state.


SvelteKit Stores:

The $page store is used in Navbar.svelte to highlight the active route ($page.url.pathname).



This approach ensures modularity, reactivity, and clear data flow between components and services.
Author

Name: Nael Ali Amir
Neptune Code: B9H89Q

Running the Project

Ensure prerequisites are met and the .env file is configured.
Install dependencies:npm install


Start the development server:npm run dev


Open http://localhost:5173 in your browser.
To build for production:npm run build


To preview the production build:npm run preview



Contributing
Contributions are welcome! Please follow these steps:

Fork the repository.
Create a new branch (git checkout -b feature/your-feature).
Make changes and commit (git commit -m "Add your feature").
Push to your branch (git push origin feature/your-feature).
Open a pull request.

License
This project is licensed under the MIT License. See the LICENSE file for details.
