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
            var model = _.extend(this.model.toJSON(), {
                handValue: this.model.getHandValue()
            });

            console.log('dealer render');
            this.$el.html(this.template(model));

            this.model.get('hand').each(function(card) {
                this.$el.find('.hand').append(new CardView({
                    model: card
                }).el);
            }, this);

            return this;
        }
    });

    return DealerView;
});