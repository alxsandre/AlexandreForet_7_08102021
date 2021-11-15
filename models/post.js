const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  const Post = post.init(sequelize, DataTypes);
  Post.associate = models => {
    Post.belongsTo(models.employee, { foreignKey: "employee_id"});
    Post.hasMany(models.comment, { foreignKey: "post_id", onDelete: "CASCADE"});
    Post.hasMany(models.like, { foreignKey: "post_id", onDelete: "CASCADE"});
  }
  return Post
}

class post extends Sequelize.Model {
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
      content: {
        type: DataTypes.TEXT,
        allowNull: false
      }
    }, 
    
    {
      sequelize,
      tableName: 'post',
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
          name: "post_fk0",
          using: "BTREE",
          fields: [
            { name: "employee_id" },
          ]
        },
      ]
    })
    return post;
}}
