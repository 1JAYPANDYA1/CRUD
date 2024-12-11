const mongoose = require('mongoose');
const todo = require('../models/todoModel');
require('dotenv').config();

// MongoDB connection
const connectDB = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/admin', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Connected to the database successfully');
    } catch (error) {
        console.error('Error connecting to the database:', error);
        process.exit(1);
    }
};

// Seed data
const seedTodos = async () => {
    const todos = [
        { name: 'Learn Node.js', duration: '2 hours' },
        { name: 'Write API documentation', duration: '1 hour' },
        { name: 'Implement authentication', duration: '3 hours' },
        { name: 'Debug API endpoints', duration: '2.5 hours' },
        { name: 'Create frontend integration', duration: '4 hours' },
    ];

    try {
        // Clear the existing collection
        await todo.deleteMany();
        console.log('Cleared the todo collection');

        // Insert seed data
        await todo.insertMany(todos);
        console.log('Seed data inserted successfully');
    } catch (error) {
        console.error('Error seeding data:', error);
    } finally {
        mongoose.connection.close();
    }
};

// Run the script
connectDB().then(seedTodos);
