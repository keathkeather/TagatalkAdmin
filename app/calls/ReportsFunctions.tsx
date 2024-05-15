import { useState, useEffect } from 'react';
import { useUserData } from './UsersFunctions';

type ReportsEntity = {
    id: string;
    userId: string;
    reportTitle: string;
    reportDescription: string;
    createdAt: string;
    user: user;
};

type user = {
    name: string;
    email: string;
}

const useReportsData = () => {
    const [reports, setReports] = useState<ReportsEntity[]>([]);
    const users = useUserData();

    useEffect(() => {
        const fetchReportsData = async () => {
            try {
                const response = await fetch('http://13.236.105.57:3000/admin/reports');
                if (!response.ok) {
                    throw new Error('Failed to fetch reports data');
                }
                const reportsData = await response.json();
                setReports(reportsData);
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
            const response = await fetch(`http://13.236.105.57:3000/admin/deleteReport/${reportId}`, {
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
