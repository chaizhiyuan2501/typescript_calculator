import { defineStore } from 'pinia'
import { toggleSign, appendDecimal } from '@/utils/inputUtils'

// 電卓の状態管理用ストアを定義
export const useCalculatorStore = defineStore('calculator', {
    // 状態（state）の定義
    state: () => ({
        currentInput: '',              // 現在入力されている値
        previousInput: '',             // 直前に入力された値（演算用）
        operator: null as string | null, // 現在選択されている演算子（+,-,*,/ など）
        isResultDisplayed: false,      // 計算結果が表示されているかどうか
        expression: '',          // 入力された数式の表現（計算履歴などに使用）
    }),
    // アクション（actions）の定義
    actions: {
        // ボタンが押されたときの処理をまとめて管理
        onButtonPress(value: string) {
            if (value === 'backspace') return this.backspace()      // バックスペース
            if (value === 'C') return this.clearAll()         // 全クリア
            if (value === 'CE') return this.clearEntry()      // 入力クリア
            if (value === '=') return this.calculate()        // 計算実行
            if (['+', '-', '*', '/'].includes(value)) return this.setOperator(value) // 演算子セット
            if (['1/x', '√x', 'x²', "%"].includes(value)) return this.handleFunction(value) // 特殊演算子セット
            if (value === '+/-') return this.toggleSign()     // 符号反転
            if (value === '.') return this.appendDecimal()    // 小数点追加
            this.appendNumber(value)                          // 数字入力
        },
        // 全ての入力・状態をクリア
        clearAll() {
            this.currentInput = ''
            this.previousInput = ''
            this.expression = ''
            this.operator = null
            this.isResultDisplayed = false
        },
        // 現在の入力のみクリア
        clearEntry() {
            this.currentInput = ''
        },
        // 符号（+/-）を反転
        toggleSign() {
            this.currentInput = toggleSign(this.currentInput)
        },
        // 小数点を追加
        appendDecimal() {
            this.currentInput = appendDecimal(this.currentInput)
        },
        backspace() {
            this.currentInput = this.currentInput.slice(0, -1) // 最後の文字を削除
        },
        // 演算子をセット
        setOperator(op: string) {
            // 1. 如果 currentInput 是空，允许只更换运算符
            if (!this.currentInput && this.previousInput && this.operator) {
                this.operator = op
                this.expression = `${this.previousInput} ${op}`
                return
            }

            // 2. 如果已有 operator 且当前输入不为空，先计算
            if (this.operator && this.previousInput && !this.isResultDisplayed) {
                this.calculate()
            }

            // 3. 正常处理运算符输入
            this.operator = op
            this.previousInput = this.currentInput || this.previousInput
            this.expression = `${this.previousInput} ${op}`
            this.currentInput = ''
            this.isResultDisplayed = false
        },

        // 計算を実行
        calculate() {
            if (!this.previousInput || !this.currentInput || !this.operator) return

            const num1 = parseFloat(this.previousInput)
            const num2 = parseFloat(this.currentInput)
            let result: number | string = 0

            switch (this.operator) {
                case '+': result = num1 + num2; break
                case '-': result = num1 - num2; break
                case '*': result = num1 * num2; break
                case '/': result = num2 !== 0 ? num1 / num2 : NaN; break
            }

            const resultStr = isNaN(result) ? "Error" : result.toString()

            this.previousInput = resultStr
            this.currentInput = ''
            this.expression = `${resultStr} ${this.operator}`
            this.isResultDisplayed = true
        },

        // 数字を入力
        appendNumber(num: string) {
            if (this.isResultDisplayed) {                    // 結果表示中なら入力をリセット
                this.currentInput = ''
                this.isResultDisplayed = false
            }
            this.currentInput += num                         // 入力値を追加
        },

        // 特殊演算子（1/x, √, x²）を処理
        handleFunction(func: string) {
            if (!this.currentInput) return
            const num = parseFloat(this.currentInput)
            let result: number | string = num
            let expressionPrefix = ''
            switch (func) {
                case '1/x':
                    result = num !== 0 ? 1 / num : NaN
                    expressionPrefix = `1 / (${this.expression || this.currentInput}) `
                    break
                case '√x':
                    result = num >= 0 ? Math.sqrt(num) : NaN
                    expressionPrefix = `√(${this.expression || this.currentInput}) `
                    break
                case 'x²':
                    result = Math.pow(num, 2)
                    expressionPrefix = `sqr(${this.expression || this.currentInput}) `
                    break
                case '%':
                    result = num / 100
                    expressionPrefix = `${result}`
                    break
                default:
                    return
            }
            this.currentInput = isNaN(result) ? "Error" : result.toString()
            this.expression = expressionPrefix
            this.isResultDisplayed = true
        },
    },
})
