// Theme toggle component
class ThemeToggle extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.isDark = false;
    this.isAnimated = false; // Thêm flag để theo dõi trạng thái animation
    this.render();
  }

  connectedCallback() {
    this.button = this.shadowRoot.querySelector('button');
    this.button.addEventListener('click', this.toggleTheme.bind(this));
    
    // Kiểm tra theme hiện tại
    this.checkTheme();
    
    // Thêm animation khi component được kết nối vào DOM
    setTimeout(() => {
      this.isAnimated = true;
      if (this.button) {
        this.button.classList.add('animated');
      }
    }, 100);
  }

  disconnectedCallback() {
    if (this.button) {
      this.button.removeEventListener('click', this.toggleTheme.bind(this));
    }
  }

  checkTheme() {
    // Ưu tiên sử dụng giá trị từ localStorage
    const savedTheme = localStorage.getItem('theme');
    
    if (savedTheme) {
      this.isDark = savedTheme === 'dark';
    } else {
      // Nếu không có giá trị trong localStorage, sử dụng system preference
      this.isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    
    this.updateUI();
  }

  toggleTheme() {
    this.isDark = !this.isDark;
    
    // Thêm hiệu ứng ripple khi click
    const ripple = document.createElement('span');
    ripple.classList.add('ripple');
    this.button.appendChild(ripple);
    
    setTimeout(() => {
      ripple.remove();
    }, 600);
    
    // Lưu theme vào localStorage
    localStorage.setItem('theme', this.isDark ? 'dark' : 'light');
    
    // Lưu theme vào chrome.storage để đồng bộ
    if (typeof chrome !== 'undefined' && chrome.storage) {
      chrome.storage.sync.set({ theme: this.isDark ? 'dark' : 'light' });
    }
    
    // Cập nhật UI mà không render lại toàn bộ component
    this.button.classList.toggle('dark', this.isDark);
    this.button.title = this.isDark ? 'Chuyển sang chế độ sáng' : 'Chuyển sang chế độ tối';
    
    // Dispatch event để các component khác có thể lắng nghe
    document.dispatchEvent(new CustomEvent('themechange', { 
      detail: { theme: this.isDark ? 'dark' : 'light' }
    }));
    
    // Cập nhật class trên document
    document.documentElement.classList.toggle('dark', this.isDark);
  }

  updateUI() {
    if (this.button) {
      this.button.setAttribute('aria-pressed', String(this.isDark));
      this.button.classList.toggle('dark', this.isDark);
      this.button.title = this.isDark ? 'Chuyển sang chế độ sáng' : 'Chuyển sang chế độ tối';
    }
  }

  render() {
    const darkClass = this.isDark ? 'dark' : '';
    const animatedClass = this.isAnimated ? 'animated' : '';
    
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: inline-block;
        }
        
        button {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 36px;
          height: 36px;
          border-radius: 8px;
          background-color: var(--bg, hsl(210, 40%, 96.1%));
          color: var(--color, hsl(222.2, 47.4%, 11.2%));
          border: none;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          overflow: hidden;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
          opacity: ${animatedClass ? '1' : '0'};
          transform: ${animatedClass ? 'translateX(0)' : 'translateX(10px)'};
        }
        
        button.animated {
          opacity: 1;
          transform: translateX(0);
          transition: opacity 0.3s ease, transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        
        button:hover {
          background-color: var(--hover-bg, hsl(210, 40%, 90%));
          transform: translateY(-2px);
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        
        button:active {
          transform: translateY(0);
          box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
        }
        
        button.dark {
          --bg: hsl(217.2, 32.6%, 17.5%);
          --color: hsl(210, 40%, 98%);
          --hover-bg: hsl(217.2, 32.6%, 22%);
        }
        
        .icon {
          width: 20px;
          height: 20px;
          transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .sun-icon,
        .moon-icon {
          position: absolute;
          top: 8px;
          left: 8px;
          transition: opacity 0.3s ease, transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .sun-icon {
          opacity: 1;
          transform: rotate(0deg);
        }
        
        .moon-icon {
          opacity: 0;
          transform: rotate(90deg);
        }
        
        button.dark .sun-icon {
          opacity: 0;
          transform: rotate(-90deg);
        }
        
        button.dark .moon-icon {
          opacity: 1;
          transform: rotate(0deg);
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
      </style>
      
      <button type="button" aria-label="Toggle theme" class="${darkClass} ${animatedClass}" title="${this.isDark ? 'Chuyển sang chế độ sáng' : 'Chuyển sang chế độ tối'}">
        <svg class="icon sun-icon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
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
        
        <svg class="icon moon-icon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
        </svg>
      </button>
    `;
  }
}

customElements.define('theme-toggle', ThemeToggle); 