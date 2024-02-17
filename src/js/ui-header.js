class UIHeader extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: 'open' });

    const menuItems = this.getAttribute('menu-items');
    const color = this.getAttribute('color') || 'orange';
    let items = [];
    if (menuItems) {
      try {
        items = JSON.parse(menuItems);
      } catch (e) {
        console.error('Error parsing menu items:', e);
      }
    }

    const listItems = items
      .map((item) => `<li><a href="${item.href}">${item.text}</a></li>`)
      .join('');

    shadow.innerHTML = `
      <style>
      .header-menu {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 20px;
        box-shadow: 0 4px 8px rgba(0,0,0,0.1);
        text-align: center;
        background-color: white;
        color: grey;
      }
      
      .header-menu h1 {
        font-size: 1.5em;
        margin: 0 15px 0 15px;
        flex-grow: 0;
        color: ${color};
      }
      
      .header-menu nav ul {
        list-style: none;
        margin: 0;
        padding: 0;
        display: flex;
        align-items: center;
        flex-grow: 1;
        justify-content: center;
      }
      
      .header-menu nav li {
        margin: 0 15px;
      }
      
      .header-menu nav a {
        color: grey;
        text-decoration: none;
        font-size: 1em;
        transition: color 0.3s;
      }
      
      .header-menu nav a:hover {
        color: ${color};
      }
      
      .hamburger {
        display: none;
      }
      
      .hamburger:focus {
        outline: none;
        box-shadow: 0 0 0 2px blue;
      }
      
      .bar {
        width: 100%;
        height: 3px;
        background-color: black;
        transition: all 0.3s linear;
      }
      
      .hamburger.open .bar:nth-child(1) {
        transform: rotate(45deg) translate(5px, 5px);
      }
      
      .hamburger.open .bar:nth-child(2) {
        opacity: 0;
      }
      
      .hamburger.open .bar:nth-child(3) {
        transform: rotate(-45deg) translate(7px, -6px);
      }
      
      .menu.open {
        display: flex;
        animation: slideIn 0.3s forwards;
      }
      
      @keyframes slideIn {
        from { transform: translateY(-100%); }
        to { transform: translateY(0); }
      }
      
      @media (max-width: 1200px) {
        .header-menu a {
          font-size: 1em;
        }
        .header-menu > div:first-child {
          font-size: 1.2em;
        }
        .right-section button {
          font-size: 14px;
        }
      }
      
      @media (max-width: 860px) {
        .header-menu {
          flex-direction: row;
          justify-content: space-between;
          align-items: center;
        }
      
        .header-menu > .hamburger {
          order: -1;
        }
      
        .header-menu > h1 {
          text-align: center;
          flex-grow: 1;
        }
      
        .right-section {
          display: flex;
          align-items: center;
        }
        
        .right-section > .login-button {
          margin-left: auto;
        }
      
        .hamburger {
          display: flex;
          flex-direction: column;
          justify-content: space-around;
          align-items: center;
          width: 30px;
          height: 25px;
          padding: 0;
          cursor: pointer;
          background: none;
          border: none;
        }
      
        .header-menu nav .menu {
          display: none;
          position: absolute;
          width: 100%;
          background-color: white;
          box-shadow: 0 4px 8px rgba(0,0,0,0.1);
          top: 11%;
          left: 0;
          z-index: 1000;
          flex-direction: column;
        }
      
        .header-menu nav ul {
          width: 100%;
          justify-content: flex-start;
        }
    
      
        .header-menu nav ul li {
          display: block;
          width: 100%;
          text-align: center;
          padding: 10px 0;
        }
      
        .header-menu nav a {
          width: 100%;
          display: block;
        }
      
        .header-menu nav .hamburger.open + .menu,
        .header-menu nav .menu.open {
          display: flex;
        }
      }

      </style>
      <div class="header-menu">
        <button class="hamburger" aria-label="Menu" role="button">
          <div class="bar"></div>
          <div class="bar"></div>
          <div class="bar"></div>
        </button>
        <h1><strong>Spichlerz</strong></h1>
        <nav>
          <ul class="menu" role="navigation">${listItems}</ul>
        </nav>
        <div class="right-section">
          <slot></slot> 
          <slot></slot> 
        </div>
      </div>
    `;

    const hamburger = shadow.querySelector('.hamburger');
    const menu = shadow.querySelector('.menu');

    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('open');
      menu.classList.toggle('open');
    });
  }
}

customElements.define('ui-header', UIHeader);
