import mongoose from "mongoose";

const forecastSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true 
    },
    description: {
        type: String,
        required: true,
    }
});

export default mongoose.model('Forecast', forecastSchema);

