import React from "react";

export const MetaTrigger = ({ trigger }) => {
    return (
        <tr className="table-default">
            <td className="td-doc-key">Trigger</td>
            <td>{trigger}</td>
        </tr>
    );
};

export default MetaTrigger;
