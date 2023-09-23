import React from "react";
import { ToTitleCase } from "../Helpers/ToTitleCase";

export const MetaLocation = ({boolean}) => {
    if (!boolean) {
        return null;
    }

    return (
        <tr className="table-default">
            <td className="td-doc-key">Has Location</td>
            <td>{ToTitleCase(boolean)} - This adds the switches 'in:{`<`}area{`>`}', 'location_flagged:{`<`}flag{`>`}', ...</td>
        </tr>
    );
};

export default MetaLocation;
