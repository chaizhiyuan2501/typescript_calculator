import { defineStore } from 'pinia'
import { toggleSign, appendDecimal } from '@/utils/inputUtils'

export const useCalculatorStore = defineStore('calculator', {
    state: () => ({
        currentInput: '',
        previousInput: '',
        operator: null as string | null,
        isResultDisplayed: false,
    }),
    actions: {
        onButtonPress(value: string) {
            if (value === 'C') return this.clear()
            if (value === '=') return this.calculate()
            if (['+', '-', '*', '/'].includes(value)) return this.setOperator(value)
            if (value === '+/-') return this.toggleSign()
            if (value === '.') return this.appendDecimal()
            this.appendNumber(value)
        },
        clear() {
            this.currentInput = ''
            this.previousInput = ''
            this.operator = null
            this.isResultDisplayed = false
        },
        toggleSign() {
            this.currentInput = toggleSign(this.currentInput)
        },
        appendDecimal() {
            this.currentInput = appendDecimal(this.currentInput)
        },
        setOperator(op: string) {
            if (!this.currentInput) return
            if (this.operator) this.calculate()
            this.operator = op
            this.previousInput = this.currentInput
            this.currentInput = ''
        },
        calculate() {
            if (!this.previousInput || !this.currentInput || !this.operator) return
            const num1 = parseFloat(this.previousInput)
            const num2 = parseFloat(this.currentInput)
            let result = 0
            switch (this.operator) {
                case '+': result = num1 + num2; break
                case '-': result = num1 - num2; break
                case '*': result = num1 * num2; break
                case '/': result = num2 !== 0 ? num1 / num2 : NaN; break
            }
            this.currentInput = result.toString()
            this.operator = null
            this.previousInput = ''
            this.isResultDisplayed = true
        },
        appendNumber(num: string) {
            if (this.isResultDisplayed) {
                this.currentInput = ''
                this.isResultDisplayed = false
            }
            this.currentInput += num
        },
    },
})
