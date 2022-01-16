const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  const Employee = employee.init(sequelize, DataTypes);
  Employee.associate = models => {
    Employee.hasMany(models.comment, { foreignKey: "employee_id", onDelete: "CASCADE"});
    Employee.hasMany(models.like, { foreignKey: "employee_id", onDelete: "CASCADE"});
    Employee.hasMany(models.post, { foreignKey: "employee_id", onDelete: "CASCADE"});
  }
  return Employee
}

class employee extends Sequelize.Model {
  static init (sequelize, DataTypes) {
    super.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    last_name: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    first_name: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    password: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    photo: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    adminer: {
      type: DataTypes.TINYINT,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'employee',
    timestamps: true,
    underscored: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
  return employee;
}}
