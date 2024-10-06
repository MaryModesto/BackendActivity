const fs = require("fs");
const path = require("path");
const Joi = require("joi"); // Import Joi
const pathOfData = path.join("data", "users.json");

//SECTION: This whole section is for placing my data inside the user array
let users = [];
fs.readFile(pathOfData, "utf-8", (error, data) => {
  if (error) {
    console.log("Your error is...");
    console.log(error);
    return;
  }

  try {
    const jsonArr = JSON.parse(data);
    users = jsonArr;
  } catch {
    console.log(
      "Oh No! There's something wrong with parsing your JSON file... try again Mary"
    );
  }
});

//SECTION: Joi schema for validation
const userSchema = Joi.object({
  id: Joi.number().integer().required(),
  username: Joi.string().alphanum().min(3).max(30).required(),
  email: Joi.string().email().optional(), // Optional if you don't need it, or remove if unnecessary
  password: Joi.string().min(6).max(128).required(), // For secure password validation
});

//SECTION: This whole section is for my functions
module.exports = {
  findAllUser: () => users,
  findByID: (id) => users.find((user) => user.id === parseInt(id)),
  findByEmail: (email) => users.find((user) => user.email === email),
  findByUsername: (username) =>
    users.find((user) => user.username === username),
  addNewUser: (user) => {
    const { error } = userSchema.validate(user);

    if (error) {
      console.log("Validation error:", error.details[0].message);
      return {
        success: false,
        message: `Validation failed: ${error.details[0].message}`,
      };
    }

    users.push(user);
    const jsonStringArr = JSON.stringify(users);

    fs.writeFile(pathOfData, jsonStringArr, (error) => {
      if (error) {
        console.log("Your error is...");
        console.error(error);
        return {
          success: false,
          message: "Data not saved...Please try again...",
        };
      } else {
        //console.log("New user added successfully!...");
        return {
          success: true,
          message: "New user added successfully!...",
        };
      }
    });
  },
};
