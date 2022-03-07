'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Job extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Job.hasOne(models.Bookmark,{foreignKey:'JobId'})
      Job.belongsTo(models.Company,{foreignKey:'companyId'})
    }
  };
  Job.init({
    title: {
      type : DataTypes.STRING,
      validate : {
        notEmpty : true
      }
    },
    description: DataTypes.TEXT,
    imgUrl: DataTypes.STRING,
    companyId: DataTypes.INTEGER,
    authorId: DataTypes.INTEGER,
    jobType: DataTypes.STRING,
    status : DataTypes.STRING
  },
  {
    // hooks : {
    //   afterCreate(instnce,option){
    //     console.log(instnce,'instance >>>>>')  --> mengguakan hooks untuk table history
    //     console.log(option,"option <<<<<")
    //   }
    // },
    sequelize,
    modelName: 'Job',
  });
  return Job;
};