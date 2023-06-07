import React from "react";

export const MetaInput = ({ input }) => {
    return (
        <tr className="table-default">
            <td className="td-doc-key">Input</td>
            <td>{input}</td>
        </tr>
    );
};

export default MetaInput;
