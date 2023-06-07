import React from "react";
import ObjectLink from "../Helpers/ObjectLink";

export const MetaReturns = ({ returns }) => {
    return (
        <tr className="table-default">
            <td className="td-doc-key">Name</td>
            <td>
                <ObjectLink returns={returns} />
            </td>
        </tr>
    );
};

export default MetaReturns;
