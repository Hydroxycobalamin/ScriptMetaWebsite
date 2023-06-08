import React from "react";
import { SanitizeName } from "../Helpers/SanitizeName";
import { useLocation } from "react-router-dom";

export const MetaName = ({ name, type }) => {
    var location = useLocation();
    var hashLink = "";
    if(location.pathname === "/") {
        hashLink = type + `/#${SanitizeName(name)}`
    }
    else {
        hashLink = `#${SanitizeName(name)}`
    }
    return (
        <tr className="table-primary">
            <td className="td-doc-key">Name</td>
            <td>
                <a href={hashLink}>{name}</a></td>
        </tr>
    );
};

export default MetaName;
