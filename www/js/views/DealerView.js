define([
    'backbone',
    'text!templates/Dealer.html',
    'views/CardView'
], function(Backbone, DealerTemplate, CardView) {

    var DealerView = Backbone.View.extend({
        initialize: function(options) {
            // Attach Game
            this.game = options.game;

            // Register events
            this.model.on('all', this.render, this);

            // Set up template
            this.template = _.template(DealerTemplate);

            // Save a reference to the view
            this.model.view = this;

            // Render
            this.render();
        },

        render: function() {
            this.$el.empty();

            this.$el.html(this.template(this.model));

            this.$el.append( this.model.get('hand').view.$el );

            return this;
        }
    });

    return DealerView;
});