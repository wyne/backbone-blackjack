define([
    'backbone',
    'text!templates/Player.html'
], function(Backbone, PlayerTemplate) {

    var PlayerView = Backbone.View.extend({
        initialize: function() {
            // Register events
            this.model.on('all', this.render, this);

            this.template = _.template( PlayerTemplate );
            this.render();
        },

        render: function() {
            this.$el.html( this.template(this.model.toJSON()) );

            return this;
        }
    });

    return PlayerView;
});