import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { Product, ProductId } from './Product';

export interface ProductMediaAttributes {
  Id: string;
  ProductId: string;
  ImageUrl: string;
  CreatedOnUtc: Date;
  ModifiedOnUtc?: Date;
  IsDeleted: boolean;
}

export type ProductMediaPk = "Id";
export type ProductMediaId = ProductMedia[ProductMediaPk];
export type ProductMediaOptionalAttributes = "ModifiedOnUtc";
export type ProductMediaCreationAttributes = Optional<ProductMediaAttributes, ProductMediaOptionalAttributes>;

export class ProductMedia extends Model<ProductMediaAttributes, ProductMediaCreationAttributes> implements ProductMediaAttributes {
  Id!: string;
  ProductId!: string;
  ImageUrl!: string;
  CreatedOnUtc!: Date;
  ModifiedOnUtc?: Date;
  IsDeleted!: boolean;

  // ProductMedia belongsTo Product via ProductId
  Product!: Product;
  getProduct!: Sequelize.BelongsToGetAssociationMixin<Product>;
  setProduct!: Sequelize.BelongsToSetAssociationMixin<Product, ProductId>;
  createProduct!: Sequelize.BelongsToCreateAssociationMixin<Product>;

  static initModel(sequelize: Sequelize.Sequelize): typeof ProductMedia {
    return sequelize.define('ProductMedia', {
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
    ImageUrl: {
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
    IsDeleted: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    }
  }, {
    tableName: 'ProductMedia',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "IX_ProductMedia_ProductId",
        fields: [
          { name: "ProductId" },
        ]
      },
      {
        name: "PK_ProductMedia",
        unique: true,
        fields: [
          { name: "Id" },
        ]
      },
    ]
  }) as typeof ProductMedia;
  }
}
