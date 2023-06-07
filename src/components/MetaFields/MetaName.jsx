import React from "react";

export const MetaName = ({ name }) => {
    return (
        <tr className="table-primary">
            <td className="td-doc-key">Name</td>
            <td>{name}</td>
        </tr>
    );
};

export default MetaName;
