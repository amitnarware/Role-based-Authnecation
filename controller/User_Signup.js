const bcrypt = require("bcrypt");
const Employee = require("../model/dbconfig")

const employeeSignup = async(req,role,res) => {
      try{
            // get employee from database with same name if any
            const validateEmployeename = async(name) => {
                  let employee = await Employee.findOne({name});
                  return employee ? false : true;
            };

            // get employee from database with same email if any
            const validateEmail = async(email) => {
                  let employee = await Employee.findOne({email});
                  return employee ? false : true
            };
            // Validate the name
            let nameNotTaken = await validateEmployeename(req.name);
            if(!nameNotTaken){
                  return res.status(400).json({
                        message: `Employee name is aleady taken.`,
                  })
            }
            // Validate the email
            let emailNotRegistered = await validateEmail(req.email);
            if(!emailNotRegistered){
                  return res.status(400).json({
                        message:`Email already regisetred.`,
                  })
            }
            // Hash the password
            const password = await bcrypt.hash(req.password, 12);
            // create a new user
            const newEmployee = new Employee ({
                  ...req,
                  password,
                  role
            });
            await newEmployee.save();
            return res.status(201).json({
                  message:"Hurry! now you are successfully registered.please now login."
            });
      } catch (err){
            // logger function 
            return res.status(500).json({
                  message:`${err.message}`
            })
      }
}
module.exports = {employeeSignup}