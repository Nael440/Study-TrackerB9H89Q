<script>
    import { createEventDispatcher } from 'svelte';
    import { fade, slide } from 'svelte/transition';
    import { cubicOut } from 'svelte/easing';
  
    export let session;
    let expanded = false;
    let isEditing = false;
    let editedSession = { ...session };
  
    const dispatch = createEventDispatcher();
  
    function toggle() {
      expanded = !expanded;
    }
  
    function formatDuration(seconds) {
      const totalSeconds = Math.floor(seconds * 3600);
      const hours = Math.floor(totalSeconds / 3600).toString().padStart(2, '0');
      const minutes = Math.floor((totalSeconds % 3600) / 60).toString().padStart(2, '0');
      const secs = (totalSeconds % 60).toString().padStart(2, '0');
      return `${hours}:${minutes}:${secs}`;
    }
  
    function handleDelete() {
      dispatch('delete');
    }
  
    function handleEdit() {
      isEditing = true;
    }
  
    function handleSave() {
      dispatch('edit', editedSession);
      isEditing = false;
    }
  
    function handleCancel() {
      isEditing = false;
      editedSession = { ...session };
    }
  </script>
  
  <div class="accordion" transition:fade={{ duration: 200, easing: cubicOut }}>
    <!-- svelte-ignore a11y_click_events_have_key_events -->
    <!-- svelte-ignore a11y_no_static_element_interactions -->
    <div class="accordion-header" on:click={toggle}>
      <h3>{session.displayName}</h3>
      <span class="toggle-icon">{expanded ? '−' : '+'}</span>
    </div>
  
    {#if expanded}
      <div class="accordion-content" transition:slide={{ duration: 300, easing: cubicOut }}>
        {#if isEditing}
          <div class="edit-form">
            <label>
              Subject:
              <input type="text" bind:value={editedSession.subject} />
            </label>
            <label>
              Notes:
              <textarea bind:value={editedSession.notes}></textarea>
            </label>
            <label>
              Duration (hours):
              <input type="number" step="0.1" bind:value={editedSession.duration} />
            </label>
            <div class="edit-buttons">
              <button class="save" on:click={handleSave}>Save</button>
              <button class="cancel" on:click={handleCancel}>Cancel</button>
            </div>
          </div>
        {:else}
          <p><strong>Subject:</strong> {session.subject}</p>
          <p><strong>Notes:</strong> {session.notes}</p>
          <p><strong>Duration:</strong> {formatDuration(session.duration)}</p>
          <div class="action-buttons">
            <button class="edit" on:click={handleEdit}>Edit</button>
            <button class="delete" on:click={handleDelete}>Delete</button>
          </div>
        {/if}
      </div>
    {/if}
  </div>
  
  <style>
    .accordion {
      margin: 1rem 0;
      border: 1px solid #00ff00;
      border-radius: 8px;
      background: #111;
      overflow: hidden;
    }
  
    .accordion-header {
      padding: 1rem;
      cursor: pointer;
      transition: background 0.3s;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
  
    .accordion-header:hover {
      background: #222;
    }
  
    .accordion-header h3 {
      margin: 0;
      color: #00ff00;
      font-size: 1.2rem;
    }
  
    .toggle-icon {
      color: #00ff00;
      font-size: 1.5rem;
    }
  
    .accordion-content {
      padding: 1rem;
      border-top: 1px solid #00ff00;
    }
  
    .accordion-content p {
      margin: 0.5rem 0;
      color: #ccc;
    }
  
    .accordion-content p strong {
      color: #00ff00;
    }
  
    .edit-form {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }
  
    .edit-form label {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      color: #ccc;
    }
  
    .edit-form input,
    .edit-form textarea {
      background: #222;
      border: 1px solid #00ff00;
      color: #ccc;
      padding: 0.5rem;
      border-radius: 4px;
    }
  
    .edit-form textarea {
      min-height: 100px;
      resize: vertical;
    }
  
    .action-buttons,
    .edit-buttons {
      display: flex;
      gap: 1rem;
      margin-top: 1rem;
    }
  
    button {
      padding: 0.5rem 1rem;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      transition: background 0.3s;
    }
  
    .edit {
      background: #00ff00;
      color: #000;
    }
  
    .edit:hover {
      background: #00cc00;
    }
  
    .delete {
      background: #ff3333;
      color: #fff;
    }
  
    .delete:hover {
      background: #cc0000;
    }
  
    .save {
      background: #00ff00;
      color: #000;
    }
  
    .save:hover {
      background: #00cc00;
    }
  
    .cancel {
      background: #666;
      color: #fff;
    }
  
    .cancel:hover {
      background: #555;
    }
  </style>