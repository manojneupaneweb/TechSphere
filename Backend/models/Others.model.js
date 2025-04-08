import { Sequelize, DataTypes } from 'sequelize';
import { sequelize } from "../Config/Connect.js";
import User from './User.model.js';
import { Product } from './Product.model.js';


// ---------------Category model ---------------
const Category = sequelize.define('categories', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, { timestamps: true });


// ---------------Brand model ---------------
const Brand = sequelize.define('brands', {
    id: {
        type: DataTypes.UUID, 
        defaultValue: DataTypes.UUIDV4, 
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, { timestamps: false });


// ---------------SubCategory model ---------------
const SubCategory = sequelize.define('SubCategory', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    categoryId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: Category,
            key: 'id'
        },
        onDelete: 'CASCADE'
    }
}, { timestamps: true });

// Define One-to-Many Relationship
Category.hasMany(SubCategory, { foreignKey: 'categoryId', onDelete: 'CASCADE' });
SubCategory.belongsTo(Category, { foreignKey: 'categoryId' });


const Order = sequelize.define('Order', {
    id: {
      type: DataTypes.UUID, // UUID
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.UUID, // UUID
      references: {
        model: 'Users',
        key: 'id',
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    },
    // other fields...
  }, { timestamps: true });
  
const OrderItem = sequelize.define('OrderItem', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    order_id: { type: DataTypes.INTEGER, references: { model: Order, key: 'id' }, onDelete: 'CASCADE' },
    product_id: { type: DataTypes.INTEGER, references: { model: Product, key: 'id' }, onDelete: 'CASCADE' },
    quantity: { type: DataTypes.INTEGER, allowNull: false },
    price: { type: DataTypes.FLOAT, allowNull: false }
}, { timestamps: true });

const Payment = sequelize.define('Payment', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    user_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'User',
            key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    },
    order_id: { type: DataTypes.INTEGER, references: { model: Order, key: 'id' }, onDelete: 'CASCADE' },
    payment_method: { type: DataTypes.ENUM('eSewa', 'Khalti'), allowNull: false },
    payment_status: { type: DataTypes.ENUM('Pending', 'Completed'), defaultValue: 'Pending' }
}, { timestamps: true });

const Review = sequelize.define('Review', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    user_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'User',
            key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    },
    product_id: { type: DataTypes.INTEGER, references: { model: Product, key: 'id' }, onDelete: 'CASCADE' },
    rating: { type: DataTypes.INTEGER, allowNull: false },
    comment: { type: DataTypes.TEXT }
}, { timestamps: true });

const Cart = sequelize.define('Cart', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'Users', key: 'id' },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    },
    product_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'Products', key: 'id' },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    },
    quantity: { type: DataTypes.INTEGER, allowNull: false }
}, { timestamps: true, tableName: 'Cart' });



const Wishlist = sequelize.define('Wishlist', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Users',  // ✅ Use table name as a string
            key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    },
    product_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Products',  // ✅ Use table name as a string
            key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    }
}, {
    timestamps: true
});

export { Category, SubCategory, Brand, Order, OrderItem, Payment, Review, Cart, Wishlist };
