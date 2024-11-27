const express = require('express');
const Employee = require('../models/Employee');
const router = express.Router();


router.get('/employees/search', async (req, res) => {
    const { department, position } = req.query;

    try {
        // Build dynamic query object
        const query = {};
        if (department) query.department = department;
        if (position) query.position = position;

        // Query the database
        const employees = await Employee.find(query);

        // Return the result
        res.status(200).json(employees);
    } catch (error) {
        console.error('Error searching employees:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

router.get('/employees', async (req, res) => {
    try {
        const employees = await Employee.find();
        res.status(200).json(employees);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

router.post('/employees', async (req, res) => {
    const { first_name, last_name, email, position, salary, date_of_joining, department } = req.body;

    try {
        const newEmployee = new Employee({
            first_name,
            last_name,
            email,
            position,
            salary,
            date_of_joining,
            department
        });

        await newEmployee.save();
        res.status(201).json({ message: 'Employee created successfully', employee_id: newEmployee._id });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

router.get('/employees/:eid', async (req, res) => {
    try {
        const employee = await Employee.findById(req.params.eid);
        if (!employee) {
            return res.status(404).json({ message: 'Employee not found' });
        }
        res.status(200).json(employee);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

router.put('/employees/:eid', async (req, res) => {
    try {
        const updatedEmployee = await Employee.findByIdAndUpdate(req.params.eid, req.body, { new: true });
        if (!updatedEmployee) {
            return res.status(404).json({ message: 'Employee not found' });
        }
        res.status(200).json({ message: 'Employee details updated successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
      const employee = await Employee.findByIdAndDelete(req.params.id);
      if (!employee) {
        return res.status(404).send('Employee not found');
      }
      res.status(200).send({ message: 'Employee deleted successfully' });
    } catch (err) {
      res.status(500).send('Server error');
    }
  });
  

module.exports = router;
