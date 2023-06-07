import React from "react";

export const MetaSwitch = ({ switches }) => {
    return (
        <tr className="table-default">
            <td className="td-doc-key">Switches</td>
            <td>
                {switches && switches.length > 0 ? (
                    switches.map((item, index) => (
                        <React.Fragment key={index}>
                            {item}
                            <br />
                        </React.Fragment>
                    ))
                ) : (
                    <div>No switches available</div>
                )}
            </td>
        </tr>
    );
};

export default MetaSwitch;
