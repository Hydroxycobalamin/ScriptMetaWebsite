import React, { useEffect, useState } from "react";
import Script from "./MetaObjects/Script";

import { ScrollHelper } from "./Helpers/ScrollHelper";

const ScriptList = () => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchScripts();
    }, []);

    useEffect(() => {
        if (!isLoading) {
            ScrollHelper();
        }
    }, [isLoading]);

    const fetchScripts = async () => {
        try {
            const response = await fetch("/api/script");
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

    if (isLoading) {
        return <div className="status">Loading...</div>;
    }

    if (error) {
        return <div className="status">{error}</div>;
    }

    if (data.length === 0) {
        return <div className="status">No data available</div>;
    }

    return (
        <div className="d-flex flex-column">
            <div className="jumbotron">
                <center>
                    <h3>Script Explanations</h3>
                    <p>Script Explanations explain different scripts and features.</p>
                    <h4>New to Denizen?</h4>
                    <p>
                        Check out the <a href="https://guide.denizenscript.com/">Denizen Beginner's Guide</a> and join the Denizen{" "}
                        <a href="https://discord.gg/Q6pZGSR">Discord</a>.
                    </p>
                </center>
            </div>
            <center>
                <Script data={data} />
            </center>
        </div>
    );
};

export default ScriptList;
