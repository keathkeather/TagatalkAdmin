import { useState, useEffect } from 'react';

type UserEntity = {
    userId: string;
    name: string;
    email: string;
};

const useUserData = () => {
    const [users, setUsers] = useState<UserEntity[]>([]);

    useEffect(() => {
        const fetchUsersData = async () => {
            try {
                const response = await fetch('http://13.236.105.57:3000/admin/users');
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

type BannedUserEntity = {
    userId: string;
    name: string;
    email: string;
    auth: auth;
};

type auth = {
    banned_until: string;
}

const useBannedUserData = () => {
    const [bannedUsers, setBannedUsers] = useState<BannedUserEntity[]>([]);

    useEffect(() => {
        const fetchBannedUsersData = async () => {
            try {
                const response = await fetch('http://13.236.105.57:3000/admin/bannedUsers');
                if (!response.ok) {
                throw new Error('Failed to fetch banned users data');
                }
                const bannedUsersData = await response.json();
                setBannedUsers(bannedUsersData);
            } catch (error) {
                console.error('Error fetching banned users data:', error);
            }
        };

        fetchBannedUsersData();
    }, []);

    return bannedUsers;
};

const useDeleteUser = (userId: string) => {
    const [isDeleting, setIsDeleting] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const deleteUser = async () => {
        setIsDeleting(true);
        try {
            const response = await fetch(`http://13.236.105.57:3000/admin/deleteUser/${userId}`, {
                method: 'PUT',
            });
            if (!response.ok) {
                throw new Error('Failed to delete user');
            }
        } catch (error) {
            setError((error as Error).message);
        } finally {
            setIsDeleting(false);
        }
    };

    return { deleteUser, isDeleting, error };
};

const useBanUser = (userId: string, monthsVal: number, daysVal: number) => {
    const [isBanning, setIsBanning] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const banUser = async () => {
        setIsBanning(true);
        try {
            const response = await fetch(`http://13.236.105.57:3000/admin/banUser/${userId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    month: monthsVal,
                    days: daysVal
                }),
            });
            if (!response.ok) {
                throw new Error('Failed to ban user');
            }
        } catch (error) {
            setError((error as Error).message);
        } finally {
            setIsBanning(false);
        }
    };

    return { banUser, isBanning, error };
};

const useUnbanUser = (userId: string) => {
    const [isUnbanning, setIsUnbanning] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const unbanUser = async () => {
        setIsUnbanning(true);
        try {
            const response = await fetch(`http://13.236.105.57:3000/admin/unbanUser/${userId}`, {
                method: 'PUT',
            });
            if (!response.ok) {
                throw new Error('Failed to unban user');
            }
        } catch (error) {
            setError((error as Error).message);
        } finally {
            setIsUnbanning(false);
        }
    };

    return { unbanUser, isUnbanning, error };
};

export { useUserData, useBannedUserData, useDeleteUser, useBanUser, useUnbanUser };
