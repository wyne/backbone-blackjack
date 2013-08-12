define([
    'backbone',
    'models/Card',
    'text!templates/Game.html',
    'views/PlayerView',
    'views/DealerView'
], function(Backbone, Card, GameTemplate, PlayerView, DealerView) {

    var GameView = Backbone.View.extend({

        el: 'body',

        initialize: function(options) {
            // For convenience and consistency with other views
            this.game = this.model;

            // Set up template
            this.template = _.template(GameTemplate);

            // Triggers
            this.listenTo(this.game, 'blackjack:startBettingRound', this.startBettingRound);
            this.listenTo(this.game, 'blackjack:endGame', this.endGame);

            // Render Game View
            this.render();
        },

        // UI events

        events: {
            "click #new-game" : "btnNewGame"
        },

        btnNewGame: function(e) {
            // Prevent default link actions
            e.preventDefault();

            // Tell Game Object to start a new game
            this.model.newGame();
        },

        // Methods

        deal: function(e) {
            // Prevent default link actions
            e.preventDefault();

            // Deal a new game
            this.model.deal();
        },

        startBettingRound: function() {
            this.$el.find('#new-game').hide();
        },

        endGame: function() {
            this.$el.find('#new-game').show();
        },

        render: function() {
            this.$el.empty();
            this.$el.html( this.template() );

            // Append dealer view
            var dealerView = new DealerView({
                model: this.model.dealer,
                game: this.game
            });

            this.$('.dealer').append( dealerView.$el );
            
            // Append player views
            console.log('this game');
            console.log(this.model);
            this.model.players.each(function(player) {
                this.$('.players').append( player.view.$el );
            }, this);

            return this;
        }
    });

    return GameView;
});