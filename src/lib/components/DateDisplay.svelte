<script>
    let dateToday = '';
  
    const now = new Date();
    dateToday = now.toLocaleDateString('en-US', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  </script>
  
  <div class="glass-date">
    <span>{dateToday}</span>
  </div>
  
  <style scoped>
    .glass-date {
      padding: 1rem 2rem;
      border-radius: 16px;
      background: rgba(255, 255, 255, 0.05);
      border: 1px solid rgba(255, 255, 255, 0.15);
      backdrop-filter: blur(8px);
      -webkit-backdrop-filter: blur(8px);
      box-shadow: 0 4px 30px rgba(0, 255, 0, 0.1);
      display: inline-block;
      margin-top: 1rem;
    }
  
    .glass-date span {
      color: #e0e0e0;
      font-size: 1.2rem;
      font-weight: 400;
      letter-spacing: 0.02em;
      font-family: 'Inter', 'Segoe UI', sans-serif;
    }
  </style>
  