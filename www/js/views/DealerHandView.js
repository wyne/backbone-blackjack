define([
    'backbone',
    'text!templates/Hand.html',
    'views/CardView',
    'views/HandView'
], function(Backbone, HandTemplate, CardView, HandView) {

    var DealerHandView = HandView.extend({

        render: function() {

            var playRound = this.model.playRound;

            this.$el.html( this.template(
                this.model.getHandValue()
            ) );

            if (playRound !== true){
                console.log('hide');
                this.$el.find('.value').css('visibility', 'hidden');
            }

            this.model.each(function(card, i) {
                var visible = false;
                if (i === 0 ||  playRound === true ){
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