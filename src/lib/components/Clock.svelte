<script>
    import { onMount } from 'svelte';
    let time = '';
  
    function updateTime() {
      const now = new Date();
      time = now.toLocaleTimeString('en-US', { hour12: false });
    }
  
    onMount(() => {
      updateTime();
      const interval = setInterval(updateTime, 1000);
      return () => clearInterval(interval);
    });
  </script>
  
  <div class="clock-wrapper">
    <div class="clock-display">
      {time}
    </div>
  </div>
  
  <style scoped>
    .clock-wrapper {
      display: flex;
      justify-content: center;
      align-items: center;
      margin: 2rem auto;
      padding: 1.5rem 2.5rem;
      background-color: #1a1a1a;
      border-radius: 16px;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
      width: fit-content;
    }
  
    .clock-display {
      font-family: 'Courier New', monospace;
      font-size: 3rem;
      color: #ffffff;
      background: linear-gradient(90deg, #00ffe0, #00ff94);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      letter-spacing: 0.1em;
      user-select: none;
      transition: transform 0.2s ease;
    }
  
    .clock-display:hover {
      transform: scale(1.05);
    }
  </style>
  