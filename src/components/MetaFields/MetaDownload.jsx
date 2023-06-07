import React from "react";

export const MetaDownload = ({ download }) => {
    if (!download) {
        return null;
    }
    return (
        <tr className="table-normal">
            <td className="td-doc-key">Download</td>
            <td>
                <a href={download}>{download}</a>
            </td>
        </tr>
    );
};

export default MetaDownload;
