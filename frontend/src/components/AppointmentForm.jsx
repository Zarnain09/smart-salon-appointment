import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';

function AppointmentForm({ editingAppointment, onSuccess, onCancel }) {
  const [formData, setFormData] = useState({
    customerName: '',
    phoneNumber: '',
    ServiceType: '',
    stylistName: '',
    date: '',
    numberOfPeople: 1,
    time: ''
  });
  const [timeHour, setTimeHour] = useState('');
  const [timeMinute, setTimeMinute] = useState('');
  const [timePeriod, setTimePeriod] = useState('AM');

  useEffect(() => {
    if (editingAppointment) {
      // Parse existing time
      const [hours, minutes] = editingAppointment.time.split(':');
      const hour = parseInt(hours);
      const period = hour >= 12 ? 'PM' : 'AM';
      const displayHour = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
      
      setTimeHour(displayHour.toString());
      setTimeMinute(minutes);
      setTimePeriod(period);
      
      setFormData({
        ...editingAppointment,
        date: editingAppointment.date.split('T')[0]
      });
    }
  }, [editingAppointment]);

  useEffect(() => {
    // Convert to 24-hour format for backend
    if (timeHour && timeMinute) {
      let hour = parseInt(timeHour);
      if (timePeriod === 'PM' && hour !== 12) {
        hour += 12;
      } else if (timePeriod === 'AM' && hour === 12) {
        hour = 0;
      }
      const time24 = `${hour.toString().padStart(2, '0')}:${timeMinute}`;
      setFormData(prev => ({ ...prev, time: time24 }));
    }
  }, [timeHour, timeMinute, timePeriod]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate date is not in the past
    const selectedDate = new Date(formData.date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    if (selectedDate < today) {
      toast.error('Error: Enter a valid date. Past dates are not allowed.');
      return;
    }
    
    const apiUrl = import.meta.env.VITE_API_URL || '';
    const url = editingAppointment 
      ? `${apiUrl}/api/appointments/${editingAppointment._id}`
      : `${apiUrl}/api/appointments`;
    const method = editingAppointment ? 'PUT' : 'POST';

    try {
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      
      if (response.ok) {
        toast.success(editingAppointment ? 'Appointment updated successfully!' : 'Appointment created successfully!');
        setFormData({
          customerName: '',
          phoneNumber: '',
          ServiceType: '',
          stylistName: '',
          date: '',
          numberOfPeople: 1,
          time: ''
        });
        setTimeHour('');
        setTimeMinute('');
        setTimePeriod('AM');
        onSuccess();
      } else {
        toast.error('Failed to save appointment. Please try again.');
      }
    } catch (error) {
      console.error('Error saving appointment:', error);
      toast.error('Error saving appointment. Please check your connection.');
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Get today's date in YYYY-MM-DD format for min attribute
  const getTodayDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };

  return (
    <div className="card bg-base-100 shadow-xl mb-8">
      <div className="card-body">
        <h2 className="card-title text-2xl mb-4">
          {editingAppointment ? 'Edit Appointment' : 'New Appointment'}
        </h2>
        
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Customer Name</span>
            </label>
            <input name="customerName" placeholder="Customer Name" value={formData.customerName} onChange={handleChange} required className="input input-bordered" />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Phone Number</span>
            </label>
            <input name="phoneNumber" placeholder="Phone Number" value={formData.phoneNumber} onChange={handleChange} required className="input input-bordered" />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Service Type</span>
            </label>
            <select name="ServiceType" value={formData.ServiceType} onChange={handleChange} required className="select select-bordered">
              <option value="">Select a service</option>
              <option value="Haircut">Haircut</option>
              <option value="Hair Coloring">Hair Coloring</option>
              <option value="Hair Styling">Hair Styling</option>
              <option value="Manicure">Manicure</option>
              <option value="Pedicure">Pedicure</option>
              <option value="Facial">Facial</option>
              <option value="Massage">Massage</option>
              <option value="Makeup">Makeup</option>
              <option value="Waxing">Waxing</option>
              <option value="Spa Treatment">Spa Treatment</option>
            </select>
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Stylist Name</span>
            </label>
            <select name="stylistName" value={formData.stylistName} onChange={handleChange} required className="select select-bordered">
              <option value="">Select a stylist</option>
              <option value="Sarah Johnson">Sarah Johnson</option>
              <option value="Michael Chen">Michael Chen</option>
              <option value="Emily Rodriguez">Emily Rodriguez</option>
              <option value="David Kim">David Kim</option>
              <option value="Jessica Williams">Jessica Williams</option>
              <option value="Alex Martinez">Alex Martinez</option>
              <option value="Olivia Brown">Olivia Brown</option>
              <option value="James Taylor">James Taylor</option>
            </select>
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Date</span>
            </label>
            <input name="date" type="date" min={getTodayDate()} value={formData.date} onChange={handleChange} required className="input input-bordered" />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Time</span>
            </label>
            <div className="flex gap-2">
              <select 
                value={timeHour} 
                onChange={(e) => setTimeHour(e.target.value)} 
                required 
                className="select select-bordered flex-1"
              >
                <option value="">Hour</option>
                {[...Array(12)].map((_, i) => (
                  <option key={i + 1} value={i + 1}>{i + 1}</option>
                ))}
              </select>
              <select 
                value={timeMinute} 
                onChange={(e) => setTimeMinute(e.target.value)} 
                required 
                className="select select-bordered flex-1"
              >
                <option value="">Min</option>
                <option value="00">00</option>
                <option value="15">15</option>
                <option value="30">30</option>
                <option value="45">45</option>
              </select>
              <select 
                value={timePeriod} 
                onChange={(e) => setTimePeriod(e.target.value)} 
                className="select select-bordered"
              >
                <option value="AM">AM</option>
                <option value="PM">PM</option>
              </select>
            </div>
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Number of People</span>
            </label>
            <input name="numberOfPeople" type="number" min="1" value={formData.numberOfPeople} onChange={handleChange} required className="input input-bordered" />
          </div>
          <div className="form-control md:col-span-2 flex flex-row gap-2 items-end">
            <button type="submit" className="btn btn-primary flex-1">
              {editingAppointment ? 'Update' : 'Create'} Appointment
            </button>
            {editingAppointment && (
              <button type="button" onClick={onCancel} className="btn btn-ghost">
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

export default AppointmentForm;
