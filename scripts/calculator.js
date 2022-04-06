// noinspection UnnecessaryLocalVariableJS

const leftColumn = document.querySelector(".leftColumn")
const rightColumn = document.querySelector(".rightColumn")
const rubric = document.createElement("rubric")
leftColumn.appendChild(rubric)
appendArrayTemplate(rubric)

const secondRubric = document.createElement("rubric")
rightColumn.appendChild(secondRubric)
appendButtonTemplate(secondRubric)
addButtonListeners()
let arrays = []

function addButtonListeners() {
    document.getElementById("powerButton").addEventListener("click", () => powerOf2())
    document.getElementById("oneOverInputButton").addEventListener("click", () => powerOfMinusOne())
    document.getElementById("addArrayButton").addEventListener("click", () => addArray())
    document.getElementById("compute-button").addEventListener("click", () => evaluateExpression())
    document.getElementById("menu-input").addEventListener("keypress", (ev) => { if (ev.key === "Enter") evaluateExpression() })
    document.getElementById("area-circle-button").addEventListener("click", () => areaOfCircle())
    document.getElementById("average-button").addEventListener("click", () => average())
    document.getElementById("summation-button").addEventListener("click", () => summation())
    window.addEventListener("click", () => removeArrayFocus())
    document.getElementById("square-root-button").addEventListener("click", () => squareRoot())
    document.getElementById("logarithm-button").addEventListener("click", () => logarithmBase2())
    document.getElementById("quadratic-equation-button").addEventListener("click", () => solveQuadraticEquation())
    document.getElementById("generate-quote-button").addEventListener("click", () => generateRandomQuote())
}

function generateRandomQuote() {
        // noinspection SpellCheckingInspection
    const quotesArray = [
        '"Approximately? Det lyder som noget fra Harry Potter." - Anders Spile',
        '"Det viser bare hvor svært det er at slå en sekser i forhold til de andre kort." - Thomazze',
        '"Hvorfor er det lige sådan? Forstår du selv, at det være sådan?" - Thoarsten',
        '"you can better send her to here home the jungle"',
        '"9 people report  vladimi for learn to him"',
        '"HAVE U LAG??? i know how fell u renek"',
        '"Swain will just going to fak"',
        '"report yi, bad altitude thx"',
        '"thats happen for focus to one tank"',
        '"why you go in plz" - Kassadin',
        '"diana that is better that you go afk  |  i can thinking that is true"',
        '"i knowed whenn saw flash one renek"',
        '"thomazze pfff i laught about you, enjoy my !@#$ you !@#$"',
        '"Og hvad sker der så, når der ikke sker noget??" - Thoarsten',
        '"Der skal fuld power på. Ellers kan I ikke høre Hitler-talen" - Jens Ove Holm',
        '"Var der flere grimme ting? Jo, der var lige et par linjer om Tjekkoslovakiet." - Jens Ove Holm',
        '"Reagan taler tydeligt og klart, ikke sådan noget "hak hak" som Obama." - Jens Ove Holm',
        '"Jeg tror jeg er lidt ligesom Adolf Hitler, jeg er udmattet når jeg har talt" - Jens Ove Holm',
        '"Jamen det er fordi jeg er kold som en kat." - Ali'
    ]
    const randomGeneratedNumber = Math.floor(Math.random() * quotesArray.length)
    const randomQuote = quotesArray[randomGeneratedNumber]
    outputValueToCalculator(randomQuote)
}

function solveQuadraticEquation() {
    const calculatorInput = document.getElementById("calculator-input").value
    const inputNoSpaces = calculatorInput.replace(/\s+/g, "")
    const stringArray = inputNoSpaces.split(",")
    const numberArray = stringArray.map((a) => parseFloat(a))
    const determinant = power(numberArray[1], 2) - (4 * numberArray[0] * numberArray[2])
    if (determinant < 0) {
        const noSolutionString = (">> No real solution exists. d = " + determinant + ".")
        outputValueToCalculator(noSolutionString)
    } else if (determinant === 0) {
        const oneSolutionString = (">> One solution exists! x: " + (- numberArray[1] / (2 * numberArray[0])) + ".")
        outputValueToCalculator(oneSolutionString)
    } else if (determinant > 0) {
        const twoSolutionsString = (">> x\u2081 : " + ((- numberArray[1] + Math.sqrt(determinant)) / (2 * numberArray[0])) + ", "
            + "x\u2082 : " + ((- numberArray[1] - Math.sqrt(determinant)) / (2 * numberArray[0])) + ".")
        outputValueToCalculator(twoSolutionsString)
    }
}

function logarithmBase2() {
    const calculatorInput = document.getElementById("calculator-input").value
    const logarithmBase2 = Math.log2(calculatorInput)
    outputValueToCalculator(logarithmBase2)
    console.log(">> " + logarithmBase2 + "     :: logarithmBase2(n)");
}

function power(base, exponent) {
    let result = 1;
    for (let count = 0; count < exponent; count++) {
        result *= base;
    }
    return result;
}

function summation() {
    const arrayInput = document.getElementById("list-input").value
    const stringArray = arrayInput.split(",")
    const numberArray = stringArray.map((a) => parseFloat(a))
    const averageValue = numberArray.reduce((x, y) => x + y)
    document.getElementById("list-input").value = averageValue.toString()
    console.log(">> " + averageValue + "     :: average(array)");
    return averageValue
}

function squareRoot() {
    const calculatorInput = document.getElementById("calculator-input").value
    const squareRoot = Math.sqrt(calculatorInput)
    outputValueToCalculator(squareRoot)
    console.log(">> " + squareRoot + "     :: squareRoot(" + calculatorInput + ")");
}

function removeArrayFocus() {
    const arrayElements = document.querySelectorAll("array")
    arrayElements.forEach((arr) => {
        arr.style.backgroundColor = "#ddefff"
    })
}

function addArrayFocusEvent(ev) {
    ev.stopPropagation()
    ev.target.style.backgroundColor = "#87ff9c"
    const arrayOfStrings = ev.target.textContent.split(",")
    const unquotedArray = arrayOfStrings.toString().replace(/^"(.+(?="$))"$/, '$1')
    document.getElementById("list-input").value = unquotedArray
}

function average() {
    const arrayInput = document.getElementById("list-input").value
    const stringArray = arrayInput.split(",")
    const numberArray = stringArray.map((a) => parseFloat(a))
    const averageValue = numberArray.reduce((x, y) => (x + y)) / numberArray.length
    document.getElementById("list-input").value = averageValue.toString()
    console.log(">> " + averageValue + "     :: average(array)");
    return averageValue
}

function areaOfCircle() {
    const calculatorInput = document.getElementById("calculator-input").value
    const areaOfCircle = calculatorInput * calculatorInput * Math.PI
    outputValueToCalculator(areaOfCircle)
}

function evaluateExpression() {
    const computationInput = document.getElementById("menu-input").value
    const inputNoSpaces = computationInput.replace(/\s+/g, "")

    const isEmptyString = document.getElementById("menu-input").value === ""
    if (isEmptyString) {
        console.log("The empty string doesn't work, buddy.");
        return
    } else if (!legalMathSymbolsIn(inputNoSpaces)) {
        console.log("ERROR: " + inputNoSpaces + " contains illegal math symbols!");
        return
    }

    const containsExponentExp = /^([0-9]*[^]*[0-9]*)$/.test(inputNoSpaces)
    if (containsExponentExp) {
        const baseExp = inputNoSpaces.toString().replace(/^([0-9]*)[^]*[0-9]*$/, '$1')
        const exponentExp = inputNoSpaces.toString().replace(/^[0-9]*[^]*([0-9])$/, '$1')
        const evaluatedPowerExp = power(baseExp, exponentExp)
        document.getElementById("menu-input").value = evaluatedPowerExp
    }

    const expression = Function("return " + inputNoSpaces)()
    outputValueToCalculator(">>  " + expression)
}

function legalMathSymbolsIn(str) {
        // Decimal literals, binary operators and float separator.
    const legalCharacters = /^([0-9]*[+]*[-]*[*]*[/]*[.]*[(]*[)]*[^]*)*$/.test(str)
    return legalCharacters
}

function addArray() {
    const array = document.createElement("array")
    const arrayContainer = document.getElementById("array-container")
    const arrayInput = document.getElementById("list-input").value
    const stringInput = '"' + arrayInput + '"'
    document.getElementById("list-input").value = ""
    const newArray = stringInput.split(",")

    arrays.push(newArray)
    console.log(">> " + arrays[arrays.length - 1] + "added.");
    const arrayString = document.createTextNode(arrays[arrays.length - 1].toString())

    array.appendChild(arrayString)
    array.addEventListener("click", (ev) => addArrayFocusEvent(ev))
    arrayContainer.appendChild(array)
}

function outputValueToCalculator(value) {
    const calculatorOutput = document.getElementById("calculator-input")
    calculatorOutput.value = value
}

function powerOf2() {
    const calculatorInput = document.getElementById("calculator-input").value
    const inputToTheSecondPower = calculatorInput * calculatorInput
    outputValueToCalculator(inputToTheSecondPower)
    console.log(">> " + inputToTheSecondPower + "     :: powerOf2(" + calculatorInput + ")");
}

function powerOfMinusOne() {
    const calculatorInput = document.getElementById("calculator-input").value
    const oneOverInput = 1 / calculatorInput
    outputValueToCalculator(oneOverInput)
    console.log(">> " + oneOverInput + "     :: powerOfMinusOne()");
}

function appendArrayTemplate(element) {
    const temp = document.getElementsByTagName("template")[0]
    const clone = temp.content.cloneNode(true)
    element.appendChild(clone)
}

function appendButtonTemplate(element) {
    const temp = document.getElementsByTagName("template")[1]
    const clone = temp.content.cloneNode(true)
    element.appendChild(clone)
}
let cat = document.querySelector("img");
let angle = Math.PI / 2;
function animate(time, lastTime) {
    if (lastTime != null) {
        angle += (time - lastTime) * 0.001;
    }
    cat.style.top = (Math.sin(angle) * 20) + "px";
    cat.style.left = (Math.cos(angle) * 200) + "px";
    requestAnimationFrame(newTime => animate(newTime, time));
}

// requestAnimationFrame(animate);

function findSolution(target) {
    function find(current, history) {
        if (current === target) {
            return history;
        } else if (current > target) {
            return null;
        } else {
            return find(current + 5, `(${history} + 5)`) ||
                find(current * 3, `(${history} * 3)`);
        }
    }
    return find(1, "1");
}
console.log(">> " + findSolution(24) + "     :: findSolution(24)");

function deepEqual(a, b) {
    let property;
    if (a === b) return true;

    if (a == null || typeof a != "object" ||
        b == null || typeof b != "object")
        return false;

    let propertyInA = 0
    for (property in a) propertyInA += 1;

    let propertyInB = 0;
    for (property in b) {
        propertyInB += 1;

        if (!(property in a) || !deepEqual(a[property], b[property])) return false;
    }
    return propertyInA === propertyInB;
}
const obj = {here: {is: "an"}, object: 2};
console.log(">> " + deepEqual(obj, obj) + "     :: deepEqual(obj, obj)");
console.log(">> " + deepEqual(obj, {here: {is: "an"}, object: 2}) + "     :: deepEqual(obj, {here: {is: \"an\"}, object: 2}));");

function repeat(n, action) {
    for (let i = 0; i < n; i++) {
        action(i);
    }
}

function unless(test, then) {
    if (!test) then();
}
// repeat(3, n => {
//     unless(n % 2 === 1, () => {
//         console.log(n, "is even");
//     });
// });

let rangeOfNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
function isEven(n) {
    return n % 2 === 0;
}
console.log(">> " + rangeOfNumbers.filter(f => isEven(f)) + "     :: rangeOfNumbers.filter(f => isEven(f))");
let evenRange = rangeOfNumbers.filter(f => isEven(f));
let incrementedRange = evenRange.map(f => f + 1)
console.log(">> " + incrementedRange + "     :: evenRange.map(f => f + 1)");

console.log(">> " + incrementedRange.every(v => v > 2) + "     :: incrementedRange.every(v => v > 2)");
