import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const FollowersList = () => {
    const { username } = useParams();
    const navigate = useNavigate();
    const [followers, setFollowers] = useState([]);

    useEffect(() => {
        const fetchFollowers = async () => {
            const response = await fetch(`https://api.github.com/users/${username}/followers`);
            const data = await response.json();
            setFollowers(data);
        };

        fetchFollowers();
    }, [username]);

    return (
        <div className="followers-list">
            <h2>Followers of {username}</h2>
            {followers.length > 0 ? (
                <ul>
                    {followers.map((follower) => (
                        <li key={follower.id} onClick={() => navigate(`/repositories/${follower.login}`)}>
                            {follower.login}
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="loading">Loading...</p>
            )}
        </div>
    );
};

export default FollowersList;
