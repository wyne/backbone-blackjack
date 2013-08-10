define([
    'backbone',
    'models/Card'
], function(Backbone, Card) {

    var GameView = Backbone.View.extend({

        el: 'body',

        initialize: function() {
            this.render();
        },

        render: function() {
            this.$el.empty();
            this.$el.append('<h1>BlackJack</h1>');

            return this;
        }
    });

    return GameView;
});