import app from "./app.js"
import { PORT } from "./config.js"


app.listen(PORT,(req,res)=>{
    console.log(`Servidor ejecutandose en puerto ${PORT}`)
})