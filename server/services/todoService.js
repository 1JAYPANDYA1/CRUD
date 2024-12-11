const todo=require('../models/todoModel')

exports.addTodo=async(newtodo)=>{
    const addnewtodo=new todo(newtodo)
    const response=await addnewtodo.save()
    return response
}

exports.getTodo=async()=>{
    const response=await todo.find()
    return response
}

exports.updateTodo=async(todoId,updatedtodo)=>{
    const response=await todo.findByIdAndUpdate(todoId,updatedtodo,{new:true})
    return response
}

exports.deleteTodo=async(todoId)=>{
    const response = await todo.findByIdAndDelete(todoId)
    return response
}