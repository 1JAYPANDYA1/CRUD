const express = require('express');
const router = express.Router();
const todoController = require('../controllers/todoController');

router.get("/fetch", todoController.getTodo);
router.post("/add", todoController.addTodo);
router.put("/update", todoController.updateTodo);
router.delete("/delete", todoController.deleteTodo);

module.exports = router;
