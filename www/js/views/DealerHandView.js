define([
    'backbone',
    'text!templates/Hand.html',
    'views/CardView',
    'views/HandView'
], function(Backbone, HandTemplate, CardView, HandView) {

    var DealerHandView = HandView.extend({

        render: function() {

            this.$el.html( this.template(
                this.model.getHandValue()
            ) );

            this.model.each(function(card, i) {
                var visible = false;
                if (i === 0 || this.model.playRound === true ){
                    visible = true;
                }

                this.$el.find('.hand').append(new CardView({
                    model: card,
                    visible: visible
                }).el);
            }, this);

            return this;
        }

    });

    return DealerHandView;
});