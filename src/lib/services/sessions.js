import { db } from './firebase';
import { collection, addDoc, getDocs, query, where, orderBy, doc, updateDoc, deleteDoc } from 'firebase/firestore';

const sessionsCollection = collection(db, 'sessions');

// Add a new study session
export const addSession = async (session) => {
  await addDoc(sessionsCollection, {
    subject: session.subject,
    notes: session.notes,
    duration: session.duration,
    date: session.date
  });
};

// Get all study sessions
export const getSessions = async () => {
  const snapshot = await getDocs(sessionsCollection);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

// Get sessions for a specific subject
export const getSessionsBySubject = async (subjectName) => {
  const q = query(
    sessionsCollection,
    where('subject', '==', subjectName),
    orderBy('date', 'desc')
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

// Update an existing study session
export const updateSession = async (sessionId, updatedData) => {
  const sessionRef = doc(db, 'sessions', sessionId);
  await updateDoc(sessionRef, {
    subject: updatedData.subject,
    notes: updatedData.notes,
    duration: updatedData.duration,
    date: updatedData.date || new Date().toISOString()
  });
  return { id: sessionId, ...updatedData };
};

// Delete a study session
export const deleteSession = async (sessionId) => {
  const sessionRef = doc(db, 'sessions', sessionId);
  await deleteDoc(sessionRef);
};