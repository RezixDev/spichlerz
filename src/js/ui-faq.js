class UIFaq extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.render();
    this.addListeners();
  }

  render() {
    const faqs = JSON.parse(this.getAttribute('faqs')) || [];
    const color = this.getAttribute('color') || 'green';

    const faqsHtml = faqs
      .map((faq) => {
        return `
                <details class="faq-item">
                    <summary>${faq.question}</summary>
                    <p>${faq.answer}</p>
                </details>
            `;
      })
      .join('');

    this.shadowRoot.innerHTML = `
                <style>
                .faq-container {
                  padding: 20px;
                }
                .faq-item {
                    margin-bottom: 10px;
                    border: 1px solid #ddd;
                    border-radius: 5px;
                    padding: 10px;
                    position: relative;
                    cursor: pointer;
                    transition: all 1s ease;
                }
                .faq-item summary {
                    font-weight: bold;
                    list-style: none;
                    color: ${color}; 
                    transition: all 1s ease;
                }
                .faq-item summary::-webkit-details-marker {
                    display: none;
                }
                .faq-item summary::after {
                    content: '▼'; 
                    float: right; 
                    transform: rotate(0deg);
                    transition: transform 1s ease;
                    color: ${color}; 
                }
                .faq-item[open] summary::after {
                    transform: rotate(180deg); 
                }
                .faq-item p {
                  line-height: 1.4;
                  color: #2e2e2e;
                  max-height: 0;
                  overflow: hidden;
                  transition: max-height 1s ease;
                }

                .faq-item[open] p {
                  max-height: 500px; 
              }
            </style>
            <div class="faq-container">
                ${faqsHtml}
            </div>
        `;
  }

  addListeners() {
    const allDetails = this.shadowRoot.querySelectorAll('.faq-item');
    allDetails.forEach((detail) => {
      detail.addEventListener('click', (event) => {
        if (detail.hasAttribute('open')) {
          detail.removeAttribute('open');
        } else {
          allDetails.forEach((d) => {
            d.removeAttribute('open');
          });
          detail.setAttribute('open', '');
        }
        event.stopPropagation();
      });
      const summary = detail.querySelector('summary');
      summary.addEventListener('click', (event) => {
        event.stopPropagation();
      });
    });
  }
}

customElements.define('ui-faq', UIFaq);
