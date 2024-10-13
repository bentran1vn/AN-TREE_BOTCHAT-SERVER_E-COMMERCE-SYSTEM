import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface __EFMigrationsHistoryAttributes {
  MigrationId: string;
  ProductVersion: string;
}

export type __EFMigrationsHistoryPk = "MigrationId";
export type __EFMigrationsHistoryId = __EFMigrationsHistory[__EFMigrationsHistoryPk];
export type __EFMigrationsHistoryCreationAttributes = __EFMigrationsHistoryAttributes;

export class __EFMigrationsHistory extends Model<__EFMigrationsHistoryAttributes, __EFMigrationsHistoryCreationAttributes> implements __EFMigrationsHistoryAttributes {
  MigrationId!: string;
  ProductVersion!: string;


  static initModel(sequelize: Sequelize.Sequelize): typeof __EFMigrationsHistory {
    return sequelize.define('__EFMigrationsHistory', {
    MigrationId: {
      type: DataTypes.STRING(150),
      allowNull: false,
      primaryKey: true
    },
    ProductVersion: {
      type: DataTypes.STRING(32),
      allowNull: false
    }
  }, {
    tableName: '__EFMigrationsHistory',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "PK___EFMigrationsHistory",
        unique: true,
        fields: [
          { name: "MigrationId" },
        ]
      },
    ]
  }) as typeof __EFMigrationsHistory;
  }
}
