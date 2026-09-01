const  studentService = require('../services/student.service');

async function getAllStudents(req, res) {
    try {
        const students = await studentService.getAllStudents();
        res.status(200).json(students);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch students' });
    }
}

async function getStudentById(req, res) {
    try {
        const { id } = req.params;
        const student = await studentService.getStudentById(id);
        res.status(200).json(student);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch student' });
    }
}

async function createStudent(req, res) {
    try {
        const student = await studentService.createStudent(req.body);
        res.status(201).json(student);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create student' });
    }
}

async function updateStudent(req, res) {
    try {
        const { id } = req.params;
        const student = await studentService.updateStudent(id, req.body);
        res.status(200).json(student);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update student' });
    }
}

async function deleteStudent(req, res) {
    try {
        const { id } = req.params;
        await studentService.deleteStudent(id);
        res.status(200).json({ message: 'Student deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete student' });
    }
}

module.exports = {
    getAllStudents,
    getStudentById,
    createStudent,
    updateStudent,
    deleteStudent
};
