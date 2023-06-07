import React from "react";
import { ColorContextTag } from "../ScriptHighlighting/ContextHightligher.jsx";

export const MetaContext = ({ context }) => {
    return (
        <tr className="table-default">
            <td className="td-doc-key">Contexts</td>
            <td>
                {context && context.length > 0 ? (
                    context.map((item, index) => (
                        <React.Fragment key={index}>
                            <ColorContextTag tag={item} />
                            <br />
                        </React.Fragment>
                    ))
                ) : (
                    <tr className="table-default">
                        <td className="td-doc-key">Context</td>
                        <td>No context available</td>
                    </tr>
                )}
            </td>
        </tr>
    );
};

export default MetaContext;
