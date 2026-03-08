# Smart Salon Appointment System

A full-stack MERN application for managing salon appointments with a beautiful, user-friendly interface.

## Features

- 📅 Create, view, edit, and delete appointments
- 💇 Select from various salon services (Haircut, Coloring, Styling, etc.)
- 👨‍🦰 Choose preferred stylists
- 🕐 12-hour AM/PM time picker
- 📊 Admin dashboard with statistics
- 👤 User dashboard to track appointments
- 🎨 Beautiful Cupcake theme (DaisyUI)
- 🔔 Toast notifications for user feedback
- ✅ Date validation (no past dates allowed)

## Tech Stack

### Frontend
- React 18
- Vite
- Tailwind CSS
- DaisyUI (Cupcake theme)
- React Router DOM
- React Hot Toast
- Axios

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- CORS
- dotenv

## Installation

### Prerequisites
- Node.js (v14 or higher)
- MongoDB Atlas account or local MongoDB installation
- npm or yarn

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the backend directory:
```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
```

4. Start the backend server:
```bash
npm start
```

The backend will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The frontend will run on `http://localhost:3000`

## Usage

1. **Home Page**: Create new appointments with the booking form
2. **My Appointments**: View all your appointments with status tracking
3. **Admin Dashboard**: Manage all appointments with statistics and table view

### Creating an Appointment

1. Fill in customer details (name, phone)
2. Select a service type from the dropdown
3. Choose your preferred stylist
4. Pick a date (today or future dates only)
5. Select time using the AM/PM picker
6. Specify number of people
7. Click "Create Appointment"

## Project Structure

```
Smart Salon Appointment/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── database.js
│   │   ├── controllers/
│   │   │   └── appointmentControllers.js
│   │   ├── models/
│   │   │   └── appointmentModel.js
│   │   ├── routes/
│   │   │   └── appointmentRouters.js
│   │   └── server.js
│   ├── .env
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── AppointmentForm.jsx
│   │   │   └── AppointmentList.jsx
│   │   ├── pages/
│   │   │   ├── HomePage.jsx
│   │   │   ├── UserDashboard.jsx
│   │   │   └── AdminDashboard.jsx
│   │   ├── lib/
│   │   │   └── axios.js
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── tailwind.config.js
│   ├── vite.config.js
│   └── package.json
└── README.md
```

## API Endpoints

### Appointments

- `GET /api/appointments` - Get all appointments
- `GET /api/appointments/:id` - Get single appointment
- `POST /api/appointments` - Create new appointment
- `PUT /api/appointments/:id` - Update appointment
- `DELETE /api/appointments/:id` - Delete appointment

## Available Services

- Haircut
- Hair Coloring
- Hair Styling
- Manicure
- Pedicure
- Facial
- Massage
- Makeup
- Waxing
- Spa Treatment

## Available Stylists

- Sarah Johnson
- Michael Chen
- Emily Rodriguez
- David Kim
- Jessica Williams
- Alex Martinez
- Olivia Brown
- James Taylor

## Contributing

Feel free to fork this project and submit pull requests for any improvements.

## License

ISC

## Author

Zarnain Shaikh

## Acknowledgments

- DaisyUI for the beautiful UI components
- React Hot Toast for notifications
- MongoDB Atlas for database hosting
