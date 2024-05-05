class FooterContainer extends HTMLElement{
    constructor() {
        super();
        this.shadow = this.attachShadow({mode: 'open'});
        this.icons = [];
        this.infos = [];
        this.routes = [];
    }

    static get observedAttributes() {
        return ['icons', 'infos', 'routes'];
    }

    attributeChangedCallback(name, oldVal, newVal) {
        if (name === 'icons') {
            this.icons = JSON.parse(newVal);
            this.render();
        }

        if (name === 'infos') {
            this.infos = JSON.parse(newVal);
            this.render();
        }

        if (name === 'routes') {
            this.routes = JSON.parse(newVal);
            this.render();
        }
    }

    connectedCallback() {
        this.render();
    }

    render() {
        const iconsHTML = this.icons.map(icon => `
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="${icon.viewBox}" class="icon">
                <path d="${icon.path}"></path>
            </svg>
        `).join('');

        const infoHTML = this.infos.map(info => `<div class="info">${info}</div>`).join('');

        const routesHTML = this.routes.map(route => `
            <div class="routeContainer">
                <div class="route">${route}</div>
                <div class="line"></div>
            </div>
        `).join('');

        this.shadow.innerHTML = `
            <style>
                .container {
                    width: 1500px;
                    height: fit-content;
                    background-color: #2080CD;
                    display: flex;
                }

                .leftContainer{
                    width: 1000px;
                    height: fit-content;
                    margin: 20px 20px
                }

                .rightContainer{
                    height: fit-content;
                    flex-grow: 1;
                    margin: 20px 20px;
                    padding: 5px;
                }

                .iconContainer{
                    width: 100%;
                    height: fit-content;
                    display: flex;
                    flex-wrap: wrap;
                    align-items: center;
                    gap: 15px;
                    padding: 5px 0;
                }

                .infoContainer{
                    width: 100%;
                    height: fit-content;
                    display: flex;
                    flex-direction: column;
                    gap: 3px;
                }

                .routesContainer{
                    width: 100%;
                    height: fit-content;
                    display: flex;
                    flex-direction: column;
                    gap: 5px;
                }

                .info{
                    color: #FFF;
                    font-family: 'Open Sans';
                    font-size: 20px;
                    font-weight: 300;
                }

                .icon{
                    width: 30px;
                    height: 30px;
                    fill: #FFF;
                    cursor: pointer;
                }

                .routeContainer{
                    width: fit-content;
                }

                .route{
                    color: #FFF;
                    font-family: 'Open Sans';
                    font-size: 20px;
                    font-weight: 700;
                    cursor: pointer;
                }

                .line{
                    width: 100%;
                    border-bottom: 2px solid #2080CD;
                }

                .routeContainer:hover .line{
                    border-bottom: 2px solid #FFF;
                }
            </style>
            <div>
                <div class="container">
                    <div class="leftContainer">
                        <div class="iconContainer">
                            ${iconsHTML}
                        </div>
                        <div class="infoContainer">
                            ${infoHTML}
                        </div>
                    </div>
                    <div class="rightContainer">
                        <div class="routesContainer">
                            ${routesHTML}
                        </div>
                    </div>
                </div>
            </div> 
        `;
    }
}
customElements.define('footer-container', FooterContainer);