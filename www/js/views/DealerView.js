define([
    'backbone',
    'text!templates/Dealer.html',
    'views/CardView'
], function(Backbone, DealerTemplate, CardView) {

    var DealerView = Backbone.View.extend({
        initialize: function() {
            // Register events
            this.model.on('all', this.render, this);
            this.model.get('hand').on('all', this.render, this);

            this.template = _.template(DealerTemplate);
            this.render();
        },

        render: function() {
            this.$el.empty();

            var model = _.extend(this.model.toJSON(), {
                handValue: this.model.getHandValue()
            });

            this.$el.html(this.template(model));

            this.model.get('hand').each(function(card, i) {
                var visible = (i==1) ? false : true;

                this.$el.find('.hand').append(new CardView({
                    model: card,
                    visible: visible
                }).el);
            }, this);

            return this;
        }
    });

    return DealerView;
});