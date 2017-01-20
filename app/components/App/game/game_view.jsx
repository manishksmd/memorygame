import React, { Component } from 'react';
import axios from 'axios';

let counter=0;
let countTurns = 0;

export default class GameView extends Component {
    constructor() {
        super();

		this.shuffle.bind(this);
		this.state = {
		D1cards:[],
		D2cards:[],
		deck_id:null,
		event:null,
		deckOneSelected: null,
		deckTwoSelected: null
		};	
        
		const me=this;
    }

    componentDidMount() {

		const me=this;

		// Call API to create new deck
		axios.get('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')
		.then(function (response) {
			
			me.setState({deck_id:response.data.deck_id});

			// Get Cards from Deck API
			axios.get("https://deckofcardsapi.com/api/deck/"+ response.data.deck_id +"/draw/?count=9")
			.then(function (response) {
				me.setState({D1cards:response.data.cards})
			})
			.catch(function (error) {
				console.log(error);
			});
		})
		.catch(function (error) {
			console.log(error);
		});
	}

	shuffle(e) {

		const me=this;
		e.preventDefault();
		
		// Shuffle cards using deck id
		axios.get('https://deckofcardsapi.com/api/deck/'+ this.state.deck_id+'/shuffle/')
		.then(function (response) {

			me.setState({deck_id:response.data.deck_id});
			
			// Get 9 shuffle cards from Deck
			axios.get("https://deckofcardsapi.com/api/deck/"+response.data.deck_id +"/draw/?count=9")
			.then(function (response) {
				me.setState({D1cards:response.data.cards})
			})
			.catch(function (error) {
				console.log(error);
			});
		})
		.catch(function (error) {
			console.log(error);
		});		
	}
  
	shuffleArray(array) {
		for (var i = array.length - 1; i > 0; i--) {
			var j = Math.floor(Math.random() * (i + 1));
			var temp = array[i];
			array[i] = array[j];
			array[j] = temp;
		}
		return array;
	}
		
	changeCardDeckOne(e, card) {
		 
		$(".deck-one .flip-container").unbind().click(function() {  

			if($('.deck-one .disabled').length === 8 || $('.deck-one .disabled').length === 9 && $('.deck-two .disabled').length ===9 ) {

				let PlayerList=JSON.parse(localStorage.getItem("PlayerList"));
				let turnsCount = localStorage.getItem("turnsCount");
				let cp = JSON.parse(localStorage.getItem("CurrentPlayer"));
				$.grep(PlayerList, function(obj) {
					if(obj.email === cp.email) { 
						obj['moves'] = turnsCount;
					}
					localStorage.setItem("PlayerList",JSON.stringify(PlayerList));
				});				 

				$('.success').removeClass("display-none");
				$('.success').html("Congratulations you have done it!").css("display", "");
			}

			if($('.deck-one .hover').length == 1) {

				return false;
			} else {

				counter=counter+1;
				let countTurns = Math.floor(counter / 2);
				console.log("counter : " + countTurns);
				localStorage.setItem("turnsCount",JSON.stringify(counter));
				$('#turns').html(countTurns);
				$(this).addClass('hover');

				if($('.hover').length == 1) {
					return false;
				} else {
					
					const deckOneCardId = $(this).data('cardId');
					const deckTwoCardId = $('.deck-two .hover').data('cardId');

					if(deckOneCardId == deckTwoCardId) {
						
						$('.hover').addClass('disabled').removeClass('hover');
					} else {

						setTimeout(function() {
							$('.hover').removeClass('hover');
						}, 1500);
					}
				}		 
			} 
		});
	}

	changeCardDeckTwo(e, card) {

		 $(".deck-two .flip-container").unbind().click(function(e) { 
			 
			 if($('.deck-two .disabled').length ===8 || $('.deck-two .disabled').length ===9 && $('.deck-one .disabled').length === 9) {

				let PlayerList=JSON.parse(localStorage.getItem("PlayerList"));
				let turnsCount = localStorage.getItem("turnsCount");
				let cp = JSON.parse(localStorage.getItem("CurrentPlayer"));
				$.grep(PlayerList, function(obj) {
					if(obj.email === cp.email) { 
						obj['moves'] = turnsCount;
					}
					localStorage.setItem("PlayerList",JSON.stringify(PlayerList));
				});				 

				$('.success').removeClass("display-none");
				$('.success').html("Congratulations you have done it!").css("display", "");
			 }

			 if($('.deck-two .hover').length == 1) {

				 return false;
			 } else {

				$(this).addClass('hover');

				counter=counter+1;

				let countTurns = Math.floor(counter / 2);

				localStorage.setItem("turnsCount",JSON.stringify(counter));
				$('#turns').html(countTurns);

				if($('.hover').length == 1) {

					return false;
				} else {

					const deckTwoCardId = $(this).data('cardId');
					const deckOneCardId = $('.deck-one .hover').data('cardId');
					if(deckOneCardId == deckTwoCardId) {					

						$('.hover').addClass('disabled').removeClass('hover');
					} else {

						setTimeout(function() {
						$('.hover').removeClass('hover');
						}, 2000);
					}
				}
			 }		
		  });
	}

	renderPosts() {

		return this.state.D1cards.map((card) => {

			return(
				<div className="col-md-4" key={card.code}>
				<div className='flip-container' key={card.code} data-card-id={card.code} onClick={(e)=>this.changeCardDeckOne(e,card)}>
				<div className="flipper">
					<div className="front">
					<img src="https://s-media-cache-ak0.pinimg.com/236x/11/cc/92/11cc9271a79487fd9d3afa714fa9cf9b.jpg" className="img"/>
					
					</div>
					<div className="back" >
					<img src={card.image} className="img"/>
					</div>
				</div>
			</div>
			</div>
			);
		});
	}

	renderPosts2() {

	const cards=this.shuffleArray(this.state.D1cards);
		
		return cards.map((card)=>{
			return(
				<div className="col-md-4" key={card.code}>
				<div className="flip-container" data-card-id={card.code} onClick={(e)=>this.changeCardDeckTwo(e,card)}>
				<div className="flipper">
					<div className="front">
					<img src="https://s-media-cache-ak0.pinimg.com/236x/11/cc/92/11cc9271a79487fd9d3afa714fa9cf9b.jpg" className="img"/>
					</div>
					<div className="back" >
					<img src={card.image} className="img"/>
					</div>
				</div>
			</div>
			</div>
			);
		});
	}
    
	rendorPlayersList(){
		
		let PlayerList=JSON.parse(localStorage.getItem("PlayerList"));
		
		 return PlayerList.map((player,index)=>{
             return(
				  <tr key={player.email}> 
					<td scope="row">{index+1}</td>
					<td>{player.moves}</td>
					<td>{player.name}</td>
				</tr> 
             );
         });
	}

	renderCurrentPlayer() {
		
		let currentPlayer=JSON.parse(localStorage.getItem("CurrentPlayer"));		
		return(
			<div className="row"> 
			<div className="col-md-6">
				<label>Player : {currentPlayer.name}</label>
			</div>
			<div className="col-md-6">
				<label>Email : {currentPlayer.email}</label>
			</div>
			</div>
		);        
	}

	render() {

        const me=this;
        const deck_id = this.props.data;
        const url = "https://deckofcardsapi.com/api/deck/"+deck_id+"/draw/?count=9";  

		return(
			<div className="wrapper" id="wrapper">			
				{/*<!--header section-->*/}
				<header>
					<div className="container">
						{this.renderCurrentPlayer()}
						<hr />
						<div className="row">
							<div className="col-md-10">
							<button className="btn btn-default custom" onClick={(e)=>this.shuffle(e)}>Play / Shuffle</button>
							<button className="btn btn-default custom" >Reset high score</button>
							<span className="success alert alert-success display-succ display-none"></span>
						</div>
						<div className="col-md-2 text-right">
							<span>Turns so far: <strong id="turns">0</strong> </span>
						</div>
					</div>
					</div> 
				</header>
				{/*<!--header section-->*/}
				
				{/*<!--deck sections-->*/}
				<section className="aboutus" id="decks">
					<div className="container">
						<div className="row">						
							<div className="col-md-6 deck-one">
								<fieldset className="decks-border">
								<legend className="decks-border">Deck 1</legend>
									<div className="row">
										{this.renderPosts()}
									</div>
								</fieldset>
							</div>
							<div className="col-md-6 deck-two">
								<fieldset className="decks-border">
								<legend className="decks-border">Deck 2</legend>
									<div className="row">
										{this.renderPosts2()}
									</div>
								</fieldset>
							</div>
						</div>
					</div>
				</section>
				{/*<!--deck sections-->*/}
						
				{/*<!--table section-->*/}
				<section className="table" id="table">
					<div className="container">
						<div className="row">
							<div className="col-md-12">
							<div className="table-responsive">
							<table className="table table-bordered table-striped">
								<thead> 
								<tr> 
								<th width="5%">#</th>
								<th width="10%">Turns</th>
								<th width="85%">Name</th>
								</tr>
							</thead>
							<tbody>							
								{this.rendorPlayersList()}
							</tbody>
							</table>
							</div>
							</div>
						</div>
					</div>
				</section>
				{/*<!--table section-->*/}
		</div>
);
	}
}