import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { Order, OrderId } from './Order';

export interface DiscountAttributes {
  Id: string;
  Name: string;
  Description: string;
  DiscountPercent: number;
  Total: number;
  Used: number;
  StartTime: Date;
  EndTime: Date;
  CreatedOnUtc: Date;
  ModifiedOnUtc?: Date;
  IsDeleted: boolean;
}

export type DiscountPk = "Id";
export type DiscountId = Discount[DiscountPk];
export type DiscountOptionalAttributes = "ModifiedOnUtc";
export type DiscountCreationAttributes = Optional<DiscountAttributes, DiscountOptionalAttributes>;

export class Discount extends Model<DiscountAttributes, DiscountCreationAttributes> implements DiscountAttributes {
  Id!: string;
  Name!: string;
  Description!: string;
  DiscountPercent!: number;
  Total!: number;
  Used!: number;
  StartTime!: Date;
  EndTime!: Date;
  CreatedOnUtc!: Date;
  ModifiedOnUtc?: Date;
  IsDeleted!: boolean;

  // Discount hasMany Order via DiscountId
  Orders!: Order[];
  getOrders!: Sequelize.HasManyGetAssociationsMixin<Order>;
  setOrders!: Sequelize.HasManySetAssociationsMixin<Order, OrderId>;
  addOrder!: Sequelize.HasManyAddAssociationMixin<Order, OrderId>;
  addOrders!: Sequelize.HasManyAddAssociationsMixin<Order, OrderId>;
  createOrder!: Sequelize.HasManyCreateAssociationMixin<Order>;
  removeOrder!: Sequelize.HasManyRemoveAssociationMixin<Order, OrderId>;
  removeOrders!: Sequelize.HasManyRemoveAssociationsMixin<Order, OrderId>;
  hasOrder!: Sequelize.HasManyHasAssociationMixin<Order, OrderId>;
  hasOrders!: Sequelize.HasManyHasAssociationsMixin<Order, OrderId>;
  countOrders!: Sequelize.HasManyCountAssociationsMixin;

  static initModel(sequelize: Sequelize.Sequelize): typeof Discount {
    return sequelize.define('Discount', {
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
    DiscountPercent: {
      type: DataTypes.DECIMAL(18,2),
      allowNull: false
    },
    Total: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    Used: {
      type: DataTypes.INTEGER,
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
    IsDeleted: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    }
  }, {
    tableName: 'Discount',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "PK_Discount",
        unique: true,
        fields: [
          { name: "Id" },
        ]
      },
    ]
  }) as typeof Discount;
  }
}
