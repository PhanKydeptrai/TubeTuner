// Switch component based on shadcn/ui
class UiSwitch extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.checked = false;
    this.render();
  }

  static get observedAttributes() {
    return ['checked', 'disabled'];
  }

  connectedCallback() {
    this.switchInput = this.shadowRoot.querySelector('input');
    this.switchLabel = this.shadowRoot.querySelector('label');
    
    if (this.hasAttribute('checked')) {
      this.checked = true;
      this.switchInput.checked = true;
    }
    
    if (this.hasAttribute('disabled')) {
      this.switchInput.disabled = true;
      this.switchLabel.classList.add('disabled');
    }
    
    this.switchInput.addEventListener('change', this.handleChange.bind(this));
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'checked' && this.switchInput) {
      this.checked = newValue !== null;
      this.switchInput.checked = this.checked;
    }
    
    if (name === 'disabled' && this.switchInput) {
      this.switchInput.disabled = newValue !== null;
      if (newValue !== null) {
        this.switchLabel.classList.add('disabled');
      } else {
        this.switchLabel.classList.remove('disabled');
      }
    }
  }

  handleChange(event) {
    this.checked = event.target.checked;
    
    if (this.checked) {
      this.setAttribute('checked', '');
    } else {
      this.removeAttribute('checked');
    }
    
    // Dispatch custom change event
    const customEvent = new CustomEvent('change', {
      bubbles: true,
      composed: true,
      detail: { checked: this.checked }
    });
    this.dispatchEvent(customEvent);
  }

  render() {
    const switchId = `switch-${Math.random().toString(36).substring(2, 9)}`;
    
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: inline-block;
          --muted: #dcd9e3;
          --primary: #8a79ab;
        }
        
        .ext-switch {
          position: relative;
          display: inline-block;
          width: 36px;
          height: 20px;
        }
        
        .ext-switch input {
          opacity: 0;
          width: 0;
          height: 0;
        }
        
        .ext-switch-label {
          position: absolute;
          cursor: pointer;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: var(--muted);
          transition: 0.3s;
          border-radius: 20px;
        }
        
        .ext-switch-label:before {
          position: absolute;
          content: "";
          height: 16px;
          width: 16px;
          left: 2px;
          bottom: 2px;
          background-color: white;
          transition: 0.3s;
          border-radius: 50%;
        }
        
        input:checked + .ext-switch-label {
          background-color: var(--primary);
        }
        
        input:checked + .ext-switch-label:before {
          transform: translateX(16px);
        }
        
        .ext-switch-label.disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }
        
        /* Pega o estilo do host para o dark mode */
        :host-context(.dark) {
          --muted: #242031;
          --primary: #a995c9;
        }
      </style>
      
      <div class="ext-switch">
        <input type="checkbox" id="${switchId}">
        <label class="ext-switch-label" for="${switchId}"></label>
      </div>
    `;
  }
}

customElements.define('ui-switch', UiSwitch); 