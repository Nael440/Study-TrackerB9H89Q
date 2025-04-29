import { writable } from 'svelte/store';

// Timer Store
export const timerStore = writable({
  isActive: false,
  startTime: null,
  elapsedTime: 0,
  subject: '',
  notes: ''
});

// Toast Store
export const toast = writable({ message: '', type: '', visible: false });

export function showToast(message, type) {
  toast.set({ message, type, visible: true });
  setTimeout(() => toast.set({ message: '', type: '', visible: false }), 3000);
}

export function startTimer(subject, notes) {
  timerStore.update(state => ({
    ...state,
    isActive: true,
    startTime: new Date(),
    subject,
    notes
  }));
  showToast('Session started!', 'success');
}

export function endTimer() {
  timerStore.update(state => ({
    ...state,
    isActive: false,
    startTime: null
  }));
  showToast('Session ended!', 'success');
}

let timerInterval;
timerStore.subscribe(state => {
  if (state.isActive && !timerInterval) {
    timerInterval = setInterval(() => {
      timerStore.update(s => {
        if (s.startTime) {
          const now = new Date();
          s.elapsedTime = Math.floor((now - s.startTime) / 1000);
        }
        return s;
      });
    }, 1000);
  } else if (!state.isActive && timerInterval) {
    clearInterval(timerInterval);
    timerInterval = null;
  }
});