import * as Sequelize from 'sequelize'
import { DataTypes, Model, Optional } from 'sequelize'
import type { Order, OrderId } from './Order'
import type { UserAddress, UserAddressId } from './UserAddress'
import type { UserPayment, UserPaymentId } from './UserPayment'
import type { Vendor, VendorId } from './Vendor'

export interface UserAttributes {
  Id: string
  Email: string
  Username: string
  Password: string
  Firstname: string
  Lastname: string
  Phonenumber: string
  Role: number
  CreatedOnUtc: Date
  ModifiedOnUtc?: Date
  CreatedBy: string
  UpdatedBy?: string
  VendorId?: string
  IsDeleted: boolean
}

export type UserPk = 'Id'
export type UserId = User[UserPk]
export type UserOptionalAttributes = 'ModifiedOnUtc' | 'UpdatedBy' | 'VendorId'
export type UserCreationAttributes = Optional<UserAttributes, UserOptionalAttributes>

export class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  Id!: string
  Email!: string
  Username!: string
  Password!: string
  Firstname!: string
  Lastname!: string
  Phonenumber!: string
  Role!: number
  CreatedOnUtc!: Date
  ModifiedOnUtc?: Date
  CreatedBy!: string
  UpdatedBy?: string
  VendorId?: string
  IsDeleted!: boolean

  // User hasMany Order via UserId
  Orders!: Order[]
  getOrders!: Sequelize.HasManyGetAssociationsMixin<Order>
  setOrders!: Sequelize.HasManySetAssociationsMixin<Order, OrderId>
  addOrder!: Sequelize.HasManyAddAssociationMixin<Order, OrderId>
  addOrders!: Sequelize.HasManyAddAssociationsMixin<Order, OrderId>
  createOrder!: Sequelize.HasManyCreateAssociationMixin<Order>
  removeOrder!: Sequelize.HasManyRemoveAssociationMixin<Order, OrderId>
  removeOrders!: Sequelize.HasManyRemoveAssociationsMixin<Order, OrderId>
  hasOrder!: Sequelize.HasManyHasAssociationMixin<Order, OrderId>
  hasOrders!: Sequelize.HasManyHasAssociationsMixin<Order, OrderId>
  countOrders!: Sequelize.HasManyCountAssociationsMixin
  // User hasMany UserAddress via UserId
  UserAddresses!: UserAddress[]
  getUserAddresses!: Sequelize.HasManyGetAssociationsMixin<UserAddress>
  setUserAddresses!: Sequelize.HasManySetAssociationsMixin<UserAddress, UserAddressId>
  addUserAddress!: Sequelize.HasManyAddAssociationMixin<UserAddress, UserAddressId>
  addUserAddresses!: Sequelize.HasManyAddAssociationsMixin<UserAddress, UserAddressId>
  createUserAddress!: Sequelize.HasManyCreateAssociationMixin<UserAddress>
  removeUserAddress!: Sequelize.HasManyRemoveAssociationMixin<UserAddress, UserAddressId>
  removeUserAddresses!: Sequelize.HasManyRemoveAssociationsMixin<UserAddress, UserAddressId>
  hasUserAddress!: Sequelize.HasManyHasAssociationMixin<UserAddress, UserAddressId>
  hasUserAddresses!: Sequelize.HasManyHasAssociationsMixin<UserAddress, UserAddressId>
  countUserAddresses!: Sequelize.HasManyCountAssociationsMixin
  // User hasMany UserPayment via UserId
  UserPayments!: UserPayment[]
  getUserPayments!: Sequelize.HasManyGetAssociationsMixin<UserPayment>
  setUserPayments!: Sequelize.HasManySetAssociationsMixin<UserPayment, UserPaymentId>
  addUserPayment!: Sequelize.HasManyAddAssociationMixin<UserPayment, UserPaymentId>
  addUserPayments!: Sequelize.HasManyAddAssociationsMixin<UserPayment, UserPaymentId>
  createUserPayment!: Sequelize.HasManyCreateAssociationMixin<UserPayment>
  removeUserPayment!: Sequelize.HasManyRemoveAssociationMixin<UserPayment, UserPaymentId>
  removeUserPayments!: Sequelize.HasManyRemoveAssociationsMixin<UserPayment, UserPaymentId>
  hasUserPayment!: Sequelize.HasManyHasAssociationMixin<UserPayment, UserPaymentId>
  hasUserPayments!: Sequelize.HasManyHasAssociationsMixin<UserPayment, UserPaymentId>
  countUserPayments!: Sequelize.HasManyCountAssociationsMixin
  // User belongsTo Vendor via VendorId
  Vendor!: Vendor
  getVendor!: Sequelize.BelongsToGetAssociationMixin<Vendor>
  setVendor!: Sequelize.BelongsToSetAssociationMixin<Vendor, VendorId>
  createVendor!: Sequelize.BelongsToCreateAssociationMixin<Vendor>

  static initModel(sequelize: Sequelize.Sequelize): typeof User {
    return User.init(
      {
        Id: {
          type: DataTypes.UUID,
          allowNull: false,
          primaryKey: true
        },
        Email: {
          type: DataTypes.STRING(100),
          allowNull: false
        },
        Username: {
          type: DataTypes.STRING(100),
          allowNull: false
        },
        Password: {
          type: DataTypes.STRING(200),
          allowNull: false
        },
        Firstname: {
          type: DataTypes.STRING(100),
          allowNull: false
        },
        Lastname: {
          type: DataTypes.STRING(100),
          allowNull: false
        },
        Phonenumber: {
          type: DataTypes.STRING(100),
          allowNull: false
        },
        Role: {
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
        VendorId: {
          type: DataTypes.UUID,
          allowNull: true,
          references: {
            model: 'Vendor',
            key: 'Id'
          }
        },
        IsDeleted: {
          type: DataTypes.BOOLEAN,
          allowNull: false
        }
      },
      {
        sequelize,
        tableName: 'User',
        schema: 'dbo',
        timestamps: false,
        indexes: [
          {
            name: 'IX_User_VendorId',
            fields: [{ name: 'VendorId' }]
          },
          {
            name: 'PK_User',
            unique: true,
            fields: [{ name: 'Id' }]
          }
        ]
      }
    ) as typeof User
  }
}
