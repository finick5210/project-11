export default class CardList {
    constructor(dom, cards) {
        this.domNode = dom;
        this.cards = cards;
    }

    getDomNode() {
        return this.domNode;
    }

    addCard(card) {
        this.domNode.appendChild(card.create());
    }

    render() {
        if (this.cards) {
            this.cards.forEach(card => {
                this.domNode.appendChild(card.create())
            });
        } else {
            console.log('Cards array is empty');
        }
    }
}
