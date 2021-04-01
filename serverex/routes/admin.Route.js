const { verify } = require('crypto');

module.exports = app => {

	// const jwt   	= require('jsonwebtoken');
    const verifyJWT = require('../middleware/verifyJWT');
	const posts 	= require('../controllers/Admin.Controller');

	app.get('/api/admin/index', verifyJWT, posts.homeAdmin);

	app.get('/api/admin/findOne', verifyJWT, posts.dataUser);

	app.get('/api/admin/userActive', verifyJWT, posts.dataUserActive);

	app.get('/api/admin/userBlokir', verifyJWT, posts.dataUserBlokir);

	app.get('/api/admin/userReg', verifyJWT, posts.dataUserReg);

	app.get('/api/admin/countUserReg', verifyJWT, posts.countUserReg);

	app.delete('/api/admin/tolak/:id', verifyJWT, posts.tolak);

	app.put('/api/admin/setuju', verifyJWT, posts.setuju);

	app.put('/api/admin/blokirUser', verifyJWT, posts.blokirUser);

	app.post('/api/admin/addKuesioner', verifyJWT, posts.inputKuesioner);

	// POST Kategori Kuesioner

	app.post('/api/admin/kuesioner/inputKat', verifyJWT, posts.inputKat);

	// GET ALL Kuesioner
	app.get('/api/admin/getAllKat', verifyJWT, posts.getAllKat);

	app.get('/api/admin/getAllKatUserBelumIsi/:id', verifyJWT, posts.getAllKatUserBelumIsi);

	app.get('/api/admin/getAllKatUser', verifyJWT, posts.getAllKatUser);

	app.get('/api/admin/getAllKat/:id', verifyJWT, posts.getAllKatDetail);

	app.get('/api/admin/ubah_kat/:id', verifyJWT, posts.ubahKatKue);

	app.put('/api/admin/updatekat', verifyJWT, posts.doUbahKat);

	app.put('/api/admin/updateStatusKat', verifyJWT, posts.updateStatusKat)

	app.delete('/api/admin/deletekat/:id', verifyJWT, posts.deleteKat);


	//Get Kuesioner
	app.get('/api/admin/getKuesioner/:id', verifyJWT, posts.getKuesioner);

	app.get('/api/admin/getCountPilihan', verifyJWT, posts.getCountPilihan);
	

	app.get('/api/admin/detailKuesioner/:id', verifyJWT, posts.getDetailKuesioner);

	app.delete('/api/admin/delPilihan/:id', verifyJWT, posts.delPilihan);

	app.post('/api/admin/updateKuesPilihan', verifyJWT, posts.updateKuesPilihan);

	app.put('/api/admin/updateKuesTanya', verifyJWT, posts.updateKuesTanya);

	app.delete('/api/admin/deleteKuesioner/:id', verifyJWT, posts.deleteKuesioner);

	app.get('/api/admin/getHasilKuesioner', verifyJWT, posts.getHasilKuesioner);

	app.get('/api/admin/Kuesioner/GetDetail', verifyJWT, posts.GetDetailJawaban);

	app.get('/api/admin/getKatjwbUser/:id', posts.getKatjwbUser)



	app.get('/api/profile/:id', verifyJWT, posts.getProfile);

	app.put('/api/updateProfile/', verifyJWT, posts.updateProfile)

	app.put('/api/updatePass' , verifyJWT, posts.updatePass)

    // app.get('/api/home', posts.tes);  

	app.get('/api/admin/tess', posts.tess);

	// app.get('/api/admin/tesgan', (req, res)=>{		
	// 	res.json({
	// 		tes: 'tes'
	// 	})
	// })
	// app.use('/api/post', router);

	// console.log(router);
	// console.log(posts.findAll());

}