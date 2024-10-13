import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { OrderDetail, OrderDetailId } from './OrderDetail';
import type { OrderDetailFeedbackMedia, OrderDetailFeedbackMediaId } from './OrderDetailFeedbackMedia';

export interface OrderDetailFeedbackAttributes {
  Id: string;
  Content: string;
  Rating: number;
  CreatedOnUtc: Date;
  ModifiedOnUtc?: Date;
  IsDeleted: boolean;
}

export type OrderDetailFeedbackPk = "Id";
export type OrderDetailFeedbackId = OrderDetailFeedback[OrderDetailFeedbackPk];
export type OrderDetailFeedbackOptionalAttributes = "ModifiedOnUtc";
export type OrderDetailFeedbackCreationAttributes = Optional<OrderDetailFeedbackAttributes, OrderDetailFeedbackOptionalAttributes>;

export class OrderDetailFeedback extends Model<OrderDetailFeedbackAttributes, OrderDetailFeedbackCreationAttributes> implements OrderDetailFeedbackAttributes {
  Id!: string;
  Content!: string;
  Rating!: number;
  CreatedOnUtc!: Date;
  ModifiedOnUtc?: Date;
  IsDeleted!: boolean;

  // OrderDetailFeedback hasMany OrderDetail via OrderDetailFeedbackId
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
  // OrderDetailFeedback hasMany OrderDetailFeedbackMedia via OrderDetailFeedbackId
  OrderDetailFeedbackMedia!: OrderDetailFeedbackMedia[];
  getOrderDetailFeedbackMedia!: Sequelize.HasManyGetAssociationsMixin<OrderDetailFeedbackMedia>;
  setOrderDetailFeedbackMedia!: Sequelize.HasManySetAssociationsMixin<OrderDetailFeedbackMedia, OrderDetailFeedbackMediaId>;
  addOrderDetailFeedbackMedium!: Sequelize.HasManyAddAssociationMixin<OrderDetailFeedbackMedia, OrderDetailFeedbackMediaId>;
  addOrderDetailFeedbackMedia!: Sequelize.HasManyAddAssociationsMixin<OrderDetailFeedbackMedia, OrderDetailFeedbackMediaId>;
  createOrderDetailFeedbackMedium!: Sequelize.HasManyCreateAssociationMixin<OrderDetailFeedbackMedia>;
  removeOrderDetailFeedbackMedium!: Sequelize.HasManyRemoveAssociationMixin<OrderDetailFeedbackMedia, OrderDetailFeedbackMediaId>;
  removeOrderDetailFeedbackMedia!: Sequelize.HasManyRemoveAssociationsMixin<OrderDetailFeedbackMedia, OrderDetailFeedbackMediaId>;
  hasOrderDetailFeedbackMedium!: Sequelize.HasManyHasAssociationMixin<OrderDetailFeedbackMedia, OrderDetailFeedbackMediaId>;
  hasOrderDetailFeedbackMedia!: Sequelize.HasManyHasAssociationsMixin<OrderDetailFeedbackMedia, OrderDetailFeedbackMediaId>;
  countOrderDetailFeedbackMedia!: Sequelize.HasManyCountAssociationsMixin;

  static initModel(sequelize: Sequelize.Sequelize): typeof OrderDetailFeedback {
    return sequelize.define('OrderDetailFeedback', {
    Id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true
    },
    Content: {
      type: DataTypes.STRING(500),
      allowNull: false
    },
    Rating: {
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
    tableName: 'OrderDetailFeedback',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "PK_OrderDetailFeedback",
        unique: true,
        fields: [
          { name: "Id" },
        ]
      },
    ]
  }) as typeof OrderDetailFeedback;
  }
}
