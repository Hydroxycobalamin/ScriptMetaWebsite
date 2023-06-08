import React from "react";

export const MetaName = ({ name }) => {
    const hashLink = `#${name}`
    return (
        <tr className="table-primary">
            <td className="td-doc-key">Name</td>
            <td>
                <a href={hashLink}>{name}</a></td>
        </tr>
    );
};

export default MetaName;
