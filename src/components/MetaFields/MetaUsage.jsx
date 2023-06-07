import React from "react";
import { Highlighter } from "../ScriptHighlighting/ScriptHighlighter.jsx";

export const MetaUsage = ({ usage }) => {
    return (
        <tr className="table-default">
            <td className="td-doc-key">Example:</td>
            <td>
                {usage && usage.length > 0 ? (
                    usage.map((item, index) => (
                        <React.Fragment key={index}>
                            <Highlighter text={item} />
                            <br></br>
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

export default MetaUsage;
