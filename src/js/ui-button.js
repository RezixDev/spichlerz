class UIButton extends HTMLElement {
  constructor() {
    super();

    const shadow = this.attachShadow({ mode: 'open' });

    const text = this.getAttribute('text') || 'Button';
    const href = this.getAttribute('href') || '#';
    let color = this.getAttribute('color') || 'grey';
    const mode = this.getAttribute('mode') || 'outlined';
    const fullWidth = this.hasAttribute('full-width');

    // Determine font color based on background color
    const fontColor = this.getFontColor(color);

    shadow.innerHTML = `
    <style>
    :host {
      --button-color: ${color};
      --button-font-color: ${fontColor};
      --button-dark-color: ${this.darkenColor(color, 0.2)};
    }

    .rounded-button {
      border: 2px solid var(--button-color);
      border-radius: 20px;
      padding: 10px 20px;
      text-align: center;
      text-decoration: none;
      display: inline-block;
      font-size: 16px;
      margin: 4px 2px;
      cursor: pointer;
      transition: background-color 0.3s, color 0.3s;
      width: auto;
      color: var(--button-font-color);
    }

    .full-width {
      display: block;
      width: inherit;
    }

    .outlined {
      background-color: transparent;
      color: var(--button-color);
    }

    .outlined:hover {
        background-color: var(--button-color);
        color: var(--button-font-color);
    }
    
    .filled {
      background-color: var(--button-color);
      color: var(--button-font-color);
    }

    .filled:hover {
      background-color: var(--button-dark-color);
      color: var(--button-font-color); 
      border: 2px solid var(--button-dark-color);
    }
    </style>
    <a href="${href}" class="rounded-button ${mode} ${
      fullWidth ? 'full-width' : ''
    }">${text}</a>
    `;

    this.updateColor = this.updateColor.bind(this);
  }

  static get observedAttributes() {
    return ['color', 'full-width'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'color' && oldValue !== newValue) {
      this.updateColor(newValue);
    } else if (name === 'full-width') {
      this.updateFullWidth();
    }
  }

  updateColor(newColor) {
    const fontColor = this.getFontColor(newColor);

    const host = this.shadowRoot.host;
    host.style.setProperty('--button-color', newColor);
    host.style.setProperty('--button-font-color', fontColor);
    host.style.setProperty(
      '--button-dark-color',
      this.darkenColor(newColor, 0.2)
    );
  }

  updateFullWidth() {
    const button = this.shadowRoot.querySelector('.rounded-button');
    if (this.hasAttribute('full-width')) {
      button.classList.add('full-width');
    } else {
      button.classList.remove('full-width');
    }
  }

  getFontColor(backgroundColor) {
    const color =
      backgroundColor.charAt(0) === '#'
        ? backgroundColor.substring(1, 7)
        : backgroundColor;
    const r = parseInt(color.substring(0, 2), 16); // Hex to R
    const g = parseInt(color.substring(2, 4), 16); // Hex to G
    const b = parseInt(color.substring(4, 6), 16); // Hex to B
    const uicolors = [r / 255, g / 255, b / 255];
    const c = uicolors.map((col) => {
      if (col <= 0.03928) {
        return col / 12.92;
      }
      return Math.pow((col + 0.055) / 1.055, 2.4);
    });
    const l = 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2];
    return l > 0.179 ? 'black' : 'white';
  }

  darkenColor(color, factor) {
    let colorInt = parseInt(color.slice(1), 16);
    let r = (colorInt >> 16) & 255;
    let g = (colorInt >> 8) & 255;
    let b = colorInt & 255;

    r = Math.floor(r * (1 - factor));
    g = Math.floor(g * (1 - factor));
    b = Math.floor(b * (1 - factor));

    return '#' + ((1 << 24) | (r << 16) | (g << 8) | b).toString(16).slice(1);
  }
}

customElements.define('ui-button', UIButton);
