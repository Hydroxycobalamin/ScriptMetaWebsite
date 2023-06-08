import React from "react";
import { SanitizeName } from "../Helpers/SanitizeName";

export const MetaName = ({ name }) => {
    const hashLink = `#${SanitizeName(name)}`
    return (
        <tr className="table-primary">
            <td className="td-doc-key">Name</td>
            <td>
                <a href={hashLink}>{name}</a></td>
        </tr>
    );
};

export default MetaName;
