🛒 UniCart – Full Stack Ecommerce Application
UniCart is a full-stack ecommerce web application built using Next.js for the frontend and Node.js (Express) for the backend.
It supports product management, bulk uploads, search, wishlist (favourites), cart, orders, notifications, and admin management.

🚀 Features
User authentication & authorization
Admin dashboard
Product management (CRUD)
Bulk product upload via CSV
Product images & main image handling
Categories & search functionality
Wishlist (Favourites)
Cart & order management
Notifications system
Merchant management
Rate limiting & request logging
Secure API with CORS & middleware

🧰 Tech Stack
Frontend

Next.js

React

Tailwind CSS

Fetch API

📁 Project Structure (Simplified)
unicart/
│
├── server/              # Backend (Express)
│   ├── routes/
│   ├── middleware/
│   ├── utills/
│   ├── app.js
│
├── frontend/ (or root)  # Frontend (Next.js)
│   ├── pages / app
│   ├── components
│   ├── lib
│
├── .env
├── package.json
└── README.md

⚙️ Prerequisites
Make sure you have installed:

Node.js (v18+ recommended)

npm

Git
▶️ How to Run the Project (Development)
⚠️ This project requires TWO servers running simultaneously

🔹 Frontend (Next.js)
Runs on port 3000
npm install
npm run dev

Frontend URL:
http://localhost:3000

🔹 Backend (Express)
Runs on port 3001
cd server
npm install
node app.js

🔑 Admin Login
URL: http://localhost:3000/login

Email: admin@unicart.com
Password: Admin@123

🌱 Environment Variables
Backend (server/.env)
PORT=3001
DATABASE_URL=your_database_url
JWT_SECRET=your_secret_key
FRONTEND_URL=http://localhost:3000

Frontend (.env.local)
NEXT_PUBLIC_API_URL=http://localhost:3001/api
NEXTAUTH_URL=http://localhost:3000

🛠️ Common Issues & Fixes
❌ Admin pages show “Failed to fetch”
✅ Make sure both frontend & backend servers are running

❌ Search shows “No products found” but product exists
✅ Check:
Search API (/api/search)
Case-insensitive query handling
Product visibility flags

❌ Wishlist/Favourites page shows “Page not found”
✅ Ensure:
Frontend route exists (/wishlist or /favourites)
Backend route /api/wishlist is accessible

❌ Notifications error: Failed to fetch unread count
✅ Verify:
/api/notifications/unread-count route exists
Frontend API URL is correct

📦 Scripts
npm run dev       # Run frontend
node server/app.js # Run backend

👨‍💻 Author
Waqas Mehmood
Full Stack Developer
