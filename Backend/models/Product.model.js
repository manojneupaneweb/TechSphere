import { DataTypes } from "sequelize";
import { sequelize } from "../Config/Connect.js";

const Product = sequelize.define("Product", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    allowNull: false
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
    type: DataTypes.INTEGER,
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
    type: DataTypes.STRING,
    allowNull: false,
  },
  brand: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  timestamps: true,
  tableName: 'products',
});

export { Product };
