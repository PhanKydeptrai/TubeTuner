// Card component based on shadcn/ui
class Card extends HTMLElement {
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
          --card-bg: hsl(0, 0%, 100%);
          --card-border: hsl(214.3, 31.8%, 91.4%);
          --card-radius: 0.5rem;
          --card-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
          --card-shadow-hover: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
        }
        
        :host(.dark) {
          --card-bg: hsl(222.2, 84%, 4.9%);
          --card-border: hsl(217.2, 32.6%, 17.5%);
          --card-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.5), 0 2px 4px -1px rgba(0, 0, 0, 0.3);
          --card-shadow-hover: 0 10px 15px -3px rgba(0, 0, 0, 0.5), 0 4px 6px -2px rgba(0, 0, 0, 0.3);
        }
        
        .card {
          background-color: var(--card-bg);
          border-radius: var(--card-radius);
          border: 1px solid var(--card-border);
          box-shadow: var(--card-shadow);
          overflow: hidden;
          transition: transform 0.2s, box-shadow 0.2s;
        }
        
        .card:hover {
          transform: translateY(-2px);
          box-shadow: var(--card-shadow-hover);
        }
        
        ::slotted(*) {
          margin: 0;
        }
      </style>
      <div class="card">
        <slot></slot>
      </div>
    `;
  }
}

class CardHeader extends HTMLElement {
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
        
        .card-header {
          display: flex;
          flex-direction: column;
          padding: 1.5rem 1.5rem 0.5rem 1.5rem;
        }
        
        ::slotted(*) {
          margin: 0;
        }
      </style>
      <div class="card-header">
        <slot></slot>
      </div>
    `;
  }
}

class CardTitle extends HTMLElement {
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
          --title-color: hsl(222.2, 84%, 4.9%);
        }
        
        :host-context(.dark) {
          --title-color: hsl(210, 40%, 98%);
        }
        
        .card-title {
          color: var(--title-color);
          font-size: 1.125rem;
          font-weight: 600;
          line-height: 1.5;
        }
      </style>
      <h3 class="card-title">
        <slot></slot>
      </h3>
    `;
  }
}

class CardDescription extends HTMLElement {
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
          --desc-color: hsl(215.4, 16.3%, 46.9%);
        }
        
        :host-context(.dark) {
          --desc-color: hsl(215, 20.2%, 65.1%);
        }
        
        .card-description {
          color: var(--desc-color);
          font-size: 0.875rem;
          line-height: 1.5;
          margin-top: 0.25rem;
        }
      </style>
      <p class="card-description">
        <slot></slot>
      </p>
    `;
  }
}

class CardContent extends HTMLElement {
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
        }
        
        .card-content {
          padding: 1rem 1.5rem;
        }
      </style>
      <div class="card-content">
        <slot></slot>
      </div>
    `;
  }
}

class CardFooter extends HTMLElement {
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
          --footer-border: hsl(214.3, 31.8%, 91.4%);
        }
        
        :host-context(.dark) {
          --footer-border: hsl(217.2, 32.6%, 17.5%);
        }
        
        .card-footer {
          display: flex;
          align-items: center;
          justify-content: flex-end;
          padding: 1rem 1.5rem;
          border-top: 1px solid var(--footer-border);
        }
      </style>
      <div class="card-footer">
        <slot></slot>
      </div>
    `;
  }
}

customElements.define('ui-card', Card);
customElements.define('card-header', CardHeader);
customElements.define('card-title', CardTitle);
customElements.define('card-description', CardDescription);
customElements.define('card-content', CardContent);
customElements.define('card-footer', CardFooter); 