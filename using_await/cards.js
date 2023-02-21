const deckOfCards = {  //deck of cards object

    async init() {
        this.deckId = '';
        this.cardsLeft = 52;
        this.zIndex = 0;

        const {data: {deck_id:deckId}} = await axios.get(`https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1`)
        this.deckId = deckId
    },

    getRandomSign() {
        //generate a +1 or a -1 to create rotation to the left or the right when dealing cards
        if (Math.floor(Math.random()*45) >= 27.5) {
            return 1;
        }
        return -1;
    },

    randomRotation() {
        //generate rotation between -45 degrees and +45 degrees for card display;
        let randSign = this.getRandomSign();
            return Math.floor(Math.random() * 45 * randSign);
    },

    addCardToPile(cardObj) {
        this.cardsLeft = cardObj.remaining;
        this.zIndex+=1;
        cardDisplay = document.querySelector('#cards');
        const newCard = document.createElement('img');
        newCard.src=`${cardObj.cards[0].image}`;
        newCard.style.transform = `rotate(${this.randomRotation()}deg)`;
        newCard.style.zIndex = `${this.zIndex}`;
        newCard.style.position = 'absolute';
        cardDisplay.appendChild(newCard);
    },

    async displayNewCard() {
        if (this.cardsLeft > 0) {
            const {data} = await axios.get(`https://deckofcardsapi.com/api/deck/${this.deckId}/draw/?count=1`);

            this.addCardToPile(data);
            } else {
            cardStatus = document.querySelector('#deckStatus');
            cardStatus.innerText = 'Deck Of Cards IS EMPTY';
        }
    }
};

deckOfCards.init();