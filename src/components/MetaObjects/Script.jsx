import React, { useContext } from "react";
import { SearchContext } from "../../App";
import { filterDataBySearchQuery } from "../SearchHelper/Search";

import MetaName from "../MetaFields/MetaName.jsx";
import MetaDescription from "../MetaFields/MetaDescription.jsx";
import MetaWarning from "../MetaFields/MetaWarning.jsx";
import MetaSource from "../MetaFields/MetaSource.jsx";
import MetaDownload from "../MetaFields/MetaDownload";
import MetaGroup from "../MetaFields/MetaGroup";

const MetaScript = ({ data }) => {
    const searchQuery = useContext(SearchContext);

    const filteredData = filterDataBySearchQuery(data, searchQuery);

    return (
        <div className="p-2">
            {filteredData.length > 0 ? (
                filteredData.map((entry, tableIndex) => (
                    <table key={tableIndex} className="table table-hover">
                        <tbody>
                            <MetaName name={entry.name} />
                            <MetaDescription description={entry.description} />
                            <MetaDownload download={entry.download} />
                            <MetaGroup group={entry.group} />
                            <MetaWarning warning={entry.warning} />
                            <MetaSource source={entry.source} />
                        </tbody>
                    </table>
                ))
            ) : (
                <div>No matching scripts found</div>
            )}
        </div>
    );
};

export default MetaScript;
