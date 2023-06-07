import React from "react";
const CHAR_TAG_START = "<";
const CHAR_TAG_END = ">";

const VALID_TAG_FIRST_CHAR = /^[a-zA-Z]$/;
const CommentHeaderMatcher = /^##+/;

const DefiniteNotScriptKeys = [
    "interact scripts",
    "default constants",
    "data",
    "constants",
    "text",
    "lore",
    "aliases",
    "slots",
    "enchantments",
    "input",
];

const IfOperators = ["==", "!=", ">", "<", ">=", "<="];
const IfCommandLabels = ["cmd:if", "cmd:else", "cmd:while", "cmd:waituntil"];

const DeffableCommandLabels = [
    "cmd:run",
    "cmd:runlater",
    "cmd:clickable",
    "cmd:bungeerun",
];

export function Highlighter({ text }) {
    const coloredText = colorScript(text);
    return <code dangerouslySetInnerHTML={{ __html: coloredText }}></code>;
}

function colorScript(text) {
    let lines = text.split("\n");
    let lastKey = "";
    for (let i = 0; i < lines.length; i++) {
        let line = lines[i];
        let trimmed = line.trim();
        if (trimmed.endsWith(":") && !trimmed.startsWith("-")) {
            lastKey = trimmed.slice(0, -1).toLowerCase();
        }

        lines[i] = colorLine(line, lastKey);
    }
    return lines.join("\n");
}

function colorLine(line, lastKey) {
    let trimmed = line.trim();
    if (trimmed.length === 0) {
        return "";
    }
    let trimmedEnd = line.trimEnd();
    if (trimmedEnd.length !== line.length) {
        console.log("line: " + trimmedEnd);
        return (
            colorLine(trimmedEnd, lastKey) +
            `<span class="script_bad_space">${line.slice(
                trimmedEnd.length
            )}</span>`
        );
    }
    let preSpaces = line.length - trimmed.length;
    if (trimmed.startsWith("#")) {
        let afterComment = trimmed.slice(1).trim();
        if (afterComment.length > 0) {
            if (CommentHeaderMatcher.test(afterComment[0])) {
                return `<span class="script_comment_header">${line}</span>`;
            }
            if (afterComment.toLowerCase().startsWith("todo")) {
                return `<span class="script_comment_todo">${line}</span>`;
            }
            if (afterComment[0] === "-") {
                return `<span class="script_comment_code">${line}</span>`;
            }
        }
        return `<span class="script_comment_normal">${line}</span>`;
    }
    if (trimmed.startsWith("-")) {
        let result = `<span class="script_normal">${line.slice(
            0,
            preSpaces + 1
        )}</span>`;
        if (DefiniteNotScriptKeys.includes(lastKey)) {
            result += ColorArgument(
                line.slice(preSpaces + 1),
                false,
                "non-script"
            );
            return result;
        }
        let appendColon = trimmed.endsWith(":");
        if (appendColon) {
            trimmed = trimmed.slice(0, -1);
        }
        let afterDash = trimmed.slice(1);
        if (afterDash.length !== 0) {
            let commandEnd = afterDash.indexOf(" ", 1);
            let commandText =
                commandEnd === -1 ? afterDash : afterDash.slice(0, commandEnd);
            if (!afterDash.startsWith(" ")) {
                result += `<span class="script_bad_space">${commandText}</span>`;
                result += ColorArgument(
                    afterDash.slice(commandEnd),
                    false,
                    "cmd:" + commandText.trim()
                );
            } else {
                if (
                    commandText.includes("'") ||
                    commandText.includes('"') ||
                    commandText.includes("[")
                ) {
                    result += ColorArgument(afterDash, false, "non-cmd");
                } else {
                    result += `<span class="script_command">${commandText}</span>`;
                    if (commandEnd > 0) {
                        result += ColorArgument(
                            afterDash.slice(commandEnd),
                            true,
                            "cmd:" + commandText.trim()
                        );
                    }
                }
            }
        }
        if (appendColon) {
            result += `<span class="script_colon">:</span>`;
        }
        return result;
    }
    if (line.endsWith(":")) {
        return `<span class="script_key">${line.slice(
            0,
            -1
        )}</span><span class="script_colon">:</span>`;
    }
    let colonIndex = line.indexOf(":");
    if (colonIndex !== -1) {
        let key = line.slice(0, colonIndex);
        return `<span class="script_key">${key}</span><span class="script_colon">:</span>${ColorArgument(
            line.slice(colonIndex + 1),
            false,
            "key:" + key
        )}`;
    }
    return `<span class="script_bad_space">${line}</span>`;
}

export function ColorArgument(arg, canQuote, contextualLabel) {
    arg = arg.replace(/&lt;/g, CHAR_TAG_START).replace(/&gt;/g, CHAR_TAG_END);
    let output = "";
    let quoted = false;
    let quoteMode = "x";
    let inTagCounter = 0;
    let tagStart = 0;
    let referenceDefault =
        contextualLabel === "key:definitions" ? "def_name" : "normal";
    let defaultColor = referenceDefault;
    let lastColor = 0;
    let hasTagEnd = checkIfHasTagEnd(arg, false, "x", canQuote);
    let spaces = 0;
    for (let i = 0; i < arg.length; i++) {
        let c = arg[i];

        if (canQuote && (c === '"' || c === "'")) {
            if (quoted && c === quoteMode) {
                output += `<span class="script_${defaultColor}">${arg.slice(
                    lastColor,
                    i + 1
                )}</span>`;
                lastColor = i + 1;
                defaultColor = referenceDefault;
                quoted = false;
            } else if (!quoted) {
                output += `<span class="script_${defaultColor}">${arg.slice(
                    lastColor,
                    i
                )}</span>`;
                lastColor = i;
                quoted = true;
                defaultColor = c === '"' ? "quote_double" : "quote_single";
                quoteMode = c;
            }
        } else if (
            hasTagEnd &&
            c === CHAR_TAG_START &&
            i + 1 < arg.length &&
            VALID_TAG_FIRST_CHAR.test(arg[i + 1])
        ) {
            inTagCounter++;
            if (inTagCounter === 1) {
                output += `<span class="script_${defaultColor}">${arg.slice(
                    lastColor,
                    i
                )}</span>`;
                output += `<span class="script_tag">${CHAR_TAG_START}</span>`;
                lastColor = i + 1;
                tagStart = i;
                defaultColor = "tag";
            }
        } else if (hasTagEnd && c === CHAR_TAG_END && inTagCounter > 0) {
            inTagCounter--;
            if (inTagCounter === 0) {
                output += colorTag(arg.slice(tagStart + 1, i));
                output += `<span class="script_tag">${arg.slice(
                    i,
                    i + 1
                )}</span>`;
                defaultColor = quoted
                    ? quoteMode === '"'
                        ? "quote_double"
                        : "quote_single"
                    : referenceDefault;
                lastColor = i + 1;
            }
        } else if (
            inTagCounter === 0 &&
            c === "|" &&
            contextualLabel === "key:definitions"
        ) {
            output += `<span class="script_${defaultColor}">${arg.slice(
                lastColor,
                i
            )}</span><span class="script_normal">|</span>`;
            lastColor = i + 1;
        } else if (
            inTagCounter === 0 &&
            c === ":" &&
            DeffableCommandLabels.includes(contextualLabel)
        ) {
            let part = arg.slice(lastColor, i);
            if (
                part.startsWith("def.") &&
                !part.includes("<") &&
                !part.includes(" ")
            ) {
                output += `<span class="script_${defaultColor}">def.</span><span class="script_def_name">${arg.slice(
                    lastColor + "def.".length,
                    i
                )}</span>`;
                lastColor = i;
            }
        } else if (c === " " && !quoted && canQuote && inTagCounter === 0) {
            hasTagEnd = checkIfHasTagEnd(
                arg.slice(i + 1),
                quoted,
                quoteMode,
                canQuote
            );
            output += `<span class="script_${defaultColor}">${arg.slice(
                lastColor,
                i
            )}</span> `;
            lastColor = i + 1;
            if (!quoted) {
                inTagCounter = 0;
                defaultColor = referenceDefault;
                spaces++;
            }
            let nextSpace = arg.indexOf(" ", i + 1);
            let nextArg =
                nextSpace === -1
                    ? arg.slice(i + 1)
                    : arg.slice(i + 1, nextSpace);
            if (!quoted && canQuote) {
                if (
                    IfOperators.includes(nextArg) &&
                    IfCommandLabels.includes(contextualLabel)
                ) {
                    output += `<span class="script_colon">${arg.slice(
                        i + 1,
                        i + 1 + nextArg.length
                    )}</span>`;
                    i += nextArg.length;
                    lastColor = i + 1;
                } else if (
                    nextArg.startsWith("as:") &&
                    !nextArg.includes("<") &&
                    (contextualLabel === "cmd:foreach" ||
                        contextualLabel === "cmd:repeat")
                ) {
                    output += `<span class="script_normal">as:</span><span class="script_def_name">${arg.slice(
                        i + 1 + "as:".length,
                        i + 1 + nextArg.length
                    )}</span>`;
                    i += nextArg.length;
                    lastColor = i + 1;
                } else if (
                    nextArg.startsWith("key:") &&
                    !nextArg.includes("<") &&
                    contextualLabel === "cmd:foreach"
                ) {
                    output += `<span class="script_normal">key:</span><span class="script_def_name">${arg.slice(
                        i + 1 + "key:".length,
                        i + 1 + nextArg.length
                    )}</span>`;
                    i += nextArg.length;
                    lastColor = i + 1;
                } else if (
                    spaces === 1 &&
                    (contextualLabel === "cmd:define" ||
                        contextualLabel === "cmd:definemap")
                ) {
                    let colonIndex = nextArg.indexOf(":");
                    if (colonIndex === -1) {
                        colonIndex = nextArg.length;
                    }
                    let tagMark = nextArg.indexOf("<");
                    if (tagMark === -1 || tagMark > colonIndex) {
                        output += `<span class="script_def_name">${arg.slice(
                            i + 1,
                            i + 1 + colonIndex
                        )}</span>`;
                        i += colonIndex;
                        lastColor = i + 1;
                        let argStart = nextArg[0];
                        if (
                            !quoted &&
                            canQuote &&
                            (argStart === '"' || argStart === "'")
                        ) {
                            quoted = true;
                            defaultColor =
                                argStart === '"'
                                    ? "quote_double"
                                    : "quote_single";
                            quoteMode = argStart;
                        }
                    }
                }
            }
        }
    }
    if (lastColor < arg.length) {
        output += `<span class="script_${defaultColor}">${arg.slice(
            lastColor
        )}</span>`;
    }
    return output;
}
function checkIfHasTagEnd(arg, quoted, quoteMode, canQuote) {
    let paramCount = 0;
    for (let i = 0; i < arg.length; i++) {
        let c = arg[i];
        if (canQuote && (c === '"' || c === "'")) {
            if (quoted && c === quoteMode) {
                quoted = false;
            } else if (!quoted) {
                quoted = true;
                quoteMode = c;
            }
        } else if (c === "[") {
            paramCount++;
        } else if (c === "]" && paramCount > 0) {
            paramCount--;
        } else if (c === CHAR_TAG_END) {
            return true;
        } else if (c === " " && !quoted && canQuote && paramCount === 0) {
            return false;
        }
    }
    return false;
}

function colorTag(tag) {
    let output = "";
    let inTagCounter = 0;
    let tagStart = 0;
    let inTagParamCounter = 0;
    let defaultColor = "tag";
    let lastColor = 0;

    for (let i = 0; i < tag.length; i++) {
        const c = tag[i];

        if (c === CHAR_TAG_START) {
            inTagCounter++;
            if (inTagCounter === 1) {
                output += `<span class="script_${defaultColor}">${tag.substring(
                    lastColor,
                    i
                )}</span>`;
                output += `<span class="script_tag">${CHAR_TAG_START}</span>`;
                lastColor = i + 1;
                defaultColor = "tag";
                tagStart = i;
            }
        } else if (c === CHAR_TAG_END && inTagCounter > 0) {
            inTagCounter--;
            if (inTagCounter === 0) {
                output += colorTag(tag.substring(tagStart + 1, i));
                output += `<span class="script_tag">${tag.substring(
                    i,
                    i + 1
                )}</span>`;
                defaultColor = inTagParamCounter > 0 ? "tag_param" : "tag";
                lastColor = i + 1;
            }
        } else if (c === "[" && inTagCounter === 0) {
            inTagParamCounter++;
            if (inTagParamCounter === 1) {
                output += `<span class="script_${defaultColor}">${tag.substring(
                    lastColor,
                    i
                )}</span>`;
                output += `<span class="script_tag_param_bracket">[</span>`;
                lastColor = i + 1;
                defaultColor = i === 0 ? "def_name" : "tag_param";
            }
        } else if (c === "]" && inTagCounter === 0) {
            inTagParamCounter--;
            if (inTagParamCounter === 0) {
                output += `<span class="script_${defaultColor}">${tag.substring(
                    lastColor,
                    i
                )}</span>`;
                output += `<span class="script_tag_param_bracket">]</span>`;
                defaultColor = "tag";
                lastColor = i + 1;
            }
        } else if (
            (c === "." || c === "|") &&
            inTagCounter === 0 &&
            inTagParamCounter === 0
        ) {
            output += `<span class="script_${defaultColor}">${tag.substring(
                lastColor,
                i
            )}</span>`;
            lastColor = i + 1;
            output += `<span class="script_tag_dot">${tag.substring(
                i,
                i + 1
            )}</span>`;
        }
    }

    if (lastColor < tag.length) {
        output += `<span class="script_${defaultColor}">${tag.substring(
            lastColor
        )}</span>`;
    }
    return output;
}

export default Highlighter;
