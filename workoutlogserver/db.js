var Sequelize = require('sequelize');
var sequelize = new Sequelize('workoutlog', process.env.DB_USER, process.env.DB_PASS, {
	host: process.env.DB_HOST,
	dialect: 'postgres'
});

console.log(`${process.env.DB_USER},${process.env.DB_PASS},${process.env.DB_HOST}`)

sequelize.authenticate().then(
	function() {
		console.log('connected to workoutlog postgres db');
	},
	function(err){
		console.log(err);
	}
);
var User = sequelize.import('./models/user');
module.exports = sequelize;
