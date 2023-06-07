import React from "react";

export const MetaScript = ({ script }) => {
    return (
        <tr className="table-warning">
            <td className="td-doc-key">Requires:</td>
            <td>{script}</td>
        </tr>
    );
};

export default MetaScript;
