import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const RepositoryList = () => {
    const { username } = useParams();
    const navigate = useNavigate();
    const [repositories, setRepositories] = useState([]);

    useEffect(() => {
        const fetchRepositories = async () => {
            const response = await fetch(`https://api.github.com/users/${username}/repos`);
            const data = await response.json();
            setRepositories(data);
        };

        fetchRepositories();
    }, [username]);

    return (
        <div>
            <h2>Repositories of {username}</h2>
            <div className="list-container">
                <ul>
                    {repositories.map((repo) => (
                        <li key={repo.id} onClick={() => navigate(`/repository/${username}/${repo.name}`)}>
                            <img src={repo.owner.avatar_url}></img><p><span>{repo.name}</span><br></br>{repo.description}</p>
                        </li>
                    ))}
                </ul>
            </div>
            <button onClick={() => navigate(`/followers/${username}`)}>View Followers</button>
        </div>
    );
};

export default RepositoryList;
