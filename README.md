# REST API Setup

This project is a REST API built using Node.js, Express.js, MongoDB, Mongoose, and TypeScript. It follows a direct controller approach without using a traditional routes controller setup.

## Project Structure

```
rest-api-setup
├── src
│   ├── controllers
│   │   └── exampleController.ts
│   ├── bll
│   │   └── exampleBLL.ts
│   ├── config
│   │   └── db.ts
│   ├── app.ts
│   └── server.ts
├── package.json
├── tsconfig.json
└── README.md
```

## Setup Instructions

1. **Clone the repository:**
   ```
   git clone <repository-url>
   cd rest-api-setup
   ```

2. **Install dependencies:**
   ```
   npm install
   ```

3. **Configure MongoDB:**
   Update the connection string in `src/config/db.ts` with your MongoDB credentials.

4. **Compile TypeScript:**
   ```
   npx tsc
   ```

5. **Run the server:**
   ```
   node dist/server.js
   ```

6. **Entity Generator:**
   ```
   npx typeorm-model-generator -h 127.0.0.1 -d meandb_main -u root -x Vidd229867* -e mysql -o ./src/entities --noConfig
   
## Usage

- The API is set up to handle requests directly through the controller methods defined in `src/controllers/exampleController.ts`.
- You can extend the functionality by adding more methods to the `ExampleBLL` class in `src/bll/exampleBLL.ts` and corresponding routes in the controller.

## License

This project is licensed under the MIT License.

