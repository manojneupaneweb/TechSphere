import { Brand, Category } from "./Others.model.js";
import { sequelize } from "../Config/Connect.js";
import { DataTypes, Sequelize } from "sequelize"; 

const Product = sequelize.define("Product", {
  id: { 
    type: DataTypes.INTEGER, 
    primaryKey: true, 
    autoIncrement: true 
  },
  name: { 
    type: DataTypes.STRING, 
    allowNull: false 
  },
  image: { 
    type: DataTypes.STRING, 
    allowNull: true 
  },
  price: { 
    type: DataTypes.DECIMAL(10, 2), 
    allowNull: false,
    validate: {
      min: 0.01 // Ensure price is at least 0.01
    }
  },
  highlights: { 
    type: DataTypes.JSON, 
    allowNull: true 
  },
  warranty: { 
    type: DataTypes.STRING, 
    allowNull: true 
  },
  payment_options: { 
    type: DataTypes.JSON, 
    allowNull: true 
  },
  return_policy: { 
    type: DataTypes.STRING, 
    allowNull: true 
  },
  description: { 
    type: DataTypes.TEXT, 
    allowNull: false 
  },
  specifications: { 
    type: DataTypes.JSON, 
    allowNull: true 
  },
  ratings: { 
    type: DataTypes.FLOAT, 
    defaultValue: 0.0,
    validate: {
      min: 0.0,
      max: 5.0 // Assuming ratings are out of 5
    }
  },
  reviews: { 
    type: DataTypes.JSON, 
    allowNull: true 
  },
  stock: { 
    type: DataTypes.INTEGER, 
    defaultValue: 0,
    validate: {
      min: 0 // Ensure stock is not negative
    }
  },
  category: { 
    type: DataTypes.INTEGER,
    references: { 
      model: 'Categories', // Use the table name as a string
      key: 'id' 
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  },
  brand: { 
    type: DataTypes.INTEGER,
    references: { 
      model: 'Brands',
      key: 'id' 
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  }
}, { 
  timestamps: true,
  tableName: 'products'
});

export { Product };