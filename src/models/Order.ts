import * as Sequelize from 'sequelize'
import { DataTypes, Model, Optional } from 'sequelize'
import type { Discount, DiscountId } from './Discount'
import type { OrderDetail, OrderDetailId } from './OrderDetail'
import type { OrderPayment, OrderPaymentId } from './OrderPayment'
import type { User, UserId } from './User'

export interface OrderAttributes {
  Id: string
  DiscountId?: string
  UserId: string
  Address: string
  Note: string
  Total: number
  Status: number
  CreatedOnUtc: Date
  ModifiedOnUtc?: Date
  IsDeleted: boolean
  IsFeedback: boolean
}

export type OrderPk = 'Id'
export type OrderId = Order[OrderPk]
export type OrderOptionalAttributes = 'DiscountId' | 'ModifiedOnUtc' | 'IsFeedback'
export type OrderCreationAttributes = Optional<OrderAttributes, OrderOptionalAttributes>

export class Order extends Model<OrderAttributes, OrderCreationAttributes> implements OrderAttributes {
  Id!: string
  DiscountId?: string
  UserId!: string
  Address!: string
  Note!: string
  Total!: number
  Status!: number
  CreatedOnUtc!: Date
  ModifiedOnUtc?: Date
  IsDeleted!: boolean
  IsFeedback!: boolean

  // Order belongsTo Discount via DiscountId
  Discount!: Discount
  getDiscount!: Sequelize.BelongsToGetAssociationMixin<Discount>
  setDiscount!: Sequelize.BelongsToSetAssociationMixin<Discount, DiscountId>
  createDiscount!: Sequelize.BelongsToCreateAssociationMixin<Discount>
  // Order hasMany OrderDetail via OrderId
  OrderDetails!: OrderDetail[]
  getOrderDetails!: Sequelize.HasManyGetAssociationsMixin<OrderDetail>
  setOrderDetails!: Sequelize.HasManySetAssociationsMixin<OrderDetail, OrderDetailId>
  addOrderDetail!: Sequelize.HasManyAddAssociationMixin<OrderDetail, OrderDetailId>
  addOrderDetails!: Sequelize.HasManyAddAssociationsMixin<OrderDetail, OrderDetailId>
  createOrderDetail!: Sequelize.HasManyCreateAssociationMixin<OrderDetail>
  removeOrderDetail!: Sequelize.HasManyRemoveAssociationMixin<OrderDetail, OrderDetailId>
  removeOrderDetails!: Sequelize.HasManyRemoveAssociationsMixin<OrderDetail, OrderDetailId>
  hasOrderDetail!: Sequelize.HasManyHasAssociationMixin<OrderDetail, OrderDetailId>
  hasOrderDetails!: Sequelize.HasManyHasAssociationsMixin<OrderDetail, OrderDetailId>
  countOrderDetails!: Sequelize.HasManyCountAssociationsMixin
  // Order hasMany OrderPayment via OrderId
  OrderPayments!: OrderPayment[]
  getOrderPayments!: Sequelize.HasManyGetAssociationsMixin<OrderPayment>
  setOrderPayments!: Sequelize.HasManySetAssociationsMixin<OrderPayment, OrderPaymentId>
  addOrderPayment!: Sequelize.HasManyAddAssociationMixin<OrderPayment, OrderPaymentId>
  addOrderPayments!: Sequelize.HasManyAddAssociationsMixin<OrderPayment, OrderPaymentId>
  createOrderPayment!: Sequelize.HasManyCreateAssociationMixin<OrderPayment>
  removeOrderPayment!: Sequelize.HasManyRemoveAssociationMixin<OrderPayment, OrderPaymentId>
  removeOrderPayments!: Sequelize.HasManyRemoveAssociationsMixin<OrderPayment, OrderPaymentId>
  hasOrderPayment!: Sequelize.HasManyHasAssociationMixin<OrderPayment, OrderPaymentId>
  hasOrderPayments!: Sequelize.HasManyHasAssociationsMixin<OrderPayment, OrderPaymentId>
  countOrderPayments!: Sequelize.HasManyCountAssociationsMixin
  // Order belongsTo User via UserId
  User!: User
  getUser!: Sequelize.BelongsToGetAssociationMixin<User>
  setUser!: Sequelize.BelongsToSetAssociationMixin<User, UserId>
  createUser!: Sequelize.BelongsToCreateAssociationMixin<User>

  static initModel(sequelize: Sequelize.Sequelize): typeof Order {
    return sequelize.define(
      'Order',
      {
        Id: {
          type: DataTypes.UUID,
          allowNull: false,
          primaryKey: true
        },
        DiscountId: {
          type: DataTypes.UUID,
          allowNull: true,
          references: {
            model: 'Discount',
            key: 'Id'
          }
        },
        UserId: {
          type: DataTypes.UUID,
          allowNull: false,
          references: {
            model: 'User',
            key: 'Id'
          }
        },
        Address: {
          type: DataTypes.STRING(200),
          allowNull: false
        },
        Note: {
          type: DataTypes.STRING(500),
          allowNull: false
        },
        Total: {
          type: DataTypes.DECIMAL(18, 2),
          allowNull: false
        },
        Status: {
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
        IsFeedback: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: false
        }
      },
      {
        tableName: 'Order',
        schema: 'dbo',
        timestamps: false,
        indexes: [
          {
            name: 'IX_Order_DiscountId',
            fields: [{ name: 'DiscountId' }]
          },
          {
            name: 'IX_Order_UserId',
            fields: [{ name: 'UserId' }]
          },
          {
            name: 'PK_Order',
            unique: true,
            fields: [{ name: 'Id' }]
          }
        ]
      }
    ) as typeof Order
  }
}
