<script>
  import { page } from '$app/stores';
  let isMenuOpen = false;

  function toggleMenu() {
    isMenuOpen = !isMenuOpen;
  }
</script>

<nav class="navbar">
  <a href="/" class="logo">Study Tracker</a>
  <button class="hamburger" on:click={toggleMenu} aria-label="Toggle menu">
    <span></span>
    <span></span>
    <span></span>
  </button>
  <div class="nav-links" class:open={isMenuOpen}>
    <a href="/" class:selected={$page.url.pathname === '/'} on:click={toggleMenu}>Home</a>
    <a href="/today-session" class:selected={$page.url.pathname === '/today-session'} on:click={toggleMenu}>Today's Session</a>
    <a href="/past-sessions" class:selected={$page.url.pathname === '/past-sessions'} on:click={toggleMenu}>Past Sessions</a>
  </div>
</nav>

<style scoped>
  .navbar {
    background: #000;
    padding: 1rem 2rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #00FF00;
  }

  .logo {
    color: #00FF00;
    font-size: 1.8rem;
    font-weight: bold;
    text-decoration: none;
  }

  .nav-links {
    display: flex;
    align-items: center;
  }

  .nav-links a {
    color: #ccc;
    margin-left: 2rem;
    text-decoration: none;
    font-size: 1.1rem;
    transition: color 0.3s;
  }

  .nav-links a:hover,
  .nav-links a.selected {
    color: #00FF00;
  }

  .hamburger {
    display: none;
    background: none;
    border: none;
    cursor: pointer;
    padding: 0.5rem;
    z-index: 1000;
  }

  .hamburger span {
    display: block;
    width: 25px;
    height: 3px;
    background: #00FF00;
    margin: 5px 0;
    transition: all 0.3s ease;
  }

  .hamburger span:nth-child(2) {
    opacity: 1;
  }

  .hamburger span:nth-child(1) {
    transform: none;
  }

  .hamburger span:nth-child(3) {
    transform: none;
  }

  @media (max-width: 768px) {
    .hamburger {
      display: block;
    }

    .nav-links {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100vh;
      background: #000;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      transform: translateX(100%);
      transition: transform 0.3s ease-in-out;
      z-index: 999;
    }

    .nav-links.open {
      transform: translateX(0);
    }

    .nav-links a {
      margin: 1.5rem 0;
      font-size: 1.5rem;
    }
  }

  @media (max-width: 480px) {
    .navbar {
      padding: 1rem;
    }

    .logo {
      font-size: 1.5rem;
    }
  }
</style>