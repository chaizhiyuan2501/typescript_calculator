<template>
    <div class="calculator">
        <div class="calculator-display">
            <div class="expression">{{ expression }}</div>
            <div class="result">{{ currentInput || "0" }}</div>
        </div>
        <div class="buttons">
            <button v-for="btn in buttons" :key="btn.label" :data-value="btn.value" :class="btn.class"
                @click="handleClick(btn.value)">
                {{ btn.label }}
            </button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { onMounted, onUnmounted } from 'vue'
import { useCalculatorStore } from '@/store/index'

// ストアの取得
const store = useCalculatorStore()

// ストアからリアクティブな値を取得
const { currentInput, expression } = storeToRefs(store)

// キーボード入力を処理する関数
const handleKeyDown = (event: KeyboardEvent) => {
    const key = event.key

    // 数字キーの場合
    if (!isNaN(Number(key))) {
        store.appendNumber(key)
        return
    }

    // 演算子キーの場合
    if (['+', '-', '*', '/', '%'].includes(key)) {
        store.onButtonPress(key)
        return
    }

    // 小数点の場合
    if (key === ".") {
        store.appendNumber(".")
        return
    }

    // Enter, =, Escape の場合は計算を実行
    if (key === "Enter" || key === "=" || key === 'Escape') {
        store.calculate()
        return
    }
    // バックスペースの場合は1文字削除
    if (key === 'Backspace') {
        store.backspace()
        return
    }

}

// コンポーネントマウント時にキーボードイベントを登録
onMounted(() => {
    window.addEventListener('keydown', handleKeyDown)
})

// コンポーネントアンマウント時にイベントを解除
onUnmounted(() => {
    window.removeEventListener('keydown', handleKeyDown)
})

// ボタン定義リスト
const buttons = [
    { value: "%", label: "%", class: "unary-function" },
    { value: "CE", label: "CE", class: "clear" },
    { value: "C", label: "C", class: "clear" },
    { value: "backspace", label: "←", class: "backspace" },
    { value: "1/x", label: "1/x", class: "unary-function" },
    { value: "x²", label: "x²", class: "unary-function" },
    { value: "√x", label: "√x", class: "unary-function" },
    { value: "/", label: "÷", class: "operator" },
    { value: "7", label: "7" },
    { value: "8", label: "8" },
    { value: "9", label: "9" },
    { value: "*", label: "✕", class: "operator" },
    { value: "4", label: "4" },
    { value: "5", label: "5" },
    { value: "6", label: "6" },
    { value: "-", label: "-", class: "operator" },
    { value: "1", label: "1" },
    { value: "2", label: "2" },
    { value: "3", label: "3" },
    { value: "+", label: "+", class: "operator" },
    { value: "+/-", label: "+/-" },
    { value: "0", label: "0" },
    { value: ".", label: "." },
    { value: "=", label: "=", class: "equal" },
]

// ボタンクリック時の処理
function handleClick(value: string) {
    store.onButtonPress(value)
}
</script>

<style scoped src="@/assets/styles/calculator.css"></style>
