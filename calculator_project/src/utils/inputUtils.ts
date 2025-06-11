// 符号を切り替える関数：文字列の数字を正から負、または負から正に変換する
export function toggleSign(input: string): string {
    if (input === "") return input;
    return input.startsWith("-") ? input.slice(1) : "-" + input;
}

// 小数点を追加する関数：現在の入力に小数点がなければ追加する
export function appendDecimal(input: string): string {
    if (input.includes(".")) return input;
    return input === "" ? "0." : input + ".";
}

// 特殊演算子（1/x, √x, x², %）を処理する関数
export function handleUnaryFunction(
    input: string,
    func: string,
    currentExpression?: string
): { result: string; expression: string } | null {
    if (!input) return null;

    const num = parseFloat(input);
    let result: number | string = num;
    let expressionPrefix = '';

    switch (func) {
        case '1/x':
            result = num !== 0 ? 1 / num : NaN;
            expressionPrefix = `1 / (${currentExpression || input})`;
            break;
        case '√x':
            result = num >= 0 ? Math.sqrt(num) : NaN;
            expressionPrefix = `√(${currentExpression || input})`;
            break;
        case 'x²':
            result = Math.pow(num, 2);
            expressionPrefix = `sqr(${currentExpression || input})`;
            break;
        case '%':
            result = num / 100;
            expressionPrefix = `${result}`;
            break;
        default:
            return null;
    }

    return {
        result: isNaN(result) ? "Error" : result.toString(),
        expression: expressionPrefix
    };
}

// 二項演算（+,-,*,/）を処理する関数
export function calculateBinaryOperation(
    num1: number,
    num2: number,
    operator: string
): number | string {
    switch (operator) {
        case '+': return num1 + num2;
        case '-': return num1 - num2;
        case '*': return num1 * num2;
        case '/': return num2 !== 0 ? num1 / num2 : NaN;
        default: return NaN;
    }
}

// 入力と演算子を元に式を評価し、結果と表示用式を返す
export function evaluateBinaryExpression(
    prevInput: string,
    currInput: string,
    operator: string
): { result: string, expression: string } | null {
    if (!prevInput || !currInput || !operator) return null;

    const num1 = parseFloat(prevInput);
    const num2 = parseFloat(currInput);

    const calcResult = calculateBinaryOperation(num1, num2, operator);
    const resultStr = isNaN(Number(calcResult)) ? "Error" : calcResult.toString();
    const expressionStr = `${prevInput} ${operator} ${currInput} =`;

    return {
        result: resultStr,
        expression: expressionStr
    };
}
