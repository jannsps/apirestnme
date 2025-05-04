import { pool } from "../db.js"
//consulta general de usuarios
export const getUsuarios=async(req,res)=>{
    try {
        const [rows]=await pool.query('SELECT * from usuarios')
    res.send(rows)
    } catch (error) {
        return res.status(500).json({
            message:'Ha ocurrido un error',
            error:error.code
        })
    }
    
}
//consultar usuario por id
export const getUsuario=async(req,res)=>{
    try {
        const id=req.params.id
    const [rows]=await pool.query('SELECT * from usuarios WHERE id=?',[id])
    if (rows.length<=0) return res.status(400).json({
        message:'Usuario no registrado'
    })
    res.send(rows[0])
    } catch (error) {
        return res.status(500).json({
            message:'Ha ocurrido un error',
            error:error.code
        })
    }
    
}
//crear usuario
export const createUsuario=async(req,res)=>{
    try {
        const {nombre,apellido,direccion}=req.body
    const [rows]=await pool.query('INSERT INTO usuarios (nombre,apellido,direccion) VALUES (?,?,?)',[nombre,apellido,direccion])
   
    res.send({
        id:rows.insertId,
        nombre,
        apellido,
        direccion
    })
    } catch (error) {
        return res.status(500).json({
            message:'Ha ocurrido un error',
            error:error.code
        })
    }
    
}
//actualizar usuario
export const updateUsuario=async(req,res)=>{
    const {id}=req.params
    const {nombre,apellido,direccion}=req.body
    const [result]=await pool.query('UPDATE usuarios SET nombre=IFNULL(?,nombre),apellido=IFNULL(?,apellido),direccion=IFNULL(?,direccion) WHERE id=?',[nombre,apellido,direccion,id])
   
     if (result.affectedRows<=0) return res.status(400).json({
        message:'Usuario no registrado'
     })
     //lanzamos una consulta por id
     const [rows]=await pool.query('SELECT * from usuarios WHERE id=?',[id])
    res.json(rows[0])
}

//eliminar usuario
export const deleteUsuario=async(req,res)=>{
    const {id}=req.params
    const [result]=await pool.query('DELETE from usuarios WHERE id=?',[id])
    console.log(result);
     if (result.affectedRows<=0) return res.status(400).json({
        message:'Usuario no registrado'
     })
    res.send(204)
}