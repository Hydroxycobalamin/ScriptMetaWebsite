import React from "react";
import { Highlighter } from "../ScriptHighlighting/ScriptHighlighter.jsx";

export const MetaExample = ({ example }) => {
    const checkForWhiteSpace = (line) => {
        return line.startsWith(" ");
    };
    if (!example) {
        return null;
    }
    return (
        <tr className="table-default">
            <td className="td-doc-key">Example:</td>
            <td>
                {example && example.length > 0 ? (
                    example.map((item, index) => (
                        <React.Fragment key={index}>
                            <span className={checkForWhiteSpace(item) ? "whiteSpace" : ""}>
                                <Highlighter text={item} />
                                <br />
                            </span>
                        </React.Fragment>
                    ))
                ) : (
                    <tr className="table-default">
                        <td className="td-doc-key">Example:</td>
                        <td>No example available</td>
                    </tr>
                )}
            </td>
        </tr>
    );
};

export default MetaExample;
