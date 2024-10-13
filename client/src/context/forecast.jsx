import { createContext, useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { registerForecast } from "../api/forecast";

export const ForecastContext = createContext();

export const AuthForecast = () => {
const context = useContext(ForecastContext);
if(!context){ 
    throw new Error('el useAuthTasks deberia estar dentro de un provider')
};
return context; 
}

export const ForecastProvider = ({children}) => {
    const [forecastAdd, setForecastAdd] = useState();
    const [errors, setErrors] = useState([]);

    const addForecast = async (taskAdd) =>{
        try {
            const res = await registerForecast(taskAdd);
            console.log(res.data);
            setTask(res.data);
            return res.data.message;
        } catch (error) {
            console.log(error.response);
            setErrors(error.response)
            return false;
        }
    }



    return ( 
        <ForecastContext.Provider value={{addForecast, forecastAdd, errors}}>
        {children}
        </ForecastContext.Provider>
    )

}