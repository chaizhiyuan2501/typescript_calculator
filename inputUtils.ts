// 切换符号函数：将一个字符串数字从正变负或从负变正
export function toggleSign(input: string): string {
    // 如果输入为空字符串，则直接返回（不做处理）
    if (input === "") return input;

    // 如果以 "-" 开头（说明是负数），就移除负号变成正数
    // 否则添加 "-" 前缀变成负数
    return input.startsWith("-") ? input.slice(1) : "-" + input;
}

// 添加小数点函数：在当前输入中加一个小数点（如果还没有的话）
export function appendDecimal(input: string): string {
    // 如果已经包含 "."，就直接返回（防止重复小数点）
    if (input.includes(".")) return input;

    // 如果输入为空，说明用户刚开始输入，返回 "0."
    // 否则直接加一个 "." 在后面
    return input === "" ? "0." : input + ".";
}


