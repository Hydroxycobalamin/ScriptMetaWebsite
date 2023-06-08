import React, { useContext } from "react";
import { SearchContext } from "../../App";
import { filterDataBySearchQuery } from "../SearchHelper/Search";
import { SanitizeName } from "../Helpers/SanitizeName";

import MetaName from "../MetaFields/MetaName.jsx";
import MetaDescription from "../MetaFields/MetaDescription.jsx";
import MetaWarning from "../MetaFields/MetaWarning.jsx";
import MetaSource from "../MetaFields/MetaSource.jsx";
import MetaReturns from "../MetaFields/MetaReturns.jsx";
import MetaScript from "../MetaFields/MetaScript";
import MetaGroup from "../MetaFields/MetaGroup";

const MetaProcedure = ({ data }) => {
    const searchQuery = useContext(SearchContext);

    const filteredData = filterDataBySearchQuery(data, searchQuery);

    return (
        <div className="p-2">
            {filteredData.length > 0 ? (
                filteredData.map((entry, tableIndex) => (
                    <table id={SanitizeName(entry.attribute)} key={tableIndex} className="table table-hover">
                        <tbody>
                            <MetaName name={entry.attribute} />
                            <MetaReturns returns={entry.returns} />
                            <MetaDescription description={entry.description} />
                            <MetaGroup group={entry.group} />
                            <MetaScript script={entry.script} />
                            <MetaWarning warning={entry.warning} />
                            <MetaSource source={entry.source} />
                        </tbody>
                    </table>
                ))
            ) : (
                <div>No matching procedures found</div>
            )}
        </div>
    );
};

export default MetaProcedure;
