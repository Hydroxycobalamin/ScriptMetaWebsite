import React from "react";

export const MetaGroup = ({ group }) => {
    if (!group) {
        return null;
    }
    return (
        <tr className="table-default">
            <td className="td-doc-key">Group</td>
            <td>{group}</td>
        </tr>
    );
};

export default MetaGroup;
