let express = require('express');
require('dotenv').config();
let morgan = require('morgan');
let cors = require('cors');
let cookieParser = require('cookie-parser');

let servicesRoute = require('./routes/services');
let adminRoute = require('./routes/admin');
let PublicRoute = require('./routes/Publicservices');
let newsRoute = require('./routes/news');
let ContactusRoute = require('./routes/contactus');
let PublicsnewsRoute = require('./routes/publicnews');
const path = require("path");

let sequelize = require('./config/db'); // MariaDB connection

let app = express();
let PORT = process.env.PORT || 4000;

// Middleware
app.use(cors({
  origin: "http://localhost:5173",   // your frontend domain
  methods: ["GET", "POST", "PATCH", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
}));
app.use(express.static('public'));
app.use(express.json());
app.use(morgan('dev'));
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

// Serve static files from /uploads
//app.use('/uploads', express.static(path.join(__dirname, 'public')));

// Sync all tables
sequelize.sync({ alter: true }).then(() => console.log("Tables synced!"));

// Test routes
app.get('/', (req, res) => res.json({ msg: "hello" }));
app.get('/api/test', (req, res) => res.json({ msg: "HEllo World" }));

// Routes
app.use(servicesRoute);
app.use('/api/admins', adminRoute);
app.use(PublicRoute);
app.use(PublicsnewsRoute);
app.use(newsRoute);
app.use(ContactusRoute);

// Serve static files from /public (again)
app.use(express.static(__dirname + '/public'));

// Cookie routes
app.get('/set-cookie', (req, res) => {
  res.cookie('name', 'aungaung');
  res.cookie('important-key', 'value', { httpOnly: true });
  return res.send("cookie already set");
});

app.get('/get-cookie', (req, res) => res.send(req.cookies));

// Start server
app.listen(PORT, () => console.log("Server running on port " + PORT));
