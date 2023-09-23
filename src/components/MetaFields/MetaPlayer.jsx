import React from "react";

export const MetaPlayer = ({reason}) => {
    if (!reason) {
        return null;
    }
    
    return (
        <tr className="table-default">
            <td className="td-doc-key">Has Player:</td>
            <td>{reason} - this adds switches flagged:{`<`}flag name{`>`} + 'permission:{`<`}node{`>`}', in addition to the '{`<`}player{`>`}' link.</td>
        </tr>
    );
};

export default MetaPlayer;
