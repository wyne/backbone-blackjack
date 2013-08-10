define([
    'backbone',
    'models/Player'
], function(Backbone, Player) {

    var Hand = Backbone.Collection.extend({
        model: Player
    });

    return Hand;
});