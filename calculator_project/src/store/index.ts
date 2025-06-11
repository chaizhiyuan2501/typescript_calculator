import { defineStore } from 'pinia'
import {
    toggleSign,
    appendDecimal,
    handleUnaryFunction,
    evaluateBinaryExpression
} from '@/utils/inputUtils'

// 電卓の状態管理ストアを定義
export const useCalculatorStore = defineStore('calculator', {
    // 状態（state）の定義
    state: () => ({
        currentInput: '',                // 現在入力中の値
        previousInput: '',               // 直前に入力された値（演算用）
        operator: null as string | null, // 現在選択されている演算子
        isResultDisplayed: false,        // 計算結果が表示されているかどうか
        expression: '',                  // 入力された数式の表現
    }),
    // アクション（actions）の定義
    actions: {
        // ボタンが押されたときの処理
        onButtonPress(value: string) {
            if (value === 'backspace') return this.backspace() // バックスペース
            if (value === 'C') return this.clearAll()          // 全クリア
            if (value === 'CE') return this.clearEntry()       // 入力クリア
            if (value === '=') return this.calculate()         // 計算実行
            if (['+', '-', '*', '/'].includes(value)) return this.setOperator(value) // 演算子セット
            if (['1/x', '√x', 'x²', '%'].includes(value)) return this.handleFunction(value) // 特殊演算子
            if (value === '+/-') return this.toggleSign()      // 符号反転
            if (value === '.') return this.appendDecimal()     // 小数点追加
            this.appendNumber(value)                           // 数字入力
        },
        // 全ての入力・状態をクリア
        clearAll() {
            this.currentInput = ''        // 現在の入力をクリア
            this.previousInput = ''       // 前回の入力をクリア
            this.expression = ''          // 数式の表現をクリア
            this.operator = null          // 演算子をクリア
            this.isResultDisplayed = false // 結果表示フラグをリセット
        },
        // 現在の入力のみクリア
        clearEntry() {
            this.currentInput = ''        // 現在の入力をクリア
        },
        // 符号（+/-）を反転
        toggleSign() {
            this.currentInput = toggleSign(this.currentInput) // ユーティリティ関数で符号反転
        },
        // 小数点を追加
        appendDecimal() {
            this.currentInput = appendDecimal(this.currentInput) // ユーティリティ関数で小数点追加
        },
        // バックスペース処理
        backspace() {
            this.currentInput = this.currentInput.slice(0, -1) // 最後の文字を削除
        },
        // 演算子をセット
        setOperator(op: string) {
            // currentInputが空の場合、演算子だけ変更可能
            if (!this.currentInput && this.previousInput && this.operator) {
                this.operator = op
                this.expression = `${this.previousInput} ${op}`
                return
            }
            // すでに演算子があり、かつ現在入力が空でなければ先に計算
            if (this.operator && this.previousInput && !this.isResultDisplayed) {
                this.calculate()
            }
            // 通常の演算子入力処理
            this.operator = op
            this.previousInput = this.currentInput || this.previousInput
            this.expression = `${this.previousInput} ${op}`
            this.currentInput = ''
            this.isResultDisplayed = false
        },
        // 計算を実行
        calculate() {
            const resultObj = evaluateBinaryExpression(this.previousInput, this.currentInput, this.operator!)
            if (!resultObj) return

            this.currentInput = resultObj.result
            this.previousInput = resultObj.result
            this.expression = resultObj.expression
            this.operator = null
            this.isResultDisplayed = true
        },
        // 数字を入力
        appendNumber(num: string) {
            if (this.isResultDisplayed) {
                this.currentInput = ''
                this.isResultDisplayed = false
            }
            this.currentInput += num
        },
        // 特殊演算子（1/x, √, x², %）を処理
        handleFunction(func: string) {
            const resultObj = handleUnaryFunction(this.currentInput, func, this.expression || this.currentInput)
            if (!resultObj) return

            this.currentInput = resultObj.result
            this.expression = resultObj.expression
            this.isResultDisplayed = true
        },
    },
})
