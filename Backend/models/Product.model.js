import { DataTypes } from "sequelize";
import { sequelize } from "../Config/Connect.js";
import { Category, Brand } from "./Others.model.js";

const Product = sequelize.define("Product", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  image: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    validate: {
      min: 0.01,
    },
  },
  warranty: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  return_policy: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  specifications: {
    type: DataTypes.JSON,
    allowNull: true,
  },
  ratings: {
    type: DataTypes.FLOAT,
    defaultValue: 0.0,
    validate: {
      min: 0.0,
      max: 5.0,
    },
  },
  reviews: {
    type: DataTypes.JSON,
    allowNull: true,
  },
  stock: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    validate: {
      min: 0,
    },
  },
  category: {
    type: DataTypes.INTEGER,
    // references: {
    //   model: Category,
    //   key: 'id',
    // },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    foreignKey: true,
  },
  brand: {
    type: DataTypes.INTEGER,
    // references: {
    //   model: Brand,
    //   key: 'id',
    // },
    onDelete: 'CASCADE',
    foreignKey: true,
    onUpdate: 'CASCADE',
  },
}, {
  timestamps: true,
  tableName: 'products',
});

export { Product };

// Product.belongsTo(Category, {
//   foreignKey: 'category',
//   as: 'categoryDetails',
// });

// Product.belongsTo(Brand, {
//   foreignKey: 'brand',
//   as: 'brandDetails',
// });
