import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';

function AdminDashboard() {
  const [appointments, setAppointments] = useState([]);
  const [stats, setStats] = useState({
    total: 0,
    today: 0,
    thisWeek: 0,
    thisMonth: 0
  });

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const apiUrl = import.meta.env.VITE_API_URL || '';
      const response = await fetch(`${apiUrl}/api/appointments`);
      const data = await response.json();
      setAppointments(data);
      calculateStats(data);
    } catch (error) {
      console.error('Error fetching appointments:', error);
    }
  };

  const calculateStats = (data) => {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const weekStart = new Date(today);
    weekStart.setDate(today.getDate() - today.getDay());
    const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);

    setStats({
      total: data.length,
      today: data.filter(apt => new Date(apt.date) >= today && new Date(apt.date) < new Date(today.getTime() + 86400000)).length,
      thisWeek: data.filter(apt => new Date(apt.date) >= weekStart).length,
      thisMonth: data.filter(apt => new Date(apt.date) >= monthStart).length
    });
  };

  const handleDelete = async (id) => {
    if (confirm('Are you sure you want to delete this appointment?')) {
      try {
        const apiUrl = import.meta.env.VITE_API_URL || '';
        await fetch(`${apiUrl}/api/appointments/${id}`, { method: 'DELETE' });
        toast.success('Appointment deleted successfully!');
        fetchAppointments();
      } catch (error) {
        console.error('Error deleting appointment:', error);
        toast.error('Failed to delete appointment.');
      }
    }
  };

  return (
    <div className="min-h-screen bg-base-200">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="stat bg-base-100 shadow rounded-lg">
            <div className="stat-title">Total Appointments</div>
            <div className="stat-value text-primary">{stats.total}</div>
          </div>
          <div className="stat bg-base-100 shadow rounded-lg">
            <div className="stat-title">Today</div>
            <div className="stat-value text-secondary">{stats.today}</div>
          </div>
          <div className="stat bg-base-100 shadow rounded-lg">
            <div className="stat-title">This Week</div>
            <div className="stat-value text-accent">{stats.thisWeek}</div>
          </div>
          <div className="stat bg-base-100 shadow rounded-lg">
            <div className="stat-title">This Month</div>
            <div className="stat-value text-info">{stats.thisMonth}</div>
          </div>
        </div>

        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title mb-4">All Appointments</h2>
            <div className="overflow-x-auto">
              <table className="table table-zebra w-full">
                <thead>
                  <tr>
                    <th>Customer</th>
                    <th>Phone</th>
                    <th>Service</th>
                    <th>Stylist</th>
                    <th>Date</th>
                    <th>Time</th>
                    <th>People</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {appointments.map((apt) => (
                    <tr key={apt._id}>
                      <td>{apt.customerName}</td>
                      <td>{apt.phoneNumber}</td>
                      <td>{apt.ServiceType}</td>
                      <td>{apt.stylistName}</td>
                      <td>{new Date(apt.date).toLocaleDateString()}</td>
                      <td>{apt.time}</td>
                      <td>{apt.numberOfPeople}</td>
                      <td>
                        <button 
                          onClick={() => handleDelete(apt._id)} 
                          className="btn btn-error btn-xs"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
