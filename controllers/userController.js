const functions = require("../utils/functions");

const welcome = (req, res) => {
  res.send("server is running successfully");
};

const getUsers = async (req, res) => {
  try {
    const response = await functions.getUsers();
    res.status(200).send(response);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

const verify = async (req, res) => {
  try {
    const { token } = req.params;
    console.log(token);
    const username = functions.verifyLink(token);
    if (username) {
      const response = await functions.activateUser(username);
      res.status(200).send(response);
    } else {
      res.status(401).send({
        status: "unauthorized",
      });
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
};

const register = async (req, res) => {
  try {
    const { type } = req.params;
    const data = req.body;
    let response;
    switch (type) {
      case "Password":
        response = await functions.saveUserByPass(data);
        break;
      case "Phone":
        response = await functions.saveUserByPhone(data);
        break;
      default:
        break;
    }
    res.status(200).send(response);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

const login = async (req, res) => {
  try {
    const { type } = req.params;
    const data = req.body;
    let response;
    switch (type) {
      case "Password":
        response = await functions.loginByPass(data);
        break;
      case "Phone":
        response = await functions.loginByPhone(data);
        break;
      default:
        break;
    }
    res.status(200).send(response);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

const info = async (req, res) => {
  try {
    const { type } = req.params;
    const data = req.body;
    let response;
    switch (type) {
      case "Email":
        response = await functions.activateAndUpdateEmail(
          req.username,
          data.email
        );
        break;
      default:
        break;
    }
    res.status(200).send(response);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

module.exports = {
  welcome,
  verify,
  register,
  login,
  info,
  getUsers,
};
