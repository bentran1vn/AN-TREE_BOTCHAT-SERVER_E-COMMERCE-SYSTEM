import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { Product, ProductId } from './Product';

export interface ProductCategoryAttributes {
  Id: string;
  Name: string;
  Description: string;
  CreatedOnUtc: Date;
  ModifiedOnUtc?: Date;
  CreatedBy: string;
  UpdatedBy?: string;
  IsDeleted: boolean;
}

export type ProductCategoryPk = "Id";
export type ProductCategoryId = ProductCategory[ProductCategoryPk];
export type ProductCategoryOptionalAttributes = "ModifiedOnUtc" | "UpdatedBy";
export type ProductCategoryCreationAttributes = Optional<ProductCategoryAttributes, ProductCategoryOptionalAttributes>;

export class ProductCategory extends Model<ProductCategoryAttributes, ProductCategoryCreationAttributes> implements ProductCategoryAttributes {
  Id!: string;
  Name!: string;
  Description!: string;
  CreatedOnUtc!: Date;
  ModifiedOnUtc?: Date;
  CreatedBy!: string;
  UpdatedBy?: string;
  IsDeleted!: boolean;

  // ProductCategory hasMany Product via ProductCategoryId
  Products!: Product[];
  getProducts!: Sequelize.HasManyGetAssociationsMixin<Product>;
  setProducts!: Sequelize.HasManySetAssociationsMixin<Product, ProductId>;
  addProduct!: Sequelize.HasManyAddAssociationMixin<Product, ProductId>;
  addProducts!: Sequelize.HasManyAddAssociationsMixin<Product, ProductId>;
  createProduct!: Sequelize.HasManyCreateAssociationMixin<Product>;
  removeProduct!: Sequelize.HasManyRemoveAssociationMixin<Product, ProductId>;
  removeProducts!: Sequelize.HasManyRemoveAssociationsMixin<Product, ProductId>;
  hasProduct!: Sequelize.HasManyHasAssociationMixin<Product, ProductId>;
  hasProducts!: Sequelize.HasManyHasAssociationsMixin<Product, ProductId>;
  countProducts!: Sequelize.HasManyCountAssociationsMixin;

  static initModel(sequelize: Sequelize.Sequelize): typeof ProductCategory {
    return sequelize.define('ProductCategory', {
    Id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true
    },
    Name: {
      type: DataTypes.STRING(200),
      allowNull: false
    },
    Description: {
      type: DataTypes.STRING(500),
      allowNull: false
    },
    CreatedOnUtc: {
      type: DataTypes.DATE,
      allowNull: false
    },
    ModifiedOnUtc: {
      type: DataTypes.DATE,
      allowNull: true
    },
    CreatedBy: {
      type: DataTypes.UUID,
      allowNull: false
    },
    UpdatedBy: {
      type: DataTypes.UUID,
      allowNull: true
    },
    IsDeleted: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    }
  }, {
    tableName: 'ProductCategory',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "PK_ProductCategory",
        unique: true,
        fields: [
          { name: "Id" },
        ]
      },
    ]
  }) as typeof ProductCategory;
  }
}
