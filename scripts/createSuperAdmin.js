// backend/scripts/createSuperAdmin.js
// Run this script once to create your first super admin
// Usage: node scripts/createSuperAdmin.js

require('dotenv').config();
const mongoose = require('mongoose');
const readline = require('readline');
const Admin = require('../models/admin.model');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Promisify readline question
const question = (query) => new Promise((resolve) => rl.question(query, resolve));

const createSuperAdmin = async () => {
  try {
    console.log('\n╔════════════════════════════════════════╗');
    console.log('║   Super Admin Account Creation Tool   ║');
    console.log('╚════════════════════════════════════════╝\n');

    // Connect to MongoDB
    console.log('Connecting to database...');
    await mongoose.connect(process.env.MONGODB_URI || process.env.DATABASE_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('✓ Connected to database\n');

    // Check if super admin already exists
    const existingSuperAdmin = await Admin.findOne({ role: 'superadmin' });
    if (existingSuperAdmin) {
      console.log('⚠ Warning: A super admin already exists!');
      console.log(`Email: ${existingSuperAdmin.email}`);
      console.log(`Name: ${existingSuperAdmin.name}\n`);
      
      const proceed = await question('Do you want to create another super admin? (yes/no): ');
      if (proceed.toLowerCase() !== 'yes' && proceed.toLowerCase() !== 'y') {
        console.log('\nOperation cancelled.');
        rl.close();
        process.exit(0);
      }
      console.log('');
    }

    // Get super admin details
    const name = await question('Enter full name: ');
    if (!name || name.trim().length < 2) {
      throw new Error('Name must be at least 2 characters long');
    }

    const email = await question('Enter email: ');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      throw new Error('Invalid email format');
    }

    // Check if email already exists
    const existingEmail = await Admin.findOne({ email: email.toLowerCase() });
    if (existingEmail) {
      throw new Error('Email already registered');
    }

    const phone = await question('Enter phone number: ');
    if (!phone || phone.length < 10) {
      throw new Error('Phone number must be at least 10 digits');
    }

    const password = await question('Enter password (min 6 characters): ');
    if (!password || password.length < 6) {
      throw new Error('Password must be at least 6 characters long');
    }

    const confirmPassword = await question('Confirm password: ');
    if (password !== confirmPassword) {
      throw new Error('Passwords do not match');
    }

    console.log('\nCreating super admin account...');

    // Create super admin
    const superAdmin = new Admin({
      name: name.trim(),
      email: email.toLowerCase().trim(),
      password,
      phone: phone.trim(),
      role: 'superadmin',
      isActive: true
    });

    await superAdmin.save();

    console.log('\n✓ Super admin created successfully!');
    console.log('\n╔════════════════════════════════════════╗');
    console.log('║         Account Details                ║');
    console.log('╚════════════════════════════════════════╝');
    console.log(`Name:     ${superAdmin.name}`);
    console.log(`Email:    ${superAdmin.email}`);
    console.log(`Phone:    ${superAdmin.phone}`);
    console.log(`Role:     ${superAdmin.role}`);
    console.log(`ID:       ${superAdmin._id}`);
    console.log('\n⚠ Important: Keep these credentials safe!\n');

  } catch (error) {
    console.error('\n✗ Error creating super admin:', error.message);
  } finally {
    rl.close();
    mongoose.connection.close();
    process.exit(0);
  }
};

// Handle Ctrl+C
process.on('SIGINT', () => {
  console.log('\n\nOperation cancelled by user.');
  rl.close();
  mongoose.connection.close();
  process.exit(0);
});

// Run the script
createSuperAdmin();