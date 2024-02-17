class UIHero extends HTMLElement {
  constructor() {
    super();

    const shadow = this.attachShadow({ mode: 'open' });

    const heroTitle = this.getAttribute('hero-title') || 'Default Hero Title';
    const heroDesc =
      this.getAttribute('hero-desc') || 'Default description about your hero';
    const heroImageSrc =
      this.getAttribute('hero-image') || 'images/hero/hero_1.png';
    const teaserTitleColor =
      this.getAttribute('teaser-title-color') || 'orange';
    const layoutDirection =
      this.getAttribute('layout-direction') || 'image-right';

    const imageOrder = layoutDirection === 'image-left' ? 1 : 2;
    const textOrder = layoutDirection === 'image-left' ? 2 : 1;

    shadow.innerHTML = `
        <style>
          .hero-container {
              display: flex;
              align-items: center;
              justify-content: space-between;
              text-align: left;
              color: white;
              padding: 20px;
              gap: 40px;
          }
          .hero-text {
              flex: 1;
              padding-right: 20px;
              order: ${textOrder};
          }
          .hero-text h1 {
            color: ${teaserTitleColor};
            font-size: 3.5em;
            margin-bottom: 10px;
          }
          .hero-text p {
            color: #b0b0b0;
            font-size: 1.4em;
          }
          .hero-image {
              flex: 1;
              text-align: right;
              order: ${imageOrder};
          }
          .hero-image img {
              max-width: 100%;
              height: auto;
          }
          .hero-button {
            display: inline-block;
            padding: 15px 30px;
            margin-top: 20px;
            background-color: black;
            color: white;
            text-decoration: none;
            border-radius: 10px;
            border: none;
            font-size: 1em;
            transition: background-color 0.3s, transform 0.3s;
            cursor: pointer;
          }
          .hero-button:hover {
            background-color: #e67e22;
            transform: translateY(-2px);
          }

          @media only screen and (max-width: 480px) {
            .hero-text h1 {
                font-size: 2em;
            }
            .hero-text p {
                font-size: 1em;
            }

            .hero-container {
              gap: 0;
            }
          }
        
          @media only screen and (min-width: 481px) and (max-width: 768px) {
              .hero-text h1 {
                  font-size: 2.5em;
              }
              .hero-text p {
                  font-size: 1.2em;
              }

              .hero-container {
                gap: 0;
              }
          }
          
          @media only screen and (min-width: 769px) and (max-width: 1920px) {
              .hero-text h1 {
                  font-size: 2.5em;
              }
              .hero-text p {
                  font-size: 1.4em;
              }
          }
          
          @media only screen and (min-width: 1921px) {
              .hero-text h1 {
                  font-size: 4em;
              }
              .hero-text p {
                  font-size: 1.6em;
              }
          }
          
          @media (max-width: 768px) {
              .hero-container {
                  flex-direction: column;
                  text-align: center;
              }
              .hero-text, .hero-image {
                  padding-right: 0;
                  order: 2;
              }
              .hero-image {
                  order: 1;
                  text-align: center;
              }
          }
        
        </style>
        <div class="hero-container">
            <div class="hero-text">
                <h1>${heroTitle}</h1>
                <p>${heroDesc}</p>
                <slot></slot>
            </div>
            <div class="hero-image">
                <img src="${heroImageSrc}" alt="Hero Image">
            </div>
        </div>
      `;
  }
}

customElements.define('ui-hero', UIHero);
