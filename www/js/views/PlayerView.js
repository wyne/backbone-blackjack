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
            // this.model.get('hand').on('all', this.renderHand, this);

            this.template = _.template(PlayerTemplate);

            // Register Game Events
            this.listenTo(this.game, 'blackjack:startBettingRound', this.startBettingRound);
            this.listenTo(this.game, 'blackjack:startPlayingRound', this.startPlayingRound);
            this.listenTo(this.game, 'blackjack:endGame', this.endGame);

            // Save a reference to the view
            this.model.view = this;

            // this.handView = new HandView({ model: this.model.get('hand') });

            this.render();
        },

        events: {
            'click .hit':       'hit',
            'click .stand':     'stand',
            'click .bet':       'bet',
            'click .betPlus':   'betPlus',
            'click .betMinus':  'betMinus'
        },

        betPlus: function(e) {
            e.preventDefault();
            this.model.changeBet( this.model.get('bet') + 1);
        },

        betMinus: function(e) {
            e.preventDefault();
            this.model.changeBet( this.model.get('bet') - 1);
        },

        bet: function(e) {
            e.preventDefault();

            this.model.bet(this.$el.find('.betAmount').val());
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

            this.$el.append( this.model.get('hand').view.$el );

            console.log('render playerview');

            return this;
        },

        // renderHand: function() {
        //     console.log('render playerview hand');

        //     var el = this.$el.find('.hand');

        //     el.empty();

        //     this.model.get('hand').each(function(card) {
        //         el.append(new CardView({
        //             model: card
        //         }).el);
        //     });
        // },

        // Listener Methods

        startBettingRound: function() {
            this.$el.find('.btn').hide();
            this.$el.find('.btn.bet').show();
        },

        startPlayingRound: function() {
            console.log('playerview playing round');
            this.$el.find('.btn').hide();
            this.$el.find('.hit, .stand').show();
        },

        endGame: function() {
            console.log('playerView endGame');
            console.log(this.$('.btn'));
            this.$('.btn').hide();
        }
    });

    return PlayerView;
});