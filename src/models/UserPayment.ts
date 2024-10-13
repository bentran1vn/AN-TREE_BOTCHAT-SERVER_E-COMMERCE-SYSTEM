import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { User, UserId } from './User';

export interface UserPaymentAttributes {
  Id: string;
  UserId: string;
  PaymentType: string;
  Provider: string;
  CardNumber: string;
  Cvc: string;
  IsOrder: boolean;
  Expire: Date;
  CreatedOnUtc: Date;
  ModifiedOnUtc?: Date;
  IsDeleted: boolean;
}

export type UserPaymentPk = "Id";
export type UserPaymentId = UserPayment[UserPaymentPk];
export type UserPaymentOptionalAttributes = "ModifiedOnUtc";
export type UserPaymentCreationAttributes = Optional<UserPaymentAttributes, UserPaymentOptionalAttributes>;

export class UserPayment extends Model<UserPaymentAttributes, UserPaymentCreationAttributes> implements UserPaymentAttributes {
  Id!: string;
  UserId!: string;
  PaymentType!: string;
  Provider!: string;
  CardNumber!: string;
  Cvc!: string;
  IsOrder!: boolean;
  Expire!: Date;
  CreatedOnUtc!: Date;
  ModifiedOnUtc?: Date;
  IsDeleted!: boolean;

  // UserPayment belongsTo User via UserId
  User!: User;
  getUser!: Sequelize.BelongsToGetAssociationMixin<User>;
  setUser!: Sequelize.BelongsToSetAssociationMixin<User, UserId>;
  createUser!: Sequelize.BelongsToCreateAssociationMixin<User>;

  static initModel(sequelize: Sequelize.Sequelize): typeof UserPayment {
    return sequelize.define('UserPayment', {
    Id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true
    },
    UserId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'User',
        key: 'Id'
      }
    },
    PaymentType: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    Provider: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    CardNumber: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    Cvc: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    IsOrder: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    Expire: {
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
    tableName: 'UserPayment',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "IX_UserPayment_UserId",
        fields: [
          { name: "UserId" },
        ]
      },
      {
        name: "PK_UserPayment",
        unique: true,
        fields: [
          { name: "Id" },
        ]
      },
    ]
  }) as typeof UserPayment;
  }
}
