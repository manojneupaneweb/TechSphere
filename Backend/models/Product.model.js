import { DataTypes, Sequelize } from 'sequelize';
import { sequelize } from '../Config/Connect.js';

const Product = sequelize.define("Product", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  highlights: {
    type: DataTypes.JSON,
    allowNull: true,
  },
  warranty: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  payment_options: {
    type: DataTypes.JSON,
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
  },
  reviews: {
    type: DataTypes.JSON,
    allowNull: true,
  },
});

export  {Product};
