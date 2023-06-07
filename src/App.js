import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import TaskList from "./components/TaskList";
import AllData from "./components/AllData";
import ScriptList from "./components/ScriptList";
import ProcedureList from "./components/ProcedureList";
import InformationList from "./components/InformationList";
import EventList from "./components/EventList";

export const SearchContext = React.createContext();

const App = () => {
    const [searchQuery, setSearchQuery] = useState("");

    const handleSearch = (event) => {
        setSearchQuery(event.target.value);
    };

    return (
        <SearchContext.Provider value={searchQuery}>
            <Router>
                <div className="position-relative">
                    <nav className="navbar navbar-expand navbar-dark bg-primary">
                        <a className="navbar-brand" href="/">
                            Icecapades Script Documentation
                        </a>
                        <div>
                            <ul className="navbar-nav">
                                <li className="nav-item">
                                    <Link to="/event" className="nav-link">
                                        Events
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/procedure" className="nav-link">
                                        Procedures
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/task" className="nav-link">
                                        Tasks
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/script" className="nav-link">
                                        Script Explanations
                                    </Link>
                                </li>

                                <li className="nav-item">
                                    <Link to="/information" className="nav-link">
                                        Informations
                                    </Link>
                                </li>

                            </ul>
                        </div>
                        <div className="position-absolute end-0">
                            <input type="text" value={searchQuery} onChange={handleSearch} placeholder="Search..." style={{ margin: "10px" }} />
                        </div>
                    </nav>
                    <Routes>
                        <Route path="/" element={<AllData />} />
                        <Route path="/task" element={<TaskList />} />
                        <Route path="/all" element={<AllData />} />
                        <Route path="/script" element={<ScriptList />} />
                        <Route path="/procedure" element={<ProcedureList />} />
                        <Route path="/information" element={<InformationList />} />
                        <Route path="/event" element={<EventList />} />
                    </Routes>
                    <footer>
                        <center>
                            <br />
                            <hr />
                            ScriptMetaWebsite, created by Icecapade, is a website to let you browse through Script meta-documentation.
                            <br />
                            You can find ScriptMetaWebsite on Github.
                            <br />
                            Theme: Standard Dark, created by Alex 'mcmonkey' Goodwin.
                            <br />
                            <a href="https://bootswatch.com/darkly/">Darkly Bootstrap Theme</a> by Thomas Park, which was released under the{" "}
                            <a href="https://github.com/thomaspark/bootswatch/blob/7fcf822114e71cfb3b89e98afb58055d21f5e240/LICENSE">MIT License</a>
                        </center>
                    </footer>
                </div>
            </Router>
        </SearchContext.Provider>
    );
};

export default App;
