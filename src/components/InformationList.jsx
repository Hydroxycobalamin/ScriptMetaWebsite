import React, { useEffect, useState } from "react";
import Information from "./MetaObjects/Information";

const InformationList = () => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        try {
            const response = await fetch("http://localhost:3050/api/information");
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
                    <h3>Informations</h3>
                    <p>Informations explain components of scripts in a technical way.</p>
                    <h4>New to Denizen?</h4>
                    <p>
                        Check out the <a href="https://guide.denizenscript.com/">Denizen Beginner's Guide</a> or ask on{" "}
                        <a href="https://discord.gg/Q6pZGSR">Discord</a> for help.
                    </p>
                </center>
            </div>
            <center>
                <Information data={data} />
            </center>
        </div>
    );
};

export default InformationList;
