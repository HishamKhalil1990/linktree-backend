require("dotenv").config();
const jwt = require("jsonwebtoken");
const prisma = require("./prismaDB");

const BASE_URL = process.env.BASE_URL;
const TOKEN_SECRET_KEY = process.env.TOKEN_SECRET_KEY;

const createToken = (username) => {
  return jwt.sign({ username: username }, TOKEN_SECRET_KEY, {
    expiresIn: "24h",
  });
};

const verifyLink = (token) => {
  return jwt.verify(token, TOKEN_SECRET_KEY, (err, user) => {
    if (err) return;
    return user.username;
  });
};

const authentication = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) {
    res.status(401).send({
      status: "unauthorized",
    });
  } else {
    jwt.verify(token, TOKEN_SECRET_KEY, (err, user) => {
      if (err)
        res.status(401).send({
          status: "unauthorized",
        });
      req.username = user.username;
      next();
    });
  }
};

const createOtp = () => {
  let digits = "0123456789";
  let otp = "";
  for (let i = 0; i < 6; i++) {
    otp += digits[Math.floor(Math.random() * 10)];
  }
  return otp;
};

const getUsers = async () => {
  const dbResponse = await prisma.getAllUsers();
  return dbResponse;
};

const saveUserByPass = async (data) => {
  const dbResponse = await prisma.saveByPass(data);
  if (dbResponse.status == "saved") {
    let verificationLink = createToken(data.username);
    verificationLink = BASE_URL + "/Verfication/" + verificationLink;
    dbResponse.verificationLink = verificationLink;
    dbResponse.comment =
      "link will be send to user email and activate user when click on";
  }
  return dbResponse;
};

const saveUserByPhone = async (data) => {
  const dbResponse = await prisma.saveByPhone(data);
  if (dbResponse.status == "saved") {
    let otpCode = createOtp();
    dbResponse.otpCode = otpCode;
    dbResponse.usernameToken = createToken(data.username);
    dbResponse.comment =
      "username token should be sent with next request to activate user after otp code match";
  }
  return dbResponse;
};

const activateUser = async (username) => {
  const dbResponse = await prisma.activate(username);
  return dbResponse;
};

const activateAndUpdateEmail = async (username, email) => {
  const dbResponse = await prisma.activateWithEmail(username, email);
  return dbResponse;
};

const loginByPass = async (data) => {
  const dbResponse = await prisma.getUserByPass(data);
  if (dbResponse.status == "success") {
    let token = createToken(data.username);
    dbResponse.token = token;
    dbResponse.comment = "o auth token";
  }
  return dbResponse;
};

const loginByPhone = async (data) => {
  const dbResponse = await prisma.getUserByPhone(data);
  if (dbResponse.status == "success") {
    let otpCode = createOtp();
    dbResponse.otpCode = otpCode;
    let token = createToken(data.username);
    dbResponse.token = token;
    dbResponse.comment = "o auth token";
  }
  return dbResponse;
};

module.exports = {
  getUsers,
  saveUserByPass,
  saveUserByPhone,
  verifyLink,
  authentication,
  activateUser,
  activateAndUpdateEmail,
  loginByPass,
  loginByPhone,
};
