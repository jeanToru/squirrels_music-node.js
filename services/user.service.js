const User = require('../models/user.model')

const userService = {}

userService.createUser = async function ({ name, email, password }) {
    try {
        const user = new User({ name, email, password });
        const newUser = await user.save();
        return newUser
    } catch (e) {
        throw new Errror('Error while save user');
    }
}

userService.getUsers = async function () {
    try {
        const users = await User.find({})
        return users;
    } catch (e) {
        throw new Error('Errror');
    }
}

userService.getUser = async function ({ id }) {
    try {
        const logedUser = await User.findById(id)
        return logedUser;
    } catch (error) {
        throw new Error('Error while getting User')
    }
}

userService.updateUser = async function ({ id }, { name }) {
    try {
        const user = await User.findById(id);
        const updateUser = await user.set({ name });
        await updateUser.save();
        return updateUser;
    } catch (e) {
        throw new Error('Errror while update user');
    }
}

module.exports = userService;