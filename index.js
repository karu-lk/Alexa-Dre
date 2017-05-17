var Alexa = require('alexa-sdk');
 
const skillName = "Dre";
 
var handlers = {
 
    "WelcomeIntent": function () {
        speechOutput = "I don't have anything interesting to share regarding what you've asked."
        this.emit(':tellWithCard', speechOutput, skillName, speechOutput);
    },
 
    "AboutIntent": function () {
        var speechOutput = "The " + skillName + " Developer, Lilupa, is from Wellington, New Zealand";
        this.emit(':tellWithCard', speechOutput, skillName, speechOutput);
    },
 
    "AMAZON.HelpIntent": function () {
        var speechOutput = "";
        speechOutput += "Here are some things you can say: ";
        speechOutput += "Tell me something interesting about Java. ";
        speechOutput += "Tell me about the skill developer. ";
        speechOutput += "You can also say stop if you're done. ";
        speechOutput += "So how can I help?";
        this.emit(':ask', speechOutput, speechOutput);
    },
 
    "AMAZON.StopIntent": function () {
        var speechOutput = "Goodbye and best wishes from " + skillName;
        this.emit(':tell', speechOutput);
    },
 
    "AMAZON.CancelIntent": function () {
        var speechOutput = "Goodbye and best wishes from " + skillName;
        this.emit(':tell', speechOutput);
    },
 
    "LaunchRequest": function () {
        var speechText = "";
        speechText += "Welcome to " + skillName + ".  ";
        speechText += "You can ask " + skillName + " to welcome your friends such as welcome John.";
        var repromptText = "For instructions on what you can say, please say help me.";
        this.emit(':ask', speechText, repromptText);
    }
 
};
 
exports.handler = function (event, context) {
    var alexa = Alexa.handler(event, context);
    alexa.appId = "amzn1.ask.skill.36549ff4-b592-4c2e-af72-4301fbf72b7b";
    alexa.registerHandlers(handlers);
    alexa.execute();
};