'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Jobs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        allowNull: false,
        type: Sequelize.STRING
      },
      description: {
        allowNull: false,
        type: Sequelize.TEXT
      },
      imgUrl: {
        allowNull: false,
        type: Sequelize.STRING
      },
      companyId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references : {
          model : 'Companies',
          key : 'id'
        },
        onUpdate : 'CASCADE',
        onDelete : 'CASCADE'
      },
      authorId: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      jobType: {
        allowNull: false,
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Jobs');
  }
};