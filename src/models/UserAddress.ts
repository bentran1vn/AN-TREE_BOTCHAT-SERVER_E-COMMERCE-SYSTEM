import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { User, UserId } from './User';

export interface UserAddressAttributes {
  Id: string;
  UserId: string;
  Address: string;
  City: string;
  Province: string;
  PhoneNumber: string;
  IsOrder: boolean;
  CreatedOnUtc: Date;
  ModifiedOnUtc?: Date;
  IsDeleted: boolean;
}

export type UserAddressPk = "Id";
export type UserAddressId = UserAddress[UserAddressPk];
export type UserAddressOptionalAttributes = "ModifiedOnUtc";
export type UserAddressCreationAttributes = Optional<UserAddressAttributes, UserAddressOptionalAttributes>;

export class UserAddress extends Model<UserAddressAttributes, UserAddressCreationAttributes> implements UserAddressAttributes {
  Id!: string;
  UserId!: string;
  Address!: string;
  City!: string;
  Province!: string;
  PhoneNumber!: string;
  IsOrder!: boolean;
  CreatedOnUtc!: Date;
  ModifiedOnUtc?: Date;
  IsDeleted!: boolean;

  // UserAddress belongsTo User via UserId
  User!: User;
  getUser!: Sequelize.BelongsToGetAssociationMixin<User>;
  setUser!: Sequelize.BelongsToSetAssociationMixin<User, UserId>;
  createUser!: Sequelize.BelongsToCreateAssociationMixin<User>;

  static initModel(sequelize: Sequelize.Sequelize): typeof UserAddress {
    return sequelize.define('UserAddress', {
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
    Address: {
      type: DataTypes.STRING(500),
      allowNull: false
    },
    City: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    Province: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    PhoneNumber: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    IsOrder: {
      type: DataTypes.BOOLEAN,
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
    tableName: 'UserAddress',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "IX_UserAddress_UserId",
        fields: [
          { name: "UserId" },
        ]
      },
      {
        name: "PK_UserAddress",
        unique: true,
        fields: [
          { name: "Id" },
        ]
      },
    ]
  }) as typeof UserAddress;
  }
}
