class UIFooter extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.render();
  }

  static get observedAttributes() {
    return ['menus', 'social-links', 'background-color', 'hover-color'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      this.render();
    }
  }

  async fetchSVG(url) {
    try {
      const response = await fetch(url);
      return response.ok ? response.text() : '';
    } catch (error) {
      console.error('Error fetching SVG:', error);
      return '';
    }
  }

  async render() {
    const menus = JSON.parse(this.getAttribute('menus')) || [];
    const socialLinks = JSON.parse(this.getAttribute('social-links')) || [];
    const backgroundColor = this.getAttribute('background-color') || '#333';
    const hoverColor = this.getAttribute('hover-color') || '#4CAF50';

    const menusHtml = menus
      .map((menu) => {
        const title = menu.title || '';
        const items = menu.items || [];
        return `
          <ul class="footer-menu">
            ${title ? `<h4>${title}</h4>` : ''}
            ${items
              .map((item) => {
                const text = item.text || '';
                const url = item.url || '#';
                return `<li><a href="${url}" style="cursor: pointer;">${text}</a></li>`;
              })
              .join('')}
          </ul>
        `;
      })
      .join('');

    const socialLinksHtmlPromises = socialLinks.map(async (link) => {
      const svgContent = await this.fetchSVG(link.icon);
      return `<a href="${link.url}" target="_blank" style="cursor: pointer;">${svgContent}</a>`;
    });

    const socialLinksHtml = await Promise.all(socialLinksHtmlPromises).then(
      (links) => links.join('')
    );

    this.shadowRoot.innerHTML = `
    <style>
      .footer-container {
        display: flex;
        justify-content: space-around;
        padding: 20px;
        background-color: ${backgroundColor};
        color: white;
        flex-wrap: wrap;
      }
      .footer-menu {
        list-style-type: none;
        padding: 0;
        min-width: 150px;
      }

      .footer-menu a:hover {
        color: ${hoverColor};
        transition: color 0.3s ease;
      }

      .newsletter input[type=email]:hover {
        border-color: ${hoverColor};
        transition: border-color 0.3s ease;
      }

      .footer-menu h4 {
        color: #f8f8f8;
        font-size: 1.2em;
      }

      .footer-menu li {
        margin: 8px 0;
        font-size: 1em;
      }
      .newsletter {
        display: flex;
        flex-direction: column;
        width: 100%;
        gap: 5px;
      }

      .newsletter > h4 {
        margin-bottom: 10px;
      }

      .newsletter input {
        width: 100%;
        padding: 10px;
        margin-top: 5px;
        font-size: 1em;
        box-sizing: border-box;
      }

      .newsletter input[type=email] {
        background-color: transparent;
        border: 2px solid #ffffff;
        border-radius: 20px;
        padding: 10px 15px;
        color: #ffffff;
        font-size: 14px;
        margin-top: 5px;
      }

      .newsletter input[type=email]:focus {
        border-color: #4CAF50;
        outline: none;
      }
      
      .newsletter input[type=email]::placeholder {
        color: #fff;
      }
      
      .social-icons {
        display: flex;
        margin-top: 10px;
        gap: 10px;
      }

      .social-icons a:hover {
        transform: scale(1.2);
        transition: transform 0.3s ease;
      }

      a {
        text-decoration: none;
        color: inherit;
      }

      /* Responsive Styles */
      @media (max-width: 768px) {
        .footer-container {
          justify-content: center;
          text-align: center;
        }

        .footer-menu {
          margin-bottom: 20px; 
        }

        .newsletter {
          width: auto;
        }

        .social-icons {
          gap: 30px;
          justify-content: center;
        }

        .newsletter input[type=email] {
          text-align: center;
        }
      }

      @media (max-width: 480px) {
        .footer-menu h4 {
          font-size: 1em;
        }

        .footer-menu li {
          font-size: 0.9em;
        }

        .newsletter input[type=email] {
          font-size: 12px;
        }

        .social-icons a {
          transform: scale(1); 
        }
      }
    </style>
    <div class="footer-container">
      ${menusHtml}
      <div class="footer-menu">
        ${socialLinks.length > 0 ? '<h4>Follow Us</h4>' : ''}
        <div class="social-icons">
          ${socialLinksHtml}
        </div>
        <div class="newsletter">
          <h4>Subscribe to Our Newsletter</h4>
          <input type="email" placeholder="Your email for newsletter">
          <slot name="newsletter-button"></slot>
        </div>
      </div>
    </div>
    `;
  }
}

customElements.define('ui-footer', UIFooter);
