const User = require('../models/user.model')

const userService = {}

userService.createUser = async function ({ name, email, password }) {
    try {
        const user = new User({ name, email, password: md5(password) });
        const newUser = await user.save();
        return newUser;
    } catch (e) {
        console.log(e.message);
        throw Error('Error while save user')
    }
}

userService.getUsers = async function () {
    try {
        const users = await User.find({})
        return users;
    } catch (e) {
        console.log(e.message);
        throw new Error('Errror');
    }
}

userService.getUser = async function ({ id }) {
    try {
        const user = await User.findById(id);
        let savableUser = JSON.parse(JSON.stringify(user));
        delete savableUser.password;
        return savableUser;
    } catch (e) {
        console.log(e.message);
        throw Error('Error while returning User')
    }
}

userService.updateUser = async function ({ id }, { name }) {
    try {
        const user = await User.findById(id);
        const updateUser = await user.set({ name });
        await updateUser.save();
        return updateUser;
    } catch (e) {
        console.log(e.message);
        throw new Error('Errror while update user');
    }
}

module.exports = userService;