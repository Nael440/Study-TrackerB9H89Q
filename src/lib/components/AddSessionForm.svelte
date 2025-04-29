<script>
  export let onStart;
  export let bindSubject;
  export let bindNotes;
</script>

<form class="form">
  <input
    type="text"
    placeholder="Subject"
    bind:value={bindSubject}
    class="input"
  />
  <textarea
    placeholder="Notes (topics to cover)"
    bind:value={bindNotes}
    class="input"
  ></textarea>
  <button type="button" on:click={onStart} class="neon-button">
    Start Session
  </button>
</form>

<style scoped>
  .form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin: 2rem auto;
    max-width: 500px;
  }

  .input {
    padding: 0.8rem;
    border: 1px solid #00FF00;
    background: #000;
    color: #ccc;
    border-radius: 8px;
    font-size: 1rem;
  }

  .neon-button {
    background: transparent;
    border: 2px solid #00FF00;
    color: #00FF00;
    padding: 0.7rem 1.5rem;
    font-weight: bold;
    border-radius: 8px;
    transition: background-color 0.3s, color 0.3s;
    cursor: pointer;
  }

  .neon-button:hover {
    background-color: #00FF00;
    color: #000;
  }
</style>
