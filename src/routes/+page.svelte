<script>
    import { onMount } from "svelte";
    import { getSessions } from "../lib/services/sessions";
    import QuoteBanner from "../lib/components/QuoteBanner.svelte";
    import Loader from '../lib/components/Loader.svelte';
    import Card from '../lib/components/Card.svelte';
    import Clock from '../lib/components/Clock.svelte';
    import DateDisplay from '../lib/components/DateDisplay.svelte'; 
  
    let weekStart = "";
    let weekEnd = "";
    let totalSessions = 0;
    let totalUniqueSubjects = 0;
    let totalStudySeconds = 0;
    let loading = true;
  
    function updateWeekRange() {
      const today = new Date();
      const firstDay = new Date(today.setDate(today.getDate() - today.getDay()));
      const lastDay = new Date(today.setDate(today.getDate() - today.getDay() + 6));
      weekStart = firstDay.toLocaleDateString("en-GB");
      weekEnd = lastDay.toLocaleDateString("en-GB");
    }
  
    async function fetchDashboardData() {
      try {
        const sessions = await getSessions();
  
        const today = new Date();
        const startOfWeek = new Date(today.setDate(today.getDate() - today.getDay()));
        startOfWeek.setHours(0, 0, 0, 0);
  
        const endOfWeek = new Date(today.setDate(today.getDate() - today.getDay() + 6));
        endOfWeek.setHours(23, 59, 59, 999);
  
        const weeklySessions = sessions.filter((session) => {
          const sessionDate = new Date(session.date);
          return sessionDate >= startOfWeek && sessionDate <= endOfWeek;
        });
  
        totalSessions = weeklySessions.length;
        totalUniqueSubjects = new Set(weeklySessions.map((session) => session.subject)).size;
        totalStudySeconds = weeklySessions.reduce(
          (sum, session) => sum + Number(session.duration || 0) * 3600,
          0
        );
      } finally {
        loading = false;
      }
    }
  
    $: formattedTimeStudied = (() => {
      const hours = Math.floor(totalStudySeconds / 3600).toString().padStart(2, '0');
      const minutes = Math.floor((totalStudySeconds % 3600) / 60).toString().padStart(2, '0');
      const seconds = (totalStudySeconds % 60).toString().padStart(2, '0');
      return `${hours}:${minutes}:${seconds}`;
    })();
  
    onMount(() => {
      updateWeekRange();
      fetchDashboardData();
    });
  </script>
  
  <main class="dashboard">
    {#if loading}
      <Loader />
    {:else}
      <div class="clock">
        <Clock />
        <DateDisplay />
      </div>
  
      <QuoteBanner />
  
      <div class="week-summary">
        <p>Data for the week: {weekStart} - {weekEnd}</p>
      </div>
  
      <div class="stats-cards">
        <Card title="Total Sessions" value={totalSessions} />
        <Card title="Subjects Covered" value={totalUniqueSubjects} />
        <Card title="Total Time Studied" value={formattedTimeStudied} />
      </div>
    {/if}
  </main>
  
  <style scoped>
    .dashboard {
      text-align: center;
      padding: 2rem;
      background: #000;
      color: #ccc;
      min-height: 100vh;
    }
  
    .clock {
      margin-bottom: 1rem;
    }
  
    .week-summary {
      margin-top: 2rem;
      font-size: 1.2rem;
      color: #00ff00;
    }
  
    .stats-cards {
      margin-top: 2rem;
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      gap: 2rem;
    }
  </style>
  