'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
   await queryInterface.bulkInsert('Companies',[
     {
       name : "Bukalipik",
       companyLogo : "https://img.icons8.com/small/32/000000/toolbox.png",
       location : "Jakarta",
       email : "Bukalipik@mail.mail",
       description : "Marketplace company",
       createdAt : new Date(),
       updatedAt : new Date()
     },
     {
      name : "Tikipidia",
      companyLogo : "https://img.icons8.com/small/32/000000/toolbox.png",
      location : "Jakarta",
      email : "TikiPidia@mail.mail",
      description : "Marketplace company",
      createdAt : new Date(),
      updatedAt : new Date()
      },
      {
        name : "Lizidi",
        companyLogo : "https://img.icons8.com/small/32/000000/toolbox.png",
        location : "Jakarta",
        email : "Lizidi@mail.mail",
        description : "Marketplace company",
        createdAt : new Date(),
        updatedAt : new Date()
      },
   ],{})
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     await queryInterface.bulkDelete('Companies', null, {});
  }
};
