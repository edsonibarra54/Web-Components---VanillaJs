class HeaderContainer extends HTMLElement{
    constructor() {
        super();
        this.shadow = this.attachShadow({mode: 'open'});
        this.icons = [];
        this.routes = [];
    }

    static get observedAttributes() {
        return ['icons', 'routes'];
    }

    attributeChangedCallback(name, oldVal, newVal) {
        if (name === 'icons') {
            this.icons = JSON.parse(newVal);
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
        const iconsHTML = this.icons.map((icon, index) => {
            if (index < this.icons.length - 1) {
                return `
                    <div style="cursor: pointer; display: flex; align-items: center; flex-direction: row-reverse;">
                        <div class="name">${icon.name}</div>
                        <div class="circle">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="${icon.viewBox}" class="icon">
                                <path d="${icon.path}"/>
                            </svg>
                        </div>
                    </div>
                    <div class="line"></div>
                `;
            } else {
                return `
                    <div style="cursor: pointer; display: flex; align-items: center; flex-direction: row-reverse;">
                        <div class="name">${icon.name}</div>
                        <div class="circle">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="${icon.viewBox}" class="icon">
                                <path d="${icon.path}"/>
                            </svg>
                        </div>
                    </div>
                `;
            }
        }).join('');

        const routesHTML = this.routes.map((route, index) => {
            if (index < this.routes.length - 1) {
                return `
                    <div class="routeContainer">
                        <div class="route">${route}</div>
                        <div class="bottomLine"></div>
                    </div>
                    <div class="line"></div>
                `;
            } else {
                return `
                    <div class="routeContainer">
                        <div class="route">${route}</div>
                        <div class="bottomLine"></div>
                    </div>
                `;
            }
        }).join('');

        this.shadow.innerHTML = `
            <style>
                .container {
                    width: 1500px;
                    height: fit-content;
                    display: flex;
                    flex-direction: column;
                }

                .iconContainer{
                    width: 100%;
                    height: fit-content;
                    background-color: #D9D9D9;
                    color: #706F6F;
                    display: flex;
                    align-items: center;
                    flex-direction: row-reverse;
                    flex-wrap: wrap;
                    font-family: 'Open Sans';
                    font-size: 18px;
                    font-weight: 500;
                    padding: 10px 0;
                }

                .menuContainer{
                    width: 100%;
                    height: fit-content;
                    min-height: 125px;
                    background-color: #2080CD;
                    display: flex;
                    align-items: center;
                }

                .name{
                    margin-right: 10px;
                }

                .circle{
                    width: 30px;
                    height: 30px;
                    background-color: #706F6F;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;
                    margin-right: 10px;
                }

                .icon{
                    width: 18px;
                    height: 18px;
                    fill: #FFF;
                }

                .line{
                    height: 25px;
                    border-left: 2px solid #706F6F;
                    margin-right: 10px;
                }

                .logoContainer{
                    width: 500px;
                    height: fit-content;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    gap: 20px;
                    cursor: pointer;
                }

                .logo{
                    width: 200px;
                    height: 80px;
                }

                .logoContainer .line{
                    height: 80px;
                    border-left: 2px solid #FFF;
                }

                .routesContainer{
                    height: fit-content;
                    flex-grow: 1;
                    color: #FFF;
                    display: flex;
                    justify-content: right;
                    align-items: center;
                    flex-direction: row;
                    flex-wrap: wrap;
                    font-family: 'Open Sans';
                    font-size: 18px;
                    font-weight: 500;
                    gap: 10px;
                    padding: 10px;
                }

                .routesContainer .line{
                    height: 20px;
                    border-left: 2px solid #FFF;
                    margin: 0;
                }

                .route{
                    cursor: pointer;
                }

                .bottomLine{
                    width: 100%;
                    border-bottom: 2px solid #2080CD;
                }

                .routeContainer:hover .bottomLine{
                    border-bottom: 2px solid #FFF;
                }
            </style>
            <div>
                <div class="container">
                    <div class="iconContainer">
                        ${iconsHTML}
                    </div>
                    <div class="menuContainer">
                        <div class="logoContainer">
                            <img src="https://www.uapauaslp.mx/Content/Images/EMBLEMA-UASLP.png" class="logo">
                            <div class="line"></div>
                            <img src="https://i.ibb.co/Hn1m8Kw/ingenieria-logo.png" class="logo">
                        </div>
                        <div class="routesContainer">
                            ${routesHTML}
                        </div>
                    </div>
                </div>
            </div> 
        `;
    }
}
customElements.define('header-container', HeaderContainer);