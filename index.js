const express = require('express');
const passport = require('passport');
const session = require('express-session');
const bodyParser = require('body-parser');
const db= require('./src/utils/database');
const doctorRoutes = require('./src/routes/doctorRoutes');
const patientRoutes = require('./src/routes/patientRoutes');
const departmentRoutes = require('./src/routes/departmentRoutes');
const feesRoutes = require('./src/routes/feesRoutes');
const receptionistRoutes = require('./src/routes/receptionistRoutes');
const labRoutes = require('./src/routes/labRoutes');
const userRoutes = require('./src/routes/userRoutes');
const prescriptionRoutes = require('./src/routes/prescriptionRoutes');
const slotsRoutes = require('./src/routes/slotsRoutes');
const reportRoutes = require('./src/routes/reportRoutes');
const appointentRoutes = require('./src/routes/appointmentRoutes');
const billRoutes = require('./src/routes/billingAndChargesRoutes');
const roombedRoutes = require('./src/routes/roombedRoutes');
const  accountantRoutes = require('./src/routes/accountantRoutes');
const  courseRoutes = require('./src/routes/couresRoutes');
const  forgotRoutes = require('./src/routes/forgotRoutes');


const cors = require('cors');
const path = require('path');
const app = express();
app.use(cors());  
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
 
// Express session
app.use(session({
  secret: 'keyboard_cat',
  resave: false,
  saveUninitialized: false
}));
 
// Passport middleware
app.use(passport.initialize());
app.use(passport.session());
 
// Use the routes
app.use('/doctor', doctorRoutes);
app.use('/roombed', roombedRoutes);
app.use('/patient', patientRoutes);
app.use('/department', departmentRoutes);
app.use('/receptionist', receptionistRoutes);
app.use('/lab', labRoutes);
app.use('/fees', feesRoutes);
app.use('/user', userRoutes);
app.use('/prescription', prescriptionRoutes);
app.use('/appointment', appointentRoutes);
app.use('/bill', billRoutes);
app.use('/slots', slotsRoutes);
app.use('/report', reportRoutes);
app.use('/accountant', accountantRoutes);
app.use('/treatment', courseRoutes);
app.use('/forgot',forgotRoutes );



app.use('/uploads', express.static(path.join(__dirname, "src/uploads")));  
 
const PORT = process.env.PORT || 3000;
 
// 404 Handler
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

app.get('/api', (req, res) => {
  res.send('Hello!');
});

 
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
