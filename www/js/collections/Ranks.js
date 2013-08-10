define([
    'backbone',
    'models/Rank'
], function(Backbone, Rank) {

    var Ranks = Backbone.Collection.extend({
        model: Rank
    }, {
        allRanks: [
            new Rank({ name:'Ace',      value: 1 }),
            new Rank({ name:'Two',      value: 2 }),
            new Rank({ name:'Three',    value: 3 }),
            new Rank({ name:'Four',     value: 4 }),
            new Rank({ name:'Five',     value: 5 }),
            new Rank({ name:'Six',      value: 6 }),
            new Rank({ name:'Seven',    value: 7 }),
            new Rank({ name:'Eight',    value: 8 }),
            new Rank({ name:'Nine',     value: 9 }),
            new Rank({ name:'Ten',      value: 10 }),
            new Rank({ name:'Jack',     value: 10 }),
            new Rank({ name:'Queen',    value: 10 }),
            new Rank({ name:'King',     value: 10 }),
        ]
    });

    return Ranks;
});