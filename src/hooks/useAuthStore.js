import { useDispatch, useSelector } from 'react-redux';
import { calendarApi } from '../api';
import { clearErrorMessages, onCheking, onLogin, onLogout } from '../store';

export const useAuthStore = () => {

    const { status, user, errorMessage } = useSelector(state => state.auth);
    const dispatch = useDispatch();

    /**
     * Function to start login
     * @param {*} email - email of user
     * @param {*} password - password of user
     */
    const startLogin = async({email, password}) => {

        dispatch(onCheking());

        try {
            
            const { data } = await calendarApi.post('/auth', { email, password });
            localStorage.setItem('token', data.token);
            localStorage.setItem('token-init-date', new Date().getTime());

            dispatch(onLogin({ name: data.name, uid: data.uid }));
            

        } catch (error) {
            dispatch(onLogout('Credenciales incorrectas'));

            //Clear error messages in 10ms
            setTimeout(() => {
                dispatch(clearErrorMessages());
            }, 10);

        }

    }

    /**
     * Resive los datos del formulario y los envia al backend
     * @param {*} name - name of user
     * @param {*} email - email of user
     * @param {*} password - password of user
     * 
     */
    const startRegister = async({name, email, password}) => {

        dispatch(onCheking());

        try {
           
            const { data } = await calendarApi.post('/auth/new', { name, email, password });

            localStorage.setItem('token', data.token);
            localStorage.setItem('token-init-date', new Date().getTime());

            dispatch(onLogin({ name: data.name, uid: data.uid }));
            
        } catch (error) {
            dispatch(onLogout(error.response.data?.message || 'Error desconocido'));

            //Clear error messages in 10ms
            setTimeout(() => {
                dispatch(clearErrorMessages());
            }, 10);
        }

    }

    return {

        //Properties
        status,
        user,
        errorMessage,


        //Methods
        startLogin,
        startRegister,
    }

}
