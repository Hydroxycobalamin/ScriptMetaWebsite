import { ColorArgument } from "./ScriptHighlighter.jsx";

export function ColorContextTag({ tag }) {
    const parts = tag.split(" ");

    let tagOutput = "";
    let stringOutput = "";
    tagOutput += ColorArgument(parts[0], false, "meta-hl");
    stringOutput += " ";
    stringOutput += parts.slice(1).join(" ");
    return (
        <>
            <code dangerouslySetInnerHTML={{ __html: tagOutput }}></code>
            {stringOutput}
        </>
    );
}
