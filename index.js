require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const connection = require('./db');

const adminRoutes = require('./routes/systemAdmin.routes');
const applicationForInstitutionRoutes = require('./routes/applicationForInstitution.routes');
const fileRoutes = require('./routes/file.routes');
const guardianRoutes = require('./routes/guardians.routes');
const institutionRoutes = require('./routes/institution.routes');
const institutionPersonnelRoutes = require('./routes/institutionPersonnel.routes');
const patientRoutes = require('./routes/patient.routes');
const recordRoutes = require('./routes/record.routes');
const emailRoutes = require('./routes/email.routes');

connection();

app.use(express.json());    
app.use(cors());

//Routes
app.use('/api/mfss/uploads/', express.static('./uploads'));
app.use('/api/mfss/email/', emailRoutes);
app.use('/api/mfss/admin/', adminRoutes);
app.use('/api/mfss/applicationForInstitution/', applicationForInstitutionRoutes);
app.use('/api/mfss/file/', fileRoutes);
app.use('/api/mfss/guardian/', guardianRoutes);
app.use('/api/mfss/institution/', institutionRoutes);
app.use('/api/mfss/institutionPersonnel/', institutionPersonnelRoutes);
app.use('/api/mfss/patient/', patientRoutes);
app.use('/api/mfss/record/', recordRoutes);

const port = process.env.PORT || 5050;
app.listen(port, ()=> console.log(`Listening on port ${port}...`));