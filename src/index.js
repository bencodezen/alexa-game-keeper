var Alexa = require('alexa-sdk');

exports.handler = function(event, context, callback) {
    var alexa = Alexa.handler(event, context);

    // alexa.appId = 'amzn1.echo-sdk-ams.app.1234';

    ///alexa.dynamoDBTableName = 'YourTableName'; // creates new table for session.attributes

    alexa.registerHandlers(handlers);
    alexa.execute();
};

var state = {
    players: []
}

var handlers = {
    'LaunchRequest': function () {
        this.emit(':tell', 'Welcome to Game Keeper!');
    },

    'AddPlayerIntent': function () {
        var playerName = this.event.request.intent.slots.firstName.value;

        state.players.push(playerName);
        state[playerName] = {
            "score": 0
        };

        this.emit(':tell', playerName + ' added to the roster.');
    },

    'DecreaseScoreForIntent': function() {
        var playerName = this.event.request.intent.slots.firstName.value;
        var scoreAmount = this.event.request.intent.slots.scoreAmount.value;

        state[playerName].score -= Number(scoreAmount);

        this.emit(':tell', scoreAmount + ' removed from ' + playerName + ' score.');
    },

    'IncreaseScoreForIntent': function() {
        var playerName = this.event.request.intent.slots.firstName.value;
        var scoreAmount = this.event.request.intent.slots.scoreAmount.value;

        state[playerName].score += Number(scoreAmount);

        this.emit(':tell', scoreAmount + ' added to ' + playerName + ' score.');
    },

    'GetScoreForIntent': function() {
        var playerName = this.event.request.intent.slots.firstName.value;
        var playerScore = state[playerName].score;

        this.emit(':tell', playerName + ' score is ' + playerScore);
    },

    'ListPlayersIntent': function() {
        this.emit(':tell', 'The roster includes: ' + state.players.join(', '));
    }
};

