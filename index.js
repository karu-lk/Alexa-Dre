var Alexa = require('alexa-sdk');
const skillName = "Dre";

exports.handler = function (event, context) {
    var alexa = Alexa.handler(event, context);
    alexa.appId = "amzn1.ask.skill.36549ff4-b592-4c2e-af72-4301fbf72b7b";
    alexa.registerHandlers(newSessionHandlers, startDreHandlers);
    alexa.execute();
};

var states = {
    ENDMODE: '_ENDMODE',
    STARTMODE: '_STARTMODE'
};

var newSessionHandlers = {
    'NewSession': function () {
        // if(Object.keys(this.attributes).length === 0) {
        //     this.attributes['endedSessionCount'] = 0;
        //     this.attributes['gamesPlayed'] = 0;
        // }
        this.handler.state = states.STARTMODE;
        this.emit(':ask', 'Hi there, welcome to Fronde. How can I help you?',
            'Say yes to start the app or no to quit.');
    },
    "AMAZON.StopIntent": function () {
        this.emit(':tell', "Goodbye!");
    },
    "AMAZON.CancelIntent": function () {
        this.emit(':tell', "Goodbye!");
    },
    'SessionEndedRequest': function () {
        console.log('session ended!');
        this.emit(":tell", "Goodbye!");
    }
};

var startDreHandlers = Alexa.CreateStateHandler(states.STARTMODE, {
    'NewSession': function () {
        this.emit('NewSession'); // Uses the handler in newSessionHandlers
    },
    'WelcomeHostNameIntent': function () {
        if (this.event.request.intent.slots.HostName.value.toLowerCase() == "paul") {
            var message = "Sure. I will contact paul forgan and let him know that you are here. Could I please get your name?";
            this.emit(':ask', message, message);
        }
    },
    'MyNameIntent': function () {
        if (this.event.request.intent.slots.VisitorName.value.toLowerCase() == "lilupa")
            this.emit(':tell', 'Thanks Lilupa. I am working on it. Please have a seat.');
        else if (this.event.request.intent.slots.VisitorName.value.toLowerCase() == "tom")
            this.emit(':tell', 'Thanks Tom. I am working on it. Please have a seat.');
        else
            this.emit(':tell', 'Thanks. I am working on it. Please have a seat.');
    },
    'AMAZON.YesIntent': function () {
        console.log("YESINTENT");
        this.emit(':tell', 'Yes intent');
    },
    'AMAZON.NoIntent': function () {
        console.log("NOINTENT");
        this.emit(':tell', 'Ok, see you next time!');
    },
    "AMAZON.StopIntent": function () {
        console.log("STOPINTENT");
        this.emit(':tell', "Goodbye!");
    },
    "AMAZON.CancelIntent": function () {
        console.log("CANCELINTENT");
        this.emit(':tell', "Goodbye!");
    },
    'SessionEndedRequest': function () {
        console.log("SESSIONENDEDREQUEST");
        this.emit(':tell', "Goodbye!");
    },
    "LaunchRequest": function () {
        var speechText = "";
        speechText += "Welcome to " + skillName + ".  ";
        speechText += "You can ask " + skillName + " to find out your meeting with Fronde host";
        var repromptText = "For instructions on what you can say, please say help me.";
        this.emit(':ask', speechText, repromptText);
    },
    'Unhandled': function () {
        console.log("UNHANDLED");
        var message = 'Say yes to continue, or no to end the application.';
        this.emit(':ask', message, message);
    }
});