/**
 * Represents an event card web component.
 * @class
 * @author Edson Ibarra <edsonibarra54@gmail.com>
 * 
 * This component requires the information of the event card that is going to be displayed.
 * 
 * @example
 * <event-card date="eventDate" title="eventTitle" image="eventImage"></event-card>
 */
class EventCard extends HTMLElement{
    /**
     * @constructor
     */
    constructor() {
        super();
        this.shadow = this.attachShadow({mode: 'open'});
    }

    /**
     * It's used to get the date, title and image attributes of the html tag.
     * @function
     * @returns {Array.<string>}
     */
    static get observedAttributes() {
        return ['date', 'title', 'image'];
    }
    
    /**
     * It set the web component date, title or image when it hears a change in an attribute.
     * @function
     */
    attributeChangedCallback(name, oldVal, newVal) {
        if (name === 'date' || name === 'title' || name === 'image') {
            this.render();
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
                    display: flex;
                    flex-direction: column;
                    width: 250px;
                    height: 315px;
                    cursor: pointer;
                    background-color: #000;
                    margin: 16px 12px 16px 12px;
                }

                .cardImage{
                    width: 250px;
                    height: 200px;
                    object-fit: cover;
                }

                .infoContainer{
                    display: flex;
                    flex-direction: column;
                    flex: 1;
                    background-color: #FFF;
                }

                .cardDate{
                    width: fit-content;
                    background-color: #004A98;
                    color: #FFF;
                    font-size: 18px;
                    font-family: system-ui;
                    text-align: left;
                    padding: 8px;
                    margin: 13px 0 0 16px
                }

                .cardTitle{
                    color: #333;
                    font-size: 18px;
                    font-family: 'Open Sans', sans-serif;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    display: -webkit-box;
                    -webkit-line-clamp: 2;
                    -webkit-box-orient: vertical;
                    margin: 2px 16px;
                }
            </style>
            <div class="container">
                <img class="cardImage" src="${this.getAttribute('image')}">
                <div class="infoContainer">
                    <div class="cardDate">${this.getAttribute('date')}</div>
                    <div class="cardTitle">${this.getAttribute('title')}</div>
                    
                </div>
            </div>
        `;
    }
}
customElements.define('event-card', EventCard);