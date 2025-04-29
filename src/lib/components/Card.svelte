<script>
    export let title;
    export let value;
  </script>
  
  <div class="card">
    <h3>{title}</h3>
    <p>{value}</p>
  </div>
  
  <style scoped>
    .card {
      background: #111;
      border: 1px solid #00ff00;
      border-radius: 12px;
      padding: 2rem;
      width: 250px;
      box-shadow: 0 0 10px #00ff00;
      transition: transform 0.3s ease;
    }
  
    .card:hover {
      transform: translateY(-5px);
      box-shadow: 0 0 20px #00ff00;
    }
  
    .card h3 {
      font-size: 1.5rem;
      color: #00ff00;
      margin-bottom: 1rem;
    }
  
    .card p {
      font-size: 2rem;
      color: #ccc;
      margin: 0;
    }
  </style>
  