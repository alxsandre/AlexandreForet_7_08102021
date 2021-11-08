const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  const Comment = comment.init(sequelize, DataTypes);
  Comment.associate = models => {
    Comment.belongsTo(models.employee, { foreignKey: "employee_id"});
    Comment.belongsTo(models.post, { foreignKey: "post_id" });
  }
  return Comment
}

class comment extends Sequelize.Model {
  static init (sequelize, DataTypes) {
    super.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    post_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'post',
        key: 'id'
      }
    },
    employee_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'employee',
        key: 'id'
      }
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'comment',
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
      {
        name: "comment_fk0",
        using: "BTREE",
        fields: [
          { name: "post_id" },
        ]
      },
      {
        name: "comment_fk1",
        using: "BTREE",
        fields: [
          { name: "employee_id" },
        ]
      },
    ]
  });
  return comment;
}}
