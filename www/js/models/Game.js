define([
    'backbone',
    'models/Player',
    'collections/Players',
    'collections/Shoe',
    'models/Dealer'
], function(Backbone, Player, Players, Shoe, Dealer) {

    var Game = Backbone.Model.extend({
        defaults: {
            dealerHitsSoft17: false,
            decks: 8
        },

        addPlayer: function(name) {
            var player = new Player({
                name: name,
                shoe: this.get('shoe')
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

        betRoundListener: function() {
            var allBetsSubmitted = this.players.every(function(player) {
                return player.isValid();
            });

            if (allBetsSubmitted) {
                this.stopListening(this.players, 'betSubmitted', this.betRoundListener);
                this.startPlayingRound();
            }
        },

        playRoundListener: function() {
            this.stopListening(this.players, 'endTurn', this.playRoundListener);
            console.log('dealer\'s turn!');
            this.dealer.playTurn();
        },

        startBettingRound: function() {
            this.players.each(function(player) {
                player.set('');
            });

            console.log('set listener');
            this.listenTo(this.players, 'betSubmitted', this.betRoundListener);
        },

        startPlayingRound: function() {
            this.deal();

            this.listenTo(this.players, 'endTurn', this.playRoundListener);
        },

        initialize: function() {
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

        newGame: function() {

            // Clear players' hands
            this.players.each(function(player) {
                player.get('hand').reset();
            });

            // Clear dealer's hand
            this.dealer.get('hand').reset();
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