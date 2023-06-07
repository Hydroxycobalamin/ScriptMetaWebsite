import React from "react";

export const MetaEventLines = ({ eventLines }) => {
    return (
        <tr className="table-secondary">
            <td className="td-doc-key">Event Lines</td>
            <td>
                {eventLines && eventLines.length > 0 ? (
                    eventLines.map((item, index) => (
                        <React.Fragment key={index}>
                            <span className="syntax_command">{item}</span>
                        </React.Fragment>
                    ))
                ) : (
                    <div>No eventline available</div>
                )}
            </td>
        </tr>
    );
};

export default MetaEventLines;
