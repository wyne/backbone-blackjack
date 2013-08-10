define([
    'backbone',
    'models/Card',
    'text!templates/Game.html',
    'views/PlayerView'
], function(Backbone, Card, GameTemplate, PlayerView) {

    var GameView = Backbone.View.extend({

        el: 'body',

        initialize: function() {
            this.template = _.template(GameTemplate);
            this.render();
        },

        render: function() {
            this.$el.empty();
            this.$el.html( this.template() );

            this.model.players.each(function(player) {
                var playerView = new PlayerView({
                    model: player
                });

                this.$('.players').append( playerView.$el );
            }, this);

            return this;
        }
    });

    return GameView;
});