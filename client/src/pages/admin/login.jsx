import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Auth } from '../../context/admin';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import '../../../public/css/login.css';

export const IsAdmin = () => {
    const { register, handleSubmit} = useForm();
    const { signin, isAuth, errors } = Auth();
    const [isErrors, setIsErrors] = useState([]);
    const [redirect, setRedirect] = useState(false);
    const navigate = useNavigate();


    const handleLogin = async (data) => {
        const res = await signin(data);
        if (res) {
            setRedirect(true);
        }
    };

    useEffect(() => {
        if (isAuth || redirect) {
            navigate('/home');
        }
    }, [isAuth, redirect, navigate]);

    useEffect(()=>{
        if(Array.isArray(errors) && errors.length > 0){
            setIsErrors(errors);
            const timer =  setTimeout(() => {
                setIsErrors([]);
            }, 3000);
            return () => clearTimeout(timer);
        }
},[errors])


    return (
        <div className='loginAll'>
           
                <div className='flex items-center justify-center'>
                <img src="../../../public/imag/icon-ad.png" alt="logo" width={80} />
                <span className='text-2xl font-bold text-white'>Profe Picks</span>
                </div>

                
            <AnimatePresence>
                    {isErrors.map((error, i) => (
                        <motion.div
                            className='bg-red-600 p-2 text-white my-2 max-w-60 m-auto'
                            key={i}
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3 }}>
                            {error}
                        </motion.div>
                    ))}
                </AnimatePresence>


            <form className='formLogin' id="login_form" name="login_form" onSubmit={handleSubmit(handleLogin)} autoComplete="off">

                {/* input DNI */}
   
                <input className='inputs dni text-white'  type="text"  id="username"  {...register('dni', { required: true })}  size="20"  autoCapitalize="off"  autoCorrect="on"  autoComplete="on"  autoFocus  required />
                <label htmlFor="username">DNI</label>
                <small>DNI</small>
                <svg viewBox="0 0 10 10">
                    <use xlinkHref="#user" />
                    <use xlinkHref="#fed" className="fedora" />
                    <use xlinkHref="#burst" className="flash" />
                </svg>


                {/* Input password */}
                <input className='inputs pass text-white'  id="password"  type="password"  name="password"  autoCorrect="off"  autoComplete="new-password"  {...register('password', { required: true })}  size="20"  required />
                <label htmlFor="password">Contraseña</label>
                <small>Contraseña</small>
                <svg viewBox="0 0 10 10">
                    <use xlinkHref="#pad" />
                    <use className="flash" xlinkHref="#burst" />
                    <use className="lock" xlinkHref="#lock" />
                </svg>



                <button className='subSesion' id="submit" type="submit" name="submit">iniciar sesión</button>



                <span className="note" id="note">NOTA: Si no tienes los permisos para estar en esta parte del sitio, te sugerimos que vuelvas al inicio o te puedes meter en problemas.</span>

                <svg xmlns="http://www.w3.org/2000/svg" className="hbox" viewBox="0 0 200 40">
                    <rect x=".5" y=".5" ry="3" rx="3" width="199" height="42" />
                </svg>
            </form>

            <svg className="hide">
                <defs>
                    <g id="padlock">
                        <path id="pad" d="m 3,5.5 5,0 0,4 -5,0 z" />
                        <path id="lock" d="m 3,5.5 0,-2 c 0,-3 4,-3 4,-0.25 L 7,4 " />
                    </g>

                    <path id="fed" d="M7.8 3.8c-.7.6-3.5.6-4.4-.1-.3-.2 4.8-.2 4.4.1zM7 3.5c-.4-.7-.3-2-1.5-1.5-1-.5-1 .7-1.5 1.5" />

                    <path id="user" d="M5.5 5.8c-2 0-2-3 0-3 2.3 0 2 3 0 3zm.8-.3c1.2 0 2.2 1 2.2 2.3v1.7h-6V7.7c0-1.2 1-2.2 2.3-2.2" />
                    <path id="burst" d="m 5.47,0 v 2.19 m 4.38,2.19 h -2.2 m -6.55,0 H 3.28 M 2.38,1.28 3.92,2.83 M 8.56,1.28 7.02,2.83" />
                </defs>
            </svg>

        </div>
    );
};
