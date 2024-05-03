import { useState, useEffect } from 'react';
import { useUserData } from './UsersFunctions';

type ReportsEntity = {
    id: string;
    userId: string;
    userName?: string;
    userEmail?: string;
    reportTitle: string;
    reportDescription: string;
    createdAt: string;
};

const useReportsData = () => {
    const [reports, setReports] = useState<ReportsEntity[]>([]);
    const users = useUserData();

    useEffect(() => {
        const fetchReportsData = async () => {
            try {
                const response = await fetch('http://52.65.15.61:3000/admin/reports');
                if (!response.ok) {
                    throw new Error('Failed to fetch reports data');
                }
                const reportsData = await response.json();

                // Update reportsData with user email
                const updatedReportsData = reportsData.map((item: ReportsEntity) => {
                    const user = users.find(user => user.userId === item.userId);
                    return {
                        ...item,
                        userEmail: user ? user.email : '',
                        userName: user ? user.name : ''
                    };
                });

                setReports(updatedReportsData);
            } catch (error) {
                console.error('Error fetching reports data:', error);
            }
        };

        fetchReportsData();
    }, [users]);

    return reports;
};

const useDeleteReport = (reportId: string) => {
    const [isDeleting, setIsDeleting] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const deleteReport = async () => {
        setIsDeleting(true);
        try {
            const response = await fetch(`http://52.65.15.61:3000/admin/deleteReport/${reportId}`, {
                method: 'PUT',
            });
            if (!response.ok) {
                throw new Error('Failed to delete report');
            }
        } catch (error) {
            setError((error as Error).message);
        } finally {
            setIsDeleting(false);
        }
    };

    return { deleteReport, isDeleting, error };
};

export { useReportsData, useDeleteReport };
