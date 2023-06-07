import React, { useContext } from "react";
import { SearchContext } from "../../App.js";
import { filterDataBySearchQuery } from "../SearchHelper/Search.js";

import MetaInput from "../MetaFields/MetaInput.jsx";
import MetaName from "../MetaFields/MetaName.jsx";
import MetaUsage from "../MetaFields/MetaUsage.jsx";
import MetaDescription from "../MetaFields/MetaDescription.jsx";
import MetaScript from "../MetaFields/MetaScript.jsx";
import MetaSource from "../MetaFields/MetaSource.jsx";

const MetaTask = ({ data }) => {
    const searchQuery = useContext(SearchContext);

    const filteredData = filterDataBySearchQuery(data, searchQuery);

    return (
        <div className="p-2">
            {filteredData.length > 0 ? (
                filteredData.map((entry, tableIndex) => (
                    <table key={tableIndex} className="table table-hover">
                        <tbody>
                            <MetaName name={entry.name} />
                            <MetaInput input={entry.input} />
                            <MetaDescription description={entry.description} />
                            <MetaUsage usage={entry.usage} />
                            <MetaScript script={entry.script} />
                            <MetaSource source={entry.source} />
                        </tbody>
                    </table>
                ))
            ) : (
                <div>No matching tasks found</div>
            )}
        </div>
    );
};

export default MetaTask;
