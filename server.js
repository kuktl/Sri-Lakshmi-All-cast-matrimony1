const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

// Ensure uploads directory exists
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/matrimony', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected successfully'))
.catch(err => console.error('MongoDB connection error:', err));

// Multer Configuration for Image Upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|webp/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);
    if (extname && mimetype) {
      return cb(null, true);
    }
    cb(new Error('Only images (jpeg, jpg, png, webp) are allowed'));
  }
});

// MongoDB Schemas
const adminSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

const profileSchema = new mongoose.Schema({
  profileId: { type: String, required: true, unique: true },
  fullName: { type: String, required: true },
  gender: { type: String, required: true, enum: ['Bride', 'Groom'] },
  age: { type: Number, required: true },
  dob: { type: String, required: true },
  community: { type: String, required: true },
  location: { type: String, required: true },
  profession: { type: String, required: true },
  education: { type: String },
  phone: { type: String, required: true },
  email: { type: String },
  photos: [{ type: String }], // Array of image URLs
  about: { type: String },
  height: { type: String },
  status: { type: String, default: 'Active', enum: ['Active', 'Inactive', 'Pending'] },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

const registrationSchema = new mongoose.Schema({
  registrationId: { type: String, required: true, unique: true },
  fullName: { type: String, required: true },
  gender: { type: String, required: true, enum: ['Bride', 'Groom'] },
  age: { type: Number, required: true },
  dob: { type: String, required: true },
  community: { type: String, required: true },
  location: { type: String, required: true },
  profession: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String },
  status: { type: String, default: 'Pending Verification', enum: ['Pending Verification', 'Verified', 'Rejected'] },
  submittedAt: { type: Date, default: Date.now },
  whatsappMessage: { type: String }
});

// Create Models
const Admin = mongoose.model('Admin', adminSchema);
const Profile = mongoose.model('Profile', profileSchema);
const Registration = mongoose.model('Registration', registrationSchema);

// JWT Secret
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

// Auth Middleware
const authenticateAdmin = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) {
    return res.status(401).json({ error: 'Authentication required' });
  }
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.admin = decoded;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
};

// Initialize Default Admin
const initializeAdmin = async () => {
  const existingAdmin = await Admin.findOne({ username: 'admin' });
  if (!existingAdmin) {
    const hashedPassword = await bcrypt.hash('admin123', 10);
    const admin = new Admin({
      username: 'admin',
      password: hashedPassword
    });
    await admin.save();
    console.log('Default admin created: username=admin, password=admin123');
  }
};

initializeAdmin();

// Routes

// Auth Routes
app.post('/api/auth/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const admin = await Admin.findOne({ username });
    if (!admin) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    const token = jwt.sign({ username: admin.username }, JWT_SECRET, { expiresIn: '24h' });
    res.json({ token, username: admin.username });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

app.post('/api/auth/change-password', authenticateAdmin, async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const admin = await Admin.findOne({ username: req.admin.username });
    const isMatch = await bcrypt.compare(currentPassword, admin.password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Current password is incorrect' });
    }
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    admin.password = hashedPassword;
    await admin.save();
    res.json({ message: 'Password changed successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Profile Routes
app.get('/api/profiles', async (req, res) => {
  try {
    const { gender, location, profession, community } = req.query;
    let filter = { status: 'Active' };
    
    if (gender && gender !== 'All') filter.gender = gender;
    if (location && location !== 'All') filter.location = location;
    if (profession && profession !== 'All') filter.profession = profession;
    if (community && community !== 'All') filter.community = community;
    
    const profiles = await Profile.find(filter).sort({ createdAt: -1 });
    res.json(profiles);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

app.get('/api/profiles/:id', async (req, res) => {
  try {
    const profile = await Profile.findOne({ profileId: req.params.id });
    if (!profile) {
      return res.status(404).json({ error: 'Profile not found' });
    }
    res.json(profile);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

app.post('/api/profiles', authenticateAdmin, upload.array('photos', 5), async (req, res) => {
  try {
    const photos = req.files ? req.files.map(file => `/uploads/${file.filename}`) : [];
    const profile = new Profile({
      ...req.body,
      photos,
      profileId: 'PRF' + Date.now()
    });
    await profile.save();
    res.json(profile);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

app.put('/api/profiles/:id', authenticateAdmin, upload.array('photos', 5), async (req, res) => {
  try {
    const updates = req.body;
    if (req.files && req.files.length > 0) {
      const newPhotos = req.files.map(file => `/uploads/${file.filename}`);
      updates.photos = newPhotos;
    }
    const profile = await Profile.findOneAndUpdate(
      { profileId: req.params.id },
      { ...updates, updatedAt: Date.now() },
      { new: true }
    );
    if (!profile) {
      return res.status(404).json({ error: 'Profile not found' });
    }
    res.json(profile);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

app.delete('/api/profiles/:id', authenticateAdmin, async (req, res) => {
  try {
    const profile = await Profile.findOneAndDelete({ profileId: req.params.id });
    if (!profile) {
      return res.status(404).json({ error: 'Profile not found' });
    }
    // Delete associated photos
    profile.photos.forEach(photo => {
      const filePath = path.join(__dirname, photo);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    });
    res.json({ message: 'Profile deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Registration Routes
app.post('/api/registrations', async (req, res) => {
  try {
    const registration = new Registration({
      ...req.body,
      registrationId: 'REG' + Date.now()
    });
    await registration.save();
    res.json(registration);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

app.get('/api/registrations', authenticateAdmin, async (req, res) => {
  try {
    const registrations = await Registration.find().sort({ submittedAt: -1 });
    res.json(registrations);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

app.put('/api/registrations/:id', authenticateAdmin, async (req, res) => {
  try {
    const registration = await Registration.findOneAndUpdate(
      { registrationId: req.params.id },
      req.body,
      { new: true }
    );
    if (!registration) {
      return res.status(404).json({ error: 'Registration not found' });
    }
    res.json(registration);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

app.delete('/api/registrations/:id', authenticateAdmin, async (req, res) => {
  try {
    const registration = await Registration.findOneAndDelete({ registrationId: req.params.id });
    if (!registration) {
      return res.status(404).json({ error: 'Registration not found' });
    }
    res.json({ message: 'Registration deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Dashboard Stats
app.get('/api/dashboard/stats', authenticateAdmin, async (req, res) => {
  try {
    const totalProfiles = await Profile.countDocuments();
    const activeProfiles = await Profile.countDocuments({ status: 'Active' });
    const totalRegistrations = await Registration.countDocuments();
    const pendingRegistrations = await Registration.countDocuments({ status: 'Pending Verification' });
    const verifiedRegistrations = await Registration.countDocuments({ status: 'Verified' });
    
    res.json({
      totalProfiles,
      activeProfiles,
      totalRegistrations,
      pendingRegistrations,
      verifiedRegistrations
    });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
