import { Sequelize, DataTypes, DATE } from 'sequelize';
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
}, {
    timestamps: true
});



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
    type: DataTypes.STRING(50),
    primaryKey: true,
    allowNull: false,
    defaultValue: DataTypes.UUIDV4,
  },
  user_id: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  product_id: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  payment_status: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  order_status: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
}, {
  tableName: 'orders',
  timestamps: true,
});



const Cart = sequelize.define('Cart', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    user_id: {
        type: DataTypes.STRING,
        allowNull: false,
        references: { model: 'Users', key: 'id' },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    },
    product_id: {
        type: DataTypes.STRING,
        allowNull: false,
        references: { model: 'Products', key: 'id' },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    },
    quantity: { type: DataTypes.INTEGER, allowNull: false }
}, { timestamps: true, tableName: 'Cart' });


const Wishlist = sequelize.define('Wishlist', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Users',
            key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    },
    product_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Products',
            key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    }
}, {
    timestamps: true
});

export { Category, SubCategory, Brand, Order, Cart, Wishlist };
