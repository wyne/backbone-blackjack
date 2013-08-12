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

        stay: function() {
            return this;
        },

        playTurn: function() {
            while (this.getHandValue().value < 17){
                this.hit();
            }
        },

        bust: function() {

        }

    });

    return Dealer;
});