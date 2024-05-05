class CardContainer extends HTMLElement{
    constructor() {
        super();
        this.shadow = this.attachShadow({mode: 'open'});
        this.data = [];
    }

    set data(data) {
        this._data = data;
        this.render();
    }

    get data() {
        return this._data;
    }

    static get observedAttributes() {
        return ['data'];
    }

    attributeChangedCallback(name, oldVal, newVal) {
        if (name === 'data') {
            this.data = JSON.parse(newVal);
        }
    }

    connectedCallback() {
        this.render();
    }

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