define([
    'backbone',
    'models/Card'
], function(Backbone, Card) {

    var Hand = Backbone.Collection.extend({
        model: Card
    });

    return Hand;
});