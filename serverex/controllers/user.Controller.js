// const model = require('../models/').users;
// const hashPassword = require('../utils/hashPassword/hashPasswor');

const modelHasil        = require('../models').hasil;



	// Create
	exports.create = (req, res) => {
        
        res.json({
			message: 'tes'
		});

    }
    
    exports.tes = (req, res) => {
        //    console.log('tesssssssss');
        res.json({
			message: 'tes'
		});
    }

	// Retrieve all
	exports.findAll = (req, res) => {
		// console.log('findAll')
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

	exports.inputJawaban = async (req, res) => {
			
			const input = await modelHasil.create(req.body);

			if(input){
				res.json({
					messageSuccessInput: "Pilihan di Simpan !",
				})
			}

			
	}