const express = require("express");
const { employeeSignup } = require("./controller/User_Signup");
const { employeeLogin } = require("./controller/User_Login");
const { employeeAuth, checkRole } = require("./middleware/Auth");

const router = express.Router();


// Software engineering Registeration Route
router.post("/register-se", (req, res) => {
      employeeSignup(req.body, "se", res);
    });
    
    //Marketer Registration Route
    router.post("/register-marketer", async (req, res) => {
      await employeeSignup(req.body, "marketer", res);
    });
    
    //Human resource Registration route
    router.post("/register-hr", async (req, res) => {
      await employeeSignup(req.body, "hr", res);
    });
    
    // Software engineers Login Route
   router.post("/Login-se", async (req, res) => {
      await employeeLogin(req.body, "se", res);
    });
    
    // Human Resource Login Route
    router.post("/Login-hr", async (req, res) => {
      await employeeLogin(req.body, "hr", res);
    });
    
    // Marketer Login Route
   router.post("/Login-marketer", async (req, res) => {
      await employeeLogin(req.body, "marketer", res);
    });

   
    
   router.get("/se-protected", employeeAuth, checkRole(["se"]), async (req, res) => {
     return res.json(`welcome ${req.body.name}`);
    });
    
    router.get(
      "/marketers-protected",
      employeeAuth,
      checkRole(["marketer"]),
      async (req, res) => {
        return res.json(`welcome ${req.body.name}`);
      }
    );
   router.get("/hr-protected", employeeAuth, checkRole(["hr"]), async (req, res) => {
      return res.json(`welcome ${req.body.name}`);
    });
    module.exports = router;