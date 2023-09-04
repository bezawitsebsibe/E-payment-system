module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define("User", {
      UserID: {
        type: DataTypes.STRING,
        allowNull: true,
       //unique: true,
      },
      FirstName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      LastName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      Gender: {
        type: DataTypes.ENUM('Male', 'Female', 'Other'),
        allowNull: false,
      },
      UserName: {
        type: DataTypes.STRING,
        allowNull: false,
        //unique: true,
      },
      Password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      Email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
        },
      },
      PhoneNumber: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      Address: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      Role:{
        type: DataTypes.ENUM('User', 'Admin'),
        defaultValue:"User",
        allowNull: true,
  
      },
      ProfilePicture:{
        type: DataTypes.STRING,
        allowNull: true,
      },
    });
  
    return User;
  };