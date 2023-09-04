module.exports = (sequelize, DataTypes) => {
    const ServiceProviders = sequelize.define("ServiceProviders", {
        serviceProviderBIN:{
            type: DataTypes.STRING,
            allowNUll:false,
            //primarykey: true,
        },
        serviceProviderName:{
            type: DataTypes.STRING,
            allowNUll:false
        },
        servicesOffered:{
            type: DataTypes.STRING,
            allowNUll:false
        },
        BankName:{
            type: DataTypes.STRING,
            allowNUll:false
        },

        BankAccountNumber:{
            type: DataTypes.STRING,
            allowNUll:false
        },
        phoneNumber:{
            type: DataTypes.STRING,
            allowNUll:false
        },

        serviceProviderAuthorizationLetter: {
            type: DataTypes.STRING,
            allowNull: false
        },
    
    })    
    return ServiceProviders;
};