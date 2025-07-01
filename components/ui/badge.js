// Badge component based on shadcn/ui
class Badge extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.variant = this.getAttribute('variant') || 'default';
    this.isAnimated = false; // Thêm flag để theo dõi trạng thái animation
    this.render();
  }

  static get observedAttributes() {
    return ['variant'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'variant' && oldValue !== newValue) {
      this.variant = newValue || 'default';
      this.render(true); // Truyền tham số để giữ lại trạng thái animation
    }
  }

  connectedCallback() {
    document.addEventListener('themechange', this.updateTheme.bind(this));
    this.checkTheme();
    
    // Thêm animation khi component được kết nối vào DOM
    setTimeout(() => {
      this.isAnimated = true;
      const badge = this.shadowRoot.querySelector('.badge');
      if (badge) {
        badge.classList.add('animated');
      }
    }, 100);
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
    const isDark = document.documentElement.classList.contains('dark') || 
                   localStorage.getItem('theme') === 'dark' ||
                   window.matchMedia('(prefers-color-scheme: dark)').matches;
    this.shadowRoot.host.classList.toggle('dark', isDark);
  }

  render(keepAnimation = false) {
    const animatedClass = (keepAnimation && this.isAnimated) ? 'animated' : '';
    
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: inline-flex;
        }
        
        .badge {
          display: inline-flex;
          align-items: center;
          border-radius: 9999px;
          padding: 0.25rem 0.75rem;
          font-size: 0.75rem;
          font-weight: 600;
          line-height: 1.25;
          white-space: nowrap;
          box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          letter-spacing: 0.025em;
          text-transform: uppercase;
          opacity: ${animatedClass ? '1' : '0'};
          transform: ${animatedClass ? 'scale(1)' : 'scale(0.9)'};
        }
        
        .badge.animated {
          opacity: 1;
          transform: scale(1);
          animation: badgePop 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        
        @keyframes badgePop {
          0% {
            opacity: 0;
            transform: scale(0.8);
          }
          70% {
            opacity: 1;
            transform: scale(1.05);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }
        
        .badge:hover {
          transform: translateY(-1px) scale(1.03);
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.15);
        }
        
        /* Default variant */
        .badge.default {
          background-color: hsl(215.4, 16.3%, 46.9%);
          color: hsl(0, 0%, 100%);
        }
        
        /* Primary variant */
        .badge.primary {
          background-color: hsl(221.2, 83.2%, 53.3%);
          color: hsl(210, 40%, 98%);
          box-shadow: 0 1px 3px rgba(37, 99, 235, 0.3);
        }
        
        .badge.primary:hover {
          box-shadow: 0 2px 5px rgba(37, 99, 235, 0.4);
        }
        
        /* Secondary variant */
        .badge.secondary {
          background-color: hsl(210, 40%, 96.1%);
          color: hsl(222.2, 47.4%, 11.2%);
          border: 1px solid hsl(214.3, 31.8%, 91.4%);
        }
        
        /* Destructive variant */
        .badge.destructive {
          background-color: hsl(0, 84.2%, 60.2%);
          color: hsl(210, 40%, 98%);
          box-shadow: 0 1px 3px rgba(220, 38, 38, 0.3);
        }
        
        .badge.destructive:hover {
          box-shadow: 0 2px 5px rgba(220, 38, 38, 0.4);
        }
        
        /* Outline variant */
        .badge.outline {
          background-color: transparent;
          color: hsl(215.4, 16.3%, 46.9%);
          border: 1px solid hsl(215.4, 16.3%, 46.9%);
          box-shadow: none;
        }
        
        .badge.outline:hover {
          background-color: rgba(0, 0, 0, 0.05);
        }
        
        /* Success variant */
        .badge.success {
          background-color: hsl(142, 76%, 36%);
          color: hsl(0, 0%, 100%);
          box-shadow: 0 1px 3px rgba(22, 163, 74, 0.3);
        }
        
        .badge.success:hover {
          box-shadow: 0 2px 5px rgba(22, 163, 74, 0.4);
        }
        
        /* Warning variant */
        .badge.warning {
          background-color: hsl(48, 96%, 53%);
          color: hsl(0, 0%, 10%);
          box-shadow: 0 1px 3px rgba(234, 179, 8, 0.3);
        }
        
        .badge.warning:hover {
          box-shadow: 0 2px 5px rgba(234, 179, 8, 0.4);
        }
        
        /* Dark mode variants */
        :host(.dark) .badge.default {
          background-color: hsl(215, 20.2%, 65.1%);
          color: hsl(222.2, 84%, 4.9%);
        }
        
        :host(.dark) .badge.primary {
          background-color: hsl(217.2, 91.2%, 59.8%);
          color: hsl(222.2, 47.4%, 11.2%);
          box-shadow: 0 1px 3px rgba(59, 130, 246, 0.4);
        }
        
        :host(.dark) .badge.primary:hover {
          box-shadow: 0 2px 5px rgba(59, 130, 246, 0.5);
        }
        
        :host(.dark) .badge.secondary {
          background-color: hsl(217.2, 32.6%, 17.5%);
          color: hsl(210, 40%, 98%);
          border: 1px solid hsl(217.2, 32.6%, 22%);
        }
        
        :host(.dark) .badge.destructive {
          background-color: hsl(0, 62.8%, 30.6%);
          color: hsl(210, 40%, 98%);
          box-shadow: 0 1px 3px rgba(248, 113, 113, 0.4);
        }
        
        :host(.dark) .badge.destructive:hover {
          box-shadow: 0 2px 5px rgba(248, 113, 113, 0.5);
        }
        
        :host(.dark) .badge.outline {
          color: hsl(215, 20.2%, 65.1%);
          border-color: hsl(215, 20.2%, 65.1%);
        }
        
        :host(.dark) .badge.outline:hover {
          background-color: rgba(255, 255, 255, 0.05);
        }
        
        :host(.dark) .badge.success {
          background-color: hsl(142, 76%, 36%);
          color: hsl(0, 0%, 100%);
          box-shadow: 0 1px 3px rgba(34, 197, 94, 0.4);
        }
        
        :host(.dark) .badge.success:hover {
          box-shadow: 0 2px 5px rgba(34, 197, 94, 0.5);
        }
        
        :host(.dark) .badge.warning {
          background-color: hsl(48, 96%, 53%);
          color: hsl(0, 0%, 10%);
          box-shadow: 0 1px 3px rgba(250, 204, 21, 0.4);
        }
        
        :host(.dark) .badge.warning:hover {
          box-shadow: 0 2px 5px rgba(250, 204, 21, 0.5);
        }
      </style>
      <span class="badge ${this.variant} ${animatedClass}">
        <slot></slot>
      </span>
    `;
    
    // Nếu đã animated trước đó, đảm bảo badge hiển thị ngay lập tức
    if (this.isAnimated && !animatedClass) {
      setTimeout(() => {
        const badge = this.shadowRoot.querySelector('.badge');
        if (badge) {
          badge.classList.add('animated');
        }
      }, 10);
    }
  }
}

customElements.define('ui-badge', Badge); 