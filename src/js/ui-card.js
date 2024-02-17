class UICard extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({ mode: 'open' });

    const cardContainer = document.createElement('div');
    const image = document.createElement('img');
    const content = document.createElement('p');
    const style = document.createElement('style');

    cardContainer.className = 'card';
    image.className = 'card-image';
    content.className = 'card-content';

    image.src = this.getAttribute('src') || 'default-image.jpg';
    image.alt = this.getAttribute('alt') || 'Default Image';

    content.textContent = this.getAttribute('content') || 'Default Content';
    const hoverBgColor = this.getAttribute('hover-bg-color') || 'orange';

    style.textContent = `
            .card {
                border: 1px solid #ddd;
                border-radius: 8px;
                padding: 16px;
                box-shadow: 0 4px 8px rgba(0,0,0,0.1);
                transition: transform 0.3s ease, background-color 0.3s ease;
                background-color: white;
                z-index: 1;
                text-align: center;
            }

            .card:hover {
                transform: scale(1.25);
                background-color: ${hoverBgColor};
                z-index: 2;
                box-shadow: 0 6px 12px rgba(0,0,0,0.15);
            }

            .card:hover .card-content {
                color: white;
            }

            .card-image {
                max-width: 100%;
                height: auto;
                margin-bottom: 16px;
            }

            .card-content {
                margin-bottom: 16px;
                color: #555;
                height: 40px; 
                overflow: hidden;
                display: -webkit-box;
                -webkit-line-clamp: 2;
                -webkit-box-orient: vertical;
            }

            @media (max-width: 768px) {
                .card {
                    padding: 12px;
                    border-radius: 6px;
                }

                .card-content {
                    height: auto; /* Adjust height for smaller screens */
                    -webkit-line-clamp: 3; /* Show more lines of text */
                }
            }

            @media (max-width: 480px) {
                .card {
                    padding: 8px;
                    border-radius: 4px;
                }

                .card:hover {
                    transform: none; /* Disable scaling on very small screens */
                }
            }
        `;

    this.shadowRoot.append(style, cardContainer);
    cardContainer.append(image, content);
  }
}

customElements.define('ui-card', UICard);
