module.exports = app => {

	const verifyJWT = require('../middleware/verifyJWT');
	const posts 	= require('../controllers/Auth.Controller');
	const postUser 	= require('../controllers/user.Controller');

    app.post('/api/add-user', posts.create);

    app.post('/api/login-user', posts.ceklogin);
    
    app.get('/api/tes', posts.tes);
	
	app.post('/api/post/inputJawaban/', verifyJWT, postUser.inputJawaban);

	// app.get('/api/add-user1', (req, res)=>{
	// 	res.json({
	// 		message: 'Welcome to ExMySQL user.router Route Luar'
	// 	});
	// })

	// app.use('/api/post', router);

	// console.log(router);
	// console.log(posts.findAll());

}