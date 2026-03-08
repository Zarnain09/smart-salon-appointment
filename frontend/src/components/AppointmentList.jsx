function AppointmentList({ appointments, onDelete, onEdit }) {
  return (
    <div>
      <h2 className="text-3xl font-bold mb-6">Appointments</h2>
      {appointments.length === 0 ? (
        <div className="alert alert-info">
          <span>No appointments yet. Create your first appointment above!</span>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {appointments.map((apt) => (
            <div key={apt._id} className="card bg-base-100 shadow-xl">
              <div className="card-body">
                <h3 className="card-title text-primary">{apt.customerName}</h3>
                <div className="space-y-1 text-sm">
                  <p><span className="font-semibold">Phone:</span> {apt.phoneNumber}</p>
                  <p><span className="font-semibold">Service:</span> {apt.ServiceType}</p>
                  <p><span className="font-semibold">Stylist:</span> {apt.stylistName}</p>
                  <p><span className="font-semibold">Date:</span> {new Date(apt.date).toLocaleDateString()}</p>
                  <p><span className="font-semibold">Time:</span> {apt.time}</p>
                  <p><span className="font-semibold">People:</span> {apt.numberOfPeople}</p>
                </div>
                <div className="card-actions justify-end mt-4">
                  <button onClick={() => onEdit(apt)} className="btn btn-sm btn-success">Edit</button>
                  <button onClick={() => onDelete(apt._id)} className="btn btn-sm btn-error">Delete</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default AppointmentList;
