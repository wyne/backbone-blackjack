define([
    'backbone',
    'collections/Hand'
], function(Backbone, Hand) {

    var Player = Backbone.Model.extend({
        defaults: {
            name: 'Anonymous',
            hand: new Hand(),
            cash: 500
        },

        initialize: function(options) {
            if (_.isUndefined(options.shoe)){
                throw "Each player must have a dealer's shoe to draw cards from!";
            }

            this.shoe = options.shoe;
        },

        drawCard: function() {
            var card = this.shoe.pop();
            console.log(this.get('name') + ' drew a ' + card.get('rank').get('name') + ' of ' + card.get('suit').get('name'));
            this.get('hand').push(card);

            return this;
        },

        adjustCash: function(amount) {
            this.set('cash', this.get('cash') + amount);
            console.log(this.get('cash'));
            return this;
        },

        stay: function() {
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
        },

        placeBet: function() {
            return this;
        }
    });

    return Player;
});