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

            // Save reference to view
            this.model.view = this;

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
        
        alert: function(msg, type) {
            var el = this.$el.find('#alert');

            if (_.isString(type)){
                el.addClass('alert-' + type);
            }

            el.show().html(msg);
        },

        clearAlert: function() {
            this.$el.find('.alert').removeClass().addClass('alert').hide();
        },

        deal: function(e) {
            // Prevent default link actions
            e.preventDefault();

            // Deal a new game
            this.model.deal();
        },

        startBettingRound: function() {
            this.$el.find('#new-game').css('visibility', 'hidden');
        },

        endGame: function() {
            this.$el.find('#new-game').css('visibility', 'visible');
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
            this.model.players.each(function(player) {
                this.$('.players').append( player.view.$el );
            }, this);

            return this;
        }
    });

    return GameView;
});