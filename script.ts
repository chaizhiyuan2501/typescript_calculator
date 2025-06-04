// 获取页面中 id 为 "display" 的输入框元素，并断言它是 HTMLInputElement 类型
const display = document.getElementById("display") as HTMLInputElement;

// 获取所有的按钮元素（即页面中所有 <button> 标签）
const buttons = document.querySelectorAll("button");

// 当前输入的数字（例如 "123"）
let currentInput: string = "";
// 运算符，例如 "+", "-", "*", "/"
let operator: string | null = null;
// 上一次输入的数字（即点击运算符前输入的数字）
let previousInput: string = "";
// 是否已经显示了计算结果的标志位
let isResultDisplayed: boolean = false;

// 为每一个按钮添加点击事件监听器
buttons.forEach((button) => {
    button.addEventListener("click", () => {
        // 获取按钮上设置的 data-value 属性的值
        const value = button.getAttribute("data-value");
        if (!value) return;

        // 根据按钮的值判断按下的是哪种功能
        if (value === "C") {
            // 如果是清除按钮，调用清除函数
            clearDisplay();
        } else if (value === "=") {
            // 如果是等号，执行计算
            calculate();
        } else if (["+", "-", "*", "/"].includes(value)) {
            // 如果是运算符按钮，设置当前运算符
            setOperator(value);
        } else {
            // 否则视为数字输入，添加到当前输入中
            appendNumber(value);
        }
    })
});

// 清空计算器的所有状态
function clearDisplay() {
    currentInput = "";       // 清空当前输入
    previousInput = "";      // 清空前一个输入
    operator = null;         // 清空运算符
    isResultDisplayed = false; // 重置结果显示状态
    updateDisplay();         // 更新画面显示
}

// 将当前输入显示到输入框中
function updateDisplay() {
    display.value = currentInput;
}

// 执行计算操作
function calculate() {
    // 如果缺少操作数或运算符，则不进行任何操作
    if (!previousInput || !currentInput || !operator) return;

    // 将两个输入从字符串转换为浮点数
    const num1 = parseFloat(previousInput);
    const num2 = parseFloat(currentInput);
    let result: number;

    // 根据当前的运算符进行运算
    switch (operator) {
        case "+":
            result = num1 + num2;
            break;
        case "-":
            result = num1 - num2; // ⚠ 此处原文错误写成了 num1 * num2，应为减法
            break;
        case "*":
            result = num1 * num2;
            break;
        case "/":
            result = num2 !== 0 ? num1 / num2 : NaN; // 防止除以 0 的情况
            break;
        default:
            return; // 非法运算符则直接退出
    }

    // 将结果转换为字符串后显示在输入框中
    currentInput = result.toString();
    operator = null;         // 清除运算符
    previousInput = "";      // 清除前一个输入
    isResultDisplayed = true; // 标记为已显示结果
    updateDisplay();         // 更新画面
}

// 设置当前的运算符
function setOperator(op: string) {
    // 当前输入为空时，不执行任何操作
    if (currentInput === "") return;

    // 如果已经存在一个运算符，优先进行上一次计算
    if (operator) {
        calculate();
    }

    operator = op;           // 设置新的运算符
    previousInput = currentInput; // 保存当前输入为“前一个数字”
    currentInput = "";       // 清空当前输入，准备接收下一个数字
}

// 向当前输入追加一个数字字符
function appendNumber(num: string) {
    // 如果上一轮是结果显示状态，则清空当前输入重新开始
    if (isResultDisplayed) {
        currentInput = "";
        isResultDisplayed = false;
    }
    currentInput += num;     // 将新数字添加到输入后面
    updateDisplay();         // 更新输入框显示
}
