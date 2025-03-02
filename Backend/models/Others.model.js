import { Sequelize, DataTypes } from 'sequelize';
import { sequelize } from "../Config/Connect";
import User from './User.model';
import { Product } from './Product.model';

const Category = sequelize.define('Category', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.TEXT }
}, { timestamps: true });

const Brand = sequelize.define('Brand', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false }
}, { timestamps: true });

const Order = sequelize.define('Order', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    user_id: { type: DataTypes.INTEGER, references: { model: User, key: 'id' }, onDelete: 'CASCADE' },
    total_price: { type: DataTypes.FLOAT, allowNull: false },
    payment_status: { type: DataTypes.ENUM('Pending', 'Paid'), defaultValue: 'Pending' },
    order_status: { type: DataTypes.ENUM('Processing', 'Shipped', 'Delivered'), defaultValue: 'Processing' }
}, { timestamps: true });

const OrderItem = sequelize.define('OrderItem', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    order_id: { type: DataTypes.INTEGER, references: { model: Order, key: 'id' }, onDelete: 'CASCADE' },
    product_id: { type: DataTypes.INTEGER, references: { model: Product, key: 'id' }, onDelete: 'CASCADE' },
    quantity: { type: DataTypes.INTEGER, allowNull: false },
    price: { type: DataTypes.FLOAT, allowNull: false }
}, { timestamps: true });

const Payment = sequelize.define('Payment', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    user_id: { type: DataTypes.INTEGER, references: { model: User, key: 'id' }, onDelete: 'CASCADE' },
    order_id: { type: DataTypes.INTEGER, references: { model: Order, key: 'id' }, onDelete: 'CASCADE' },
    payment_method: { type: DataTypes.ENUM('eSewa', 'Khalti'), allowNull: false },
    payment_status: { type: DataTypes.ENUM('Pending', 'Completed'), defaultValue: 'Pending' }
}, { timestamps: true });

const Review = sequelize.define('Review', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    user_id: { type: DataTypes.INTEGER, references: { model: User, key: 'id' }, onDelete: 'CASCADE' },
    product_id: { type: DataTypes.INTEGER, references: { model: Product, key: 'id' }, onDelete: 'CASCADE' },
    rating: { type: DataTypes.INTEGER, allowNull: false },
    comment: { type: DataTypes.TEXT }
}, { timestamps: true });

const Cart = sequelize.define('Cart', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    user_id: { type: DataTypes.INTEGER, references: { model: User, key: 'id' }, onDelete: 'CASCADE' },
    product_id: { type: DataTypes.INTEGER, references: { model: Product, key: 'id' }, onDelete: 'CASCADE' },
    quantity: { type: DataTypes.INTEGER, allowNull: false }
}, { timestamps: true });

const Wishlist = sequelize.define('Wishlist', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    user_id: { type: DataTypes.INTEGER, references: { model: User, key: 'id' }, onDelete: 'CASCADE' },
    product_id: { type: DataTypes.INTEGER, references: { model: Product, key: 'id' }, onDelete: 'CASCADE' }
}, { timestamps: true });

export { Category, Brand, Order, OrderItem, Payment, Review, Cart, Wishlist };
