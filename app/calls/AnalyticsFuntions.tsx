import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';

// Type definitions for data
type LoginSummaryEntity = {
    periodStart: string;
    loginCount: number;
};

type ProgressSummaryEntity = {
    progressCount: number;
};

type SkillProgressEntity = {
    [skillName: string]: {
        progressCount: number;
    };
};

// Fetch login summary data
const useLoginSummaryData = (period: 'DAY' | 'WEEK' | 'MONTH') => {
    const [loginSummary, setLoginSummary] = useState<LoginSummaryEntity[]>([]);

    useEffect(() => {
        const fetchLoginSummaryData = async () => {
            try {
                const token = Cookies.get('token');
                if (!token) throw new Error('No token found');

                const response = await fetch(`http://${process.env.NEXT_PUBLIC_LOCAL_IP}:3000/v1/admin/fetchLoginSummary/${period}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch login summary data');
                }

                const data = await response.json();
                setLoginSummary(data);
            } catch (error) {
                console.error('Error fetching login summary:', error);
            }
        };

        fetchLoginSummaryData();
    }, [period]); // Re-fetch data when period changes

    return loginSummary;
};

// Fetch weekly progress summary data
const useProgressSummaryData = () => {
    const [progressSummary, setProgressSummary] = useState<ProgressSummaryEntity[]>([]);

    useEffect(() => {
        const fetchProgressSummaryData = async () => {
            try {
                const token = Cookies.get('token');
                if (!token) throw new Error('No token found');

                const response = await fetch(`http://${process.env.NEXT_PUBLIC_LOCAL_IP}:3000/v1/admin/getProgressSumary`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch progress summary data');
                }

                const data = await response.json();
                setProgressSummary(data);
            } catch (error) {
                console.error('Error fetching progress summary:', error);
            }
        };

        fetchProgressSummaryData();
    }, []);

    return progressSummary;
};

// Fetch weekly progress count per skill
const useSkillProgressData = () => {
    const [skillProgress, setSkillProgress] = useState<SkillProgressEntity | null>(null);

    useEffect(() => {
        const fetchSkillProgressData = async () => {
            try {
                const token = Cookies.get('token');
                if (!token) throw new Error('No token found');

                const response = await fetch(`http://${process.env.NEXT_PUBLIC_LOCAL_IP}:3000/v1/admin/getWeeklyProgressCountPerSkill`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch skill progress data');
                }

                const data = await response.json();
                setSkillProgress(data);
            } catch (error) {
                console.error('Error fetching skill progress data:', error);
            }
        };

        fetchSkillProgressData();
    }, []);

    return skillProgress;
};

// Export the hooks for use in components
export {
    useLoginSummaryData,
    useProgressSummaryData,
    useSkillProgressData
};
