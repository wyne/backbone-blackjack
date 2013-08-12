define([
    'backbone',
    'collections/Hand',
    'models/Player',
    'views/DealerHandView'
], function(Backbone, Hand, Player, DealerHandView) {

    var Dealer = Player.extend({

        generateHandView: function() {
            new DealerHandView({
                model: this.get('hand')
            });
        },

        playTurn: function() {
            // Hit while less than 17
            while (this.getHandValue().value < 17){
                this.hit();
            }

            // Tell the hand to reveal all cards
            this.get('hand').playRound = true;

            // Render the view
            this.get('hand').view.render();
        },

        bust: function() {

        }

    });

    return Dealer;
});