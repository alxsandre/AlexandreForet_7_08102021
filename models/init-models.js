var DataTypes = require("sequelize").DataTypes;
var _comment = require("./comment");
var _employee = require("./employee");
var _like = require("./like");
var _post = require("./post");

function initModels(sequelize) {
  var comment = _comment(sequelize, DataTypes);
  var employee = _employee(sequelize, DataTypes);
  var like = _like(sequelize, DataTypes);
  var post = _post(sequelize, DataTypes);

  //comment.belongsTo(employee, { as: "employee", foreignKey: "employee_id"});
  //comment.belongsTo(post, { as: "post", foreignKey: "post_id"});
  //like.belongsTo(post, { as: "post", foreignKey: "post_id"});
  //like.belongsTo(employee, { as: "employee", foreignKey: "employee_id"});
  //employee.hasMany(comment, { as: "comments", foreignKey: "employee_id"});
  //employee.hasMany(like, { as: "likes", foreignKey: "employee_id"});
  //employee.hasMany(post, { as: "posts", foreignKey: "employee_id"});

  
  //post.belongsTo(employee, { as: "employee", foreignKey: "employee_id"});
  //post.hasMany(comment, { as: "comments", foreignKey: "post_id"});
  //post.hasMany(like, { as: "likes", foreignKey: "post_id"});

  return {
    comment,
    employee,
    like,
    post,
  };
}

module.exports = { initModels }
