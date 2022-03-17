const {Expression, Fraction, Equation, parse} = require("algebra.js");

const Resolver = (variables) => {
	let equationParse = parse(`${variables.a}*(-393520+((${CO2[2000]}/2000)))*x-9364`)
	let equation = new Equation(equationParse)
	
	console.log(equation.toString());
	
	var answers = cubic.solveFor("x");
	
	console.log(answers);
	console.log("x = " + answers.toString());
}
module.exports = {
	Resolver
};