class NavbarContainer extends HTMLElement {
    constructor() {
        super();
        this.shadow = this.attachShadow({ mode: 'open' });
        this.data = [];
        this.openDropdown = null;
    }

    static get observedAttributes() {
        return ['data'];
    }

    attributeChangedCallback(name, oldVal, newVal) {
        if (name === 'data' && oldVal !== newVal) {
            this.data = JSON.parse(newVal);
            this.render();
            this.addEventListeners();
        }
    }

    connectedCallback() {
        this.render();
        this.addEventListeners();
    }

    addEventListeners() {
        const dropdowns = this.shadow.querySelectorAll('.dropdown');
        dropdowns.forEach(dropdown => {
            dropdown.addEventListener('click', this.toggleDropdown.bind(this, dropdown));
        });

        document.addEventListener('click', this.handleDocumentClick.bind(this));
    }

    toggleDropdown(dropdown) {
        const dropdownContent = dropdown.querySelector('.dropdown-content');
        if (this.openDropdown && this.openDropdown !== dropdown) {
            this.openDropdown.querySelector('.dropdown-content').classList.remove("show");
        }
        dropdownContent.classList.toggle("show");
        this.openDropdown = dropdown;
        event.stopPropagation();
    }

    render() {
        console.log(this.data);

        const itemsHTML = this.data.map(item => {
            if (item.routes && Array.isArray(item.routes)) {
                const dropdownContent = item.routes.map(route => `<a href="#">${route}</a>`).join('');
                return `
                    <div class="dropdown">
                        <div>${item.name}</div>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" class="icon">
                            <path d="M137.4 374.6c12.5 12.5 32.8 12.5 45.3 0l128-128c9.2-9.2 11.9-22.9 6.9-34.9s-16.6-19.8-29.6-19.8L32 192c-12.9 0-24.6 7.8-29.6 19.8s-2.2 25.7 6.9 34.9l128 128z"/>
                        </svg>
                        <div class="dropdown-content">
                            ${dropdownContent}
                        </div>
                    </div>
                `;
            } else {
                return `<div class="route">${item.name}</div>`;
            }
        }).join('');

        this.shadow.innerHTML = `
            <style>
                .container {
                    width: 1500px;
                    height: fit-content;
                    display: flex;
                    margin-top: 10px;
                }

                .dropdownContainer{
                    height: fit-content;
                    flex-grow: 1;
                    color: #004a98;
                    display: flex;
                    flex-direction: row;
                    flex-wrap: wrap;
                    align-items: center;
                    font-family: 'Open Sans';
                    font-size: 24px;
                    font-weight: 500;
                    gap: 20px;
                    padding: 0 10px;
                }

                .searchContainer{
                    width: 250px;
                    height: 50px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                }

                .searchButton{
                    width: 70px;
                    height: 30px;
                    background-color: #2080CD;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    cursor: pointer;
                }

                input{
                    width: 120px;
                    height: 27px;
                    border: 1px solid #004a98;
                }

                .icon{
                    width: 12px;
                    height: 12px;
                    fill: #FFF;
                }

                .route{
                    cursor: pointer;
                    padding: 8px;
                }

                .route:hover {
                    background-color: #2080CD;
                    color: #FFF;
                    fill: #FFF;
                }

                .dropdown{
                    position: relative;
                    display: flex;
                    align-items: center;
                    cursor: pointer;
                    padding: 8px;
                }

                .dropdown:hover {
                    background-color: #2080CD;
                    color: #FFF;
                }

                .dropdown .icon{
                    width: 16px;
                    height: 16px;
                    fill: #004a98;
                }

                .dropdown:hover .icon{
                    fill: #FFF;
                }

                .dropdown-content {
                    width: fit-content;
                    display: none;
                    position: absolute;
                    background-color: #fff;
                    min-width: 160px;
                    box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
                    border: 1px solid #D9D9D9;
                    z-index: 1;
                    top: 50px;
                    left: 0;
                    padding: 5px 0;
                }
                  
                .dropdown-content a {
                    color: #2080CD;
                    padding: 12px 16px;
                    text-decoration: none;
                    display: block;
                    white-space: nowrap;
                }
                  
                a:hover {
                    background-color: #2080CD;
                    color: #FFF;
                }
                  
                .show {
                    display: block;
                }
            </style>
            <div>
                <div class="container">
                    <div class="dropdownContainer">
                        ${itemsHTML}
                    </div>
                    <div class="searchContainer">
                        <input>
                        <div class="searchButton">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="icon">
                                <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"/>
                            </svg>
                        </div>
                    </div>
                </div>
            </div> 
        `;
    }
}
customElements.define('navbar-container', NavbarContainer);