const todoService=require('../services/todoService')

exports.addTodo=async(req,res)=>{
    try {
        const newtodo=req.body  
        const respone= await todoService.addTodo(newtodo)
        res.status(200).json(respone)
    } catch (error) {
        console.log(error)
    }
}
exports.getTodo=async(req,res)=>{
    try {
        const respone = await todoService.getTodo()
        res.status(200).json(respone)
    } catch (error) {
        console.log(error)
    }
}
exports.updateTodo=async(req,res)=>{
    try {
        const todoId=req.body._id 
        const updatedtodo=req.body
        const respone = await todoService.updateTodo(todoId,updatedtodo)
        res.status(200).json(respone)
    } catch (error) {
        console.log(error)
    }
}
exports.deleteTodo=async(req,res)=>{
    try {
        const {todoId}=req.body
        const respone = await todoService.deleteTodo(todoId)
        res.status(200).json(respone)
    } catch (error) {
        console.log(error)
    }
}