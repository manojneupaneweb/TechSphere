import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { DataTypes } from 'sequelize';
import { sequelize } from '../Config/Connect.js';
import { Wishlist } from './Others.model.js';

const User = sequelize.define('users', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
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
    wishlist: {
        type: DataTypes.JSON,
        references:{
            model: Wishlist,
            key: 'id'
        }
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
    refreshToken: {
        type: DataTypes.TEXT
    }
}, {
    timestamps: true
});

// Hash password before saving
User.beforeSave(async (user) => {
    if (user.isNewRecord || user.changed('password')) {
        user.password = await bcrypt.hash(user.password, 10);
    }
});

User.prototype.generateAccessToken = function () {
    return jwt.sign(
        { id: this.id, email: this.email, fullName: this.fullName },
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

export default User;
