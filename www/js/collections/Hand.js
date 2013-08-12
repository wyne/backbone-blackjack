define([
    'backbone',
    'models/Card'
], function(Backbone, Card) {

    var Hand = Backbone.Collection.extend({

        model: Card,

        initialize: function() {
        	console.log("INIT HAND!");
        	this.value = 0;

        	this.type = 'hard';
        },

        getHandValue: function() {
            var type = 'Hard',
                value = 0,
                aceCount = 0;

            // Iterate through all cards and sum their values
            value = _.reduce(this.models, function(value, card) {
                var cardValue = card.get('rank').get('value');
                return value + cardValue;
            }, 0);

            // Count aces to accommodate for Soft Hands
            aceCount = _.filter(this.models, function(card) {
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

    return Hand;
});