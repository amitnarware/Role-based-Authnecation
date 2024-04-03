const jwt = require("jsonwebtoken");
const Employee = require("../model/dbconfig");
const  {employeeSignup} = require("../controller/User_Signup")
const {employeeLogin} = require("../controller/User_Login")
 /**
 * @DESC Verify JWT from authorization header Middleware
 */
const employeeAuth = (req, res, next) => {
      const authHeader = req.headers["authorization"];
      console.log(process.env.APP_SECRET);
      if (!authHeader) return res.sendStatus(403);
      console.log(authHeader); // Bearer token
      const token = authHeader.split(" ")[1];
      jwt.verify(token, process.env.APP_SECRET, (err, decoded) => {
        console.log("verifying");
        if (err) return res.sendStatus(403); //invalid token
    
        console.log(decoded); //for correct token
        next();
      });
    };
    
    /**
     * @DESC Check Role Middleware
     */
    const checkRole = (roles) => async (req, res, next) => {
      let { name } = req.body;
    
      //retrieve employee info from DB
      const employee = await Employee.findOne({ name });
      !roles.includes(employee.role)
        ? res.status(401).json("Sorry you do not have access to this route")
        : next();
    };
    module.exports = {
      employeeAuth,
      checkRole,
     
    };