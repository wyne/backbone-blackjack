define([
    'backbone',
    'collections/Hand'
], function(Backbone, Hand) {

    var Player = Backbone.Model.extend({
        defaults: {
            name: 'Anonymous',
            cash: 500,
            maxAllowedBet: 100,
            bet: 10
        },

        initialize: function(options) {
            this.on('invalid', function(model, error) {
                console.log('INVALID');
            });

            if (_.isUndefined(options.shoe)){
                throw 'Each player must link to a dealer\'s shoe to draw cards!';
            }

            this.set('hand', new Hand());
            this.set('shoe', options.shoe);
        },

        validate: function(attrs, options) {
            if (attrs.bet > this.get('maxAllowedBet')){
                return 'Bet must not exceed ' + this.maxAllowedBet
            }

        },

        drawCard: function() {
            var card = this.get('shoe').pop();
            console.log(this.get('name') + ' drew a ' + card.get('rank').get('name') + ' of ' + card.get('suit').get('name'));
            this.get('hand').push(card);

            return this;
        },

        adjustCash: function(amount) {
            this.set('cash', this.get('cash') + amount);
            return this;
        },

        hit: function() {
            this.drawCard();
        },

        stand: function() {
            this.trigger('endTurn');
            return this;
        },

        bet: function(amount) {
            this.set({
                'bet': amount
            }, {
                'validate': true
            });

            if (this.isValid()){
                console.log('trigger');
                this.trigger('betSubmitted');
            }

            return this;
        },

        getHandValue: function() {
            var hand = this.get('hand').models,
                type = 'Hard',
                val = 0,
                aceCount = 0;

            // Iterate through all cards and sum their values
            value = _.reduce(hand, function(value, card) {
                var cardValue = card.get('rank').get('value');
                return value + cardValue;
            }, 0);

            // Count aces to accommodate for Soft Hands
            aceCount = _.filter(hand, function(card) {
                return card.get('rank').get('value') === 1;
            }).length;

            // If Soft Hand
            if (aceCount > 0 && value < 12){
                value += 10;
                type = 'Soft';
            }

            return {
                'type': type,
                'value': value
            };
        }
    });

    return Player;
});