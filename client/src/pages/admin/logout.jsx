import { useEffect } from 'react';
import { logoutUser } from '../../api/admin';

export function Logout() {

    useEffect(() => {
        const clearSession = async () => {
            await logoutUser();
            window.location.href = '/home'; // Redirige a la página de inicio
        };

        clearSession();
    }, []);

    return null;
}
