import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { OrderDetail, OrderDetailId } from './OrderDetail';
import type { ProductCategory, ProductCategoryId } from './ProductCategory';
import type { ProductDiscount, ProductDiscountId } from './ProductDiscount';
import type { ProductFeedback, ProductFeedbackId } from './ProductFeedback';
import type { ProductMedia, ProductMediaId } from './ProductMedia';
import type { Vendor, VendorId } from './Vendor';

export interface ProductAttributes {
  Id: string;
  ProductCategoryId: string;
  VendorId: string;
  Name: string;
  Price: number;
  DiscountSold: number;
  DiscountPercent: number;
  CoverImage: string;
  Description: string;
  Sku: number;
  Sold: number;
  CreatedOnUtc: Date;
  ModifiedOnUtc?: Date;
  CreatedBy: string;
  UpdatedBy?: string;
  IsDeleted: boolean;
}

export type ProductPk = "Id";
export type ProductId = Product[ProductPk];
export type ProductOptionalAttributes = "Id" | "ModifiedOnUtc" | "UpdatedBy";
export type ProductCreationAttributes = Optional<ProductAttributes, ProductOptionalAttributes>;

export class Product extends Model<ProductAttributes, ProductCreationAttributes> implements ProductAttributes {
  Id!: string;
  ProductCategoryId!: string;
  VendorId!: string;
  Name!: string;
  Price!: number;
  DiscountSold!: number;
  DiscountPercent!: number;
  CoverImage!: string;
  Description!: string;
  Sku!: number;
  Sold!: number;
  CreatedOnUtc!: Date;
  ModifiedOnUtc?: Date;
  CreatedBy!: string;
  UpdatedBy?: string;
  IsDeleted!: boolean;

  // Product hasMany OrderDetail via ProductId
  OrderDetails!: OrderDetail[];
  getOrderDetails!: Sequelize.HasManyGetAssociationsMixin<OrderDetail>;
  setOrderDetails!: Sequelize.HasManySetAssociationsMixin<OrderDetail, OrderDetailId>;
  addOrderDetail!: Sequelize.HasManyAddAssociationMixin<OrderDetail, OrderDetailId>;
  addOrderDetails!: Sequelize.HasManyAddAssociationsMixin<OrderDetail, OrderDetailId>;
  createOrderDetail!: Sequelize.HasManyCreateAssociationMixin<OrderDetail>;
  removeOrderDetail!: Sequelize.HasManyRemoveAssociationMixin<OrderDetail, OrderDetailId>;
  removeOrderDetails!: Sequelize.HasManyRemoveAssociationsMixin<OrderDetail, OrderDetailId>;
  hasOrderDetail!: Sequelize.HasManyHasAssociationMixin<OrderDetail, OrderDetailId>;
  hasOrderDetails!: Sequelize.HasManyHasAssociationsMixin<OrderDetail, OrderDetailId>;
  countOrderDetails!: Sequelize.HasManyCountAssociationsMixin;
  // Product hasMany ProductDiscount via ProductId
  ProductDiscounts!: ProductDiscount[];
  getProductDiscounts!: Sequelize.HasManyGetAssociationsMixin<ProductDiscount>;
  setProductDiscounts!: Sequelize.HasManySetAssociationsMixin<ProductDiscount, ProductDiscountId>;
  addProductDiscount!: Sequelize.HasManyAddAssociationMixin<ProductDiscount, ProductDiscountId>;
  addProductDiscounts!: Sequelize.HasManyAddAssociationsMixin<ProductDiscount, ProductDiscountId>;
  createProductDiscount!: Sequelize.HasManyCreateAssociationMixin<ProductDiscount>;
  removeProductDiscount!: Sequelize.HasManyRemoveAssociationMixin<ProductDiscount, ProductDiscountId>;
  removeProductDiscounts!: Sequelize.HasManyRemoveAssociationsMixin<ProductDiscount, ProductDiscountId>;
  hasProductDiscount!: Sequelize.HasManyHasAssociationMixin<ProductDiscount, ProductDiscountId>;
  hasProductDiscounts!: Sequelize.HasManyHasAssociationsMixin<ProductDiscount, ProductDiscountId>;
  countProductDiscounts!: Sequelize.HasManyCountAssociationsMixin;
  // Product hasMany ProductFeedback via ProductId
  ProductFeedbacks!: ProductFeedback[];
  getProductFeedbacks!: Sequelize.HasManyGetAssociationsMixin<ProductFeedback>;
  setProductFeedbacks!: Sequelize.HasManySetAssociationsMixin<ProductFeedback, ProductFeedbackId>;
  addProductFeedback!: Sequelize.HasManyAddAssociationMixin<ProductFeedback, ProductFeedbackId>;
  addProductFeedbacks!: Sequelize.HasManyAddAssociationsMixin<ProductFeedback, ProductFeedbackId>;
  createProductFeedback!: Sequelize.HasManyCreateAssociationMixin<ProductFeedback>;
  removeProductFeedback!: Sequelize.HasManyRemoveAssociationMixin<ProductFeedback, ProductFeedbackId>;
  removeProductFeedbacks!: Sequelize.HasManyRemoveAssociationsMixin<ProductFeedback, ProductFeedbackId>;
  hasProductFeedback!: Sequelize.HasManyHasAssociationMixin<ProductFeedback, ProductFeedbackId>;
  hasProductFeedbacks!: Sequelize.HasManyHasAssociationsMixin<ProductFeedback, ProductFeedbackId>;
  countProductFeedbacks!: Sequelize.HasManyCountAssociationsMixin;
  // Product hasMany ProductMedia via ProductId
  ProductMedia!: ProductMedia[];
  getProductMedia!: Sequelize.HasManyGetAssociationsMixin<ProductMedia>;
  setProductMedia!: Sequelize.HasManySetAssociationsMixin<ProductMedia, ProductMediaId>;
  addProductMedium!: Sequelize.HasManyAddAssociationMixin<ProductMedia, ProductMediaId>;
  addProductMedia!: Sequelize.HasManyAddAssociationsMixin<ProductMedia, ProductMediaId>;
  createProductMedium!: Sequelize.HasManyCreateAssociationMixin<ProductMedia>;
  removeProductMedium!: Sequelize.HasManyRemoveAssociationMixin<ProductMedia, ProductMediaId>;
  removeProductMedia!: Sequelize.HasManyRemoveAssociationsMixin<ProductMedia, ProductMediaId>;
  hasProductMedium!: Sequelize.HasManyHasAssociationMixin<ProductMedia, ProductMediaId>;
  hasProductMedia!: Sequelize.HasManyHasAssociationsMixin<ProductMedia, ProductMediaId>;
  countProductMedia!: Sequelize.HasManyCountAssociationsMixin;
  // Product belongsTo ProductCategory via ProductCategoryId
  ProductCategory!: ProductCategory;
  getProductCategory!: Sequelize.BelongsToGetAssociationMixin<ProductCategory>;
  setProductCategory!: Sequelize.BelongsToSetAssociationMixin<ProductCategory, ProductCategoryId>;
  createProductCategory!: Sequelize.BelongsToCreateAssociationMixin<ProductCategory>;
  // Product belongsTo Vendor via VendorId
  Vendor!: Vendor;
  getVendor!: Sequelize.BelongsToGetAssociationMixin<Vendor>;
  setVendor!: Sequelize.BelongsToSetAssociationMixin<Vendor, VendorId>;
  createVendor!: Sequelize.BelongsToCreateAssociationMixin<Vendor>;

  static initModel(sequelize: Sequelize.Sequelize): typeof Product {
    return sequelize.define('Product', {
    Id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true
    },
    ProductCategoryId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'ProductCategory',
        key: 'Id'
      }
    },
    VendorId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'Vendor',
        key: 'Id'
      }
    },
    Name: {
      type: DataTypes.STRING(200),
      allowNull: false
    },
    Price: {
      type: DataTypes.DECIMAL(18,2),
      allowNull: false
    },
    DiscountSold: {
      type: DataTypes.DECIMAL(18,2),
      allowNull: false
    },
    DiscountPercent: {
      type: DataTypes.DECIMAL(18,2),
      allowNull: false
    },
    CoverImage: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    Description: {
      type: DataTypes.STRING(500),
      allowNull: false
    },
    Sku: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    Sold: {
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
    tableName: 'Product',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "IX_Product_ProductCategoryId",
        fields: [
          { name: "ProductCategoryId" },
        ]
      },
      {
        name: "IX_Product_VendorId",
        fields: [
          { name: "VendorId" },
        ]
      },
      {
        name: "PK_Product",
        unique: true,
        fields: [
          { name: "Id" },
        ]
      },
    ]
  }) as typeof Product;
  }
}
