define([
    'backbone',
    'models/Card',
    'text!templates/Game.html',
    'views/PlayerView',
    'views/DealerView'
], function(Backbone, Card, GameTemplate, PlayerView, DealerView) {

    var GameView = Backbone.View.extend({

        el: 'body',

        initialize: function() {
            this.template = _.template(GameTemplate);
            this.render();
        },

        render: function() {
            this.$el.empty();
            this.$el.html( this.template() );

            // Append dealer view
            this.$('.dealer').append( new DealerView({ model: this.model.dealer }).$el );
            
            // Append player views
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