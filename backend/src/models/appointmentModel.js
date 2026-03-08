import mongoose from 'mongoose';

const appointmentSchema = new mongoose.Schema({
  customerName: {
    type: String,
    required: [true, 'Customer name is required'],
    trim: true
  },
  phoneNumber: {
    type: String,
    required: [true, 'Phone number is required'],
    trim: true
  },
  ServiceType: {
    type: String,
    required: [true, 'Service type is required'],
    trim: true
  },
  stylistName: {
    type: String,
    required: [true, 'Stylist name is required'],
    trim: true
  },
  date: {
    type: Date,
    required: [true, 'Appointment date is required']
  },
  numberOfPeople: {
    type: Number,
    required: [true, 'Number of people is required'],
    min: [1, 'Number of people must be at least 1']
  },
  time: {
    type: String,
    required: [true, 'Appointment time is required']
  }
}, {
  timestamps: true
});

export default mongoose.model('Appointment', appointmentSchema);
