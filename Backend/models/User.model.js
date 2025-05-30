import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { DataTypes } from 'sequelize';
import { sequelize } from '../Config/Connect.js';
import { Wishlist } from './Others.model.js';
import Sequelize from 'sequelize';

const User = sequelize.define('users', {
    id: {
        type: DataTypes.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false
    },
    fullName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    role: {
        type: DataTypes.ENUM('user', 'admin'),
        defaultValue: 'user'
    },
    profilePicture: {
        type: DataTypes.STRING,
        defaultValue: 'default_profile_picture.jpg'
    },
    shipping_address:{
        type: DataTypes.STRING,
        allowNull: true
    },
    refreshToken: {
        type: DataTypes.TEXT
    }
}, {
    timestamps: true
});

// Associations
User.hasMany(Wishlist, { foreignKey: 'userId' });
Wishlist.belongsTo(User, { foreignKey: 'userId' });


User.prototype.isPasswordCorrect = async function (password) {
    console.log("password", password);
    console.log("this.password", this.password);

    return await bcrypt.compare(password, this.password);
};

// Generate Access Token
User.prototype.generateAccessToken = function () {
    return jwt.sign(
        { id: this.id, email: this.email, fullName: this.fullName, role: this.role },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: process.env.ACCESS_TOKEN_EXPIRY }
    );
};

User.prototype.generateRefreshToken = function () {
    return jwt.sign(
        { id: this.id },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: process.env.REFRESH_TOKEN_EXPIRY }
    );
};

// Hash password before creating a user
// User.beforeCreate(async (user) => {
//     if (user.password && !user.password.startsWith('$2b$')) {
//         user.password = await bcrypt.hash(user.password, 10);
//     }
// });

// Hash password before updating if changed
User.beforeUpdate(async (user) => {
    if (user.changed('password') && !user.password.startsWith('$2b$')) {
        user.password = await bcrypt.hash(user.password, 10);
    }
});

export default User;
