import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { Order, OrderId } from './Order';
import type { OrderDetailFeedback, OrderDetailFeedbackId } from './OrderDetailFeedback';
import type { Product, ProductId } from './Product';

export interface OrderDetailAttributes {
  Id: string;
  OrderId: string;
  ProductId: string;
  OrderDetailFeedbackId?: string;
  ProductQuantity: number;
  CreatedOnUtc: Date;
  ModifiedOnUtc?: Date;
  IsDeleted: boolean;
  ProductPrice: number;
  ProductPriceDiscount: number;
}

export type OrderDetailPk = "Id";
export type OrderDetailId = OrderDetail[OrderDetailPk];
export type OrderDetailOptionalAttributes = "OrderDetailFeedbackId" | "ModifiedOnUtc" | "ProductPrice" | "ProductPriceDiscount";
export type OrderDetailCreationAttributes = Optional<OrderDetailAttributes, OrderDetailOptionalAttributes>;

export class OrderDetail extends Model<OrderDetailAttributes, OrderDetailCreationAttributes> implements OrderDetailAttributes {
  Id!: string;
  OrderId!: string;
  ProductId!: string;
  OrderDetailFeedbackId?: string;
  ProductQuantity!: number;
  CreatedOnUtc!: Date;
  ModifiedOnUtc?: Date;
  IsDeleted!: boolean;
  ProductPrice!: number;
  ProductPriceDiscount!: number;

  // OrderDetail belongsTo Order via OrderId
  Order!: Order;
  getOrder!: Sequelize.BelongsToGetAssociationMixin<Order>;
  setOrder!: Sequelize.BelongsToSetAssociationMixin<Order, OrderId>;
  createOrder!: Sequelize.BelongsToCreateAssociationMixin<Order>;
  // OrderDetail belongsTo OrderDetailFeedback via OrderDetailFeedbackId
  OrderDetailFeedback!: OrderDetailFeedback;
  getOrderDetailFeedback!: Sequelize.BelongsToGetAssociationMixin<OrderDetailFeedback>;
  setOrderDetailFeedback!: Sequelize.BelongsToSetAssociationMixin<OrderDetailFeedback, OrderDetailFeedbackId>;
  createOrderDetailFeedback!: Sequelize.BelongsToCreateAssociationMixin<OrderDetailFeedback>;
  // OrderDetail belongsTo Product via ProductId
  Product!: Product;
  getProduct!: Sequelize.BelongsToGetAssociationMixin<Product>;
  setProduct!: Sequelize.BelongsToSetAssociationMixin<Product, ProductId>;
  createProduct!: Sequelize.BelongsToCreateAssociationMixin<Product>;

  static initModel(sequelize: Sequelize.Sequelize): typeof OrderDetail {
    return sequelize.define('OrderDetail', {
    Id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true
    },
    OrderId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'Order',
        key: 'Id'
      }
    },
    ProductId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'Product',
        key: 'Id'
      }
    },
    OrderDetailFeedbackId: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: 'OrderDetailFeedback',
        key: 'Id'
      }
    },
    ProductQuantity: {
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
    },
    ProductPrice: {
      type: DataTypes.DECIMAL(18,2),
      allowNull: false,
      defaultValue: 0.0
    },
    ProductPriceDiscount: {
      type: DataTypes.DECIMAL(18,2),
      allowNull: false,
      defaultValue: 0.0
    }
  }, {
    tableName: 'OrderDetail',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "IX_OrderDetail_OrderDetailFeedbackId",
        fields: [
          { name: "OrderDetailFeedbackId" },
        ]
      },
      {
        name: "IX_OrderDetail_OrderId",
        fields: [
          { name: "OrderId" },
        ]
      },
      {
        name: "IX_OrderDetail_ProductId",
        fields: [
          { name: "ProductId" },
        ]
      },
      {
        name: "PK_OrderDetail",
        unique: true,
        fields: [
          { name: "Id" },
        ]
      },
    ]
  }) as typeof OrderDetail;
  }
}
