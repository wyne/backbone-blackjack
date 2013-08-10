define([
    'backbone',
    'models/Card',
    'collections/Suits',
    'collections/Ranks'
], function(Backbone, Card, Suits, Ranks) {

    var Deck = Backbone.Collection.extend({
        model: Card,

        initialize: function() {
            // Create a new deck with 52 cards
            _.each(Suits.allSuits, function(suit) {
                _.each(Ranks.allRanks, function(rank) {
                    this.push(new Card({
                        suit: suit,
                        rank: rank
                    }));
                }, this);
            }, this);
        }
    });

    return Deck;
});
