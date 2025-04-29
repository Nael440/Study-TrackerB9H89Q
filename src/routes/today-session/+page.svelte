<script>
    import { addSession } from '../../lib/services/sessions';
    import { timerStore, startTimer, endTimer, toast } from '../../lib/services/timer';
    import { onMount, onDestroy } from 'svelte';
    import Loader from '../../lib/components/Loader.svelte';
    import AddSessionForm from '../../lib/components/AddSessionForm.svelte';
  
    let subject = '';
    let notes = '';
    let unsubscribe;
    let loading = true;
  
    $: timerDisplay = $timerStore.isActive
      ? `${Math.floor($timerStore.elapsedTime / 3600).toString().padStart(2, '0')}:${Math.floor(($timerStore.elapsedTime % 3600) / 60).toString().padStart(2, '0')}:${($timerStore.elapsedTime % 60).toString().padStart(2, '0')}`
      : '00:00:00';
  
    function startSession() {
      if (subject.trim() && notes.trim()) {
        startTimer(subject, notes);
      }
    }
  
    async function endSession() {
      if ($timerStore.isActive) {
        loading = true;
        endTimer();
        const sessionDate = new Date().toISOString().split('T')[0];
        const duration = $timerStore.elapsedTime / 3600;
  
        await addSession({
          subject: $timerStore.subject,
          notes: $timerStore.notes,
          duration: duration.toFixed(2),
          date: sessionDate
        });
  
        subject = '';
        notes = '';
        loading = false;
      }
    }
  
    onMount(() => {
      unsubscribe = timerStore.subscribe(() => {});
      loading = false;
    });
  
    onDestroy(() => {
      if (unsubscribe) unsubscribe();
    });
  </script>
  
  <div class="container">
    {#if loading}
      <Loader />
    {:else}
      <h1>Today's Session</h1>
  
      {#if !$timerStore.isActive}
        <AddSessionForm
          bind:bindSubject={subject}
          bind:bindNotes={notes}
          onStart={startSession}
        />
      {:else}
        <div class="timer-container">
          <h2>Time Elapsed: {timerDisplay}</h2>
          <Loader />
          <button on:click={endSession} class="neon-button end-button">End Session</button>
        </div>
      {/if}
    {/if}
  
    {#if $toast.visible}
      <div class="toast {$toast.type}">
        {$toast.message}
      </div>
    {/if}
  </div>
  
  <style scoped>
    .container {
      padding: 2rem;
      background: #000;
      color: #ccc;
      min-height: 100vh;
      text-align: center;
      position: relative;
    }
  
    h1 {
      color: #00FF00;
      font-size: 2rem;
      margin-bottom: 2rem;
    }
  
    .timer-container {
      margin: 2rem 0;
    }
  
    .timer-container h2 {
      color: #00FF00;
      font-size: 2.5rem;
      margin-bottom: 1rem;
    }
  
    .end-button {
      border-color: #FF0000;
      color: #FF0000;
    }
  
    .end-button:hover {
      background-color: #FF0000;
      color: #000;
    }
  
    .toast {
      position: fixed;
      bottom: 2rem;
      left: 50%;
      transform: translateX(-50%);
      padding: 1rem 2rem;
      border-radius: 8px;
      color: #000;
      font-weight: bold;
      z-index: 1000;
      opacity: 0.9;
      transition: opacity 0.3s;
    }
  
    .toast.success {
      background-color: #00FF00;
    }
  
    .toast.error {
      background-color: #FF0000;
    }
  </style>
  