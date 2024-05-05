class BreadcrumbContainer extends HTMLElement{
    constructor() {
        super();
        this.shadow = this.attachShadow({mode: 'open'});
        this.pages = [];
    }

    set pages(pages) {
        this._pages = pages;
        this.render();
    }

    get pages() {
        return this._pages;
    }

    static get observedAttributes() {
        return ['pages'];
    }

    attributeChangedCallback(name, oldVal, newVal) {
        if (name === 'pages') {
            this.pages = JSON.parse(newVal);
        }
    }

    connectedCallback() {
        this.render();
    }

    render() {
        const breadcrumbItems = this.pages.map((page, index) => {
            if (index < this.pages.length - 1) {
                return `
                    <div class="pageName" style="cursor: pointer;">${page}</div>
                    <div class="pageName">></div>
                `;
            } else {
                return `
                    <div class="pageName" style="cursor: pointer;">${page}</div>
                `;
            }
        }).join('');

        this.shadow.innerHTML = `
            <style>
                .container {
                    width: 1300px;
                    height: fit-content;
                    display: flex;
                    flex-wrap: wrap;
                    align-items: center;
                    padding: 5px 0;
                    margin-bottom: 20px;
                }

                .pageName{
                    color: #2080CD;
                    font-family: 'Open Sans';
                    font-size: 20px;
                    font-weight: 600;
                    margin: 5px 15px 5px 0;
                }
            </style>
            <div>
                <div class="container">
                    ${breadcrumbItems}
                </div>
            </div> 
        `;
    }
}
customElements.define('breadcrumb-container', BreadcrumbContainer);