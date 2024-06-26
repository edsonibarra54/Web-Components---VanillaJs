/**
 * Represents a breadcrumb web component.
 * @class
 * @author Edson Ibarra <edsonibarra54@gmail.com>
 * 
 * This component requires a JSON containing the pages to be displayed.
 * 
 * @example
 * <breadcrumb-container pages='[JSON]'></breadcrumb-container>
 * 
 * @example
 * JSON: [{pageName1,pageName2,pageName3,...}]
 */
class BreadcrumbContainer extends HTMLElement{
    /**
     * @constructor
     */
    constructor() {
        super();
        this.shadow = this.attachShadow({mode: 'open'});
        this.pages = [];
    }

    /**
     * It's used to set the pages variable.
     * @function
     * @param {JSON} pages - Contains the name of all the pages in the breadcrumb.
     */
    set pages(pages) {
        this._pages = pages;
        this.render();
    }

    /**
     * It's used to get the pages variable.
     * @function
     * @returns {JSON} this.pages - Contains the name of all the pages in the breadcrumb.
     */
    get pages() {
        return this._pages;
    }

    /**
     * It's used to get the pages attribute of the html tag.
     * @function
     * @returns {JSON}
     */
    static get observedAttributes() {
        return ['pages'];
    }

    /**
     * It set the web component pages when it hears a change in an attribute.
     * @function
     */
    attributeChangedCallback(name, oldVal, newVal) {
        if (name === 'pages') {
            this.pages = JSON.parse(newVal);
        }
    }

    /**
     * It renders the web component when it's called for the first time.
     * @function
     */
    connectedCallback() {
        this.render();
    }

    /**
     * It renders the web component html with its styles.
     * @function
     */
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