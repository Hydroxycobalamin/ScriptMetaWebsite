import React, { useContext } from "react";
import { SearchContext } from "../../App";
import { filterDataBySearchQuery } from "../SearchHelper/Search";
import { SanitizeName } from "../Helpers/SanitizeName";

import MetaName from "../MetaFields/MetaName.jsx";
import MetaDescription from "../MetaFields/MetaDescription.jsx";
import MetaWarning from "../MetaFields/MetaWarning.jsx";
import MetaSource from "../MetaFields/MetaSource.jsx";
import MetaGroup from "../MetaFields/MetaGroup.jsx";

const MetaInformation = ({ data }) => {
    const searchQuery = useContext(SearchContext);

    const filteredData = filterDataBySearchQuery(data, searchQuery);

    return (
        <div className="p-2">
            {filteredData.length > 0 ? (
                filteredData.map((entry, tableIndex) => (
                    <table id={SanitizeName(entry.name)} key={tableIndex} className="table table-hover">
                        <tbody>
                            <MetaName name={entry.name} />
                            <MetaGroup name={entry.group} />
                            <MetaDescription description={entry.description} />
                            <MetaWarning warning={entry.warning} />
                            <MetaSource source={entry.source} />
                        </tbody>
                    </table>
                ))
            ) : (
                <div>No matching informations found</div>
            )}
        </div>
    );
};

export default MetaInformation;
