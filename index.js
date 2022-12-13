require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const connection = require('./db');

const adminRoutes = require('./routes/systemAdmin.routes');
const applicationForHospitalRoutes = require('./routes/applicationForHospital.routes');
const fileRoutes = require('./routes/file.routes');
const guardianRoutes = require('./routes/guardians.routes');
const hospitalRoutes = require('./routes/hospital.routes');
const hospitalPersonnelRoutes = require('./routes/hospitalPersonnel.routes');
const patientRoutes = require('./routes/patient.routes');

connection();

app.use(express.json());    
app.use(cors());

//Routes
app.use('/api/mfss/uploads/', express.static('./uploads'));
app.use('/api/mfss/admin/', adminRoutes);
app.use('/api/mfss/applicationForHospital/', applicationForHospitalRoutes);
app.use('/api/mfss/file/', fileRoutes);
app.use('/api/mfss/guardian/', guardianRoutes);
app.use('/api/mfss/hospital/', hospitalRoutes);
app.use('/api/mfss/hospitalPersonnel/', hospitalPersonnelRoutes);
app.use('/api/mfss/patient/', patientRoutes);

const port = process.env.PORT || 5050;
app.listen(port, ()=> console.log(`Listening on port ${port}...`));