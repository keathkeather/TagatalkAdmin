import { useState, useEffect } from 'react';
import { useUserData } from './UsersFunctions';

type FeedbackEntity = {
    id: string;
    userId: string;
    feedbackTitle: string;
    feedbackDescription: string;
    createdAt: string;
    user: user;
};

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
                const response = await fetch('http://52.65.15.61:3000/admin/feedbacks');
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
            const response = await fetch(`http://52.65.15.61:3000/admin/deleteFeedback/${feedbackId}`, {
                method: 'PUT',
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
