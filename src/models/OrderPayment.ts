import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { Order, OrderId } from './Order';

export interface OrderPaymentAttributes {
  Id: string;
  OrderId: string;
  CardNumber: string;
  Cvc: string;
  Expire: string;
  CreatedOnUtc: Date;
  ModifiedOnUtc?: Date;
  IsDeleted: boolean;
}

export type OrderPaymentPk = "Id";
export type OrderPaymentId = OrderPayment[OrderPaymentPk];
export type OrderPaymentOptionalAttributes = "ModifiedOnUtc";
export type OrderPaymentCreationAttributes = Optional<OrderPaymentAttributes, OrderPaymentOptionalAttributes>;

export class OrderPayment extends Model<OrderPaymentAttributes, OrderPaymentCreationAttributes> implements OrderPaymentAttributes {
  Id!: string;
  OrderId!: string;
  CardNumber!: string;
  Cvc!: string;
  Expire!: string;
  CreatedOnUtc!: Date;
  ModifiedOnUtc?: Date;
  IsDeleted!: boolean;

  // OrderPayment belongsTo Order via OrderId
  Order!: Order;
  getOrder!: Sequelize.BelongsToGetAssociationMixin<Order>;
  setOrder!: Sequelize.BelongsToSetAssociationMixin<Order, OrderId>;
  createOrder!: Sequelize.BelongsToCreateAssociationMixin<Order>;

  static initModel(sequelize: Sequelize.Sequelize): typeof OrderPayment {
    return sequelize.define('OrderPayment', {
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
    CardNumber: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    Cvc: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    Expire: {
      type: DataTypes.STRING(20),
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
    tableName: 'OrderPayment',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "IX_OrderPayment_OrderId",
        fields: [
          { name: "OrderId" },
        ]
      },
      {
        name: "PK_OrderPayment",
        unique: true,
        fields: [
          { name: "Id" },
        ]
      },
    ]
  }) as typeof OrderPayment;
  }
}
