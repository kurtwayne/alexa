/**
Used MinecraftHelper AlexaSkill Kit as my BoilerPlate.
Added in additional functionality as needed.
Old Western accent was intentional in response text, please excuse the grammar.
*/

/**
 * One-shot model example:
 *  User: "Alexa, ask Meat Thermometer what the internal temerature is for steak well done."
 *  Alexa: "(reads back internal temperature for a steak well done)"
 */

'use strict';

var AlexaSkill = require('./AlexaSkill'),
    temperatures = require('./temperatures');

var APP_ID = 'amzn1.echo-sdk-ams.app.f6faa47a-e9d1-4e8f-9d27-10518bd95fce';

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
            + "<audio src='https://s3.amazonaws.com/alexa-skills-files/fact+skills/mp3_v2/salamisound-fry-meat-in-the-pan.mp3'/>"
          //  + "<audio src='https://s3.amazonaws.com/ask-storage/tidePooler/OceanWaves.mp3'/>"
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

    response.ask(speechOutput, repromptOutput);
};

MeatThermometer.prototype.intentHandlers = {
    "MeatIntent": function (intent, session, response) {
        var meatSlot = intent.slots.Meat,
            meatName;

        console.log("here is my meatSlot: " + meatSlot);

        if (meatSlot && meatSlot.value){
            meatName = meatSlot.value.toLowerCase();
        }

        console.log("here is my meat: " + meatName);
        console.log("here is my temperature: " + temperatures[meatName]);

        var cardTitle = "Internal temperature for " + meatName,
            temperature = temperatures[meatName],
            speechOutput,
            repromptOutput;
        if (temperature) {
            speechOutput = {
                speech: temperature,
                type: AlexaSkill.speechOutputType.PLAIN_TEXT
            };
            response.tellWithCard(speechOutput, cardTitle, temperature);
        } else {
            var speech;
            if (meatName) {
                speech = "Dad gum, how embarassing, I currently do not know the internal temperature for " + meatName + ". What else can I help with?";
            } else {
                speech = "Y'all caught me as dry as jerky on this one... I currently do not know that meat. What else can I help with?";
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
    },

    "AMAZON.NoIntent": function (intent, session, response) {
        trackEvent(
          'Intent',
          'AMAZON.NoIntent',
          'na',
          '100', // Event value must be numeric.
          function(err) {
            if (err) {
                return next(err);
            }
            var speechOutput = "Okay.";
            response.tell(speechOutput);
          });
    }
};

exports.handler = function (event, context) {
    var meatThermometer = new MeatThermometer();
    meatThermometer.execute(event, context);
}

var express = require('express');
var request = require('request');

var app = express();

var GA_TRACKING_ID = 'UA-78783846-1';

function trackEvent(category, action, label, value, cb) {
  var data = {
    v: '1', // API Version.
    tid: GA_TRACKING_ID, // Tracking ID / Property ID.
    // Anonymous Client Identifier. Ideally, this should be a UUID that
    // is associated with particular user, device, or browser instance.
    cid: '555',
    t: 'event', // Event hit type.
    ec: category, // Event category.
    ea: action, // Event action.
    el: label, // Event label.
    ev: value, // Event value.
  };

  request.post(
    'http://www.google-analytics.com/collect', {
      form: data
    },
    function(err, response) {
      if (err) { return cb(err); }
      if (response.statusCode !== 200) {
        return cb(new Error('Tracking failed'));
      }
      cb();
    }
  );
}
