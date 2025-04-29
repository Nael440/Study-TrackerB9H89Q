<!-- routes past-sessions +page.svelte -->
<script>
    import { getSessions, deleteSession, updateSession } from '../../lib/services/sessions';
    import { onMount } from 'svelte';
    import Loader from '../../lib/components/Loader.svelte';
    import Accordion from '../../lib/components/Accordian.svelte';
  
    let sessions = [];
    let loading = true;
  
    onMount(async () => {
      sessions = await getSessions();
      sessions = groupSessionsByDate(sessions);
      loading = false;
    });
  
    // Group sessions by date and assign numbered names
    function groupSessionsByDate(sessions) {
      const grouped = {};
      sessions.forEach(session => {
        const date = new Date(session.date).toDateString();
        if (!grouped[date]) grouped[date] = [];
        grouped[date].push(session);
      });
  
      return Object.entries(grouped)
        .flatMap(([date, sessions]) =>
          sessions
            .sort((a, b) => new Date(b.date) - new Date(a.date))
            .map((session, index) => ({
              ...session,
              displayName: `${date} - Session ${index + 1}`
            }))
        )
        .sort((a, b) => new Date(b.date) - new Date(a.date));
    }
  
    async function handleDelete(sessionId) {
      await deleteSession(sessionId);
      sessions = sessions.filter(session => session.id !== sessionId);
    }
  
    async function handleEdit(sessionId, updatedData) {
      const updatedSession = await updateSession(sessionId, updatedData);
      sessions = sessions.map(session =>
        session.id === sessionId ? { ...session, ...updatedSession } : session
      );
    }
  </script>
  
  <div class="container">
    {#if loading}
      <Loader />
    {:else}
      <h1>Past Sessions</h1>
  
      {#if sessions.length > 0}
        {#each sessions as session (session.id)}
          <Accordion
            {session}
            on:delete={() => handleDelete(session.id)}
            on:edit={e => handleEdit(session.id, e.detail)}
          />
        {/each}
      {:else}
        <div class="empty-state">
          <h2>No Past Sessions</h2>
          <p>Start a session to see your progress here!</p>
        </div>
      {/if}
    {/if}
  </div>
  
  
  <style scoped>
    .container {
      padding: 2rem;
      background: #000;
      color: #ccc;
      min-height: 100vh;
    }
  
    h1 {
      color: #00ff00;
      font-size: 2rem;
      text-align: center;
      margin-bottom: 2rem;
    }
  
    .empty-state {
      text-align: center;
      margin-top: 4rem;
      color: #888;
      background: #111;
      padding: 2rem;
      border-radius: 10px;
      max-width: 500px;
      margin-left: auto;
      margin-right: auto;
      border: 1px solid #00ff00;
      box-shadow: 0 0 15px rgba(0, 255, 0, 0.2);
    }
  
    .empty-state h2 {
      color: #00ff00;
      font-size: 1.8rem;
      margin-bottom: 0.5rem;
    }
  
    .empty-state p {
      font-size: 1rem;
      color: #aaa;
    }
  </style>
  