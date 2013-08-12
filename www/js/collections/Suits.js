define([
    'backbone',
    'models/Suit'
], function(Backbone, Suit) {

    var Suits = Backbone.Collection.extend({
        model: Suit
    }, {
        allSuits: [
            new Suit({ name: 'Diamonds' }),
            new Suit({ name: 'Clubs' }),
            new Suit({ name: 'Hearts' }),
            new Suit({ name: 'Spades' })
        ]
    });

    return Suits;
});