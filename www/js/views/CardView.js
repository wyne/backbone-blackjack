define([
    'backbone',
    'text!templates/Card.html'
], function(Backbone, CardTemplate) {

    var CardView = Backbone.View.extend({
        className: 'card',

        initialize: function(options) {
            if (_.isBoolean(options.visible)) {
                this.visible = options.visible;
            } else {
                this.visible = true;
            }

            this.template = _.template(CardTemplate);
            this.render();
        },

        render: function() {
            if (!this.visible){
                this.$el.addClass('face-down');
            }

            this.$el.html(this.template(this.model.toJSON()));

            return this;
        }
    });

    return CardView;
});