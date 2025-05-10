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

7. ## Folder Responsibilities
   1. **controllers:**
      Purpose: Contains route handlers that process HTTP requests and send responses.
      Usage:
      Each file in this folder corresponds to a specific feature or module of the application (e.g., product-list.ts for product-related operations).
      Controllers interact with the Business Logic Layer (BLL) to execute application logic.
      Example: In product-list.ts, the post method processes a request to fetch a list of products and sends the response.
   
   2. **bll (Business Logic Layer):**
   ```
   Purpose: Contains the core application logic that processes data and enforces business rules.
   Usage:
   Acts as an intermediary between the controllers and the Data Access Layer (DAL).
   Handles complex operations, validations, and transformations before interacting with the database.
   Example: eCommerceBLL.ts contains methods like getProductList or saveCategory that implement business rules for e-commerce operations.
   ```
   3. **dal (Data Access Layer):**
   ```
   Purpose: Handles all interactions with the database using TypeORM.
   Usage:
   Provides methods to query, insert, update, and delete data in the database.
   Encapsulates database logic to ensure separation of concerns.
   Example: eCommerceDAL.ts contains methods like getProductsDetails and saveProduct to interact with the Product and Category tables.
   ```
   4. **entities:**
   ```
   Purpose: Contains TypeORM entity definitions that map database tables to TypeScript classes.
   Usage:
   Each file represents a database table (e.g., Product.ts, Category.ts, Users.ts).
   Defines the structure of the table, including columns, relationships, and constraints.
   Example: Category.ts defines the category table with fields like category_name, active_status, and relationships with the Product table.
   ```
   5. **interfaces:**
   ```
   Purpose: Contains TypeScript interfaces for defining the structure of data objects.
   Usage:
   Provides type definitions for data passed between layers (e.g., controllers, BLL, DAL).
   Ensures type safety and consistency across the application.
   Example: IUsers.ts defines the structure of user-related data, such as email, password, and uid.
   ```
   6. **config:**
   ```
   Purpose: Contains configuration files for the application.
   Usage:
   Stores database connection settings, environment variables, and other configuration details.
   Example: db.ts initializes the TypeORM DataSource with database credentials and settings.
   ```
   7. **utils:**
   ```
   Purpose: Contains utility functions and middleware used across the application.
   Usage:
   Provides reusable functions for tasks like authentication, encryption, and token generation.
   Example:
   authentication.ts: Middleware for verifying JWT tokens and protecting routes.
   encrypt.ts: Functions for hashing passwords and generating/verifying JWT tokens.
   ```
   8. **app.ts:**
   ```
   Purpose: The main application file where middleware, routes, and configurations are set up.
   Usage:
   Initializes the Express app.
   Configures middleware like bodyParser, cors, and authentication.
   Automatically mounts routes from the controllers folder.
   Example: Public routes like /authentication/login are defined here.
   ```
   9. **server.ts:**
   ```
   Purpose: The entry point for starting the server.
   Usage:
   Imports the Express app from app.ts.
   Starts the server on the specified port.
   Example: Logs a message like Server running on http://localhost:3000/ when the server starts.
   ```

## License

This project is licensed under the MIT License.

