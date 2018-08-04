import React from 'react';

class Blackjack extends React.Component {
	constructor() {
		super();
		this.state = {
			deck: [],
			currentCard: 'No More Cards',
			currentHand: [],
			dealerHand: []
		};
		this.drawCard = this.drawCard.bind(this);
		this.shuffleDeck = this.shuffleDeck.bind(this);
		this.hitMe = this.hitMe.bind(this);

		this.cards = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'Jack', 'Queen', 'King', 'Ace'];
		this.bust = false;
		this.dealerBust = false;
		this.tempDeck = [];
	}
	shuffleDeck() {
		if (this.state.currentCard == 'No More Cards' || this.bust) {
			let newDeck = [];
			let currHand = [];
			let currDealerHand = [];
			this.bust = false;
			for (let i = 0; i < 4; i++) {
				for (let j = 0; j < this.cards.length; j++) {
					newDeck.push(this.cards[j]);
				}
			}
			this.tempDeck = newDeck;
			let cardLength = this.tempDeck.length;
			let index = 0;
			newDeck = [];
			for (let i = 0; i < cardLength; i++) {
				index = Math.floor(Math.random() * this.tempDeck.length);
				newDeck.push(this.tempDeck[index]);
				this.tempDeck.splice(index, 1);
			}

			this.setState({
				currentCard: 'Ready to Play', deck: newDeck, currentHand: currHand,
				dealerHand: currDealerHand
			});
			this.initializeGame();

		}
	}



	drawCard() {
		if (this.state.deck.length > 0 && !this.bust && !this.dealerBust) {
			let currCard = this.state.deck[this.state.deck.length - 1];
			let newDeck = this.state.deck.slice(0, this.state.deck.length - 1);
			this.setState({ deck: newDeck });
			return currCard;
		}
		else {
			this.setState({ currentCard: 'No More Cards', deck: [] });
			return -1;
		}
	}

	hitMe() {
		if (this.bust) {
			this.setState({ currentCard: 'You went over 21 :(' });
			return;
		}
		let currHand = this.state.currentHand;
		if (this.state.deck.length > 0) {
			let card = this.drawCard();
			currHand.push(card);

			let total = 0;
			for (let i = 0; i < currHand.length; i++) {
				total += this.getNum(currHand[i]);
			}
			if (total > 21) {
				console.log("Bust: " + total);
				this.setState({ currentHand: currHand, currentCard: card });
				this.bust = true;
			}
			else {
				this.setState({ currentHand: currHand, currentCard: card });
			}
		}
	}
	hitDealer() {
		let currDealerHand = this.state.dealerHand;
		let card = this.drawCard();
		console.log(card);
		currDealerHand.push(card);

		let total = 0;
		for (let i = 0; i < currDealerHand.length; i++) {
			total += this.getNum(currDealerHand[i]);
		}
		if (total > 21) {
			console.log("Bust: " + total);
			this.bust = true;
		}
		this.setState({ dealerHand: currDealerHand });
	}

	initializeGame() {
		this.hitMe();
		//this.hitDealer();
		this.hitMe();
		//this.hitDealer();
	}

	getNum(str) {
		if (str == 'Jack' || str == 'Queen' || str == 'King') {
			return 10;
		}
		else if (str == 'Ace') {
			return 11;
		}
		else {
			return parseInt(str, 10);
		}
	}

	stand() {

	}


	render() {
		return (
			<div>
				<button onClick={this.shuffleDeck}>Shuffle Deck</button>
				<h1>Cards in deck: {this.state.deck.length}</h1>
				<h1>{this.state.currentCard}</h1>
				<button onClick={this.hitMe}>Hit Me!</button>
				<button onClick={this.stand}>Stand</button>
				<h1>Dealer Hand: {this.state.dealerHand.join(', ')} </h1>
				<h1>Current Hand: {this.state.currentHand.join(', ')}</h1>
			</div>
		)
	}
}

export default Blackjack;