import type { Sequelize } from "sequelize";
import { Discount as _Discount } from "./Discount";
import type { DiscountAttributes, DiscountCreationAttributes } from "./Discount";
import { Order as _Order } from "./Order";
import type { OrderAttributes, OrderCreationAttributes } from "./Order";
import { OrderDetail as _OrderDetail } from "./OrderDetail";
import type { OrderDetailAttributes, OrderDetailCreationAttributes } from "./OrderDetail";
import { OrderDetailFeedback as _OrderDetailFeedback } from "./OrderDetailFeedback";
import type { OrderDetailFeedbackAttributes, OrderDetailFeedbackCreationAttributes } from "./OrderDetailFeedback";
import { OrderDetailFeedbackMedia as _OrderDetailFeedbackMedia } from "./OrderDetailFeedbackMedia";
import type { OrderDetailFeedbackMediaAttributes, OrderDetailFeedbackMediaCreationAttributes } from "./OrderDetailFeedbackMedia";
import { OrderPayment as _OrderPayment } from "./OrderPayment";
import type { OrderPaymentAttributes, OrderPaymentCreationAttributes } from "./OrderPayment";
import { Product as _Product } from "./Product";
import type { ProductAttributes, ProductCreationAttributes } from "./Product";
import { ProductCategory as _ProductCategory } from "./ProductCategory";
import type { ProductCategoryAttributes, ProductCategoryCreationAttributes } from "./ProductCategory";
import { ProductDiscount as _ProductDiscount } from "./ProductDiscount";
import type { ProductDiscountAttributes, ProductDiscountCreationAttributes } from "./ProductDiscount";
import { ProductFeedback as _ProductFeedback } from "./ProductFeedback";
import type { ProductFeedbackAttributes, ProductFeedbackCreationAttributes } from "./ProductFeedback";
import { ProductMedia as _ProductMedia } from "./ProductMedia";
import type { ProductMediaAttributes, ProductMediaCreationAttributes } from "./ProductMedia";
import { User as _User } from "./User";
import type { UserAttributes, UserCreationAttributes } from "./User";
import { UserAddress as _UserAddress } from "./UserAddress";
import type { UserAddressAttributes, UserAddressCreationAttributes } from "./UserAddress";
import { UserPayment as _UserPayment } from "./UserPayment";
import type { UserPaymentAttributes, UserPaymentCreationAttributes } from "./UserPayment";
import { Vendor as _Vendor } from "./Vendor";
import type { VendorAttributes, VendorCreationAttributes } from "./Vendor";
import { __EFMigrationsHistory as ___EFMigrationsHistory } from "./__EFMigrationsHistory";
import type { __EFMigrationsHistoryAttributes, __EFMigrationsHistoryCreationAttributes } from "./__EFMigrationsHistory";

export {
  _Discount as Discount,
  _Order as Order,
  _OrderDetail as OrderDetail,
  _OrderDetailFeedback as OrderDetailFeedback,
  _OrderDetailFeedbackMedia as OrderDetailFeedbackMedia,
  _OrderPayment as OrderPayment,
  _Product as Product,
  _ProductCategory as ProductCategory,
  _ProductDiscount as ProductDiscount,
  _ProductFeedback as ProductFeedback,
  _ProductMedia as ProductMedia,
  _User as User,
  _UserAddress as UserAddress,
  _UserPayment as UserPayment,
  _Vendor as Vendor,
  ___EFMigrationsHistory as __EFMigrationsHistory,
};

export type {
  DiscountAttributes,
  DiscountCreationAttributes,
  OrderAttributes,
  OrderCreationAttributes,
  OrderDetailAttributes,
  OrderDetailCreationAttributes,
  OrderDetailFeedbackAttributes,
  OrderDetailFeedbackCreationAttributes,
  OrderDetailFeedbackMediaAttributes,
  OrderDetailFeedbackMediaCreationAttributes,
  OrderPaymentAttributes,
  OrderPaymentCreationAttributes,
  ProductAttributes,
  ProductCreationAttributes,
  ProductCategoryAttributes,
  ProductCategoryCreationAttributes,
  ProductDiscountAttributes,
  ProductDiscountCreationAttributes,
  ProductFeedbackAttributes,
  ProductFeedbackCreationAttributes,
  ProductMediaAttributes,
  ProductMediaCreationAttributes,
  UserAttributes,
  UserCreationAttributes,
  UserAddressAttributes,
  UserAddressCreationAttributes,
  UserPaymentAttributes,
  UserPaymentCreationAttributes,
  VendorAttributes,
  VendorCreationAttributes,
  __EFMigrationsHistoryAttributes,
  __EFMigrationsHistoryCreationAttributes,
};

export function initModels(sequelize: Sequelize) {
  const Discount = _Discount.initModel(sequelize);
  const Order = _Order.initModel(sequelize);
  const OrderDetail = _OrderDetail.initModel(sequelize);
  const OrderDetailFeedback = _OrderDetailFeedback.initModel(sequelize);
  const OrderDetailFeedbackMedia = _OrderDetailFeedbackMedia.initModel(sequelize);
  const OrderPayment = _OrderPayment.initModel(sequelize);
  const Product = _Product.initModel(sequelize);
  const ProductCategory = _ProductCategory.initModel(sequelize);
  const ProductDiscount = _ProductDiscount.initModel(sequelize);
  const ProductFeedback = _ProductFeedback.initModel(sequelize);
  const ProductMedia = _ProductMedia.initModel(sequelize);
  const User = _User.initModel(sequelize);
  const UserAddress = _UserAddress.initModel(sequelize);
  const UserPayment = _UserPayment.initModel(sequelize);
  const Vendor = _Vendor.initModel(sequelize);
  const __EFMigrationsHistory = ___EFMigrationsHistory.initModel(sequelize);

  Order.belongsTo(Discount, { as: "Discount", foreignKey: "DiscountId"});
  Discount.hasMany(Order, { as: "Orders", foreignKey: "DiscountId"});
  OrderDetail.belongsTo(Order, { as: "Order", foreignKey: "OrderId"});
  Order.hasMany(OrderDetail, { as: "OrderDetails", foreignKey: "OrderId"});
  OrderPayment.belongsTo(Order, { as: "Order", foreignKey: "OrderId"});
  Order.hasMany(OrderPayment, { as: "OrderPayments", foreignKey: "OrderId"});
  OrderDetail.belongsTo(OrderDetailFeedback, { as: "OrderDetailFeedback", foreignKey: "OrderDetailFeedbackId"});
  OrderDetailFeedback.hasMany(OrderDetail, { as: "OrderDetails", foreignKey: "OrderDetailFeedbackId"});
  OrderDetailFeedbackMedia.belongsTo(OrderDetailFeedback, { as: "OrderDetailFeedback", foreignKey: "OrderDetailFeedbackId"});
  OrderDetailFeedback.hasMany(OrderDetailFeedbackMedia, { as: "OrderDetailFeedbackMedia", foreignKey: "OrderDetailFeedbackId"});
  OrderDetail.belongsTo(Product, { as: "Product", foreignKey: "ProductId"});
  Product.hasMany(OrderDetail, { as: "OrderDetails", foreignKey: "ProductId"});
  ProductDiscount.belongsTo(Product, { as: "Product", foreignKey: "ProductId"});
  Product.hasMany(ProductDiscount, { as: "ProductDiscounts", foreignKey: "ProductId"});
  ProductFeedback.belongsTo(Product, { as: "Product", foreignKey: "ProductId"});
  Product.hasMany(ProductFeedback, { as: "ProductFeedbacks", foreignKey: "ProductId"});
  ProductMedia.belongsTo(Product, { as: "Product", foreignKey: "ProductId"});
  Product.hasMany(ProductMedia, { as: "ProductMedia", foreignKey: "ProductId"});
  Product.belongsTo(ProductCategory, { as: "ProductCategory", foreignKey: "ProductCategoryId"});
  ProductCategory.hasMany(Product, { as: "Products", foreignKey: "ProductCategoryId"});
  Order.belongsTo(User, { as: "User", foreignKey: "UserId"});
  User.hasMany(Order, { as: "Orders", foreignKey: "UserId"});
  UserAddress.belongsTo(User, { as: "User", foreignKey: "UserId"});
  User.hasMany(UserAddress, { as: "UserAddresses", foreignKey: "UserId"});
  UserPayment.belongsTo(User, { as: "User", foreignKey: "UserId"});
  User.hasMany(UserPayment, { as: "UserPayments", foreignKey: "UserId"});
  Product.belongsTo(Vendor, { as: "Vendor", foreignKey: "VendorId"});
  Vendor.hasMany(Product, { as: "Products", foreignKey: "VendorId"});
  User.belongsTo(Vendor, { as: "Vendor", foreignKey: "VendorId"});
  Vendor.hasMany(User, { as: "Users", foreignKey: "VendorId"});

  return {
    Discount: Discount,
    Order: Order,
    OrderDetail: OrderDetail,
    OrderDetailFeedback: OrderDetailFeedback,
    OrderDetailFeedbackMedia: OrderDetailFeedbackMedia,
    OrderPayment: OrderPayment,
    Product: Product,
    ProductCategory: ProductCategory,
    ProductDiscount: ProductDiscount,
    ProductFeedback: ProductFeedback,
    ProductMedia: ProductMedia,
    User: User,
    UserAddress: UserAddress,
    UserPayment: UserPayment,
    Vendor: Vendor,
    __EFMigrationsHistory: __EFMigrationsHistory,
  };
}
