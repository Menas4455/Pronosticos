import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { Auth } from '../../context/admin'
import { useNavigate } from 'react-router-dom'

export const IsAdmin = () =>{
    const { register, handleSubmit, formState: { errors } } = useForm()
    const { errors: LoginForm, signin, isAuth } = Auth();
    const [redirect, setRedirect] = useState(false);
    const [isError, setIsError] = useState([]);
    const navigate = useNavigate();

    const handleLogin = async (data) => {
        const res = await signin(data);
        if(res) {
            setRedirect(true); 
        }
    };

    useEffect(() => {
        if (isAuth || redirect) {
            navigate('/home');
        }
    }, [isAuth, redirect, navigate]);  

    return (
        <div>
            <div className='bg-zinc-700'>
                <form onSubmit={handleSubmit(handleLogin)}>
                    <input type="text" {...register('dni', { required: true })}  />
                    {errors.dni && (<p className='text-red-500'>El dni es requerido</p>)}

                    <input type="text" {...register('password', { required: true })}  />
                    {errors.password && (<p className='text-red-500'>la contraseña es requerido</p>)}
                    <button>ingresar</button>
                </form>
            </div>
        </div>
    )
}