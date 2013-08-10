define([
    'backbone',
    'models/Card',
    'collections/Deck'
], function(Backbone, Card, Deck) {

    var Shoe = Backbone.Collection.extend({
        model: Card,

        initialize: function(models, options) {
            // Default options
            options = _.extend({
                decks: 8
            }, options);

            // Add a deck
            _.times(options.decks, function() {

                // Create a deck
                var deck = new Deck();

                // Shuffle deck and add to the shoe
                _.each(_.shuffle(deck.models), function(card) {
                    this.push(card);
                }, this);
            }, this);
        }

    });

    return Shoe;
});