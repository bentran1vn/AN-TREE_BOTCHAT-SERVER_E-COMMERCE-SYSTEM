import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { Product, ProductId } from './Product';

export interface ProductFeedbackAttributes {
  Id: string;
  ProductId: string;
  Rate: number;
  Total: number;
  CreatedOnUtc: Date;
  ModifiedOnUtc?: Date;
  IsDeleted: boolean;
}

export type ProductFeedbackPk = "Id";
export type ProductFeedbackId = ProductFeedback[ProductFeedbackPk];
export type ProductFeedbackOptionalAttributes = "ModifiedOnUtc";
export type ProductFeedbackCreationAttributes = Optional<ProductFeedbackAttributes, ProductFeedbackOptionalAttributes>;

export class ProductFeedback extends Model<ProductFeedbackAttributes, ProductFeedbackCreationAttributes> implements ProductFeedbackAttributes {
  Id!: string;
  ProductId!: string;
  Rate!: number;
  Total!: number;
  CreatedOnUtc!: Date;
  ModifiedOnUtc?: Date;
  IsDeleted!: boolean;

  // ProductFeedback belongsTo Product via ProductId
  Product!: Product;
  getProduct!: Sequelize.BelongsToGetAssociationMixin<Product>;
  setProduct!: Sequelize.BelongsToSetAssociationMixin<Product, ProductId>;
  createProduct!: Sequelize.BelongsToCreateAssociationMixin<Product>;

  static initModel(sequelize: Sequelize.Sequelize): typeof ProductFeedback {
    return sequelize.define('ProductFeedback', {
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
    Rate: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    Total: {
      type: DataTypes.INTEGER,
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
    tableName: 'ProductFeedback',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "IX_ProductFeedback_ProductId",
        fields: [
          { name: "ProductId" },
        ]
      },
      {
        name: "PK_ProductFeedback",
        unique: true,
        fields: [
          { name: "Id" },
        ]
      },
    ]
  }) as typeof ProductFeedback;
  }
}
