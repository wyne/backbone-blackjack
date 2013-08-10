requirejs.config({
    baseUrl: '/js/', // Default from data-main path in index.html
    paths: {
        jquery: 'libs/jquery-1.9.1.min',
        underscore: 'libs/underscore-1.4.4-min',
        backbone: 'libs/backbone-1.0.0-min',
        templates: '../templates'
    },
    shim: {
        'backbone': {
            deps: ['underscore', 'jquery'],
            exports: 'Backbone'
        },
        'underscore': {
            exports: '_'
        }
    }
});

require([
    'models/Rank',
    'models/Suit',
    'collections/Ranks',
    'collections/Suits',
    'collections/Shoe',
    'models/Player',
    'views/PlayerView',
    'views/GameView',
    'models/Game'
], function(Rank, Suit, Ranks, Suits, Shoe, Player, PlayerView, GameView, Game) {

    var game = new Game();

    game.addPlayer('Justin');

    var view = new GameView({ model: game });

});