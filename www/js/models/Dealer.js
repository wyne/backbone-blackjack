define([
    'backbone',
    'collections/Hand',
    'models/Player'
], function(Backbone, Hand, Player) {

    var Dealer = Player.extend({

        stay: function() {
            return this;
        },

        playTurn: function() {
            if (this.getHandValue().value < 17){
                this.hit();
            }
        }

    });

    return Dealer;
});