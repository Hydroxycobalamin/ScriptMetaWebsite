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
                        <Link to="/" className="navbar-brand">
                            Icecapades Script Documentation
                        </Link>
                        <div>
                            <ul className="navbar-nav">
                                <li className="nav-item">
                                    <Link to="/events" className="nav-link">
                                        Events
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/procedures" className="nav-link">
                                        Procedures
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/tasks" className="nav-link">
                                        Tasks
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/scripts" className="nav-link">
                                        Script Explanations
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/informations" className="nav-link">
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
                        <Route path="/tasks" element={<TaskList />} />
                        <Route path="/scripts" element={<ScriptList />} />
                        <Route path="/procedures" element={<ProcedureList />} />
                        <Route path="/informations" element={<InformationList />} />
                        <Route path="/events" element={<EventList />} />
                    </Routes>
                    <footer>
                        <center>
                            <br />
                            <hr />
                            ScriptMetaWebsite, created by Icecapade, is a website to let you browse through Script meta-documentation.
                            <br />
                            You can find <a href="https://github.com/Hydroxycobalamin/ScriptMetaWebsite">ScriptMetaWebsite on GitHub</a>.
                            <br />
                            Theme: Standard Dark, created by Alex 'mcmonkey' Goodwin.
                            <br />
                            <a href="https://bootswatch.com/darkly/">Darkly Bootstrap Theme</a> by Thomas Park, which was released under the{" "}
                            <a href="https://github.com/thomaspark/bootswatch/blob/7fcf822114e71cfb3b89e98afb58055d21f5e240/LICENSE">MIT License</a>
                            <br />
                            This site is powered by ReactJS and inspired by <a href="https://github.com/DenizenScript/DenizenMetaWebsite">DenizenMetaWebsite</a>.
                        </center>
                    </footer>
                </div>
            </Router>
        </SearchContext.Provider>
    );
};

export default App;
