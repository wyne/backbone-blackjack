define([
    'backbone',
    'models/Player',
    'collections/Players',
    'collections/Shoe'
], function(Backbone, Player, Players, Shoe) {

    var Game = Backbone.Model.extend({
        defaults: {
            dealerHitsSoft17: false,
            decks: 8
        },

        addPlayer: function(name) {
            var player = new Player({
                name: name,
                shoe: this.shoe
            });

            this.players.push(player);
        },

        startBettingRound: function() {

        },

        startPlayingRound: function() {

        },

        initialize: function() {
            var _this = this;

            // Initialize players
            this.players = new Players();

            // Initialize dealer shoe
            this.shoe = new Shoe(null, {
                decks: this.get('decks')
            });
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