// const { Sequelize, Model, DataTypes } = require('sequelize');

  module.exports = (sequelize, DataTypes) => {
    return sequelize.define(
      "submission",
      {
        id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          autoIncrement: true,
          primaryKey: true
        },
        userId: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        generatedString: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        anagrams: {
          type: DataTypes.STRING,
          allowNull: false,
          get() {
              return this.getDataValue('anagrams').split(';')
          },
          set(val) {
             this.setDataValue('favColors',val.join(';'));
          },
        },
        created_at: {
          type: DataTypes.DATE,
          defaultValue: new Date(),
          allowNull: false
        },
      },

      {
        underscored: true,
      }
    );
  };

