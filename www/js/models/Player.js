define([
    'backbone',
    'collections/Hand',
    'views/HandView'
], function(Backbone, Hand, HandView) {

    var Player = Backbone.Model.extend({
        defaults: {
            name: 'Anonymous',
            cash: 500,
            maxAllowedBet: 100,
            bet: 50
        },

        initialize: function(options) {
            // Attach Game
            this.game = options.game;

            this.listenTo(this.game, 'blackjack:startBettingRound', this.startBettingRound);

            this.on('invalid', function(model, error) {
                console.log('Invalid bet. ' + error);
                this.game.alert(error);
                this.setDefaultBet();
            }, this);

            if (_.isUndefined(options.shoe)){
                throw 'Each player must link to a dealer\'s shoe to draw cards!';
            }

            this.set('hand', new Hand());
            this.generateHandView();

            this.set('shoe', options.shoe);
        },

        startBettingRound: function() {
            this.setDefaultBet();
        },

        setDefaultBet: function() {
            this.set('bet', _.min([this.get('cash'), this.defaults.bet]));
        },

        generateHandView: function() {
            new HandView({
                model: this.get('hand')
            });
        },

        validate: function(attrs, options) {
            if (attrs.bet > this.get('maxAllowedBet')){
                return 'Bet must not exceed ' + this.get('maxAllowedBet');
            }

            if (attrs.bet > this.get('cash')) {
                return 'You cannot bet more than you own!';
            }

            if (attrs.bet < 0){
                return 'You must bet a positive amount';
            }

        },

        bust: function() {
            console.log(this.get('name') + ' busted!');
            this.endTurn();
            // this.lose();
        },

        endTurn: function() {
            this.trigger('blackjack:endTurn');
        },

        validateHand: function() {
            if (this.getHandValue().value > 21){
                this.bust();
            }
        },

        drawCard: function() {
            var card = this.get('shoe').pop();
            console.log(this.get('name') + ' drew a ' + card.get('rank').get('name') + ' of ' + card.get('suit').get('name'));
            this.get('hand').push(card);

            return this;
        },

        adjustCash: function(amount) {
            if ( _.isString(amount)){
                amount = parseInt(amount, 10);
            }
            this.set('cash', this.get('cash') + amount);

            this.set('paid', true);
            return this;
        },

        hit: function() {
            this.drawCard();
            this.validateHand();

            return this;
        },

        stand: function() {
            this.endTurn();
            return this;
        },

        changeBet: function(amount) {
            this.set({
                'bet': amount
            }, {
                validate: true
            });
        },

        bet: function() {
            this.trigger('blackjack:betSubmitted');

            return this;
        },

        getHandValue: function() {
            var hand = this.get('hand').models,
                type = 'Hard',
                val = 0,
                aceCount = 0;

            // Iterate through all cards and sum their values
            value = _.reduce(hand, function(value, card) {
                var cardValue = card.get('rank').get('value');
                return value + cardValue;
            }, 0);

            // Count aces to accommodate for Soft Hands
            aceCount = _.filter(hand, function(card) {
                return card.get('rank').get('value') === 1;
            }).length;

            // If Soft Hand
            if (aceCount > 0 && value < 12){
                value += 10;
                type = 'Soft';
            }

            return {
                'type': type,
                'value': value
            };
        },

        win: function() {
            console.log("win!");
            this.adjustCash( this.get('bet') );
        },

        lose: function() {
            console.log("lose!");
            this.adjustCash( this.get('bet') * -1);
        }
    });

    return Player;
});