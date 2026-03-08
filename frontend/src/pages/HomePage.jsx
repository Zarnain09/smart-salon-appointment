import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import AppointmentForm from '../components/AppointmentForm';
import AppointmentList from '../components/AppointmentList';

function HomePage() {
  const [appointments, setAppointments] = useState([]);
  const [editingAppointment, setEditingAppointment] = useState(null);

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const response = await fetch('/api/appointments');
      const data = await response.json();
      setAppointments(data);
    } catch (error) {
      console.error('Error fetching appointments:', error);
      toast.error('Failed to fetch appointments.');
    }
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`/api/appointments/${id}`, { method: 'DELETE' });
      toast.success('Appointment deleted successfully!');
      fetchAppointments();
    } catch (error) {
      console.error('Error deleting appointment:', error);
      toast.error('Failed to delete appointment.');
    }
  };

  const handleEdit = (appointment) => {
    setEditingAppointment(appointment);
  };

  const handleFormSuccess = () => {
    fetchAppointments();
    setEditingAppointment(null);
  };

  return (
    <div className="min-h-screen bg-base-200">
      {/* Hero Section */}
      <div className="hero bg-primary text-primary-content py-20">
        <div className="hero-content text-center">
          <div className="max-w-md">
            <h1 className="text-5xl font-bold mb-4">Smart Salon</h1>
            <p className="text-lg">Book your perfect appointment with our expert stylists</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <AppointmentForm 
          editingAppointment={editingAppointment}
          onSuccess={handleFormSuccess}
          onCancel={() => setEditingAppointment(null)}
        />
        <AppointmentList 
          appointments={appointments}
          onDelete={handleDelete}
          onEdit={handleEdit}
        />
      </div>
    </div>
  );
}

export default HomePage;
