class UIContentBox extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
  }

  static get observedAttributes() {
    return ['title', 'description', 'titlecolor'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    this.render();
  }

  render() {
    const title = this.getAttribute('title') || '';
    const description = this.getAttribute('description') || '';
    const titleColor = this.getAttribute('titlecolor') || 'black';

    this.shadowRoot.innerHTML = `
          <style>
            :host {
              display: block;
              max-width: 800px;
              text-align: center;
              font-family: 'Arial', sans-serif;
              margin: 0 auto;
              padding: 2em;
              border-radius: 10px;
              background: white;
            }
    
            .title {
              color: ${titleColor};
              font-size: 2em;
              margin: 0.5em 0;
              font-weight: bold;
            }
    
            .description {
              color: #555;
              font-size: 1em;
              margin: 0.5em 0;
              line-height: 1.5;
              max-width: 600px;
              margin-left: auto;
              margin-right: auto;
            }
    
            /* Responsive styles */
            @media (max-width: 1168px) {
              :host {
                padding: 1em;
              }
              .title {
                font-size: 2rem;
              }
              .description {
                font-size: 0.9em;
              }
            }
    
            @media (max-width: 600px) {
              .title {
                font-size: 1.8em;
              }
              .description {
                font-size: 0.8em;
              }
            }
          </style>
          <div class="title">${title}</div>
          <div class="description">${description}</div>
        `;
  }
}

customElements.define('ui-content-box', UIContentBox);
