// Switch component based on shadcn/ui
class Switch extends HTMLElement {
  constructor() {
    super();
    this.active = false;
    this.attachShadow({ mode: 'open' });
    this.isAnimated = false; // Thêm flag để theo dõi trạng thái animation
    this.render();
  }

  static get observedAttributes() {
    return ['active'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'active') {
      this.active = newValue !== null;
      this.render(true); // Truyền tham số để giữ lại trạng thái animation
    }
  }

  connectedCallback() {
    this.addEventListener('click', this.toggle.bind(this));
    document.addEventListener('themechange', this.updateTheme.bind(this));
    this.checkTheme();
    
    // Thêm animation khi component được kết nối vào DOM
    setTimeout(() => {
      this.isAnimated = true;
      const switchEl = this.shadowRoot.querySelector('.switch');
      if (switchEl) {
        switchEl.classList.add('animated');
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

  toggle() {
    this.active = !this.active;
    
    // Thêm hiệu ứng ripple khi click
    const switchEl = this.shadowRoot.querySelector('.switch');
    if (switchEl) {
      const ripple = document.createElement('span');
      ripple.classList.add('ripple');
      switchEl.appendChild(ripple);
      
      setTimeout(() => {
        ripple.remove();
      }, 600);
    }
    
    this.dispatchEvent(new CustomEvent('change', { 
      detail: { active: this.active },
      bubbles: true
    }));
    
    // Cập nhật trạng thái active mà không render lại toàn bộ component
    if (switchEl) {
      switchEl.classList.toggle('active', this.active);
      const thumb = switchEl.querySelector('.thumb');
      if (thumb) {
        // Không cần làm gì vì CSS sẽ tự xử lý
      }
    } else {
      this.render(true); // Nếu không tìm thấy switch element, render lại toàn bộ
    }
  }

  render(keepAnimation = false) {
    const activeClass = this.active ? 'active' : '';
    const animatedClass = (keepAnimation && this.isAnimated) ? 'animated' : '';
    
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: inline-block;
        }
        
        .switch {
          position: relative;
          width: 44px;
          height: 24px;
          background-color: var(--switch-bg, hsl(215.4, 16.3%, 46.9%, 0.2));
          border-radius: 24px;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          border: 1px solid var(--switch-border, rgba(0, 0, 0, 0.1));
          overflow: hidden;
          opacity: ${animatedClass ? '1' : '0'};
          transform: ${animatedClass ? 'translateX(0)' : 'translateX(10px)'};
        }
        
        .switch.animated {
          opacity: 1;
          transform: translateX(0);
          transition: opacity 0.3s ease, transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        
        .switch:hover {
          background-color: var(--switch-hover-bg, hsl(215.4, 16.3%, 46.9%, 0.3));
        }
        
        .switch.active {
          background-color: var(--switch-active-bg, hsl(221.2, 83.2%, 53.3%));
          border-color: var(--switch-active-border, hsl(221.2, 83.2%, 48%));
        }
        
        .switch.active:hover {
          background-color: var(--switch-active-hover-bg, hsl(221.2, 83.2%, 48%));
        }
        
        .thumb {
          position: absolute;
          top: 2px;
          left: 2px;
          width: 18px;
          height: 18px;
          background-color: var(--switch-thumb-bg, white);
          border-radius: 50%;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
          transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1), background-color 0.3s;
        }
        
        .switch.active .thumb {
          transform: translateX(20px);
          background-color: var(--switch-active-thumb, white);
        }
        
        .ripple {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 5px;
          height: 5px;
          background-color: rgba(255, 255, 255, 0.7);
          border-radius: 50%;
          transform: translate(-50%, -50%) scale(1);
          opacity: 0.8;
          animation: rippleEffect 0.6s ease-out;
        }
        
        @keyframes rippleEffect {
          0% {
            transform: translate(-50%, -50%) scale(1);
            opacity: 0.8;
          }
          100% {
            transform: translate(-50%, -50%) scale(20);
            opacity: 0;
          }
        }
        
        /* Dark mode styles */
        @media (prefers-color-scheme: dark) {
          .switch {
            --switch-bg: hsl(215.4, 16.3%, 56.9%, 0.2);
            --switch-hover-bg: hsl(215.4, 16.3%, 56.9%, 0.3);
            --switch-active-bg: hsl(217.2, 91.2%, 59.8%);
            --switch-active-hover-bg: hsl(217.2, 91.2%, 54.8%);
            --switch-thumb-bg: hsl(0, 0%, 93%);
            --switch-border: rgba(255, 255, 255, 0.1);
            --switch-active-border: hsl(217.2, 91.2%, 54.8%);
          }
        }
        
        :host(.dark) .switch {
          --switch-bg: hsl(215.4, 16.3%, 56.9%, 0.2);
          --switch-hover-bg: hsl(215.4, 16.3%, 56.9%, 0.3);
          --switch-active-bg: hsl(217.2, 91.2%, 59.8%);
          --switch-active-hover-bg: hsl(217.2, 91.2%, 54.8%);
          --switch-thumb-bg: hsl(0, 0%, 93%);
          --switch-border: rgba(255, 255, 255, 0.1);
          --switch-active-border: hsl(217.2, 91.2%, 54.8%);
        }
      </style>
      <div class="switch ${activeClass} ${animatedClass}">
        <div class="thumb"></div>
      </div>
    `;
    
    // Nếu đã animated trước đó, đảm bảo switch hiển thị ngay lập tức
    if (this.isAnimated && !animatedClass) {
      setTimeout(() => {
        const switchEl = this.shadowRoot.querySelector('.switch');
        if (switchEl) {
          switchEl.classList.add('animated');
        }
      }, 10);
    }
  }
}

customElements.define('ui-switch', Switch); 