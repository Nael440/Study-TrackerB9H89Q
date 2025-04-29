<script>
  import { onMount } from 'svelte';
  import { fetchRandomQuote } from '../services/quotes';

  let quote = "Loading...";

  async function loadQuote() {
    quote = await fetchRandomQuote();
  }

  onMount(() => {
    loadQuote();
  });
</script>

<div class="banner">
  <p>{quote}</p>
</div>

<style scoped>
  .banner {
    padding: 1rem;
    background: linear-gradient(to right, #00ff00, #00ff99);
    margin: 1.5rem 0;
    border-radius: 12px;
    text-align: center;
    font-style: italic;
    font-size: 1.2rem;
    font-weight: 500;
    color: black;
    box-shadow: 0 4px 15px rgba(0, 255, 0, 0.5);
  }
</style>
