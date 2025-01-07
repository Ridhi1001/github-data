import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
    const [username, setUsername] = useState("");
    const navigate = useNavigate();

    const handleSearch = () => {
        if (username.trim()) {
            navigate(`/repositories/${username}`);
        }
    };

    return (
        <div className="home">
            <h1>GitHub User Explorer</h1>
            <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter GitHub Username"
            />
            <button onClick={handleSearch}>Search</button>
        </div>
    );
};

export default Home;
