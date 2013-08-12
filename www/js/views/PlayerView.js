define([
    'backbone',
    'text!templates/Player.html',
    'views/HandView'
], function(Backbone, PlayerTemplate, HandView) {

    var PlayerView = Backbone.View.extend({

        initialize: function(options) {
            // Attach game
            this.game = options.game;

            // Register events
            this.model.on('change:cash', this.render, this);
            this.model.on('change:bet', this.render, this);

            // Set up template
            this.template = _.template(PlayerTemplate);

            // Register Game Events
            this.listenTo(this.game, 'blackjack:startBettingRound', this.startBettingRound);
            this.listenTo(this.game, 'blackjack:startPlayingRound', this.startPlayingRound);
            this.listenTo(this.game, 'blackjack:endGame', this.endGame);

            // Save a reference to the view
            this.model.view = this;

            // Render
            this.render();
        },

        events: {
            'click .hit':           'hit',
            'click .stand':         'stand',
            'click .place-bet':     'bet',
            'click .incBet':        'incBet',
            'click .incBetLarge':   'incBetLarge',
            'click .decBet':        'decBet',
            'click .decBetLarge':   'decBetLarge'
        },

        incBet: function(e) {
            e.preventDefault();
            this.model.changeBet( this.model.get('bet') + 1);
        },

        incBetLarge: function(e) {
            e.preventDefault();
            this.model.changeBet( this.model.get('bet') + 10);
        },

        decBet: function(e) {
            e.preventDefault();
            this.model.changeBet( this.model.get('bet') - 1);
        },

        decBetLarge: function(e) {
            e.preventDefault();
            this.model.changeBet( this.model.get('bet') - 10);
        },

        bet: function(e) {
            e.preventDefault();

            var amount = this.$el.find('.betAmount').val();

            this.model.bet(amount);
        },

        hit: function(e) {
            e.preventDefault();

            this.model.hit();
        },

        stand: function(e) {
            e.preventDefault();

            this.model.stand();
        },

        render: function() {
            var model = _.extend(this.model.toJSON(), {
                handValue: this.model.getHandValue()
            });

            this.$el.html(this.template(model));

            this.$el.find('.btn').hide();

            if (this.betRound === true){
                this.startBettingRound();
            }

            this.$el.append( this.model.get('hand').view.$el );

            return this;
        },

        startBettingRound: function() {
            this.betRound = true;

            // Disable other buttons
            this.$el.find('.btn').hide();

            // Enable bet button
            this.$el.find('.btn.bet').show();
        },

        startPlayingRound: function() {
            this.betRound = false;

            // Disable other buttons
            this.$el.find('.btn').hide();

            // Enable play buttons
            this.$el.find('.hit, .stand').show();
        },

        endGame: function() {
            this.$('.btn').hide();
        }
    });

    return PlayerView;
});