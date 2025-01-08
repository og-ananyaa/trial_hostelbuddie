const express = require("express");
const mongoose = require('mongoose');
const cors = require("cors");
const StudentModel = require('./models/Student');
const app = express();

app.use(express.json());
app.use(cors());

mongoose.connect("mongodb://localhost:27017/student", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

// Registration Endpoint
app.post('/register', (req, res) => {
    const { email, name, password } = req.body;
    const emailDomain = '@pec.edu.in';
    if (!email.endsWith(emailDomain)) {
        return res.status(400).json({ message: 'Invalid email domain. Only emails ending with @pec.edu.in are allowed.' });
    }
    StudentModel.create(req.body)
    .then(student => res.json({ message: 'User registered successfully', student }))
    .catch(err => {
        console.error('Error creating student:', err);
        res.status(500).json({ message: "Error creating student", error: err });
    });
});

// Login Endpoint
app.post('/login', (req, res) => {
    const { email, password } = req.body;
    StudentModel.findOne({ email, password })
    .then(student => {
        if (!student) {
            return res.status(401).json({ success: false, message: 'Invalid email or password' });
        }
        res.json({ success: true, message: 'Login successful', student });
    })
    .catch(err => {
        console.error('Error logging in:', err);
        res.status(500).json({ success: false, message: "Error logging in", error: err });
    });
});


app.listen(5001, () => {
    console.log("Server is running on port 5001");
});
