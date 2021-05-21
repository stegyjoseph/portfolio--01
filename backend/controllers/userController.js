const asyncHandler = require("express-async-handler");

const { generateToken } = require("../utils/generateToken");



const User = require("../models/user");
const user = require("../models/user");

const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password, isAdmin } = req.body;
    const userExists = await User.findOne({ email });
    if (userExists) {
        res.status(400)
        throw new Error("user already exists")
    }
    const user = await User.create({
        name,
        email,
        password,
        isAdmin: isAdmin && isAdmin
    })
    if (user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.equalsmail,
            isAdmin: user.isAdmin,
            token: generateToken(user._id),
        })

    } else {
        res.status(400)
        throw new Error('invalid user data')
    }
})
const getAllUsers = asyncHandler(async (req, res) => {
    const users = await User.find()
    res.json(users)
})
const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body
    const user = await user.findOne({ email })
    if (user && (await user.matchPassword(password))) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.email,
            token: generateToken(user._id),
        })
    } else {
        res.status(401)
        throw new Error('invalid user data')
    }

})
module.exports = { registerUser, getAllUsers, loginUser }