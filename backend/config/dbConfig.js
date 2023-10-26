module.exports = {
    HOST: 'localhost',
    USER: 'root',
    PASSWORD: 'bezawit122112',
    DB: 'epayment',
    dialect: 'mysql',
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  };