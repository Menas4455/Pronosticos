import { Link } from "react-router-dom"
import { useEffect } from "react"
import Cookies from 'js-cookie'
import { useState } from "react"
import { Auth } from "../context/admin"
import { verifyTokenReq } from "../api/admin"
import { foreAll } from "../api/forecast"
import { CardForecast } from "../components/forecast/card.forecast"
import { Navbar } from "../components/navbar"

export const Home = () => {
    const { isAuth } = Auth();
    const [loading, setLoading] = useState(true);
    const [username, setUsername] = useState('');
    const [fore, setFore] = useState([]);
    const [error, setError] = useState(null);

    //obtenemos las predicciones de la base de datos
    useEffect(()=>{

        const foreCast = async ()=>{
            try {
                const response = await foreAll();
                if (Array.isArray(response.data)) {
                    setFore(response.data);
                } else {
                    console.error('La respuesta no es un arreglo', response);
                    setFore([]); 
                }
                setLoading(false);
                setLoading(false);

            } catch (error) {
                setError(error.response.data);
                setLoading(false);
            }
        }

        foreCast();

    }, [])

    //verificar el token del usuario y asi obtener la información del usuario
    useEffect(() => {
        const checkToken = () => {
            const token = Cookies.get('token');
            if (token) {
                // Dividir el token para obtener el payload
                const payload = token.split('.')[1]; 
                const decodedPayload = JSON.parse(atob(payload)); 
                const userId = decodedPayload.id; 
                fetchUser(userId);
            }
        };

        const fetchUser = async (userId) => {
            try {
                const res = await verifyTokenReq(userId); 
                setUsername(res.data.username);
            } catch (error) {
                setError(error.response)
            }
        };

        checkToken();
    }, []);

    //La primera letra del nombre del usuario sera en mayuscula
    const nameMayus = (name) => {
        if (!name) return '';
        return name.charAt(0).toUpperCase() + name.slice(1);
    };


    return (
        <div> 
            <Navbar/>
        <h1 className="my-5 text-center font-bold text-3xl">Estas en Home</h1>
        {isAuth && (<div><Link to="/logout" className="text-blue-700">Cerrar sesion</Link> <div> {loading ? 'Cargando...' : nameMayus(username)}</div></div>)} 
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 justify-items-center" >

        {fore.map((forecast, index)=> (
            <CardForecast forecast={forecast} key={index} />
        ))}
        </div>
        </div>

    )
}