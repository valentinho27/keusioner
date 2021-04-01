const model = require('../models/').users;
const { hashPassword, checkHashPassword } = require('../utils/hashPassword/hashPasswor');
const jwt   = require('jsonwebtoken');
const verifyJWT = require('../middleware/verifyJWT');

const session = require('express-session');


	// Create
	exports.create = async (req, res) => {
		
        try {      
             const post = {

				email_user	: req.body.email_user,
				nama_user 	: req.body.nama_user,
				jenis_user 	: 'pengguna',
				is_active   : 0,
				pass_user   : hashPassword(req.body.pass_user),
				updatedAt   : new Date(),
            }
        
            const cek = await model.findOne({where: { email_user: post.email_user }});
                if(cek !== null){
                    return res.json({
                        'messagesalert' : 'Email ini sudah Terdaftar !'
                    })
                   
                }
        
            const users = await model.create(post);
              if (users.length !== 0) {
                res.json({
                  'status': 'OK',
                  'messages': '',
                  'data': users
                })
              } else {
                res.json({
                  'status': 'ERROR',
                  'messages': 'EMPTY',
                  'data': {}
                })
              }
        } catch (err) {
              res.json({
                'status': 'ERROR',
                'messages': err.message,
                'data': {}
              })
        }
    }

    exports.ceklogin = async (req, res) => {
        try{
            let options = {
                path:"/",
                sameSite:true,
                maxAge: 1000 * 60 * 60 * 24, // would expire after 24 hours
                httpOnly: true, // The cookie only accessible by the web server
            }

            const data = {
                email_user  : req.body.email,
                pass_user   : req.body.password
            }

            const cekEmail = await model.findOne({ where: { email_user: data.email_user }});
                
            if(cekEmail === null){

                    res.json({
                        'status': 'OK',
                        'alertMsg': 'Email Anda Belum Terdaftar!',
                    })     

            }else{   
                
                    const cekPass = checkHashPassword(data.pass_user, cekEmail.pass_user);
                        
                    if(cekPass !== true){
                        res.json({
                            'status': 'OK',
                            'alertMsg': 'Mohon Periksa Email dan Password Anda !',
                            'result' : cekPass

                        })           
                    }else{

                        if(cekEmail.is_active === 0){
                            res.json({
                                alertMsg: 'Hubungi Admin untuk aktifkan Akun Anda !',
                            })
                        }

                        const id    = cekEmail.id_user; 
                        const email = cekEmail.email_user;
                        const token = jwt.sign({id: id, email: email}, process.env.ACCSESS_TOKEN_SECRET);
            
                        if(token){

                            res.json({
                                'status': 'OK',
                                'logIn' : true,
                                'token' : token,
                                'successMsg': 'Lanjut JWt dan Session',
                                'result' : cekEmail,
                                'jwtverify': 'verifyJWT',
                            })
                            // console.log('Mulai');
                            // console.log(token);
                            // console.log('success');
                            // console.log(refreshToken);
                           
                            
                        }else{
                            res.json({
                                'status': 'OK',
                                'logIn' : false,
                                'alertMsg': 'Login Gagal Mohon Periksa Koneksi Anda !',
                            })
                        }

                    }      
                }


        }catch(err){
            res.json({
                'status': 'ERROR',
                'messages': err.message,
                'data': {}
              })
        }
        
    }
    
    exports.tes = (req, res) => {
        //    console.log('tesssssssss');
        const beareHeader = req.headers;
		// const token = beareHeader && beareHeader.split(' ')[1];
		const a = 1;
		// console.log(a);
        res.json({
            a: a,
            token: beareHeader,
			message: 'tes'
		});
    }

	// Retrieve all
	exports.findAll = (req, res) => {
		console.log('findAll')
	};

	// Find a Singgle
	exports.findOne = (req, res) => {

	}

	// Update UserId
	exports.update = (req, res) => {

	}

	// Delete
	exports.delete = (req, res) => {

	}

	// Delete All
	exports.deleteAll = (req, res) => {

	}


	// Find All Publish
	exports.findAllpublish = (req, res) => {

	}