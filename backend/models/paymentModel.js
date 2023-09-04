module.exports = (sequelize, DataTypes) => {
    const payment = sequelize.define("payment", {
        paymentID: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        paymentDate: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        status: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        amount: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        payerID: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        payeeID: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        paymentMethod: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        paymentDescription: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        receiptNumber: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    });
    return payment;
};


// const { ServiceProviders, Bill, User, Agents } = require(".");

// module.exports = (sequelize, DataTypes) => {
//   const payment = sequelize.define("payment", {
//     TransactionNo: {
//       type: DataTypes.STRING,
//       allowNull: false,
//       unique: true,
//     },
//     paymentDate: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//     amount: {
//       type: DataTypes.INTEGER,
//       allowNull: false,
//     },
//     ServiceProviderBIN: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//     payeeID: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//     paymentMethod: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//     paymentDescription: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//     bankAccount: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//     ReferenceNo: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//   });

//   payment.associate = (models) => {
//     payment.belongsTo(User, {
//       foreignKey: 'payerID',
//       as: 'Payer',
//     });
//     payment.belongsTo(ServiceProviders, {
//       foreignKey: 'serviceProviderBIN',
//       as: 'serviceProviderBIN',
//     });
//     payment.hasOne(Bill, {
//       foreignKey: 'paymentId',
//       as: 'Bill',
//     });
//   };

//   return payment;
// };