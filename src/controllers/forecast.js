import Forecast from "../models/forecast.js"

//mostrar todos los pronosticos
export const allforecast = async (req, res)=>{
    const tasksFounds = await Forecast.find();

    if(tasksFounds == '') return res.status(401).json({message: 'No hay pronosticos'});
    res.json(tasksFounds);
}

//mostrar un solo pronostico
export const oneForecast = async (req, res) =>{
    const foreFound = await Forecast.findById(req.params.id);

    if(!foreFound) return res.status(401).json({message: 'no se encontro el pronostico'});

    res.json({title: foreFound.title, description: foreFound.description});
}

//agregar un nuevo pronostico
export const addForecast = async (req, res) =>{
    const {title, description} = req.body;

    const add = new Forecast({
        title,
        description
    });

    const saveTask = await add.save();
    console.log(saveTask);
    res.json({message: 'pronostico guardado'});    
}

//editar un pronostico
export const updateForecast = async (req, res)=>{
    const foreUpdate = await Forecast.findByIdAndUpdate(req.params.id, req.body, {new: true});
    if(!foreUpdate) return res.status(401).json({message: 'Error al editar el pronostico'});

    res.json({message: 'pronostico editada', foreUpdate});
}

//elimianr tarea
export const deleteteForecast = async (req, res)=>{
    const deletFore = await Forecast.findByIdAndDelete(req.params.id);
    if(!deletFore) return res.status(401).json({message: 'Error al eliminar el pronostico'});

    res.json({message: 'pronostico eliminado'});
}