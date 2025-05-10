# REST API Setup

This project is a REST API built using Node.js, Express.js, MongoDB, Mongoose, and TypeScript. It follows a direct controller approach without using a traditional routes controller setup.

## Project Structure

```
rest-api-setup
├── src
│   ├── controllers
│   │   ├── product
│   │   │   └── product-list.ts
│   │   └── exampleController.ts
│   ├── bll
│   │   ├── eCommerceBLL.ts
│   │   └── exampleBLL.ts
│   ├── dal
│   │   └── eCommerceDAL.ts
│   ├── entities
│   │   ├── Category.ts
│   │   ├── Product.ts
│   │   └── Users.ts
│   ├── interfaces
│   │   └── IUsers.ts
│   ├── config
│   │   └── db.ts
│   ├── utils
│   │   ├── authentication.ts
│   │   └── encrypt.ts
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
   npx typeorm-model-generator -h 127.0.0.1 -d db_name -u username -x password -e mysql -o ./src/entities --noConfig

## License

This project is licensed under the MIT License.

