import mongoose from "mongoose"

export const connectDB = async()=>{
    try {
        const conn = await mongoose.connect(process.env.mongo_url)
        console.log('mongoDB is connected successfully'.bgMagenta.white)
    } catch (error) {
        console.log('mongoDB failed to connect'.bgRed.white)
    }
}
export default connectDB;




