// Theme toggle component
class ThemeToggle extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.render();
    this.setupEventListeners();
  }

  connectedCallback() {
    this.updateIcon();
  }

  setupEventListeners() {
    this.button = this.shadowRoot.querySelector('button');
    this.button.addEventListener('click', () => this.toggleTheme());
  }

  toggleTheme() {
    const isDark = document.documentElement.classList.toggle('dark');
    this.saveThemeSetting(isDark ? 'dark' : 'light');
    this.updateIcon();
  }

  updateIcon() {
    const isDark = document.documentElement.classList.contains('dark');
    const lightIcon = this.shadowRoot.querySelector('.light-icon');
    const darkIcon = this.shadowRoot.querySelector('.dark-icon');

    if (isDark) {
      darkIcon.style.display = 'none';
      lightIcon.style.display = 'block';
    } else {
      darkIcon.style.display = 'block';
      lightIcon.style.display = 'none';
    }
  }

  saveThemeSetting(theme) {
    if (chrome && chrome.storage) {
      chrome.storage.sync.set({ theme });
    }
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: inline-block;
          --foreground: #3d3c4f;
          --accent: #dfd9ec;
        }
        
        :host-context(.dark) {
          --foreground: #e0ddef;
          --accent: #5a5370;
        }
        
        button {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 32px;
          height: 32px;
          border-radius: 0.5rem;
          background-color: transparent;
          color: var(--foreground);
          cursor: pointer;
          border: none;
          padding: 0;
          transition: background-color 0.2s;
          position: relative;
        }
        
        button:hover {
          background-color: var(--accent);
        }
        
        svg {
          width: 20px;
          height: 20px;
        }
        
        .light-icon {
          display: none;
        }
      </style>
      
      <button aria-label="Toggle theme">
        <svg class="dark-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
        </svg>
        <svg class="light-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="5"></circle>
          <line x1="12" y1="1" x2="12" y2="3"></line>
          <line x1="12" y1="21" x2="12" y2="23"></line>
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
          <line x1="1" y1="12" x2="3" y2="12"></line>
          <line x1="21" y1="12" x2="23" y2="12"></line>
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
        </svg>
      </button>
    `;
  }
}

customElements.define('theme-toggle', ThemeToggle); 