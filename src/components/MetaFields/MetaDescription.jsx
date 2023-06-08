import React from "react";

export const MetaDescription = ({ description }) => {
    const checkForWhiteSpace = (line) => {
        return line.startsWith(" ");
    }
    return (
        <tr className="table-default">
            <td className="td-doc-key">Description:</td>
            <td>
                {description && description.length > 0 ? (
                    description.map((item, index) => (
                        <React.Fragment key={index}>
                            <span className={checkForWhiteSpace(item) ? "whiteSpace" : ""}>
                            {item}
                            <br />
                            </span>
                        </React.Fragment>
                    ))
                ) : (
                    <div>No description available</div>
                )}
            </td>
        </tr>
    );
};

export default MetaDescription;
