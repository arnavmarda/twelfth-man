const { generateRandomFixture } = require("./utilities/fixture-generator.js");

const teams = ["ANGAD", "ARNAV", "ANIRUDH", "TAHAA"];

const league = generateRandomFixture(teams);

console.log(league);