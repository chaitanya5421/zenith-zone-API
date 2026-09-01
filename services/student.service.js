const fs = require('fs').promises;
const path = require('path');
const filePath = path.join(__dirname, '../data/students.json');

async function getAllStudents() {
    try {
        const data = await fs.readFile(filePath, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        throw new Error('Failed to read students data');
    }   
}

async function getStudentById(id) {
    try {
        const students = await getAllStudents();
        return students.find(student => student.id === parseInt(id));
    } catch (error) {
        throw new Error('Failed to fetch student');
    }
}

async function createStudent(studentData) {
    try {
        const students = await getAllStudents();
        const newStudent = { id: students.length + 1, ...studentData };
        students.push(newStudent);
        await fs.writeFile(filePath, JSON.stringify(students, null, 2));
        return newStudent;
    } catch (error) {
        throw new Error('Failed to create student');
    }
}

async function updateStudent(id, studentData) {
    try {
        const students = await getAllStudents();
        const index = students.findIndex(s => s.id === parseInt(id));
        if (index === -1) throw new Error('Student not found');
        students[index] = { ...students[index], ...studentData };
        await fs.writeFile(filePath, JSON.stringify(students, null, 2));
        return students[index];
    } catch (error) {
        throw new Error('Failed to update student');
    }
}

async function deleteStudent(id) {
    try {
        const students = await getAllStudents();
        const filteredStudents = students.filter(s => s.id !== parseInt(id));
        await fs.writeFile(filePath, JSON.stringify(filteredStudents, null, 2));
        return { message: 'Student deleted' };
    } catch (error) {
        throw new Error('Failed to delete student');
    }
}

module.exports = {
    getAllStudents,
    getStudentById,
    createStudent,
    updateStudent,
    deleteStudent
};