/**
Used MinecraftHelper AlexaSkill Kit as my BoilerPlate.
Added in additional functionality as needed.
*/

/**
 * One-shot model example:
 *  User: "Alexa, ask Meat Thermometer what the internal temerature is for steak well done."
 *  Alexa: "(reads back internal temperature for a steak well done)"
 */

'use strict';

var AlexaSkill = require('./AlexaSkill'),
    recipes = require('./meats');

var APP_ID = amzn1.echo-sdk-ams.app.f6faa47a-e9d1-4e8f-9d27-10518bd95fce;

var MeatThermometer = function () {
    AlexaSkill.call(this, APP_ID);
};

// Extend AlexaSkill
MeatThermometer.prototype = Object.create(AlexaSkill.prototype);
MeatThermometer.prototype.constructor = MeatThermometer;

MeatThermometer.prototype.eventHandlers.onLaunch = function (launchRequest, session, response) {
    var speechText = "Which meat would you like internal temperature information for?",
    speechOutput = {
        speech: "<speak>Howdy partner, and Welcome to Meat Thermometer. "
            + "<audio src='https://s3.amazonaws.com/alexa-skills-files/fact+skills/mp3/salamisound-fry-meat-in-the-pan.mp3'/>"
            + speechText
            + "</speak>",
        type: AlexaSkill.speechOutputType.SSML
    },
    // If the user either does not reply to the welcome message or says something that is not
    // understood, they will be prompted again with this text.
    repromptOutput = {
        speech: "I can lead you through providing a meat "
            + "or you can simply open Meat Thermometer and ask a question like, "
            + "what is the internal temperature for a well done steak "
            + "For a list of supported meats, please say help me. "
            + speechText,
        type: AlexaSkill.speechOutputType.PLAIN_TEXT
    };

    response.ask(speechOutput, repromptOutput)

};

MeatThermometer.prototype.intentHandlers = {
    "RecipeIntent": function (intent, session, response) {
        var itemSlot = intent.slots.Item,
            itemName;
        if (itemSlot && itemSlot.value){
            itemName = itemSlot.value.toLowerCase();
        }

        var cardTitle = "Internal temperature for " + itemName,
            recipe = recipes[itemName],
            speechOutput,
            repromptOutput;
        if (recipe) {
            speechOutput = {
                speech: recipe,
                type: AlexaSkill.speechOutputType.PLAIN_TEXT
            };
            response.tellWithCard(speechOutput, cardTitle, recipe);
        } else {
            var speech;
            if (itemName) {
                speech = "Dad gum, how embarassing, I currently do not know the internal temperature for " + itemName + ". What else can I help with?";
            } else {
                speech = "You caught me as dry as jerky on this one, I currently do not know that meat. What else can I help with?";
            }
            speechOutput = {
                speech: speech,
                type: AlexaSkill.speechOutputType.PLAIN_TEXT
            };
            repromptOutput = {
                speech: "What else can I help with?",
                type: AlexaSkill.speechOutputType.PLAIN_TEXT
            };
            response.ask(speechOutput, repromptOutput);
        }
    },

    "AMAZON.StopIntent": function (intent, session, response) {
        var speechOutput = "Y'all come back now!";
        response.tell(speechOutput);
    },

    "AMAZON.CancelIntent": function (intent, session, response) {
        var speechOutput = "Y'all come back now!";
        response.tell(speechOutput);
    },

    "AMAZON.HelpIntent": function (intent, session, response) {
        var speechText = "You can ask questions about internal temperature such as, what's the internal temperature for pork well-done, or, you can say exit... Now, what can I help you with?";
        var repromptText = "You can say things like, what's the internal temperature for hamburgers, or you can say exit... Now, what can I help you with?";
        var speechOutput = {
            speech: speechText,
            type: AlexaSkill.speechOutputType.PLAIN_TEXT
        };
        var repromptOutput = {
            speech: repromptText,
            type: AlexaSkill.speechOutputType.PLAIN_TEXT
        };
        response.ask(speechOutput, repromptOutput);
    }
};

exports.handler = function (event, context) {
    var meatThermometer = new MeatThermometer();
    meatThermometer.execute(event, context);
};
