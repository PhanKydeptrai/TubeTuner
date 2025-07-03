// Card component based on shadcn/ui
class UiCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.render();
  }

  connectedCallback() {
    document.addEventListener('themechange', this.updateTheme.bind(this));
    this.checkTheme();
  }

  disconnectedCallback() {
    document.removeEventListener('themechange', this.updateTheme.bind(this));
  }

  updateTheme(e) {
    if (e && e.detail) {
      const isDark = e.detail.theme === 'dark';
      this.shadowRoot.host.classList.toggle('dark', isDark);
    }
  }

  checkTheme() {
    // Ưu tiên sử dụng giá trị từ localStorage thay vì system preference
    const savedTheme = localStorage.getItem('theme');
    let isDark = false;
    
    if (savedTheme) {
      isDark = savedTheme === 'dark';
    } else {
      isDark = document.documentElement.classList.contains('dark') || 
               window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    
    this.shadowRoot.host.classList.toggle('dark', isDark);
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          --card: #ffffff;
          --border: #cec9d9;
        }
        
        :host-context(.dark) {
          --card: #232030;
          --border: #302c40;
        }
        
        .ext-card {
          background-color: var(--card);
          border-radius: var(--radius, 0.5rem);
          border: 1px solid var(--border);
          overflow: hidden;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
          transition: all 0.2s ease;
        }
      </style>
      
      <div class="ext-card">
        <slot></slot>
      </div>
    `;
  }
}

class CardContent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.render();
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
        }
        
        .ext-card-content {
          padding: 1.5rem;
        }
      </style>
      
      <div class="ext-card-content">
        <slot></slot>
      </div>
    `;
  }
}

customElements.define('ui-card', UiCard);
customElements.define('card-content', CardContent); 