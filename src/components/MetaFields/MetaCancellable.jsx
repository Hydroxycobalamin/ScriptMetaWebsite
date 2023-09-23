import React from "react";
import { ToTitleCase } from "../Helpers/ToTitleCase";

export const MetaCancellable = ({boolean}) => {
    if (!boolean) {
        return null;
    }

    return (
        <tr className="table-default">
            <td className="td-doc-key">Cancellable</td>
            <td>{ToTitleCase(boolean)} - This adds {`<`}context.cancelled{`>`} and determine 'cancelled' or 'cancelled:false'</td>
        </tr>
    );
};

export default MetaCancellable;
