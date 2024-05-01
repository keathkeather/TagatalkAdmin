import { useState, useEffect } from 'react';

type UserEntity = {
    userId: number;
    name: string;
    email: string;
};

const useUserData = () => {
    const [users, setUsers] = useState<UserEntity[]>([]);

    useEffect(() => {
        const fetchUsersData = async () => {
        try {
            const response = await fetch('http://52.65.15.61:3000/user/getAllUser');
            if (!response.ok) {
            throw new Error('Failed to fetch users data');
            }
            const usersData = await response.json();
            setUsers(usersData);
        } catch (error) {
            console.error('Error fetching users data:', error);
        }
        };

        fetchUsersData();
    }, []);

    return users;
    };

export default useUserData;
