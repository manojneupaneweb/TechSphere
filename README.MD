

# TechSphere E-commerce Project

TechSphere is a modern e-commerce platform built with **React**, **Node.js**, and **MySQL**. It features a responsive UI designed with **Tailwind CSS** and supports secure authentication, dynamic product management, and multiple payment integrations, including **eSewa** and **Khalti**.

---

## Features

* User authentication with secure login and registration
* Product catalog with categories: Smartphones, Accessories, Smartwatches
* Dynamic product management (add, update, delete)
* Responsive UI built with Tailwind CSS
* Integration with payment gateways: eSewa and Khalti
* Order creation only after successful payment confirmation
* Clean code following industry best practices

---

## Tech Stack

* **Frontend:** React, Tailwind CSS
* **Backend:** Node.js, Express.js
* **Database:** MySQL
* **Payments:** eSewa, Khalti

---

## Installation

1. Clone the repository

   ```bash
   git clone https://github.com/manojneupaneweb/TechSphere.git
   cd TechSphere
   ```

2. Setup backend

   ```bash
   cd backend
   npm install
   # Configure your MySQL database connection in config files
   npm start
   ```

3. Setup frontend

   ```bash
   cd ../frontend
   npm install
   npm start
   ```

---

## Usage

* Open the frontend at `http://localhost:3000`
* Register or login as a user
* Browse products by categories
* Add products to cart and proceed to checkout
* Complete payments through eSewa or Khalti
* Orders are created only after successful payment

---

## Folder Structure

```
TechSphere/
├── backend/          # Node.js + Express backend
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   └── server.js
├── frontend/         # React frontend with Tailwind CSS
│   ├── components/
│   ├── pages/
│   ├── assets/
│   └── App.js
└── README.md
```

---

## Contributing

Feel free to open issues or submit pull requests for improvements.

---

## License

[MIT](LICENSE)


