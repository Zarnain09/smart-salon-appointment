import { useState, useEffect } from 'react';

function UserDashboard() {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    fetchUserAppointments();
  }, []);

  const fetchUserAppointments = async () => {
    try {
      const response = await fetch('/api/appointments');
      const data = await response.json();
      setAppointments(data);
    } catch (error) {
      console.error('Error fetching appointments:', error);
    }
  };

  return (
    <div className="min-h-screen bg-base-200">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">My Appointments</h1>
        
        <div className="stats shadow mb-8 w-full">
          <div className="stat">
            <div className="stat-title">Total Appointments</div>
            <div className="stat-value text-primary">{appointments.length}</div>
          </div>
          <div className="stat">
            <div className="stat-title">Upcoming</div>
            <div className="stat-value text-secondary">
              {appointments.filter(apt => new Date(apt.date) >= new Date()).length}
            </div>
          </div>
          <div className="stat">
            <div className="stat-title">Completed</div>
            <div className="stat-value text-accent">
              {appointments.filter(apt => new Date(apt.date) < new Date()).length}
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="table table-zebra w-full">
            <thead>
              <tr>
                <th>Date</th>
                <th>Time</th>
                <th>Service</th>
                <th>Stylist</th>
                <th>People</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {appointments.map((apt) => (
                <tr key={apt._id}>
                  <td>{new Date(apt.date).toLocaleDateString()}</td>
                  <td>{apt.time}</td>
                  <td>{apt.ServiceType}</td>
                  <td>{apt.stylistName}</td>
                  <td>{apt.numberOfPeople}</td>
                  <td>
                    <span className={`badge ${new Date(apt.date) >= new Date() ? 'badge-success' : 'badge-ghost'}`}>
                      {new Date(apt.date) >= new Date() ? 'Upcoming' : 'Completed'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default UserDashboard;
