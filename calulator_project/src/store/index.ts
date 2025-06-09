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
        // 演算子をセット
        setOperator(op: string) {
            if (!this.currentInput) return                  // 入力がなければ何もしない
            if (this.operator) this.calculate()             // すでに演算子があれば計算を実行
            this.operator = op                              // 新しい演算子をセット
            this.previousInput = this.currentInput          // 現在の入力を前の入力へ
            this.expression += `${this.currentInput} ${op} ` // 数式表現に追加
            this.currentInput = ''                          // 現在の入力をリセット
        },
        // 計算を実行
        calculate() {
            if (!this.previousInput || !this.currentInput || !this.operator) return // 必要な値がなければ何もしない
            const num1 = parseFloat(this.previousInput)      // 前の入力を数値に変換
            const num2 = parseFloat(this.currentInput)       // 現在の入力を数値に変換
            let result = 0                                   // 計算結果
            switch (this.operator) {
                case '+': result = num1 + num2; break        // 足し算
                case '-': result = num1 - num2; break        // 引き算
                case '*': result = num1 * num2; break        // 掛け算
                case '/': result = num2 !== 0 ? num1 / num2 : NaN; break // 割り算（0除算はNaN）
            }
            this.currentInput = result.toString()            // 結果を文字列で保存
            this.expression = `${this.previousInput} ${this.operator} ${this.currentInput}` // 数式表現を更新
            this.operator = null                             // 演算子をリセット
            this.previousInput = ''                          // 前の入力をリセット
            this.isResultDisplayed = true                    // 結果表示フラグを立てる
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
            let num = parseFloat(this.currentInput)
            let result: number | string = num
            switch (func) {
                case '1/x':
                    result = num !== 0 ? 1 / num : NaN
                    break
                case '√x':
                    result = num >= 0 ? Math.sqrt(num) : NaN
                    break
                case 'x²':
                    result = Math.pow(num, 2)
                    break
                case '%':
                    result = num / 100
                    break
                default:
                    return
            }
            this.currentInput = isNaN(result) ? "Error" : result.toString()
            this.isResultDisplayed = true
        },
    },
})
