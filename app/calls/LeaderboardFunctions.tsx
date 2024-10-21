import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';

type LeaderboardEntity = {
    userId: string;
    name: string;
    userPoints: number;
    rank: number;
};

const useLeaderboardData = () => {
    const [leaderboard, setLeaderboard] = useState<LeaderboardEntity[]>([]);

    useEffect(() => {
        const fetchLeaderboardData = async () => {
            try {
                const token = Cookies.get('token');
                if (!token) throw new Error('No token found');

                const response = await fetch(`http://${process.env.NEXT_PUBLIC_LOCAL_IP}:3000/v1/user/getLeaderBoard`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                if (!response.ok) {
                throw new Error('Failed to fetch leaderboard data');
                }
                const leaderboardData = await response.json();
                setLeaderboard(leaderboardData);
            } catch (error) {
                console.error('Error fetching leaderboard data:', error);
            }
        };

        fetchLeaderboardData();
    }, []);

    return leaderboard;
};

export { useLeaderboardData };
