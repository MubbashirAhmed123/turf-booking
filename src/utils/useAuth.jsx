import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { baseUrl } from '../baseUrl';

const useAuth = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const isAuth = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                navigate('/');
                return;
            }
            try {
                const res = await fetch(`${baseUrl}/dashboard`, {
                    method: 'GET',
                    headers: {
                         'Content-Type': 'application/json',
                         'Authorization': `Bearer ${token}`
                    }
                });
                const data=await res.json()

                if (!res.ok) {
                    const errorData = await res.json();
                    localStorage.removeItem('token');
                    localStorage.removeItem('name')
                    toast.error(errorData.msg);
                    navigate('/');
                }

            } catch (error) {
                toast.error(error.message);
                localStorage.removeItem('token');
                localStorage.removeItem('name')

                navigate('/');
            }
        }
        isAuth();
    }, [navigate]);
};

export default useAuth;
