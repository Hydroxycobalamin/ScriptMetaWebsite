import React, { useEffect, useState } from "react";
import Procedure from "./MetaObjects/Procedure";

const ProcedureList = () => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        try {
            const response = await fetch("/api/procedure");
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
                    <h3>Procedures</h3>
                    <p>
                        Procedures are used to return data. They do not modify external data. Learn how to use them in{" "}
                        <a href="https://guide.denizenscript.com/">Denizen Beginner's Guide</a>
                    </p>
                    <h4>New to Denizen?</h4>
                    <p>
                        Check out the <a href="https://guide.denizenscript.com/">Denizen Beginner's Guide</a> and join the Denizen{" "}
                        <a href="https://discord.gg/Q6pZGSR">Discord</a>.
                    </p>
                </center>
            </div>
            <center>
                <Procedure data={data} />
            </center>
        </div>
    );
};

export default ProcedureList;
