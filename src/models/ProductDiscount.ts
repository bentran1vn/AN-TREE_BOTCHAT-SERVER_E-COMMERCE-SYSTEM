import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { Product, ProductId } from './Product';

export interface ProductDiscountAttributes {
  Id: string;
  ProductId: string;
  Name: string;
  Description: string;
  DiscountPercent: number;
  StartTime: Date;
  EndTime: Date;
  CreatedOnUtc: Date;
  ModifiedOnUtc?: Date;
  CreatedBy: string;
  UpdatedBy?: string;
  IsDeleted: boolean;
}

export type ProductDiscountPk = "Id";
export type ProductDiscountId = ProductDiscount[ProductDiscountPk];
export type ProductDiscountOptionalAttributes = "ModifiedOnUtc" | "UpdatedBy";
export type ProductDiscountCreationAttributes = Optional<ProductDiscountAttributes, ProductDiscountOptionalAttributes>;

export class ProductDiscount extends Model<ProductDiscountAttributes, ProductDiscountCreationAttributes> implements ProductDiscountAttributes {
  Id!: string;
  ProductId!: string;
  Name!: string;
  Description!: string;
  DiscountPercent!: number;
  StartTime!: Date;
  EndTime!: Date;
  CreatedOnUtc!: Date;
  ModifiedOnUtc?: Date;
  CreatedBy!: string;
  UpdatedBy?: string;
  IsDeleted!: boolean;

  // ProductDiscount belongsTo Product via ProductId
  Product!: Product;
  getProduct!: Sequelize.BelongsToGetAssociationMixin<Product>;
  setProduct!: Sequelize.BelongsToSetAssociationMixin<Product, ProductId>;
  createProduct!: Sequelize.BelongsToCreateAssociationMixin<Product>;

  static initModel(sequelize: Sequelize.Sequelize): typeof ProductDiscount {
    return sequelize.define('ProductDiscount', {
    Id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true
    },
    ProductId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'Product',
        key: 'Id'
      }
    },
    Name: {
      type: DataTypes.STRING(200),
      allowNull: false
    },
    Description: {
      type: DataTypes.STRING(500),
      allowNull: false
    },
    DiscountPercent: {
      type: DataTypes.DECIMAL(18,2),
      allowNull: false
    },
    StartTime: {
      type: DataTypes.DATE,
      allowNull: false
    },
    EndTime: {
      type: DataTypes.DATE,
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
    tableName: 'ProductDiscount',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "IX_ProductDiscount_ProductId",
        fields: [
          { name: "ProductId" },
        ]
      },
      {
        name: "PK_ProductDiscount",
        unique: true,
        fields: [
          { name: "Id" },
        ]
      },
    ]
  }) as typeof ProductDiscount;
  }
}
