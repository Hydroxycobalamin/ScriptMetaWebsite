import React from "react";

export const MetaDescription = ({ description }) => {
    return (
        <tr className="table-default">
            <td className="td-doc-key">Description:</td>
            <td>
                {description && description.length > 0 ? (
                    description.map((item, index) => (
                        <React.Fragment key={index}>
                            {item}
                            <br />
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
