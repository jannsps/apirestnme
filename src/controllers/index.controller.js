import { pool } from "../db.js"
export const prueba=async(req,res)=>{
    const [result]=await pool.query('SELECT "hay conexión" as result') 
    res.json(result[0])

}