import { useForm } from "react-hook-form"; 
import { useState } from "react"; 
import { updateForecast } from "../../api/forecast";
import { AuthForecast } from "../../context/forecast";

export const FormForecast = () => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const { addForecast } = AuthForecast();
    
    const [okMessage, setOkMessage] = useState(''); 
    const [errorMessage, setErrorMessage] = useState(''); 
    const forecastEdit = location.state?.task;

    const onSubmit = handleSubmit(async (values) => {
        console.log(values);
        const notSpace = (str) => !str || str.trim().length === 0;

        if (notSpace(values.title) || notSpace(values.description)) {
            console.log('no hay texto');
            setErrorMessage('llene todos los campos');
            return setOkMessage('');
        }

        try {
            if (forecastEdit) {
                const update = await updateForecast(forecastEdit._id, values);
                if (update) {
                    setOkMessage('tarea editada con éxito');
                }
            } else {
                const add = await addForecast(values);
                console.log(add);
                    setOkMessage('Tarea agregada con exito')
            }
        } catch (error) {
            console.error("Error al agregar/editar pronóstico:", error);
            setErrorMessage('Hubo un error al procesar la solicitud.');
        } finally {
            reset();
            setErrorMessage(''); 
        }
    });

    return (
        <div>
            {okMessage && (<div className="text-green-700">{okMessage}</div>)}
            {errorMessage && (<div className="text-red-700">{errorMessage}</div>)} 
            <form onSubmit={onSubmit}>
                <input className="text-zinc-950" type="text" {...register('title', { required: true })} />
                {errors.title && (<div className="text-red-700">Título es requerido</div>)}

                <textarea className="text-zinc-950" {...register('description', { required: true })}></textarea>
                {errors.description && (<div className="text-red-700">Descripción es requerida</div>)}

                <button className="bg-white" type="submit">registrar pronóstico</button>
            </form>
        </div>
    );
}
