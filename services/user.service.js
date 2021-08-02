const User = require('../models/user.model')
const md5 = require('md5');
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

userService.getUsers = async function (query) {
    try {
        const users = await User.find(query)
        console.log('users', users)
        return users.map(user => {
            let getUser = JSON.parse(JSON.stringify(user));
            delete getUser.password;
            return getUser;
        });
    } catch (e) {
        console.log(e.message);
        throw Error('Error while Paginating Users')
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

userService.LogUser = async function ({ email, password }) {
    try {
        const logedUser = await User.findOne({ email, password: md5(password) })
        if (logedUser) {
            return logedUser;
        } else {
            return 'User doesnt exist or the password is not the same'
        }
    } catch (e) {
        console.log(e.message)
        throw new Error('Error while getting User')
    }
}

userService.userLogin = async function ({ email }, { password, name }) {
    try {
        const logedUser = await User.find({ email: email });
        if (!logedUser) {
            createUser(name, email, password)
        }
    } catch (e) {
        console.log(e.message);
        throw new Error('Error dont exist User');
    }
}

module.exports = userService;