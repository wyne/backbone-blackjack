define([
    'backbone',
    'text!templates/Card.html'
], function(Backbone, CardTemplate) {

    var CardView = Backbone.View.extend({
        initialize: function() {
            this.template = _.template( CardTemplate );
            this.render();
        },

        render: function() {
            this.$el.html( this.template(this.model.toJSON()) );

            return this;
        }
    });

    return CardView;
});