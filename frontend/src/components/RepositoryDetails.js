import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const RepositoryDetails = () => {
    const { username, repoName } = useParams();
    const navigate = useNavigate();
    const [repository, setRepository] = useState(null);

    useEffect(() => {
        const fetchRepository = async () => {
            const response = await fetch(`https://api.github.com/repos/${username}/${repoName}`);
            const data = await response.json();
            setRepository(data);
        };

        fetchRepository();
    }, [username, repoName]);

    return (
        <div className="repository-details">
            <button onClick={() => navigate(-1)}>Back</button>
            {repository ? (
                <div className="main">

                    <div className="stats">
                        <img src={repository.owner.avatar_url} alt="Owner Avatar" className="avatar" />
                        <p>
                            Stars: {repository.stargazers_count}
                        </p>
                        <p>
                            Forks: {repository.forks_count}
                        </p>
                    </div>
                    <div className="desc">
                        <h2>{repository.name}</h2>
                        <p className="description">{repository.description}</p>
                    </div>
                </div>
            ) : (
                <p className="loading">Loading...</p>
            )}
        </div>
    );
};

export default RepositoryDetails;
