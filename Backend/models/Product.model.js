import { DataTypes } from "sequelize";
import { sequelize } from "../Config/Connect";
import { Category } from "./Category"; // Ensure this is imported
import { Brand } from "./Brand"; // Ensure this is imported

const Product = sequelize.define("Product", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, allowNull: false },
  image:{
    type: DataTypes.STRING,
    allowNull: true,
  },
  price: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
  highlights: { type: DataTypes.JSON, allowNull: true },
  warranty: { type: DataTypes.STRING, allowNull: true },
  payment_options: { type: DataTypes.JSON, allowNull: true },
  return_policy: { type: DataTypes.STRING, allowNull: true },
  description: { type: DataTypes.TEXT, allowNull: false },
  specifications: { type: DataTypes.JSON, allowNull: true },
  ratings: { type: DataTypes.FLOAT, defaultValue: 0.0 },
  reviews: { type: DataTypes.JSON, allowNull: true },
  stock: { type: DataTypes.INTEGER, defaultValue: 0 },
  category_id: { 
    type: DataTypes.INTEGER,
    references: { model: Category, key: 'id' } 
  },
  brand_id: { 
    type: DataTypes.INTEGER,
    references: { model: Brand, key: 'id' }
  }
}, { timestamps: true });

export { Product };
