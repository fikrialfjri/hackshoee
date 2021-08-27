'use strict';
const {
  Model
} = require('sequelize');
const { hashPass } = require('../helpers/bcryptjs');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    fullName() {
      return `${this.first_name} ${this.last_name}`
    }

    static associate(models) {
      // define association here
      User.belongsToMany(models.Product, { through: "UserProduct" })
    }
  };
  User.init({
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: { msg: 'Email is required!' },
        isEmail: { msg: 'Must be a valid email address!' }
      }
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: { msg: 'Password is required!' }
      }
    },
    first_name: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: { msg: 'First name is required!' }
      }
    },
    last_name: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: { msg: 'Last name is required!' }
      }
    },
    age: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: { msg: 'Age is required!' }
      }
    },
    gender: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: { msg: 'Gender is required!' }
      }
    },
    address: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: { msg: 'Alamat is required!' }
      }
    },
    tag: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: { msg: 'Tag is required!' }
      }
    }
  }, {
    hooks: {
      beforeCreate(instance) {
        if (instance.email === 'admin@hacktiv8.com') {
          instance.tag = 'admin'
        } else {
          instance.tag = 'user'
        }
        instance.password = hashPass(instance.password)
      }
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};