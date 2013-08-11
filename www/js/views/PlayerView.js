define([
    'backbone',
    'text!templates/Player.html',
    'views/CardView'
], function(Backbone, PlayerTemplate, CardView) {

    var PlayerView = Backbone.View.extend({
        initialize: function() {
            // Register events
            this.model.on('all', this.render, this);
            this.model.get('hand').on('all', this.render, this);

            this.template = _.template(PlayerTemplate);
            this.render();
        },

        events: {
            'click .hit': 'hit',
            'click .bet': 'bet',
            'click .stand': 'stand'
        },

        bet: function(e) {
            e.preventDefault();

            this.model.bet(this.$el.find('.betAmount').val());
        },

        hit: function(e) {
            e.preventDefault();

            this.model.drawCard();
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

            this.model.get('hand').each(function(card) {
                this.$el.find('.hand').append(new CardView({
                    model: card
                }).el);
            }, this);

            return this;
        }
    });

    return PlayerView;
});