import User from '../schema/user.js';
import crudRepository from './crudRepository.js';

const userRepository = {
    ...crudRepository(User),
    getUserDetails: async function (id) {
        const user = await User.findById(id).select('-password');
        return user;
    },
    getByUsername: async function (name) {
        const user = await User.findOne({ username: name }).select('-password');
        return user;
    },
    getByEmail: async function (email) {
        const user = await User.findOne({ email: email });
        return user;
    },
    getUserByEmailAndUsername: async function (userDetails) {
        const user = await User.findOne(userDetails).select('-password');
        return user;
    },
    findByEmailAndUpdate: async function (updateObject) {
        const updatedUser = await User.findOneAndUpdate(
            { email: updateObject.email },
            { password: updateObject.password },
            {
                new: true
            }
        ).select('-password');
        return updatedUser;
    }
};

export default userRepository;
