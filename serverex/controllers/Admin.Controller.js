const model             = require('../models/').users;
const modelPertanyaan   = require('../models/').pertanyaan;
const modelPilihan      = require('../models/').pilihan_jwb;
const modelHasil        = require('../models').hasil;
const modelKat          = require('../models').kategori;


const sequelize         = require('../config/config');

const Sequelize         = require('sequelize');

const { Op } = require('sequelize');

const { hashPassword, checkHashPassword } = require('../utils/hashPassword/hashPasswor');

const jwt   = require('jsonwebtoken');
// const verifyJWT = require('../middleware/verifyJWT');


exports.homeAdmin = (req, res, next) => {

  
    
    jwt.verify(req.token, process.env.ACCSESS_TOKEN_SECRET, async (err, dataToken)=>{
        if(err){

            res.json({
                message: 'Corect Your Token / Token Not Valid',
                error: err	
            })

        }else{

            const allDataUser = await model.findAll();
            const dataUser    = await model.findOne({ where: { id_user: dataToken.id } });

            res.json({
                message: 'Welcome to ExMySQL user.router Route Luar',
                text: 'This is Protected',
                dataToken : dataToken,
                AllUser : allDataUser,
                UserOnline : dataUser
            });

        }
    })

}

exports.dataUser = (req, res, next) => {
        
    jwt.verify(req.token, process.env.ACCSESS_TOKEN_SECRET, async (err, dataToken)=>{
        if(err){
            res.json({
                messageErrorToken: 'Token Not Valid',
                error: err	
            })
            // console.log(`Corect Your Token / Token Not Valid`)

        }else{

            const allDataUser = await model.findAll();
            const dataUser    = await model.findOne({ where: { id_user: dataToken.id } });

            res.json({
                dataUser : dataUser,
                dataToken : dataToken,
                allDataUser : allDataUser,
            })
        }
    })
}

exports.dataUserActive = (req, res, next) => {
    
    jwt.verify(req.token, process.env.ACCSESS_TOKEN_SECRET, async (err, dataToken)=> {
        
        if(err){
            res.json({
                messageErrorToken: 'Token Not Valid',
                error: err	
            })
            // console.log(`Corect Your Token / Token Not Valid`)

        }
        
        
        const allDataUserActive = await model.findAll({where : {is_active : 1}});
        res.json({
            dataToken: dataToken,
            dataUserActive : allDataUserActive

        })
    })
}

exports.dataUserBlokir = async (req, res) => {

    const allDataUserBlokir = await model.findAll({where : {is_active : 2}});
    res.json({
        dataUserActive : allDataUserBlokir

    })

}

exports.countUserReg = async (req, res) => {

            const count = await model.aggregate('is_active', 'count', {where : {is_active : 0}})
    
            res.json({
                count: count,
            })


}

exports.dataUserReg = (req, res, next) => {
    
    jwt.verify(req.token, process.env.ACCSESS_TOKEN_SECRET, async (err, dataToken)=> {
        
        if(err){
            res.json({
                messageErrorToken: 'Token Not Valid',
                error: err	
            })
            // console.log(`Corect Your Token / Token Not Valid`)

        }
                
        const allDataUserReg = await model.findAll({where : {is_active : 0}});

        const count = await model.count({ where: { is_active: 0 } })


        

        // const [TotalBlokir]     = await sequelize.query('SELECT COUNT(id_user) FROM users WHERE is_active = 2')

        res.json({
            dataToken: dataToken,
            allDataUserReg : allDataUserReg,
            // reqUserCount : count

        })
    })
}

exports.tolak = (req, res) => {

    jwt.verify(req.token, process.env.ACCSESS_TOKEN_SECRET, async (err, dataToken)=> {
        
        if(err){
            res.json({
                messageErrorToken: 'Token Not Valid',
                error: err	
            })
            // console.log(`Corect Your Token / Token Not Valid`)
        }else{
            const id = req.params.id;

            const deleteUser = await model.destroy({
                                                    where: {
                                                        id_user: id
                                                    }
                                                });
                if(deleteUser){
                    res.json({
                        message : 'tolak Success',
                        data    :  id,
                        messageScs : 'User Berhasil di Tolak'
                        })
                    }
                }
        })
    
}

exports.setuju = (req, res) => {

    jwt.verify(req.token, process.env.ACCSESS_TOKEN_SECRET, async (err, dataToken)=> {
        
        if(err){
            res.json({
                messageErrorToken: 'Token Not Valid',
                error: err	
            })
            // console.log(`Corect Your Token / Token Not Valid`)
        }else{
            const id = req.body.id;

            const updateUser = await model.update({ is_active: 1 }, 
                                                {
                                                    where: {
                                                    id_user: id
                                                    }
                                                });
                if(updateUser){
                    res.json({
                            message : 'setuju Success',
                            data    : id,
                            messageScs : 'Berhasil Update'

                    })
                }
        }   
    })
}

exports.blokirUser = async (req, res) => {

            const id = req.body.id;

            const updateUser = await model.update({ is_active: 2 }, 
                                                {
                                                    where: {
                                                    id_user: id
                                                    }
                                                });
                if(updateUser){
                    res.json({
                            messageScs : 'Blokir Akun Success',

                    })
                }
}   


exports.inputKuesioner = async (req, res) => {

        const dataTanya  = {
                                id_kat : req.body.id_kat,
                                id_user:  req.body.id_user,
                                isi_tanya: req.body.pertanyaan,
                            }

        const cekTanya =  await modelPertanyaan.findOne({where:  {
                    [Op.and]: [
                                { 
                                    id_kat: dataTanya.id_kat 
                                },
                                { 
                                    isi_tanya : dataTanya.isi_tanya 
                                },
                                
                    ]
                }
        })

        if(cekTanya){
            res.json({
                alertMsg: 'Pertanyaan Ini Sudah Terdaftar !'
            })
            // console.log('ada')
        }else{
            await modelPertanyaan.create(dataTanya)
            .then(async function(data) {

                const dataPilihan = { isi_pilihan: req.body.pilihan }
                // const id_tanya : {data.id_tanya};
                        id_tanya = data.id_tanya;
                    
                        for (var i = 0; i < dataPilihan.isi_pilihan.length; i++) {
                            id_tanya    = id_tanya;
                            isi_pilihan = dataPilihan.isi_pilihan[i];
                        
                        const dataPilihJwb = {
                                    id_tanya: id_tanya,
                                    isi_pilihan: isi_pilihan.pilihan.toString(),
                        }
                        
                        await modelPilihan.create(dataPilihJwb);
                    }

                res.json({
                    status: 200,
                    successMsg: 'Data Kuesioner Berhasil di Tambahkan !',
                    
                })

            })
        }
    
        

}

exports.inputKat = async (req, res) => {

        const data  = req.body;
        const check = await modelKat.findOne({where : { nama_kat : data.nama_kat }})

        // console.log(check)

        if(check){
            res.json({
                messageError : "Kategori ini Sudah Terdaftar"
            })
        // console.log('ada')

        }else{
        // console.log('Kosong')
            const input = await modelKat.create(data);
            if(input){

                res.json({
                    messageScs: "Kategori Kuesioner Berhasil ditambahkan !"
                });

            }
        }
}

exports.getAllKatUserBelumIsi = async (req, res) => {
    const id = req.params.id;

    try{

        const [results1] = await sequelize.query (`
                                                    SELECT DISTINCT(kategori.nama_kat), kategori.id_kat 
                                                    FROM kategori, pertanyaan, pilihan_jwb, hasil, users 
                                                    WHERE hasil.id_pilihan = pilihan_jwb.id_pilihan 
                                                    AND pilihan_jwb.id_tanya = pertanyaan.id_tanya 
                                                    AND pertanyaan.id_kat = kategori.id_kat 
                                                    AND users.id_user = hasil.id_user 
                                                    AND users.id_user = ${id} AND kategori.status = 1
                                                `)

        const [results] = await sequelize.query(`
                                                    SELECT kategori.id_kat, kategori.nama_kat 
                                                    FROM kategori WHERE kategori.status = 1
                                                   
                                            `)


        res.json({
            dataTerisi : results1,
            dataKatBaru: results
        })

    }catch(err){
        console.log(err)
    }

            // SELECT kategori.id_kat, kategori.nama_kat 
            // FROM kategori 
            // WHERE kategori.nama_kat <> ( 
            //     SELECT DISTINCT kategori.nama_kat 
            //     FROM kategori, pertanyaan, pilihan_jwb, hasil, users 
            //     WHERE hasil.id_pilihan = pilihan_jwb.id_pilihan 
            //     AND pilihan_jwb.id_tanya = pertanyaan.id_tanya 
            //     AND pertanyaan.id_kat = kategori.id_kat 
            //     AND users.id_user = hasil.id_user 
            //     AND kategori.status = 1 
            //     AND users.id_user = 43 )    
                            

}

exports.getAllKatUser = async (req, res) => {
    // const id = req.params.id;
    const data = await modelKat.findAll({where:{ status: 1 }});
    res.json({
        dataKat : data
    })
} 

exports.getAllKat = async (req, res) => {
    const id = req.params.id;
    const data = await modelKat.findAll();
    res.json({
        dataKat : data
    })
} 

exports.getAllKatDetail = async (req, res) => {
        const id = req.params.id;
        const data = await modelKat.findAll({ where: { id_kat: id }
                           
                    });
        res.json({
            dataKat : data
        })
} 

exports.ubahKatKue = async (req, res) => {
        
       const id_kat = req.params.id;

       const getData = await modelKat.findOne( { where: { id_kat: id_kat } } )
        
        res.json({
            result : getData,
        })
}

exports.doUbahKat = async (req, res) => {

         const {id_kat, nama_kat } = req.body;

        //  console.log(id_kat+"/"+nama_kat)
    
        const update = await modelKat.update({ nama_kat : nama_kat }, {
            where: {
                    id_kat : id_kat
                    }
        })

        if(update){
            res.json({
                messageScs : 'Kategori Kuesioner Berhasil diubah !',
            })
        }
}

exports.updateStatusKat = async (req, res) => {

    const { id_kat, status } = req.body;

        let statusUpdate = '';

        if(status === 1){
            statusUpdate = 0;
        }else{
            statusUpdate = 1;
        }

   const update = await modelKat.update({ status : statusUpdate }, {
       where: {
                    id_kat : id_kat
               }
   })

   if(update){
       res.json({
           messageScs : 'Satus Kategori Berhasil diubah !',
       })
   }
}

exports.deleteKat = async (req, res) => {
        const id     = req.params.id;
        const Del =  await modelKat.destroy({
                                                where: {
                                                    id_kat : id
                                                }
                                            }) 
        if(Del){
            res.json({
                successMsg: "Kategori Berhasil dihapus !",
            })
        }
}


exports.getKuesioner = async (req, res) => {

        const id    = req.params.id;
            
        const dataTanya = await modelPertanyaan.findAll( 
                        {
                            where : {id_kat : id}
                        },
                        {
                            order: [
                                      ['id_tanya', 'ASC']
                                   ]
                        });

        if(dataTanya){
            res.json({
                tes : "ada data",
                allDataUserReg: dataTanya,
            })
        }
}

exports.getCountPilihan = async (req, res) => {
        const obj = req.query;
        let arr = Object.keys(obj).map((k) => obj[k])

        // console.log(`====================================`)
        // console.log(arr)

        const tampung = [];

        for(let i = 0;  i < arr.length; i++ ){

            const amount = await modelHasil.count({
                where: {
                id_pilihan: arr[i]
                }
            });
            tampung.push(amount)

            // console.log(`id ${arr[i]}`)
            // console.log(`total ${amount}`)


        }

        // console.log(`Tampung ${tampung}`)



        res.json({
            Total: tampung,
        })

}

exports.getDetailKuesioner = async (req, res) => {

        const id = req.params.id;

        const dataTanya = await modelPertanyaan.findOne({ where : { id_tanya: id } });
        const dataPilihan = await modelPilihan.findAll({ where: { id_tanya: id } });        

        if(dataPilihan){
            res.json({
                id: id,
                message : 'Success',
                dataTanya: dataTanya,
                dataPilihan : dataPilihan,
            });
        }
}

exports.delPilihan = async (req, res) => {
        
        const id = req.params.id;
        const deletepilihan = await modelPilihan.destroy({
                                    where: {
                                        id_pilihan: id
                                    }
                                });
        if(deletepilihan){
            res.json({
                messageScsDelPilihan : 'Pilihan Berhasil dihapus !',
            })
        }

}

exports.updateKuesTanya = async (req, res) => {
    const id = req.body.id;
    const tanya = req.body.pertanyaan;

    try{
        const updateTanya =  await modelPertanyaan.update(
            {
                isi_tanya : tanya
            }, 
            { where: {id_tanya: id} }
        )   
         
            if(updateTanya){
                res.json({
                    messageUpdate: "Pertanyaan Berhasil diubah !",
                })            
            }
            
    }catch(err){
        console.log(err)

    }
        
}

exports.updateKuesPilihan = async (req, res) => {
        const id = req.body.id;
        const pilihan = req.body.pilihan;
 
       for (var i = 0; i < pilihan.length; i++) {

            isi_pilihan = pilihan[i];

            const dataPilihJwb = {
                        id_tanya: id,
                        isi_pilihan: isi_pilihan.pilihan.toString(),
            }
            await modelPilihan.create(dataPilihJwb);
        }  

        res.json({
            messageUpdate : 'Pilihan Berhasil Tambahkan !'
        })
        
}

exports.deleteKuesioner = async (req, res) => {
        const id = req.params.id;

        try{

            const pilihan = await modelPilihan.destroy({
                                                        where:{
                                                            id_tanya: id
                                                        }
                                                })            

            if(pilihan){
                    
                    modelPertanyaan.destroy({
                                                        where: {
                                                            id_tanya: id
                                                        }
                                                    })
                    res.json({
                        successMsg : 'Kuesioner Berhasil dihapus!'
                    })
                    // console.log('berhasil')
                    
            }

        }catch(err){
            console.log(err)
        }
}

exports.getHasilKuesioner = async (req, res) => {

        // MyModel.aggregate('teh_field', 'DISTINCT', { plain: false })

        
        const TotalResponden = await model.aggregate('id_user', 'DISTINCT', { plain: false });
        const Jumlah = await modelHasil.aggregate('id_user', 'DISTINCT', { plain: false },
                                                    {
                                                        include: [{
                                                            model: model,
                                                        }],
                                                    },
                                                );


        // const Hasil = await modelHasil.findAll({
        //                                             include: [{
        //                                                 model: model,
        //                                             }],

        //                                             options : [{

        //                                                 col: 'id_user'
        //                                             }],

        //                                             distinct: 'id_user',
                                                   
                                                   
        //                                         },
        //                                        );

        const [result] = await sequelize.query(`SELECT DISTINCT users.nama_user, users.id_user, users.createdAt FROM hasil, users WHERE users.id_user = hasil.id_user`)                                          

        // console.log(result)                                     

        res.json({
            respon : 'success',
            hasil: result,
            totalRes: TotalResponden.length,
            jumlahIsi: Jumlah.length,
        })
}

exports.getKatjwbUser = async (req, res) => {
            const id = req.params.id;

            const [results]= await sequelize.query(`SELECT  DISTINCT(kategori.nama_kat), users.nama_user, kategori.id_kat FROM kategori, pertanyaan, hasil, users 
                                                    WHERE 
                                                    hasil.id_user = users.id_user AND
                                                    hasil.id_tanya = pertanyaan.id_tanya AND
                                                    pertanyaan.id_kat = kategori.id_kat AND
                                                    hasil.id_user = ${id}
                                                    
                                                    `);

            res.json({
                dataKat: results
            })

}

exports.GetDetailJawaban = async (req, res) => {

        const id        = req.query.id;
        const id_kat    = req.query.id_kat;

        const [result] = await sequelize.query(
                                                    `SELECT DISTINCT(pertanyaan.isi_tanya), pilihan_jwb.isi_pilihan 
                                                    FROM kategori, pertanyaan, pilihan_jwb, hasil, users 
                                                    WHERE hasil.id_pilihan = pilihan_jwb.id_pilihan 
                                                    AND pilihan_jwb.id_tanya = pertanyaan.id_tanya 
                                                    AND pertanyaan.id_kat = kategori.id_kat 
                                                    AND hasil.id_user = ${id} AND kategori.id_kat = ${id_kat}`
                                                )
             
                   
        res.json({
            tanya: result,
        })
}


exports.getProfile = async (req, res) => {
        
        const id    = req.params.id;
        const profilData = await model.findOne({ where:{ id_user: id } });

        res.json({
            id: id,
            profilData: profilData,
        })

}

exports.updateProfile = async (req, res) => {

    const check1 = await model.findAll({
        where: {
          email_user: req.body.email
        }
      })

    const check2 = await model.findOne({
        where: {
          email_user: req.body.email,
          [Op.and]: [
                    { id_user: req.body.id },
            ]
        }
      })

      if(check1){
        
        if(check2){

            const update = await model.update(
                {
                    email_user: req.body.email,
                    nama_user: req.body.nama,
                },
                {
                    where: {
                        id_user: req.body.id
                    }
                })
                
            if(update){
                res.json({
                    messageAlert: '',
                    messageScs: 'Data Anda Berhasil di Perbaharui !',
                    data: req.body
                })
            }
        }else{
            res.json({
                messageAlert: 'Email Sudah terdaftar !'
            })
        }

      }
    
    }


exports.updatePass = async (req, res) => {

    const id =  req.body.id;
    const cekUser = await model.findOne({ where: { id_user: id }});

    if(cekUser){
        
        const cekPass = checkHashPassword(req.body.passLama, cekUser.pass_user);
       
        if(cekPass) {
            const pass_baru = hashPassword(req.body.passBaru)
            const updatePass = await model.update({ pass_user: pass_baru }, { where: {id_user: id} })
                if(updatePass){
                    res.json({
                        successMsg : 'Password Berhasil diubah !',
                    })
                    // console.log('Berhasil Diubah')
                }

        }else{
            res.json({
                alertmsgold : 'Password Lama Tidak Sesuai !',
            })
        }
        
    }else{
        // console.log('kosong')
    }


  
}



exports.tess = async (req, res) => {

        const user = await model.findAll();
        const tanya = await modelPertanyaan.findAll();
        const pilih = await modelPilihan.findAll();
        const result = await modelHasil.findAll();

        res.json({
            tess: 'tesssss',
            // tanya: tanya,
            // pilihan: pilih,
            // user: user,
            hasi: result,

        })
}