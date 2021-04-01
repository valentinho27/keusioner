const express 		= require('express');
const bodyParser 	= require('body-parser');
const cors 			= require('cors');


// const session = require('express-session');

const app 			= express();
const cookieParser	= require('cookie-parser');
const db = require('./models');
require('dotenv').config();
require('./config/config');
// const { verifyJWT } = require('./middleware/verifyJWT');



// app.use(cors(corsOption));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());

// Sync database
db.sequelize.sync();

//   store: new session.MemoryStore,
//   secret: 'keyboard cat',
//   resave: false,
//   saveUninitialized: true
// }))

// SESSION_NAME    = 'development';
// NODE_ENV        = SESSION_NAME;
// IN_PROD         = NODE_ENV === '';

// app.use(session({
//     name: 'session_rsttu',
//     cookie: { 
//         maxAge: 1000 * 60 * 60 * 2,
//         sameSite:true,
//         secure: IN_PROD
//      },
//     store: new session.MemoryStore,
//     saveUninitialized: true,
//     resave: 'false',
//     secret: 'secret'
// }));

// route
app.get('/', (req, res)=>{
	res.json({
		message: 'Welcome to ExMySQL'
	});
})


// User Route
require("./routes/user.route.js", cors())(app);
require("./routes/admin.route.js", cors())(app);


const PORT = process.env.PORT || 8080;

app.listen(PORT, ()=>{
    console.log(`Server is Running on http://localhost:${PORT}`);
    // console.log(process.env.ACCSESS_TOKEN_SECRET);
}); 