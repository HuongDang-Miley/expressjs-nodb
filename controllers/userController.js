let users = require('../models/usersArray.js')

module.exports = {
    getAllUsers: (req, res) => {
        return res.status(200).json({ confirmation: 'success', users });
    },
    createNewUser: (req, res) => {
        // Make sure inputs are filled
        if (!req.body.name || !req.body.email || !req.body.password) {
            return res
                .status(400)
                .json({ confirmation: 'false', message: "All inputs must be filled" })
        }
    
        // check if user exists
        let existingUser = users.filter((foundUser) => foundUser.email === req.body.email)
        if (existingUser.length) {
            return res
                .status(400)
                .send("User Already Exist")
        }
    
        // create a new user object
        const newUser = {};
    
        // value for newUser based on req.body inputs in postman
        newUser.name = req.body.name;
        newUser.email = req.body.email;
        newUser.password = req.body.password;
        newUser.id = String(users.length + 1);
        // add user to array
        users.push(newUser);
        // return the new user
        return res.status(200).json({ confirmation: 'success', newUser })
    
    },
    findOneUser: (req, res) => {
        let foundUser = users.filter((user) => {
            if (user.id === req.params.id) {
                return res
                    .status(200)
                    .json({ confirmation: 'success', user });
            }
        })
        if (!foundUser.length)
            return res
                .status(400)
                .json({ confirmation: 'fail', message: 'User Does Not Exist' })
    }, 
    updateUser: (req, res) => {
        // grab the inputted information
        let updateUser = req.body
        users.filter((foundUser) => {
            // find the user
            if (foundUser.id === req.params.id) {
                // change value for user if inputted
                foundUser.name = updateUser.name 
                ? updateUser.name 
                : foundUser.name
    
                foundUser.password = updateUser.password
                ? updateUser.password
                : foundUser.password
                
            }
        });
        // return array of users
        return res.status(200).json({message: "User Updates", users});
    },
    deleteUser: (req,res) => {
        // filter user based on id parameter in address
        let removeUser = users.filter((foundUser) => {
            return foundUser.id !== req.params.id
        })
        // mutate users array and replace with removeUsed array
        users = removeUser;
        // return result
        return res.status(200).json({confirmation: 'success', users})
    }
};

// createNewUser
// findOneUser
// updateUser
// deleteUser