import axios from 'axios'

const instance = axios.create({
    baseURL: 'http://localhost:3000/api',
    withCredentials: true
})

//mostrar todos los pronosticos
export const foreAll = () => instance.get('/forecast-all');

//registrar un nuevo pronostico 
export const registerForecast = admin => instance.post('/forecast', admin);

//enviar los datos del pronostico editado
export const updateForecast = (id, foreAdd) => instance.put(`/forecast/${id}`, foreAdd);

