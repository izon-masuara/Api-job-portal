'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasOne(models.Bookmark,{foreignKey:'UserId'})
    }
  };
  const { hashPassword } = require('../helpers/encryptPassword')
  User.init({
    username: DataTypes.STRING,
    email: {
      unique : true,
      type : DataTypes.STRING,
      validate : {
        isEmail : true
      }
    },
    password: {
      type : DataTypes.STRING,
      validate : {
        len : [5],
        // allowPass(value){
        //   if(value === 'signIn'){
        //     console.log('masuk if')
        //     allowNull = true
        //   }else{
        //     console.log('masuk else')
        //     allowNull = false
        //   }
        // }
      },
      // allowNull : {
      //   if(value){
      //     console.log(value)
      //   }
      // },
    },
    role: DataTypes.STRING,
    phoneNumber: DataTypes.STRING,
    address: DataTypes.STRING,
  },
  {
    hooks : {
      beforeCreate(instance,options){
        instance.password = hashPassword(instance.password)
      }
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};