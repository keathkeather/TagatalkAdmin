import { useState, useEffect } from 'react';
import { useUserData } from './UsersFunctions';
import Cookies from 'js-cookie';

type FeedbackEntity = {
    id: string;
    userId: string;
    feedbackTitle: string;
    feedbackDescription: string;
    createdAt: string;
    user: user;
};``

type user = {
    name: string;
    email: string;
}

const useFeedbackData = () => {
    const [feedback, setFeedback] = useState<FeedbackEntity[]>([]);
    const users = useUserData();

    useEffect(() => {
        const fetchFeedbackData = async () => {
            try {
                const token = Cookies.get('token');
                if (!token) throw new Error('No token found');
                
                const response = await fetch(`${process.env.NEXT_PUBLIC_API}/v1/admin/feedbacks`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch feedback data');
                }
                const feedbackData = await response.json();
                setFeedback(feedbackData);
            } catch (error) {
                console.error('Error fetching feedback data:', error);
            }
        };

        fetchFeedbackData();
    }, [users]);

    return feedback;
};

const useDeleteFeedback = (feedbackId: string) => {
    const [isDeleting, setIsDeleting] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const deleteFeedback = async () => {
        setIsDeleting(true);
        try {
            const token = Cookies.get('token');
            if (!token) throw new Error('No token found');

            const response = await fetch(`${process.env.NEXT_PUBLIC_API}/admin/deleteFeedback/${feedbackId}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            
            if (!response.ok) {
                throw new Error('Failed to delete feedback');
            }
        } catch (error) {
            setError((error as Error).message);
        } finally {
            setIsDeleting(false);
        }
    };

    return { deleteFeedback, isDeleting, error };
};

export { useFeedbackData, useDeleteFeedback };
