const userRepo = require("../repo/user");
const sendResponse = require("../helper/sendresponse");

const getUser = async (req, res) => {
  try {
    const response = await userRepo.getDataUser(req.params.userid)
    sendResponse.success(res, response.status, response)
  } catch (error) {
    console.log(error)
    sendResponse.error(res, error.status, error);
  }
}

const postUser = async (req, res) => {
  try {
    const response = await userRepo.setDataUser(req.body)
    sendResponse.success(res, response.status, response)
  } catch (error) {
    console.log(error)
    sendResponse.error(res, error.status, error);
  }
}

const deleteUser = async (req, res) => {
  try {
    const response = await userRepo.delDataUser(req.params.userid)
    sendResponse.success(res, response.status, response)
  } catch (error) {
    console.log(error)
    sendResponse.error(res, error.status, error);
  }
}



const userController = {
  getUser,
  postUser,
  deleteUser
}

module.exports = userController