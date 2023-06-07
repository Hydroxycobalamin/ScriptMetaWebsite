import React from "react";

export const MetaSource = ({ source }) => {
    return (
        <tr className="table-secondary">
            <td className="td-doc-key">Source:</td>
            <td>
                <a href={source}>{source}</a>
            </td>
        </tr>
    );
};

export default MetaSource;
