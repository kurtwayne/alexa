/**
 Copyright 2014-2015 Amazon.com, Inc. or its affiliates. All Rights Reserved.
 Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at
 http://aws.amazon.com/apache2.0/
 or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
 */

/**
 * This sample shows how to create a simple Trivia skill with a multiple choice format. The skill
 * supports 1 player at a time, and does not support games across sessions.
 */

'use strict';

/**
 * When editing your questions pay attention to your punctuation. Make sure you use question marks or periods.
 * Make sure the first answer is the correct one. Set at least 4 answers, any extras will be shuffled in.
 */
var questions = [
// Bernie Sanders
    {
        "Which Presidential candidate, if elected, would be the oldest president ever elected?": [
            "Bernie Sanders",
            "Hilary Clinton",
            "Ted Cruz",
            "Donald Trump"
        ]
    },
    {
        "Which Presidential candidate, if elected, would be the first Jewish president ever elected?": [
            "Bernie Sanders",
            "Hilary Clinton",
            "Ted Cruz",
            "Donald Trump"
        ]
    },
    {
        "Which Presidential candidate was asked to take a year off of schooling once the grades began slipping?": [
            "Bernie Sanders",
            "Hilary Clinton",
            "Ted Cruz",
            "Donald Trump"
        ]
    },
    {
        "Which Presidential candidate has eight of top nine contributors being workers unions?": [
            "Bernie Sanders",
            "Hilary Clinton",
            "Ted Cruz",
            "Donald Trump"
        ]
    },
    {
        "Which Presidential candidate has lost six major elections?": [
            "Bernie Sanders",
            "Hilary Clinton",
            "Ted Cruz",
            "Donald Trump"
        ]
    },
    {
        "Which Presidential candidate served eight consecutive terms in the U.S. House of Representatives?": [
            "Bernie Sanders",
            "Hilary Clinton",
            "Ted Cruz",
            "Donald Trump"
        ]
    },
    {
        "Which Presidential candidate has a Vine contending for 2015's Vine of the Year regarding the legalization of marijuana?": [
            "Bernie Sanders",
            "Hilary Clinton",
            "Ted Cruz",
            "Donald Trump"
        ]
    },
    {
        "Which Presidential candidate was arrested in 1963 during the Civil Rights Movement?": [
            "Bernie Sanders",
            "Hilary Clinton",
            "Ted Cruz",
            "Donald Trump"
        ]
    },
    {
        "Which Presidential candidate filibustered for eight hours straight in December of twenty-ten?": [
            "Bernie Sanders",
            "Hilary Clinton",
            "Ted Cruz",
            "Donald Trump"
        ]
    },
    {
        "Which Presidential candidate had an arcade-themed video game made for them during a two-thousand and six campaign?": [
            "Bernie Sanders",
            "Hilary Clinton",
            "Ted Cruz",
            "Donald Trump"
        ]
    },
// Hilary Clinton
    {
        "Which Presidential candidate admits to have wanted to be a baseball player, a journalist, and an astronaut?": [
            "Hilary Clinton",
            "Bernie Sanders",
            "Ted Cruz",
            "Donald Trump"
        ]
    },
    {
        "Which Presidential candidate was born in Chicago Illinois?": [
            "Hilary Clinton",
            "Bernie Sanders",
            "Ted Cruz",
            "Donald Trump"
        ]
    },
    {
        "Which Presidential candidate has a daughter named Chelsea?": [
            "Hilary Clinton",
            "Bernie Sanders",
            "Ted Cruz",
            "Donald Trump"
        ]
    },
    {
        "Which Presidential candidate attended Wellesley College and Yale Law School?": [
            "Hilary Clinton",
            "Bernie Sanders",
            "Ted Cruz",
            "Donald Trump"
        ]
    },
    {
        "Which Presidential candidate campaigned for Barry Goldwater and switched parties in 1968?": [
            "Hilary Clinton",
            "Bernie Sanders",
            "Ted Cruz",
            "Donald Trump"
        ]
    },
    {
        "Which Presidential candidate was a member of Nixon's presidential impeachment inquiry staff?": [
            "Hilary Clinton",
            "Bernie Sanders",
            "Ted Cruz",
            "Donald Trump"
        ]
    },
    {
        "Which Presidential candidate worked in a canning factory in Alaska in 1971?": [
            "Hilary Clinton",
            "Bernie Sanders",
            "Ted Cruz",
            "Donald Trump"
        ]
    },
    {
        "Which Presidential candidate taught at the University of Arkansas Law School?": [
            "Hilary Clinton",
            "Bernie Sanders",
            "Ted Cruz",
            "Donald Trump"
        ]
    },
    {
        "Which Presidential candidate won a Grammy in nineteen-ninety-seven?": [
            "Hilary Clinton",
            "Bernie Sanders",
            "Ted Cruz",
            "Donald Trump"
        ]
    },
    {
        "Which Presidential candidate tried to join the Marines but was rejected?": [
            "Hilary Clinton",
            "Bernie Sanders",
            "Ted Cruz",
            "Donald Trump"
        ]
    },
// Ted Cruz
{
    "Which Presidential admitted to Us Weekly to being on level three-hundred and fifty on candy crush?": [
        "Ted Cruz",
        "Bernie Sanders",
        "Hilary Clinton",
        "Donald Trump"
    ]
},
{
    "Which Presidential candidate wears cowboy boots almost every day?": [
        "Ted Cruz",
        "Bernie Sanders",
        "Hilary Clinton",
        "Donald Trump"
    ]
},
{
    "Which Presidential candidate enjoyed dual citizenship until twenty-four-teen and was born in Canada?": [
        "Ted Cruz",
        "Bernie Sanders",
        "Hilary Clinton",
        "Donald Trump"
    ]
},
{
    "Which Presidential candidate worked as a clerk under Supreme Court Justice William Rehnquist?": [
        "Ted Cruz",
        "Bernie Sanders",
        "Hilary Clinton",
        "Donald Trump"
    ]
},
{
    "Which Presidential candidate was valedictorian of their class?": [
        "Ted Cruz",
        "Bernie Sanders",
        "Hilary Clinton",
        "Donald Trump"
    ]
},
{
    "Which Presidential candidate was an award-winning debater at Princeton University?": [
        "Ted Cruz",
        "Bernie Sanders",
        "Hilary Clinton",
        "Donald Trump"
    ]
},
{
    "Which Presidential candidate acted on behalf of George W. Bush during the fight for a recount of Florida's election results in two-thousand?": [
        "Ted Cruz",
        "Bernie Sanders",
        "Hilary Clinton",
        "Donald Trump"
    ]
},
{
    "Which Presidential candidate was a solicitor general of Texas in two-thousand and three?": [
        "Ted Cruz",
        "Bernie Sanders",
        "Hilary Clinton",
        "Donald Trump"
    ]
},
{
    "Which Presidential candidate is famous for a twenty-one hour speech appealing recent healthcare plans?": [
        "Ted Cruz",
        "Bernie Sanders",
        "Hilary Clinton",
        "Donald Trump"
    ]
},
{
    "Which Presidential candidate's father migrated to the United State from Cuba?": [
        "Ted Cruz",
        "Bernie Sanders",
        "Hilary Clinton",
        "Donald Trump"
    ]
},
// Donald Trump
{
    "Which Presidential candidate claims to never drink alcohol?": [
        "Donald Trump",
        "Bernie Sanders",
        "Hilary Clinton",
        "Ted Cruz"
    ]
},
{
    "Which Presidential candidate graduated from Wharton School of Business?": [
        "Donald Trump",
        "Bernie Sanders",
        "Hilary Clinton",
        "Ted Cruz"
    ]
},
{
    "Which Presidential candidate appeared on Saturday Night Live in twenty-fifteen that resulted in incredible ratings not seen in two years on the show?": [
        "Donald Trump",
        "Bernie Sanders",
        "Hilary Clinton",
        "Ted Cruz"
    ]
},
{
    "Which Presidential candidate was inducted into the W.W.E Hall of Fame in twenty-thirteen?": [
        "Donald Trump",
        "Bernie Sanders",
        "Hilary Clinton",
        "Ted Cruz"
    ]
},
{
    "Which Presidential candidate was a member of the Reform Party?": [
        "Donald Trump",
        "Bernie Sanders",
        "Hilary Clinton",
        "Ted Cruz"
    ]
},
{
    "Which Presidential candidate was given the Commandant of the Marine Corps Leadership Award in twenty-fifteen?": [
        "Donald Trump",
        "Bernie Sanders",
        "Hilary Clinton",
        "Ted Cruz"
    ]
},
{
    "Which Presidential candidate received an honorary degree from Robert Gordon University of Scotland in two-thousand and ten?": [
        "Donald Trump",
        "Bernie Sanders",
        "Hilary Clinton",
        "Ted Cruz"
    ]
},
{
    "Which Presidential candidate, as a child, behaved poorly in school and was kicked out and enrolled in military school?": [
        "Donald Trump",
        "Bernie Sanders",
        "Hilary Clinton",
        "Ted Cruz"
    ]
},
{
    "Which Presidential candidate's sister is a Senior United States Circuit Judge?": [
        "Donald Trump",
        "Bernie Sanders",
        "Hilary Clinton",
        "Ted Cruz"
    ]
},
{
    "Which Presidential candidate has never held an elective office?": [
        "Donald Trump",
        "Bernie Sanders",
        "Hilary Clinton",
        "Ted Cruz"
    ]
}
];

// Route the incoming request based on type (LaunchRequest, IntentRequest,
// etc.) The JSON body of the request is provided in the event parameter.
exports.handler = function (event, context) {
    try {
        console.log("event.session.application.applicationId=" + event.session.application.applicationId);

        /**
         * Uncomment this if statement and populate with your skill's application ID to
         * prevent someone else from configuring a skill that sends requests to this function.
         */

         if (event.session.application.applicationId !== "amzn1.echo-sdk-ams.app.a64d90c0-64b2-4952-9a08-9ce3d930e409") {
         context.fail("Invalid Application ID");
      }

        if (event.session.new) {
            onSessionStarted({requestId: event.request.requestId}, event.session);
        }

        if (event.request.type === "LaunchRequest") {
            onLaunch(event.request,
                event.session,
                function callback(sessionAttributes, speechletResponse) {
                    context.succeed(buildResponse(sessionAttributes, speechletResponse));
                });
        } else if (event.request.type === "IntentRequest") {
            onIntent(event.request,
                event.session,
                function callback(sessionAttributes, speechletResponse) {
                    context.succeed(buildResponse(sessionAttributes, speechletResponse));
                });
        } else if (event.request.type === "SessionEndedRequest") {
            onSessionEnded(event.request, event.session);
            context.succeed();
        }
    } catch (e) {
        context.fail("Exception: " + e);
    }
};

/**
 * Called when the session starts.
 */
function onSessionStarted(sessionStartedRequest, session) {
    console.log("onSessionStarted requestId=" + sessionStartedRequest.requestId
        + ", sessionId=" + session.sessionId);

    // add any session init logic here
}

/**
 * Called when the user invokes the skill without specifying what they want.
 */
function onLaunch(launchRequest, session, callback) {
    console.log("onLaunch requestId=" + launchRequest.requestId
        + ", sessionId=" + session.sessionId);

    getWelcomeResponse(callback);
}

/**
 * Called when the user specifies an intent for this skill.
 */
function onIntent(intentRequest, session, callback) {
    console.log("onIntent requestId=" + intentRequest.requestId
        + ", sessionId=" + session.sessionId);

    var intent = intentRequest.intent,
        intentName = intentRequest.intent.name;

    // handle yes/no intent after the user has been prompted
    if (session.attributes && session.attributes.userPromptedToContinue) {
        delete session.attributes.userPromptedToContinue;
        if ("AMAZON.NoIntent" === intentName) {
            handleFinishSessionRequest(intent, session, callback);
        } else if ("AMAZON.YesIntent" === intentName) {
            handleRepeatRequest(intent, session, callback);
        }
    }

    // dispatch custom intents to handlers here
    if ("AnswerIntent" === intentName) {
        handleAnswerRequest(intent, session, callback);
    } else if ("AnswerOnlyIntent" === intentName) {
        handleAnswerRequest(intent, session, callback);
    } else if ("DontKnowIntent" === intentName) {
        handleAnswerRequest(intent, session, callback);
    } else if ("AMAZON.YesIntent" === intentName) {
        handleAnswerRequest(intent, session, callback);
    } else if ("AMAZON.NoIntent" === intentName) {
        handleAnswerRequest(intent, session, callback);
    } else if ("AMAZON.StartOverIntent" === intentName) {
        getWelcomeResponse(callback);
    } else if ("AMAZON.RepeatIntent" === intentName) {
        handleRepeatRequest(intent, session, callback);
    } else if ("AMAZON.HelpIntent" === intentName) {
        handleGetHelpRequest(intent, session, callback);
    } else if ("AMAZON.StopIntent" === intentName) {
        handleFinishSessionRequest(intent, session, callback);
    } else if ("AMAZON.CancelIntent" === intentName) {
        handleFinishSessionRequest(intent, session, callback);
    } else {
        throw "Invalid intent";
    }
}

/**
 * Called when the user ends the session.
 * Is not called when the skill returns shouldEndSession=true.
 */
function onSessionEnded(sessionEndedRequest, session) {
    console.log("onSessionEnded requestId=" + sessionEndedRequest.requestId
        + ", sessionId=" + session.sessionId);

    // Add any cleanup logic here
}

// ------- Skill specific business logic -------

var ANSWER_COUNT = 4;
var GAME_LENGTH = 5;
var CARD_TITLE = "Presidential Race 2016 Trivia"; // Be sure to change this for your skill.

function getWelcomeResponse(callback) {
    var sessionAttributes = {},
        speechOutput = "Presidential Race Twenty-Sixteen Trivia. I will ask you " + GAME_LENGTH.toString()
            + " questions, try to get as many right as you can. Just say the number of the answer. Let's begin. ",
        shouldEndSession = false,

        gameQuestions = populateGameQuestions(),
        correctAnswerIndex = Math.floor(Math.random() * (ANSWER_COUNT)), // Generate a random index for the correct answer, from 0 to 3
        roundAnswers = populateRoundAnswers(gameQuestions, 0, correctAnswerIndex),

        currentQuestionIndex = 0,
        spokenQuestion = Object.keys(questions[gameQuestions[currentQuestionIndex]])[0],
        repromptText = "Question 1. " + spokenQuestion + " ",

        i, j;

    for (i = 0; i < ANSWER_COUNT; i++) {
        repromptText += (i+1).toString() + ". " + roundAnswers[i] + ". "
    }
    speechOutput += repromptText;
    sessionAttributes = {
        "speechOutput": repromptText,
        "repromptText": repromptText,
        "currentQuestionIndex": currentQuestionIndex,
        "correctAnswerIndex": correctAnswerIndex + 1,
        "questions": gameQuestions,
        "score": 0,
        "correctAnswerText":
            questions[gameQuestions[currentQuestionIndex]][Object.keys(questions[gameQuestions[currentQuestionIndex]])[0]][0]
    };
    callback(sessionAttributes,
        buildSpeechletResponse(CARD_TITLE, speechOutput, repromptText, shouldEndSession));
}

function populateGameQuestions() {
    var gameQuestions = [];
    var indexList = [];
    var index = questions.length;

    if (GAME_LENGTH > index){
        throw "Invalid Game Length.";
    }

    for (var i = 0; i < questions.length; i++){
        indexList.push(i);
    }

    // Pick GAME_LENGTH random questions from the list to ask the user, make sure there are no repeats.
    for (var j = 0; j < GAME_LENGTH; j++){
        var rand = Math.floor(Math.random() * index);
        index -= 1;

        var temp = indexList[index];
        indexList[index] = indexList[rand];
        indexList[rand] = temp;
        gameQuestions.push(indexList[index]);
    }

    return gameQuestions;
}

function populateRoundAnswers(gameQuestionIndexes, correctAnswerIndex, correctAnswerTargetLocation) {
    // Get the answers for a given question, and place the correct answer at the spot marked by the
    // correctAnswerTargetLocation variable. Note that you can have as many answers as you want but
    // only ANSWER_COUNT will be selected.
    var answers = [],
        answersCopy = questions[gameQuestionIndexes[correctAnswerIndex]][Object.keys(questions[gameQuestionIndexes[correctAnswerIndex]])[0]],
        temp, i;

    var index = answersCopy.length;

    if (index < ANSWER_COUNT){
        throw "Not enough answers for question.";
    }

    // Shuffle the answers, excluding the first element.
    for (var j = 1; j < answersCopy.length; j++){
        var rand = Math.floor(Math.random() * (index - 1)) + 1;
        index -= 1;

        var temp = answersCopy[index];
        answersCopy[index] = answersCopy[rand];
        answersCopy[rand] = temp;
    }

    // Swap the correct answer into the target location
    for (i = 0; i < ANSWER_COUNT; i++) {
        answers[i] = answersCopy[i];
    }
    temp = answers[0];
    answers[0] = answers[correctAnswerTargetLocation];
    answers[correctAnswerTargetLocation] = temp;
    return answers;
}

function handleAnswerRequest(intent, session, callback) {
    var speechOutput = "";
    var sessionAttributes = {};
    var gameInProgress = session.attributes && session.attributes.questions;
    var answerSlotValid = isAnswerSlotValid(intent);
    var userGaveUp = intent.name === "DontKnowIntent";

    if (!gameInProgress) {
        // If the user responded with an answer but there is no game in progress, ask the user
        // if they want to start a new game. Set a flag to track that we've prompted the user.
        sessionAttributes.userPromptedToContinue = true;
        speechOutput = "There is no game in progress. Do you want to start a new game? ";
        callback(sessionAttributes,
            buildSpeechletResponse(CARD_TITLE, speechOutput, speechOutput, false));
    } else if (!answerSlotValid && !userGaveUp) {
        // If the user provided answer isn't a number > 0 and < ANSWER_COUNT,
        // return an error message to the user. Remember to guide the user into providing correct values.
        var reprompt = session.attributes.speechOutput;
        var speechOutput = "Your answer must be a number between 1 and " + ANSWER_COUNT + ". " + reprompt;
        callback(session.attributes,
            buildSpeechletResponse(CARD_TITLE, speechOutput, reprompt, false));
    } else {
        var gameQuestions = session.attributes.questions,
            correctAnswerIndex = parseInt(session.attributes.correctAnswerIndex),
            currentScore = parseInt(session.attributes.score),
            currentQuestionIndex = parseInt(session.attributes.currentQuestionIndex),
            correctAnswerText = session.attributes.correctAnswerText;

        var speechOutputAnalysis = "";

        if (answerSlotValid && parseInt(intent.slots.Answer.value) == correctAnswerIndex) {
            currentScore++;
            speechOutputAnalysis = "correct. ";
        } else {
            if (!userGaveUp) {
                speechOutputAnalysis = "wrong. "
            }
            speechOutputAnalysis += "The correct answer is " + correctAnswerIndex + ": " + correctAnswerText + ". ";
        }
        // if currentQuestionIndex is 4, we've reached 5 questions (zero-indexed) and can exit the game session
        if (currentQuestionIndex == GAME_LENGTH - 1) {
            speechOutput = userGaveUp ? "" : "That answer is ";
            speechOutput += speechOutputAnalysis + "You got " + currentScore.toString() + " out of "
                + GAME_LENGTH.toString() + " questions correct. Thank you for playing!";
            callback(session.attributes,
                buildSpeechletResponse(CARD_TITLE, speechOutput, "", true));
        } else {
            currentQuestionIndex += 1;
            var spokenQuestion = Object.keys(questions[gameQuestions[currentQuestionIndex]])[0];
            // Generate a random index for the correct answer, from 0 to 3
            correctAnswerIndex = Math.floor(Math.random() * (ANSWER_COUNT));
            var roundAnswers = populateRoundAnswers(gameQuestions, currentQuestionIndex, correctAnswerIndex),

                questionIndexForSpeech = currentQuestionIndex + 1,
                repromptText = "Question " + questionIndexForSpeech.toString() + ". " + spokenQuestion + " ";
            for (var i = 0; i < ANSWER_COUNT; i++) {
                repromptText += (i+1).toString() + ". " + roundAnswers[i] + ". "
            }
            speechOutput += userGaveUp ? "" : "That answer is ";
            speechOutput += speechOutputAnalysis + "Your score is " + currentScore.toString() + ". " + repromptText;

            sessionAttributes = {
                "speechOutput": repromptText,
                "repromptText": repromptText,
                "currentQuestionIndex": currentQuestionIndex,
                "correctAnswerIndex": correctAnswerIndex + 1,
                "questions": gameQuestions,
                "score": currentScore,
                "correctAnswerText":
                    questions[gameQuestions[currentQuestionIndex]][Object.keys(questions[gameQuestions[currentQuestionIndex]])[0]][0]
            };
            callback(sessionAttributes,
                buildSpeechletResponse(CARD_TITLE, speechOutput, repromptText, false));
        }
    }
}

function handleRepeatRequest(intent, session, callback) {
    // Repeat the previous speechOutput and repromptText from the session attributes if available
    // else start a new game session
    if (!session.attributes || !session.attributes.speechOutput) {
        getWelcomeResponse(callback);
    } else {
        callback(session.attributes,
            buildSpeechletResponseWithoutCard(session.attributes.speechOutput, session.attributes.repromptText, false));
    }
}

function handleGetHelpRequest(intent, session, callback) {
    // Provide a help prompt for the user, explaining how the game is played. Then, continue the game
    // if there is one in progress, or provide the option to start another one.

    // Set a flag to track that we're in the Help state.
    session.attributes.userPromptedToContinue = true;

    // Do not edit the help dialogue. This has been created by the Alexa team to demonstrate best practices.

    var speechOutput = "I will ask you " + GAME_LENGTH + " multiple choice questions. Respond with the number of the answer. "
        + "For example, say one, two, three, or four. To start a new game at any time, say, start game. "
        + "To repeat the last question, say, repeat. "
        + "Would you like to keep playing?",
        repromptText = "To give an answer to a question, respond with the number of the answer . "
        + "Would you like to keep playing?";
        var shouldEndSession = false;
    callback(session.attributes,
        buildSpeechletResponseWithoutCard(speechOutput, repromptText, shouldEndSession));
}

function handleFinishSessionRequest(intent, session, callback) {
    // End the session with a "Good bye!" if the user wants to quit the game
    callback(session.attributes,
        buildSpeechletResponseWithoutCard("Good bye!", "", true));
}

function isAnswerSlotValid(intent) {
    var answerSlotFilled = intent.slots && intent.slots.Answer && intent.slots.Answer.value;
    var answerSlotIsInt = answerSlotFilled && !isNaN(parseInt(intent.slots.Answer.value));
    return answerSlotIsInt && parseInt(intent.slots.Answer.value) < (ANSWER_COUNT + 1) && parseInt(intent.slots.Answer.value) > 0;
}

// ------- Helper functions to build responses -------


function buildSpeechletResponse(title, output, repromptText, shouldEndSession) {
    return {
        outputSpeech: {
            type: "PlainText",
            text: output
        },
        card: {
            type: "Simple",
            title: title,
            content: output
        },
        reprompt: {
            outputSpeech: {
                type: "PlainText",
                text: repromptText
            }
        },
        shouldEndSession: shouldEndSession
    };
}

function buildSpeechletResponseWithoutCard(output, repromptText, shouldEndSession) {
    return {
        outputSpeech: {
            type: "PlainText",
            text: output
        },
        reprompt: {
            outputSpeech: {
                type: "PlainText",
                text: repromptText
            }
        },
        shouldEndSession: shouldEndSession
    };
}

function buildResponse(sessionAttributes, speechletResponse) {
    return {
        version: "1.0",
        sessionAttributes: sessionAttributes,
        response: speechletResponse
    };
}
