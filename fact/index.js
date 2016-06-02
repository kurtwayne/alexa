/**
    Copyright 2014-2015 Amazon.com, Inc. or its affiliates. All Rights Reserved.

    Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at

        http://aws.amazon.com/apache2.0/

    or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
*/

/**
 * This simple sample has no external dependencies or session management, and shows the most basic
 * example of how to create a Lambda function for handling Alexa Skill requests.
 *
 * Examples:
 * One-shot model:
 *  User: "Alexa, ask Dinosaur Discovery for a dinosaur fact"
 *  Alexa: "Here's your dinosaur fact: ..."
 */

/**
 * App ID for the skill
 */
var APP_ID = "amzn1.echo-sdk-ams.app.5da63d41-e3c9-4ffd-8d33-cc069943f05c"; //replace with "amzn1.echo-sdk-ams.app.[your-unique-value-here]";

/**
 * Array containing dinosaur facts.
 */
var DINOSAUR_FACTS = [
  "The word dinosaur comes from the Greek language and means ‘terrible lizard’. The word was coined by English paleontologist Richard Owen in eighteen-forty-two and was meant to refer to Dinosaurs impressive size rather than their scary appearance.",
  "Dinosaurs ruled the Earth for over one-hundred and sixty million years, from the Triassic period around two-hundred and thirty million years ago through the Jurassic period and until the end of the Cretaceous period around sixty-five million years ago.",
  "The time period from two-hundred and fifty million years ago until around sixty-five million years ago is known as the Mesozoic Era. It is often referred to as the Age of the Dinosaurs because most dinosaurs developed and became extinct during this time.",
  "It is believed that dinosaurs lived on Earth until around sixty-five million years ago when a mass extinction occurred.",
  "Scientists believe that the event leading to the extinction may have been a massive asteroid impact or huge volcanic activity. Events such as these could have blocked out sunlight and significantly changed the Earth’s ecology.",
  "A person who studies dinosaurs is known as a paleontologist.",
  "Rather than being carnivores (meat eaters), the largest dinosaurs such as the Brachiosaurus and Apatosaurus were actually herbivores (plant eaters).",
  "To help fight meat eaters such as the Allosaurus or Spinosaurus, many plant eaters had natural weapons at their disposal. Examples of this include the spikes on the tail of the Stegosaurus and the three horns attached to the front of the Triceratops’s head shield.",
  "Pterodactyls are not dinosaurs, they were flying reptiles that lived during the age of dinosaurs but by definition they do not fall into the same category. The same goes for water based reptiles such as Plesiosaurs.",
  "Birds descended from a type of dinosaurs known as theropods.",
  "Despite being long extinct, dinosaurs are frequently featured in the media. One of the more memorable examples of this is Michael Crichton’s nineteen-ninety book Jurassic Park. Adapted to movie in nineteen-ninety-three, the story features cloned dinosaurs brought to life with the help of D.N.A found in mosquitoes trapped in amber.",
  "The Velociraptor played a large role in the Jurassic Park movies but was often shown inaccurately. Rather than being a larger, human sized dinosaur, the Velociraptor was around the size of a Turkey. It is also believed to have had feathers that were not shown in the movie portrayal.",
  "Tyrannosaurus rex lived in an area of the Earth that now makes up western North America.",
  "Tyrannosaurus rex walked on two legs, balancing its huge head with a long and heavy tail that sometimes contained over 40 vertebrae.",
  "Tyrannosaurus rex had small arms that were extremely powerful and featured two-clawed fingers.",
  "There is also strong debate about whether Tyrannosaurus rex was a predator or scavenger. It had small arms which would have made it hard to grip prey, suggesting it may have been a scavenger. On the other hand, evidence in favor of it being a predator includes its forward pointing eyes which give better depth perception and make it easier to hunt.",
  "Along with Stegosaurus and Iguanodon, Tyrannosaurus rex was one of three dinosaurs that inspired the appearance of Godzilla.",
  "The longest dinosaur was Seismosaurus, which measured over forty metres, as long as five double-decker buses. It was related to diplodocus, which for a long time held the honour.",
  "The smallest fully-grown fossil dinosaur is the little bird-hipped plant-eater like lesothosaurus, which was only the size of a chicken. Smaller fossilised examples have been found, but these are of baby dinosaurs.",
  "Stegosaurus had a brain the size of a walnut - only three centimetres long and weighing seventy-five grams. However, comparing brain size to body size sauropodomorphs, like Plateosaurus, were probably one of the dumbest dinosaurs.",
  "Tyrannosaurus rex looked the most ferocious of all the dinosaurs, but in terms of overall cunning, determination and its array of vicious weapons it was Utahraptor that was probably the fiercest of all. Utahraptor measured about seven metres, and was a very powerful, agile and intelligent predator.",
  "At present over seven-hundred different species of dinosaurs have been identified and named. However palaeontologists believe that there are many more new and different dinosaur species still to be discovered.",
  "It is believed that dinosaur extinction was part of a mass extinction brought about by two massive destructive events. The first of these was the collision with the Earth of a meteorite landing in what is now the Yucatan Peninsula, of Mexico. This was followed by an enormous volcanic eruption which split what is now India in half.",
  "The first dinosaurs that appeared during the Triassic Period two-hundred and thirty million years ago were small and lightweight. Bigger dinosaurs such as Brachiosaurus and Triceratops appeared during the Jurassic and Cretaceous periods.",
  "Dinosaurs dominated Earth for over one-hundred and sixty-five million years. Humans have been around for only 2 million years.",
  "Some of the biggest plant eaters had to eat as much as a ton of food a day. This is similar to eating a bus-sized pile of vegetation every day.",
  "Dinosaurs often swallowed large rocks. These rocks stayed in the stomach and helped them grind up food.",
  "Sauropods were the tallest animals that ever lived. Some were more than twice the height of a giraffe.",
  "Dinosaurs that could run on two legs were called bipeds.",
  "Dinosaurs had different self-defense mechanisms. Some, like meat eaters, had sharp teeth. Plant eaters had long horns or sharp spikes. Other dinosaurs were covered in bony plates.",
  "It is estimated that trillions of dinosaur eggs were laid during the Mesozoic era, though fossilized eggs containing embryos are rare.",
  "Like birds and reptiles today, dinosaurs built nests and laid eggs. Some even fed and protected their babies.",
  "Many scientists believe that birds are dinosaurs and, therefore, dinosaurs are not actually extinct.",
  "The largest mounted dinosaur skeleton to be exhibited in a museum is a Brachiosaurus.",
  "Current dinosaur fossil hot spots include South America (particularly Argentina) and China, where several feathered dinosaurs have been found.",
  "The fastest dinosaur was the Ornithomimus. It could run up to forty-three and a half miles per hour.",
  "The toothiest dinosaur was the hadrosaurs. It could have over one-thousand teeth and it continually grew new ones.",
  "The first dinosaur to be formally named was the Megalosaurus, back in eighteen-twenty-four."
];

/**
 * The AlexaSkill prototype and helper functions
 */
var AlexaSkill = require('./AlexaSkill');

/**
 * DinosaurDiscovery is a child of AlexaSkill.
 * To read more about inheritance in JavaScript, see the link below.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Introduction_to_Object-Oriented_JavaScript#Inheritance
 */
var DinosaurDiscovery = function () {
    AlexaSkill.call(this, APP_ID);
};

// Extend AlexaSkill
DinosaurDiscovery.prototype = Object.create(AlexaSkill.prototype);
DinosaurDiscovery.prototype.constructor = DinosaurDiscovery;

DinosaurDiscovery.prototype.eventHandlers.onSessionStarted = function (sessionStartedRequest, session) {
    console.log("DinosaurDiscovery onSessionStarted requestId: " + sessionStartedRequest.requestId
        + ", sessionId: " + session.sessionId);
    // any initialization logic goes here
};

DinosaurDiscovery.prototype.eventHandlers.onLaunch = function (launchRequest, session, response) {
    console.log("DinosaurDiscovery onLaunch requestId: " + launchRequest.requestId + ", sessionId: " + session.sessionId);
    handleNewFactRequest(response);
};

/**
 * Overridden to show that a subclass can override this function to teardown session state.
 */
DinosaurDiscovery.prototype.eventHandlers.onSessionEnded = function (sessionEndedRequest, session) {
    console.log("DinosaurDiscovery onSessionEnded requestId: " + sessionEndedRequest.requestId
        + ", sessionId: " + session.sessionId);
    // any cleanup logic goes here
};

DinosaurDiscovery.prototype.intentHandlers = {
    "GetNewFactIntent": function (intent, session, response) {
        handleNewFactRequest(response);
    },

    "AMAZON.HelpIntent": function (intent, session, response) {
        response.ask("You can ask Space Geek tell me a dinosaur fact, or, you can say exit... What can I help you with?", "What can I help you with?");
    },

    "AMAZON.StopIntent": function (intent, session, response) {
        var speechOutput = "Goodbye";
        response.tell(speechOutput);
    },

    "AMAZON.CancelIntent": function (intent, session, response) {
        var speechOutput = "Goodbye";
        response.tell(speechOutput);
    }
};

/**
 * Gets a random new fact from the list and returns to the user.
 */
function handleNewFactRequest(response) {
    // Get a random dinosaur fact from the dinosaur facts list
    var factIndex = Math.floor(Math.random() * DINOSAUR_FACTS.length);
    var fact = DINOSAUR_FACTS[factIndex];

    // Create speech output
    var speechOutput = "Here's your dinosaur fact: " + fact;

    response.tellWithCard(speechOutput, "DinosaurDiscovery", speechOutput);
}

// Create the handler that responds to the Alexa Request.
exports.handler = function (event, context) {
    // Create an instance of the DinosaurDiscovery skill.
    var dinosaurGeek = new DinosaurDiscovery();
    dinosaurGeek.execute(event, context);
};
