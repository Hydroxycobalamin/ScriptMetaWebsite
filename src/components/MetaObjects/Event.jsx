import React, { useContext } from "react";
import { SearchContext } from "../../App";
import { filterDataBySearchQuery } from "../SearchHelper/Search";
import { SanitizeName } from "../Helpers/SanitizeName";

import MetaName from "../MetaFields/MetaName.jsx";
import MetaEventLines from "../MetaFields/MetaEventLines.jsx";
import MetaTrigger from "../MetaFields/MetaTriggers.jsx";
import MetaWarning from "../MetaFields/MetaWarning.jsx";
import MetaSource from "../MetaFields/MetaSource.jsx";
import MetaGroup from "../MetaFields/MetaGroup.jsx";
import MetaExample from "../MetaFields/MetaExample.jsx";
import MetaSwitch from "../MetaFields/MetaSwitches.jsx";
import MetaContext from "../MetaFields/MetaContexts.jsx";
import MetaScript from "../MetaFields/MetaScript.jsx";

const MetaEvent = ({ data }) => {
    const searchQuery = useContext(SearchContext);

    const filteredData = filterDataBySearchQuery(data, searchQuery);

    return (
        <div className="p-2">
            {filteredData.length > 0 ? (
                filteredData.map((entry, tableIndex) => (
                    <table id={SanitizeName(entry.events[0])} key={tableIndex} className="table table-hover">
                        <tbody>
                            <MetaName name={entry.events[0]} type="events" />
                            <MetaEventLines eventLines={entry.events} />
                            <MetaTrigger trigger={entry.triggers} />
                            <MetaExample example={entry.example} />
                            <MetaSwitch switches={entry.switch} />
                            <MetaContext context={entry.context} />
                            <MetaGroup group={entry.group} />
                            <MetaScript script={entry.script} />
                            <MetaWarning warning={entry.warning} />
                            <MetaSource source={entry.source} />
                        </tbody>
                    </table>
                ))
            ) : (
                <div>No matching Events found</div>
            )}
        </div>
    );
};

export default MetaEvent;
