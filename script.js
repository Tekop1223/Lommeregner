let computation

class Calculator {
    constructor(previousOperandTextElement, currentOperandTextElement) {
      this.previousOperandTextElement = previousOperandTextElement
      this.currentOperandTextElement = currentOperandTextElement
      this.clear()
    }
  
    
    clear() { //det her er clear altså sletter alt
        this.currentOperand = ''
        this.previousOperand = ''
        this.operation = undefined
    }

    delete() { //det er her sletter et tal af gangen
        this.currentOperand = this.currentOperand.toString().slice(0, -1) 

    }

    appendNumber(number) { // det her er den der viser de number man har valgt 
        if (number === '.' && this.currentOperand.includes('.')) return // det her er den der gør så der kun kan være et "."
        this.currentOperand = this.currentOperand.toString() + number.toString() //Det her er den der gør så at man kan vælge mere end et tal
    }

    chooseOperation(operation) { // det her er den der viser de tegn man har valgt 
        if (this.currentOperand === '') return // hvis der ikke er noget den nederste kan man ikke execute
        if (this.previousOperand !== '') { // hvis der er noget i den øverste skal den execute compute
            this.compute()
        }
        this.operation = operation
        this.previousOperand = this.currentOperand
        this.currentOperand = ''
    }
    clearEqual = false;
    
    compute() { // det her er til når ligemed af blevet trykket
        const prev = parseFloat(this.previousOperand)
        const current = parseFloat(this.currentOperand)
        if (isNaN(prev) || isNaN(current)) return // isNaN er blevet forkortet fra is Not a Number
        switch (this.operation) { //switch bruges når der skal være med end 1 "if" 
            case '+': // denne funktion bruges til plus
                computation = prev + current
                break
            case '-': // denne funktion bruges til minus
                computation = prev - current
                break
            case '*': // denne funktion bruges til gange
                computation = prev * current
                break
            case '/': // denne funktion bruges til dele
                computation = prev / current
                break
            default: // // denne funktion bruges til når ingen af dele er blevet valgt
                return
        }
        this.currentOperand = computation
        this.operation = undefined
        this.previousOperand = ''
        this.clearEqual = true

    }

    getDisplayNumber(number) { // den her gør så at man kan se "." fordi før viste den første når man havde trykket et andet tal
        const stringNumber = number.toString()
        const integerDigits = parseFloat(stringNumber.split('.')[0])
        const decimalDigits = stringNumber.split('.')[1]
        let integerDisplay
        if(this.clearEqual)  { this.clear(); this.clearEqual = false }
        if (isNaN(integerDigits)) {
            integerDisplay = ''
        } else {
            integerDisplay = integerDigits.toLocaleString('en', {
               maximumFractionDigits: 0 
            })
        }
        if (decimalDigits != null) {
            return `${integerDisplay}.${decimalDigits}`
        } else {
            return integerDisplay
        }
    }

    updateDisplay() { //det her er den der updater værdiene
        this.currentOperandTextElement.innerText = 
            this.getDisplayNumber(this.currentOperand)
        if (this.operation != null) {
            this.previousOperandTextElement.innerText =
                `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`
        } else {
            this.previousOperandTextElement.innerText = ''
        }
    }
}


const numberButtons = document.querySelectorAll('[data-number]') 
const operationButtons = document.querySelectorAll('[data-operation]')
const equalsButton =  document.querySelector('[data-equals]')
const deleteButton = document.querySelector('[data-delete]')
const allClearButton = document.querySelector('[data-all-clear]')
const previousOperandTextElement = document.querySelector('[data-previous-operand]')
const currentOperandTextElement = document.querySelector('[data-current-operand]')

const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement)

numberButtons.forEach(button => { // den her er den der gør så tal knapperne virker
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()
    })
})

operationButtons.forEach(button => { // det her gør så alle tegne virker
    button.addEventListener('click', () => {
      calculator.chooseOperation(button.innerText)
      calculator.updateDisplay()
    })
  })

equalsButton.addEventListener('click', button => { // det her er den der bestemmer hvad der skal sker når man trykker ligemed
    calculator.compute()
    calculator.updateDisplay()
  })

allClearButton.addEventListener('click', button => { // det her er den der bestemmer hvad der skal sker når man trykker allclear altså AC
    calculator.clear()
    calculator.updateDisplay()
})

deleteButton.addEventListener('click', button => { // det her er den der bestemmer hvad der skal sker når man trykker delete
    calculator.delete()
    calculator.updateDisplay()
})