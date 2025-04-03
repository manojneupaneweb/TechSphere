import { Brand, Category } from "./Others.model.js";
import { sequelize } from "../Config/Connect.js";
import { DataTypes, Sequelize } from "sequelize"; 

const Product = sequelize.define("Product", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
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
      min: 0.01
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
      max: 5.0
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
      min: 0 
    }
  },
  category: { 
    type: DataTypes.INTEGER,
    references: { 
      model: 'Categories',
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