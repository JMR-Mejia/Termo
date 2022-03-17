import { useState } from 'react'
import { H2O, CO, CO2, N2, O2 } from '../airgas.json'

const variables = {
	a: 0,
	b: 0,
	c: 0,
	d: 0,
	e: 0,
	f: 0,
	g: 0,
	h: 0,
}

function App() {
	const [temperatura, setTemperatura] = useState(false)
	const [masaMolar, setMasaMolar] = useState(false)
	const [cpMezcla, setCpMezcla] = useState(false)
	const [combustible, setCombustible] = useState("octano")
	const [particula, setParticula] = useState("CO")
	const [lambda, setLambda] = useState(0)
	const [presion, setPresion] = useState(0)
	const [resTemperatura, setresTemperatura] = useState(0)

	const onTemperatura = (event) => {
		setTemperatura(event.target.checked)
	}
	const onMasaMolar = (event) => {
		setMasaMolar(event.target.checked)
	}
	const onCpMezcla = (event) => {
		setCpMezcla(event.target.checked)
	}
	const onCombustible = (event) => {
		setCombustible(event.target.value)
	}
	const onLambda = (event) => {
		setLambda(event.target.value)
	}
	const onPresion = (event) => {
		setPresion(event.target.value)
	}
	const onParticula = (event) => {
		setParticula(event.target.value)
	}
	const onSubmit = (event) => {
		event.preventDefault();
		console.log("Filtro")
		console.log("Temperatura: " + temperatura)
		console.log("Masa Molar: " + masaMolar)
		console.log("Cp Mezcla: " + cpMezcla)
		console.log("Variables")
		console.log("Combustible: " + combustible)
		console.log("Lambda: " + lambda)
		console.log("Presion: " + presion)
		console.log("Particula: " + particula)
		
		let residuo = undefined;
		let temporal = 0;
		if (lambda < 1) {
			if (combustible === "octano") {
				variables.c = 47 * lambda
			}
		} else if (lambda > 1) {
			if (combustible === "octano") {
				variables.a = 8
				variables.b = 9
				variables.c = 47 * lambda
				variables.f = (25 * lambda - 27) / (2)
				for (let i = 1000; i < 3251; i += 10) {
					if(CO2[i] === undefined || CO2[i] === null || H2O[i] === undefined || H2O[i] === null || N2[i] === undefined || N2[i] === null || O2[i] === undefined || O2[i] === null) {
						continue
					}
					let equationParse = algebra.parse(`(${variables.a}*(-393520+((${CO2[i]}/${i}*x)-9364)))+(${variables.b}*(-241820+((${H2O[i]}/${i}*x)-9904)))+(${variables.c}*((${N2[i]}/${i}*x)-8669))+(${variables.f}*((${O2[i]}/${i}*x)-8682))`)
					let equation = new algebra.Equation(equationParse, -208450)
					let x = equation.solveFor("x")
					temporal = ((x.numer/x.denom)/1000)-i
					if (temporal < 0) {
						temporal = -temporal
					}
					if (residuo === undefined) {
						residuo = temporal
					}
					if (temporal < residuo) {
						residuo = temporal
						setresTemperatura((x.numer/x.denom)/1000)
					}
				}
				residuo = undefined
				temporal = 0
			} else if (combustible === "dodecano") {
				variables.a = 12
				variables.b = 13
				variables.c = 73.32 * lambda
				for (let i = 1000; i < 3251; i += 10) {
					if(CO2[i] === undefined || CO2[i] === null || H2O[i] === undefined || H2O[i] === null || N2[i] === undefined || N2[i] === null || O2[i] === undefined || O2[i] === null) {
						continue
					}
					let equationParse = algebra.parse(`(${variables.a}*(-393520+((${CO2[i]}/${i}*x)-9364)))+(${variables.b}*(-241820+((${H2O[i]}/${i}*x)-9904)))+(${variables.c}*((${N2[i]}/${i}*x)-8669))`)
					// let equationParse = algebra.parse(`(12*(-393520+((100.804/2000*x)-9364)))+(73.32*((${N2[i]}/${i}*x)-8669))+(${variables.f}*((${O2[i]}/${i}*x)-8682))`)
					let equation = new algebra.Equation(equationParse, -291010)
					let x = equation.solveFor("x")
					temporal = ((x.numer/x.denom)/1000)-i
					if (temporal < 0) {
						temporal = -temporal
					}
					if (residuo === undefined) {
						residuo = temporal
					}
					if (temporal < residuo) {
						residuo = temporal
						setresTemperatura((x.numer/x.denom)/1000)
					}
				}
				residuo = undefined
				temporal = 0
			} else if (combustible === "metano") {
				variables.a = 10
				variables.b = 11
				variables.c = 73.32 * lambda
				variables.f = (2 * lambda) - (variables.b / 2) - (2 * variables.a)
				for (let i = 1000; i < 3251; i += 10) {
					if(CO2[i] === undefined || CO2[i] === null || H2O[i] === undefined || H2O[i] === null || N2[i] === undefined || N2[i] === null || O2[i] === undefined || O2[i] === null) {
						continue
					}
					let equationParse = algebra.parse(`(${variables.a}*(-393520+((${CO2[i]}/${i}*x)-9364)))+(${variables.b}*(-241820+((${H2O[i]}/${i}*x)-9904)))+(${variables.c}*((${N2[i]}/${i}*x)-8669))+(${variables.f}*((${O2[i]}/${i}*x)-8682))`)
					let equation = new algebra.Equation(equationParse, -74850)
					let x = equation.solveFor("x")
					temporal = ((x.numer/x.denom)/1000)-i
					if (temporal < 0) {
						temporal = -temporal
					}
					if (residuo === undefined) {
						residuo = temporal
					}
					if (temporal < residuo) {
						residuo = temporal
						setresTemperatura((x.numer/x.denom)/1000)
					}
				}
				residuo = undefined
				temporal = 0
			}
		} else {
			if (combustible === "octano") {
				variables.a = 8
				variables.b = 9
				variables.c = 47 * lambda
				for (let i = 1000; i < 3251; i += 10) {
					if(CO2[i] === undefined || CO2[i] === null || H2O[i] === undefined || H2O[i] === null || N2[i] === undefined || N2[i] === null || O2[i] === undefined || O2[i] === null) {
						continue
					}
					let equationParse = algebra.parse(`(${variables.a}*(-393520+((${CO2[i]}/${i}*x)-9364)))+(${variables.b}*(-241820+((${H2O[i]}/${i}*x)-9904)))+(${variables.c}*((${N2[i]}/${i}*x)-8669))`)
					let equation = new algebra.Equation(equationParse, -208450)
					let x = equation.solveFor("x")
					temporal = ((x.numer/x.denom)/1000)-i
					if (temporal < 0) {
						temporal = -temporal
					}
					if (residuo === undefined) {
						residuo = temporal
					}
					if (temporal < residuo) {
						residuo = temporal
						setresTemperatura((x.numer/x.denom)/1000)
					}
				}
				residuo = undefined
				temporal = 0
			} else if (combustible === "dodecano") {
				variables.a = 12
				variables.b = 13
				variables.c = 73.32 * lambda
				for (let i = 1000; i < 3251; i += 10) {
					if(CO2[i] === undefined || CO2[i] === null || H2O[i] === undefined || H2O[i] === null || N2[i] === undefined || N2[i] === null || O2[i] === undefined || O2[i] === null) {
						continue
					}
					let equationParse = algebra.parse(`(${variables.a}*(-393520+((${CO2[i]}/${i}*x)-9364)))+(${variables.b}*(-241820+((${H2O[i]}/${i}*x)-9904)))+(${variables.c}*((${N2[i]}/${i}*x)-8669))`)
					let equation = new algebra.Equation(equationParse, -291010)
					let x = equation.solveFor("x")
					temporal = ((x.numer/x.denom)/1000)-i
					if (temporal < 0) {
						temporal = -temporal
					}
					if (residuo === undefined) {
						residuo = temporal
					}
					if (temporal < residuo) {
						residuo = temporal
						setresTemperatura((x.numer/x.denom)/1000)
					}
				}
				residuo = undefined
				temporal = 0
			} else if (combustible === "metano") {
				variables.a = 1
				variables.b = 2
				variables.c = 7.52 * lambda
				for (let i = 1000; i < 3251; i += 10) {
					if(CO2[i] === undefined || CO2[i] === null || H2O[i] === undefined || H2O[i] === null || N2[i] === undefined || N2[i] === null || O2[i] === undefined || O2[i] === null) {
						continue
					}
					let equationParse = algebra.parse(`(${variables.a}*(-393520+((${CO2[i]}/${i}*x)-9364)))+(${variables.b}*(-241820+((${H2O[i]}/${i}*x)-9904)))+(${variables.c}*((${N2[i]}/${i}*x)-8669))`)
					let equation = new algebra.Equation(equationParse, -74850)
					let x = equation.solveFor("x")
					temporal = ((x.numer/x.denom)/1000)-i
					if (temporal < 0) {
						temporal = -temporal
					}
					if (residuo === undefined) {
						residuo = temporal
					}
					if (temporal < residuo) {
						residuo = temporal
						console.log((x.numer/x.denom)/1000)
						console.log(i)
						setresTemperatura((x.numer/x.denom)/1000)
					}
				}
				residuo = undefined
				temporal = 0
			}
		}
		event.preventDefault();
	}

	return (
		<>
			<form onSubmit={onSubmit}>
				<h1>Filtros</h1>
				<label>
					Temperatura:
					<input
						name="isGoing"
						type="checkbox"
						onChange={onTemperatura} />
				</label>
				<label>
					Masa molar:
					<input
						name="isGoing"
						type="checkbox"
						onChange={onMasaMolar} />
				</label>
				<label>
					Cp Mezcla:
					<input
						name="isGoing"
						type="checkbox"
						onChange={onCpMezcla} />
				</label>
				<h1>Variables</h1>
				<label>
					Combustible:
					<select onChange={onCombustible}>
						<option value="octano">octano</option>
						<option value="dodecano">dodecano</option>
						<option value="metano">metano</option>
					</select>
				</label>
				<label>
					Particula:
					<select onChange={onParticula}>
						<option value="CO">CO</option>
						<option value="CO2">CO2</option>
						<option value="H2O">H2O</option>
						<option value="O">O</option>
					</select>
				</label>
				<label>
					Lambda:
					<input type={'number'} step="0.001" onChange={onLambda}></input>
				</label>
				<label>
					Presion:
					<input type={'number'} step="0.001" onChange={onPresion}></input>
				</label>
				<div >
					<button type="submit" >Calcular</button>
				</div>
			</form>
			<h1>Resultados</h1>
			{temperatura && 
				<div>
				<h3>Temperatura:</h3><p>{resTemperatura} K</p>
				</div>}
		</>
	)
}

export default App
