const pool = require('../config/database');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const getAllUsers = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT course_id, course_code, course_name, user_id, dept_id created_at, updated_at FROM courses');
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const getUserById = async (req, res) => {
    const { id } = req.params;

    try {
        const [rows] = await pool.query('SELECT course_id, course_code, course_name, user_id, dept_id, created_at, updated_at FROM courses WHERE course_id = ?', [id]);

        if (rows.length === 0) {
            return res.status(404).json({ error: 'course not found!' });
        }

        res.json(rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const createUser = async (req, res) => {
    const { course_code, course_name, user_id, dept_id} = req.body;

    try {
        const [result] = await pool.query('INSERT INTO courses (course_code, course_name, user_id, dept_id ) VALUES (?, ?, ?, ?)', [course_code, course_name, user_id, dept_id]);

        res.status(201).json({ id: result.insertId, course_code, course_name, user_id, dept_id });  
    } catch (err) {  
        res.status(500).json({ error: err.message }); 
    }
};

const updateUser = async (req, res) => {  
    const { id } = req.params;  
    const { course_code, course_name, user_id, dept_id } = req.body;  

    try {  
        // Logging to verify incoming request body  
        console.log('Request Body:', req.body);   
        
        const [result] = await pool.query(  
            'UPDATE courses SET course_code = ?, course_name = ?, user_id = ?, dept_id = ? WHERE course_id = ?',
            [course_code, course_name, user_id, dept_id, id]  
        );  

        if (result.affectedRows === 0) {  
            return res.status(404).json({ error: 'Course not found' });  
        }  

        res.json({ message: 'Course updated successfully' });  
    } catch (err) {  
        console.error(err); // Log the error for debugging  
        res.status(500).json({ error: err.message });  
    }  
};

const deleteUser = async (req, res) => {
    const { id } = req.params;

    try {
        const [result] = await pool.query('DELETE FROM courses WHERE course_id = ?', [id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'course not found' });
        }

        res.json({ message: 'course deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = { getAllUsers, getUserById, createUser, updateUser, deleteUser };