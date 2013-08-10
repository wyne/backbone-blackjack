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
            // TODO require a shoe
            this.shoe = options.shoe;

            console.log('New player! Name: ' + options.name);
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

        hit: function() {
            return this;
        },

        stay: function() {
            return this;
        },

        getHandValue: function() {
            var val = _.reduce(this.get('hand').models, function(value, card) {
                return value + card.get('rank').get('value');
            }, 0);
            return val;
        },

        placeBet: function() {
            return this;
        }
    });

    return Player;
});