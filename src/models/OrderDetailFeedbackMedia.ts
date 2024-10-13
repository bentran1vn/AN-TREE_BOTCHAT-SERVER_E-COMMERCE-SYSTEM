import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { OrderDetailFeedback, OrderDetailFeedbackId } from './OrderDetailFeedback';

export interface OrderDetailFeedbackMediaAttributes {
  Id: string;
  OrderDetailFeedbackId: string;
  ImageUrl: string;
  CreatedOnUtc: Date;
  ModifiedOnUtc?: Date;
  IsDeleted: boolean;
}

export type OrderDetailFeedbackMediaPk = "Id";
export type OrderDetailFeedbackMediaId = OrderDetailFeedbackMedia[OrderDetailFeedbackMediaPk];
export type OrderDetailFeedbackMediaOptionalAttributes = "ModifiedOnUtc";
export type OrderDetailFeedbackMediaCreationAttributes = Optional<OrderDetailFeedbackMediaAttributes, OrderDetailFeedbackMediaOptionalAttributes>;

export class OrderDetailFeedbackMedia extends Model<OrderDetailFeedbackMediaAttributes, OrderDetailFeedbackMediaCreationAttributes> implements OrderDetailFeedbackMediaAttributes {
  Id!: string;
  OrderDetailFeedbackId!: string;
  ImageUrl!: string;
  CreatedOnUtc!: Date;
  ModifiedOnUtc?: Date;
  IsDeleted!: boolean;

  // OrderDetailFeedbackMedia belongsTo OrderDetailFeedback via OrderDetailFeedbackId
  OrderDetailFeedback!: OrderDetailFeedback;
  getOrderDetailFeedback!: Sequelize.BelongsToGetAssociationMixin<OrderDetailFeedback>;
  setOrderDetailFeedback!: Sequelize.BelongsToSetAssociationMixin<OrderDetailFeedback, OrderDetailFeedbackId>;
  createOrderDetailFeedback!: Sequelize.BelongsToCreateAssociationMixin<OrderDetailFeedback>;

  static initModel(sequelize: Sequelize.Sequelize): typeof OrderDetailFeedbackMedia {
    return sequelize.define('OrderDetailFeedbackMedia', {
    Id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true
    },
    OrderDetailFeedbackId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'OrderDetailFeedback',
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
    tableName: 'OrderDetailFeedbackMedia',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "IX_OrderDetailFeedbackMedia_OrderDetailFeedbackId",
        fields: [
          { name: "OrderDetailFeedbackId" },
        ]
      },
      {
        name: "PK_OrderDetailFeedbackMedia",
        unique: true,
        fields: [
          { name: "Id" },
        ]
      },
    ]
  }) as typeof OrderDetailFeedbackMedia;
  }
}
