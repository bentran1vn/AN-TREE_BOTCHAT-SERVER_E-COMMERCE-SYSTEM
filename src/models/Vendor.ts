import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { Product, ProductId } from './Product';
import type { User, UserId } from './User';

export interface VendorAttributes {
  Id: string;
  Email: string;
  Name: string;
  Address: string;
  City: string;
  Province: string;
  Phonenumber: string;
  CreatedOnUtc: Date;
  ModifiedOnUtc?: Date;
  IsDeleted: boolean;
  BankAccountNumber: string;
  BankName: string;
  BankOwnerName: string;
  CreatedBy: string;
  UpdatedBy?: string;
  AvatarImage: string;
  CoverImage: string;
}

export type VendorPk = "Id";
export type VendorId = Vendor[VendorPk];
export type VendorOptionalAttributes = "ModifiedOnUtc" | "BankAccountNumber" | "BankName" | "BankOwnerName" | "CreatedBy" | "UpdatedBy" | "AvatarImage" | "CoverImage";
export type VendorCreationAttributes = Optional<VendorAttributes, VendorOptionalAttributes>;

export class Vendor extends Model<VendorAttributes, VendorCreationAttributes> implements VendorAttributes {
  Id!: string;
  Email!: string;
  Name!: string;
  Address!: string;
  City!: string;
  Province!: string;
  Phonenumber!: string;
  CreatedOnUtc!: Date;
  ModifiedOnUtc?: Date;
  IsDeleted!: boolean;
  BankAccountNumber!: string;
  BankName!: string;
  BankOwnerName!: string;
  CreatedBy!: string;
  UpdatedBy?: string;
  AvatarImage!: string;
  CoverImage!: string;

  // Vendor hasMany Product via VendorId
  Products!: Product[];
  getProducts!: Sequelize.HasManyGetAssociationsMixin<Product>;
  setProducts!: Sequelize.HasManySetAssociationsMixin<Product, ProductId>;
  addProduct!: Sequelize.HasManyAddAssociationMixin<Product, ProductId>;
  addProducts!: Sequelize.HasManyAddAssociationsMixin<Product, ProductId>;
  createProduct!: Sequelize.HasManyCreateAssociationMixin<Product>;
  removeProduct!: Sequelize.HasManyRemoveAssociationMixin<Product, ProductId>;
  removeProducts!: Sequelize.HasManyRemoveAssociationsMixin<Product, ProductId>;
  hasProduct!: Sequelize.HasManyHasAssociationMixin<Product, ProductId>;
  hasProducts!: Sequelize.HasManyHasAssociationsMixin<Product, ProductId>;
  countProducts!: Sequelize.HasManyCountAssociationsMixin;
  // Vendor hasMany User via VendorId
  Users!: User[];
  getUsers!: Sequelize.HasManyGetAssociationsMixin<User>;
  setUsers!: Sequelize.HasManySetAssociationsMixin<User, UserId>;
  addUser!: Sequelize.HasManyAddAssociationMixin<User, UserId>;
  addUsers!: Sequelize.HasManyAddAssociationsMixin<User, UserId>;
  createUser!: Sequelize.HasManyCreateAssociationMixin<User>;
  removeUser!: Sequelize.HasManyRemoveAssociationMixin<User, UserId>;
  removeUsers!: Sequelize.HasManyRemoveAssociationsMixin<User, UserId>;
  hasUser!: Sequelize.HasManyHasAssociationMixin<User, UserId>;
  hasUsers!: Sequelize.HasManyHasAssociationsMixin<User, UserId>;
  countUsers!: Sequelize.HasManyCountAssociationsMixin;

  static initModel(sequelize: Sequelize.Sequelize): typeof Vendor {
    return sequelize.define('Vendor', {
    Id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true
    },
    Email: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    Name: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    Address: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    City: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    Province: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    Phonenumber: {
      type: DataTypes.TEXT,
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
    BankAccountNumber: {
      type: DataTypes.TEXT,
      allowNull: false,
      defaultValue: "(N"
    },
    BankName: {
      type: DataTypes.TEXT,
      allowNull: false,
      defaultValue: "(N"
    },
    BankOwnerName: {
      type: DataTypes.TEXT,
      allowNull: false,
      defaultValue: "(N"
    },
    CreatedBy: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: "00000000-0000-0000-0000-000000000000"
    },
    UpdatedBy: {
      type: DataTypes.UUID,
      allowNull: true
    },
    AvatarImage: {
      type: DataTypes.TEXT,
      allowNull: false,
      defaultValue: "(N"
    },
    CoverImage: {
      type: DataTypes.TEXT,
      allowNull: false,
      defaultValue: "(N"
    }
  }, {
    tableName: 'Vendor',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "PK_Vendor",
        unique: true,
        fields: [
          { name: "Id" },
        ]
      },
    ]
  }) as typeof Vendor;
  }
}
