import { useEffect, useState } from "react"


export const CardForecast = ({forecast})=>{
   
return(
    <div>
        <div className="bg-zinc-900 shadow-xl p-4 mt-10 w-80 h-40 flex flex-col justify-between text-white rounded-md" key={forecast._id}>
            <p>title : {forecast.title}</p>
            <p>description : {forecast.description}</p>
            <br />
        </div>
    </div>
)

} 