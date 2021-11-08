const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  const Like = like.init(sequelize, DataTypes);
  Like.associate = models => {
    Like.belongsTo(models.post, { foreignKey: "post_id"});
    Like.belongsTo(models.employee, { foreignKey: "employee_id"});
  }
  return Like
}

class like extends Sequelize.Model {
  static init (sequelize, DataTypes) {
    super.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    employee_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'employee',
        key: 'id'
      }
    },
    post_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'post',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'like',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "like_fk0",
        using: "BTREE",
        fields: [
          { name: "employee_id" },
        ]
      },
      {
        name: "like_fk1",
        using: "BTREE",
        fields: [
          { name: "post_id" },
        ]
      },
    ]
  });
  return like;
}}

