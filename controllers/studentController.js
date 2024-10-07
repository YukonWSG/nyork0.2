const pool = require('../config/database');  
const bcrypt = require('bcryptjs');  
const jwt = require('jsonwebtoken');  

const getAllUsers = async (req, res) => {  
    try {  
        const [rows] = await pool.query('SELECT student_id, lname, fname, mname, user_id, course_id, created_at, updated_at FROM students');  
        res.json(rows);  
    } catch (err) {  
        res.status(500).json({ error: err.message });  
    }  
};  

const getUserById = async (req, res) => {  
    const { id } = req.params;  

    try {  
        const [rows] = await pool.query('SELECT student_id, lname, fname, mname, user_id, course_id, created_at, updated_at FROM students WHERE student_id = ?', [id]);  

        if (rows.length === 0) {  
            return res.status(404).json({ error: 'Student not found!' });  
        }  

        res.json(rows[0]);  
    } catch (err) {  
        res.status(500).json({ error: err.message });  
    }  
};  

const createUser = async (req, res) => {  
    const { lname, fname, mname, user_id, course_id } = req.body;  

    try {  
        const [result] = await pool.query('INSERT INTO students (lname, fname, mname, user_id, course_id) VALUES (?, ?, ?, ?, ?)', [lname, fname, mname, user_id, course_id]);  
        res.status(201).json({ id: result.insertId, lname, fname, mname, user_id, course_id });  
    } catch (err) {  
        res.status(500).json({ error: err.message });   
    }  
};  

const updateUser = async (req, res) => {  
    const { id } = req.params;  
    const { lname, fname, mname, user_id, course_id } = req.body;  

    try {  
        // Logging to verify incoming request body  
        console.log('Request Body:', req.body);   
        
        const [result] = await pool.query(  
            'UPDATE students SET lname = ?, fname = ?, mname = ?, user_id = ?, course_id = ? WHERE student_id = ?',  
            [lname, fname, mname, user_id, course_id, id]  
        );  

        if (result.affectedRows === 0) {  
            return res.status(404).json({ error: 'Student not found' });  
        }  

        res.json({ message: 'User updated successfully' });  
    } catch (err) {  
        console.error(err); // Log the error for debugging  
        res.status(500).json({ error: err.message });  
    }  
};  

const deleteUser = async (req, res) => {  
    const { id } = req.params;  

    try {  
        const [result] = await pool.query('DELETE FROM students WHERE student_id = ?', [id]);  

        if (result.affectedRows === 0) {  
            return res.status(404).json({ error: 'Student not found' });  
        }  

        res.json({ message: 'User deleted successfully' });  
    } catch (err) {  
        res.status(500).json({ error: err.message });  
    }  
};  

module.exports = { getAllUsers, getUserById, createUser, updateUser, deleteUser };