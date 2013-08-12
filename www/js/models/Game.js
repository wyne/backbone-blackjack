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
            decks:                  8
        },

        initialize: function(options) {

            // TODO: put this in new game

            // Initialize dealer shoe
            this.set('shoe', new Shoe(null, {
                decks: this.get('decks')
            }));

            // Initialize dealer
            this.dealer = new Dealer({
                name: 'Dealer',
                shoe: this.get('shoe')
            });

            // Initialize players
            this.players = new Players();
        },

        // Listeners

        betRoundListener: function() {
            console.log('betRoundListener');
            var allBetsSubmitted = this.players.every(function(player) {
                return player.isValid();
            });

            if (allBetsSubmitted) {
                this.stopListening(this.players, 'blackjack:betSubmitted', this.betRoundListener);
                this.startPlayingRound();
            }
        },

        playRoundListener: function() {
            this.stopListening(this.players, 'blackjack:endTurn', this.playRoundListener);
            this.dealer.set('playRound', true);
            this.dealer.playTurn();

            this.evaluateEndGame();
        },

        // Methods

        addPlayer: function(name) {
            var player = new Player({
                name: name,
                shoe: this.get('shoe')
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
                    console.log("Player bust");
                    player.lose();
                } else if (dealerValue > 21){
                    console.log("Dealer Bust");
                    player.win();
                } else if ( playerValue > dealerValue ) {
                    console.log("Player value higher");
                    player.win();
                } else if ( playerValue < dealerValue ) {
                    console.log("Dealer value higher");
                    player.lose();
                }
            }, this);

            // Reset game state
            this.trigger('blackjack:endGame');
            console.log('endGame triggered');
        },

        startBettingRound: function() {
            // Trigger betting round for all listening models/views
            this.trigger('blackjack:startBettingRound');

            this.players.each(function(player) {
                player.set('');
            });

            this.dealer.set('playRound', false);

            this.listenTo(this.players, 'blackjack:betSubmitted', this.betRoundListener);
        },

        startPlayingRound: function() {
            // Trigger betting round for all listening models/views
            this.trigger('blackjack:startPlayingRound');

            console.log('GAME startPlayingRound');

            this.deal();

            this.listenTo(this.players, 'blackjack:endTurn', this.playRoundListener);
        },

        newGame: function() {
            // Clear players' hands
            this.players.each(function(player) {
                player.get('hand').reset();
                console.log('cleaing hand');
                console.log(player.get('hand'));
                player.set('paid', false);
            });

            // Clear dealer's hand
            this.dealer.get('hand').reset();

            this.startBettingRound();
        },

        endTurn: function() {

        }
    });

    // Player State
    //  bet
    //  hand value bust
    //  stand
    // Game state
    //  whose turn
    //  passign turns
    //  Phases - players, dealer, distribute, check end state
    // Dealer State
    //  hand value

    return Game;
});