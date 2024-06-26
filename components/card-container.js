/**
 * Represents a web component that contains event cards.
 * @class
 * @author Edson Ibarra <edsonibarra54@gmail.com>
 * 
 * This component requires a JSON array containing the information of every event card that is going to be displayed.
 * 
 * @example
 * <card-container data='[JSON]'></card-container>
 * 
 * @example
 * JSON: [
 *      {"date": "date1","title": "title1","image": "image1"},
 *      {"date": "date2","title": "title2","image": "image2"},
 *      ...
 * ]
 */
class CardContainer extends HTMLElement{
    /**
     * @constructor
     */
    constructor() {
        super();
        this.shadow = this.attachShadow({mode: 'open'});
        this.data = [];
    }

    /**
     * It's used to set the data variable.
     * @function
     * @param {JSON} data - Contains the information of every card in the container.
     */
    set data(data) {
        this._data = data;
        this.render();
    }

    /**
     * It's used to get the data variable.
     * @function
     * @returns {JSON} this.data - Contains the information of every card in the container.
     */
    get data() {
        return this._data;
    }

    /**
     * It's used to get the data attribute of the html tag.
     * @function
     * @returns {JSON}
     */
    static get observedAttributes() {
        return ['data'];
    }

    /**
     * It set the web component pages when it hears a change in an attribute.
     * @function
     */
    attributeChangedCallback(name, oldVal, newVal) {
        if (name === 'data') {
            this.data = JSON.parse(newVal);
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
        this.shadow.innerHTML = `
            <style>
                .container {
                    width: 1100px;
                    height: fit-content;
                    background-color: #E6ECF2;
                    margin-bottom: 20px;
                    display: flex;
                    flex-wrap: wrap;
                    justify-content: center;
                }

                .seeMoreButton{
                    background-color: #2080CB;
                    color: #FFF;
                    border-radius: 20px;
                    font-family: 'Open Sans';
                    font-size: 20px;
                    font-weight: 700;
                    text-align: center;
                    padding: 5px 20px;
                    margin: 0 0 16px 0;
                    cursor: pointer;
                }
            </style>
            <div>
                <div class="container">
                    ${this.data.map(event => `<event-card date="${event.date}" title="${event.title}" image="${event.image}"></event-card>`).join('')}
                    <div class="seeMoreButton">Conocer más...</div>
                </div>
            </div> 
        `;
    }
}
customElements.define('card-container', CardContainer);