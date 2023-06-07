import React from "react";

export const MetaWarning = ({ warning }) => {
    if (!warning) {
        return null;
    }
    return (
        <tr className="table-danger">
            <td className="td-doc-key">Warning</td>
            <td>{warning}</td>
        </tr>
    );
};

export default MetaWarning;
