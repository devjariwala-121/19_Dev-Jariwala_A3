const express = require("express");
const router = express.Router();

const Employee = require("../models/Employee");

// View Employees
router.get("/employees", async (req, res) => {

    const employees = await Employee.find();

    res.render("employees", { employees });

});

// Add Employee
router.post("/employee/add", async (req, res) => {

    // Insert Logic Here

});

// Edit Employee
router.get("/employee/edit/:id", async (req, res) => {

    const employee =
        await Employee.findById(req.params.id);

    res.render("editEmployee", { employee });

});

// Update Employee
router.post("/employee/update/:id", async (req, res) => {

    await Employee.findByIdAndUpdate(
        req.params.id,
        req.body
    );

    res.redirect("/employees");

});

// Delete Employee
router.get("/employee/delete/:id", async (req, res) => {

    await Employee.findByIdAndDelete(
        req.params.id
    );

    res.redirect("/employees");

});

module.exports = router;