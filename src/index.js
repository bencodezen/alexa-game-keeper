var Alexa = require('alexa-sdk');

exports.handler = function(event, context, callback) {
    var alexa = Alexa.handler(event, context);

    // alexa.appId = 'amzn1.echo-sdk-ams.app.1234';

    ///alexa.dynamoDBTableName = 'YourTableName'; // creates new table for session.attributes

    alexa.registerHandlers(handlers);
    alexa.execute();
};

var handlers = {
    'LaunchRequest': function () {
        this.emit(':tell', 'Welcome to Game Keeper!');
    },

    'AddPlayerIntent': function () {
        var playerName = this.event.request.intent.slots.firstName.value;

        this.attributes['players'].push(playerName);

        this.emit(':tell', playerName + ' added to the roster.');
    },

    'ListPlayersIntent': function() {
        this.emit(':tell', 'The roster includes: ' + this.attributes['players'].join(', '));
    }
};

