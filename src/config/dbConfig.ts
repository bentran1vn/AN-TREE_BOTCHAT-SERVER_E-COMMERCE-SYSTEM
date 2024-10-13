import { Sequelize } from 'sequelize'
import { config } from 'dotenv'
import { User } from '../models/User'
config()

const sequelize = new Sequelize(
  process.env.SQL_DATABASE as string,
  process.env.SQL_USER as string,
  process.env.SQL_PASSWORD as string,
  {
    host: process.env.SQL_HOST as string,
    dialect: 'mssql',
    dialectOptions: {
      options: {
        encrypt: true, // Use this if you're on Azure
        trustServerCertificate: true
      }
    }
  }
)

User.initModel(sequelize)

// const models = [User, Order, Vendor]
// models.forEach((model) => model.initModel(sequelize))

export default sequelize
