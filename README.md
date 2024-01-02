# WWA-backend

Backend for the Wednesdays Wicked Adventure project, a MERN stack application. This backend is responsible for handling ticket bookings for the adventure park.

## Technologies Used

- **Express:** A fast, unopinionated, minimalist web framework for Node.js.
- **Node.js:** A JavaScript runtime built on Chrome's V8 JavaScript engine.
- **Mongoose:** An elegant MongoDB object modeling tool designed to work in an asynchronous environment.

## Getting Started

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/Narwal25/WWA-backend.git
   ```

2. **Navigate to the Project:**
   ```bash
   cd WWA-backend
   ```

3. **Install Dependencies:**
   ```bash
   npm install
   ```

4. **Create Config File:**
   - Create a file named `config.env` in the root directory.

5. **Configure `config.env`:**
   - Add the following details to the `config.env` file:
     ```env
     DATABASE=<your-database-url>
     PORT=<your-port-number>
     JWT_SECRET=<your-jwt-secret>
     ```

6. **Run the Server:**
   ```bash
   node index.js
   ```

7. **Access Swagger Documentation:**
   - Swagger auto documentation is available at http://localhost:5000/api-docs.

8. **Run Unit Tests:**
   ```bash
   npm test
   ```

## Contributing

Contributions are welcome! If you have ideas for enhancements or find issues, please open a pull request or report an issue.

## License

This project is licensed under the [MIT License](LICENSE).

---

Explore the thrilling world of Wicked Adventures! 🎢🌟
