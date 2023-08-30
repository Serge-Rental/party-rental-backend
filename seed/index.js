const path = require('path');
const fs = require('fs').promises;
const db = require('../util/database')
const Products = require('../models/products')


// populate the table in the database
const seed = async () => {
	try {
		// drops all the table and then creates it again with no data
		await db.sync({ force: true });

		// locate and store the path to the json file
		// const userPath = path.join(__dirname, 'user.json');
		const productsPath = path.join(__dirname, 'products.json');

		// store the data as a buffer from the json file
		//const userBuffer = await fs.readFile(userPath);
		const productsBuffer = await fs.readFile(productsPath);

		// convert the buffer into a string to parse it to json
		//const { users } = JSON.parse(String(userBuffer));
		const { products } = JSON.parse(String(productsBuffer));

		// loop through each json object and insert data into the table
		
		// const userPromises = users.map(async user => {
		// 	user.password = await bcrypt.hash(user.password, 10);
		// 	User.create(user);
		// });

		// make sure all the promise are resolved
		//await Promise.all(userPromises);

		// User table must be created before the Product table
		const productPromises = products.map(product => Products.create(product));
		await Promise.all(productPromises);

		// Job, Skill, and User table must be created before these table
		// const applicationPromises = applications.map(
		// 	application => Application.create(application)
		// );
		// const jobSkillPromises = jobSkills.map(jobSkill =>
		// 	JobSkill.create(jobSkill)
		// );

		// await Promise.all(applicationPromises);
		// await Promise.all(jobSkillPromises);

		console.log(
			'Data have been successfully added to your database'
		);
	} catch (error) {
		console.error(error);
	}
};

if (module === require.main) {
	seed();
}

module.exports = seed;