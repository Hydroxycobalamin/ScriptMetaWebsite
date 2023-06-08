import React, { useEffect, useState, useContext } from "react";
import Script from "./MetaObjects/Script";
import Task from "./MetaObjects/Task";
import Procedure from "./MetaObjects/Procedure";
import Information from "./MetaObjects/Information";
import Event from "./MetaObjects/Event";

import { SearchContext } from "../App";
import { filterDataBySearchQuery } from "./SearchHelper/Search";
import { ScrollHelper } from "./Helpers/ScrollHelper";

const AllData = () => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const searchQuery = useContext(SearchContext);

    useEffect(() => {
        fetchAllData();
    }, []);

    useEffect(() => {
        if (!isLoading) {
            ScrollHelper();
        }
    }, [isLoading]);

    const fetchAllData = async () => {
        try {
            const response = await fetch("/api/all");
            if (!response.ok) {
                throw new Error("Failed to fetch data");
            }
            const responseData = await response.json();
            setData(responseData.returnMessage.flat());
            setIsLoading(false);
        } catch (error) {
            console.error("Error fetching all data:", error);
            setError("Failed to fetch data. Please try again later.");
            setIsLoading(false);
        }
    };

    const filteredData = filterDataBySearchQuery(data, searchQuery);

    if (isLoading) {
        return <div className="status">Loading...</div>;
    }

    if (error) {
        return <div className="status">{error}</div>;
    }

    const filteredScripts = filteredData.filter((object) => object.type === "script");
    const filteredTasks = filteredData.filter((object) => object.type === "task");
    const filteredProcedure = filteredData.filter((object) => object.type === "procedure");
    const filteredInformation = filteredData.filter((object) => object.type === "information");
    const filteredEvent = filteredData.filter((object) => object.type === "event");

    return (
        <div className="d-flex flex-column">
            <div className="jumbotron">
                <center>
                    <h3>Script Documentation Website</h3>
                    <p>
                        A MetaWebsite for Denizen Scripts. Looking for <a href="https://denizenscript.com/">Denizen</a> instead?
                    </p>
                </center>
            </div>
            <center>
                {filteredEvent.length > 0 && <Event data={filteredEvent} />}
                {filteredScripts.length > 0 && <Script data={filteredScripts} />}
                {filteredTasks.length > 0 && <Task data={filteredTasks} />}
                {filteredProcedure.length > 0 && <Procedure data={filteredProcedure} />}
                {filteredInformation.length > 0 && <Information data={filteredInformation} />}
                {filteredEvent.length === 0 &&
                    filteredScripts.length === 0 &&
                    filteredTasks.length === 0 &&
                    filteredProcedure.length === 0 &&
                    filteredInformation.length === 0 && <div className="p-2">No matching objects found</div>}
            </center>
        </div>
    );
};

export default AllData;
