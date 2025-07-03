// Badge component based on shadcn/ui
class UiBadge extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.render();
  }

  static get observedAttributes() {
    return ['variant'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'variant' && oldValue !== newValue) {
      this.render();
    }
  }

  render() {
    const variant = this.getAttribute('variant') || 'default';
    const content = this.textContent || this.innerHTML;

    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: inline-block;
          --secondary: #dfd9ec;
          --secondary-foreground: #3d3c4f;
          --primary: #8a79ab;
          --primary-foreground: #f8f7fa;
          --success: #77B8A1;
          --warning: #F0C88D;
          --destructive: #d95c5c;
        }
        
        :host-context(.dark) {
          --secondary: #5a5370;
          --secondary-foreground: #e0ddef;
          --primary: #a995c9;
          --primary-foreground: #1a1823;
          --success: #77B8A1;
          --warning: #F0C88D;
          --destructive: #e57373;
        }
        
        .ext-badge {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          font-size: 12px;
          font-weight: 500;
          padding: 0 8px;
          height: 20px;
          border-radius: 10px;
          line-height: 1;
          white-space: nowrap;
          transition: all 0.2s ease;
        }
        
        .ext-badge-default {
          background-color: var(--secondary);
          color: var(--secondary-foreground);
        }
        
        .ext-badge-primary {
          background-color: var(--primary);
          color: var(--primary-foreground);
        }
        
        .ext-badge-success {
          background-color: rgba(119, 184, 161, 0.1);
          color: var(--success);
        }
        
        .ext-badge-warning {
          background-color: rgba(240, 200, 141, 0.1);
          color: var(--warning);
        }
        
        .ext-badge-danger {
          background-color: rgba(217, 92, 92, 0.1);
          color: var(--destructive);
        }
      </style>
      
      <span class="ext-badge ext-badge-${variant}">${content}</span>
    `;
  }
}

customElements.define('ui-badge', UiBadge); 