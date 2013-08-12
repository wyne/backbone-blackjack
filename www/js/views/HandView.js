define([
    'backbone',
    'text!templates/Hand.html',
    'views/CardView'
], function(Backbone, HandTemplate, CardView) {

    var HandView = Backbone.View.extend({
        initialize: function(options) {
            // Register events
            this.model.on('all', this.render, this);

            this.template = _.template(HandTemplate);

            // Save a reference to the view
            this.model.view = this;

            this.render();
        },

        render: function() {

            if ( this.model.length === 0){
                this.$el.empty();
            } else {
                this.$el.html( this.template(
                    this.model.getHandValue()
                ) );
            }

            this.model.each(function(card) {
                this.$el.find('.hand').append(new CardView({
                    model: card
                }).el);
            }, this);

            return this;
        }

    });

    return HandView;
});