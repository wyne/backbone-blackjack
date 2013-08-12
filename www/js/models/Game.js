define([
    'backbone',
    'models/Player',
    'collections/Players',
    'collections/Shoe',
    'models/Dealer',
    'views/PlayerView'
], function(Backbone, Player, Players, Shoe, Dealer, PlayerView) {

    /**
     * This Game object will coordinate most of the game state.
     * Other models will subscribe to the events triggered here.
     */
    var Game = Backbone.Model.extend({

        defaults: {
            dealerHitsSoft17:       false,
            payoutRatio:            1/1,
            blackjackPayoutRatio:   3/2,
            decks:                  8,
            shufflePoint:           0.75
        },

        initialize: function(options) {

            // Initialize dealer shoe
            this.set('shoe', new Shoe(null, {
                decks: this.get('decks')
            }));

            // Initialize dealer
            this.dealer = new Dealer({
                name: 'Dealer',
                shoe: this.get('shoe'),
                game: this
            });

            // Initialize players
            this.players = new Players();
        },

        // Listeners

        betRoundListener: function() {
            var allBetsSubmitted = this.players.every(function(player) {
                return player.isValid();
            });

            // If all bets are in, then start play
            if (allBetsSubmitted) {
                this.stopListening(this.players, 'blackjack:betSubmitted', this.betRoundListener);
                this.startPlayingRound();
            }
        },

        playRoundListener: function() {
            this.stopListening(this.players, 'blackjack:endTurn', this.playRoundListener);

            // Tell the dealer to play it's turn
            this.dealer.playTurn();

            // Evaluate the state and declare a winner
            this.evaluateEndGame();
        },

        // Game Phases
        
        startBettingRound: function() {
            // Trigger betting round for all listening models/views
            this.trigger('blackjack:startBettingRound');

            this.clearAlert();

            this.dealer.get('hand').playRound = false;

            this.listenTo(this.players, 'blackjack:betSubmitted', this.betRoundListener);
        },

        startPlayingRound: function() {
            // Trigger betting round for all listening models/views
            this.trigger('blackjack:startPlayingRound');

            this.clearAlert();

            // Deal cards to players and dealer
            this.deal();

            this.listenTo(this.players, 'blackjack:endTurn', this.playRoundListener);
        },

        newGame: function() {
            this.clearAlert();

            // Clear players' hands
            this.players.each(function(player) {
                player.get('hand').reset();
                player.set('paid', false);
            });

            // Clear dealer's hand
            this.dealer.get('hand').reset();

            // Reshuffle card in dealer shoe
            if (this.get('shoe').length < (1 - this.shufflePoint * this.decks * 52)){
                this.get('shoe').restart();
            }

            this.startBettingRound();
        },

        // Helper Methods
        
        alert: function(msg, type) {
            this.view.alert(msg, type);
        },

        clearAlert: function() {
            this.view.clearAlert();
        },

        addPlayer: function(name) {
            var player = new Player({
                name: name,
                shoe: this.get('shoe'),
                game: this
            });

            var playerView = new PlayerView({
                model: player,
                game: this
            });

            this.players.push(player);
        },

        deal: function() {
            _.times(2, function() {
                this.players.each(function(player) {
                    player.drawCard();
                });

                this.dealer.drawCard();

            }, this);

        },

        evaluateEndGame: function() {
            var dealerValue = this.dealer.getHandValue().value;

            var playersToEvaluate = this.players.filter(function(player) {
                return !player.get('paid');
            });

            new Players(playersToEvaluate).each(function(player) {
                var playerValue = player.getHandValue().value;

                if (playerValue > 21) {
                    this.alert('BUST! Sorry, you lose.', 'error');
                    player.lose();
                } else if (dealerValue > 21){
                    this.alert('You win! The dealer bust.', 'success');
                    player.win();
                } else if ( playerValue > dealerValue ) {
                    this.alert('You win!', 'success');
                    player.win();
                } else if ( playerValue < dealerValue ) {
                    this.alert('You lose.', 'error');
                    player.lose();
                } else {
                    this.alert("It's a push");
                }
            }, this);

            // Reset game state
            this.trigger('blackjack:endGame');
        }

    });

    return Game;
});