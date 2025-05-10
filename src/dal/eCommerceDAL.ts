import { Repository, DataSource } from "typeorm";
import { Users } from "../entities/Users";
import { Category } from "../entities/Category";
import { Product } from "../entities/Product";
import { IUsers, IUsersToken } from "../interfaces/IUsers"; // Ensure this points to your IUsers interface
import { AppDataSource } from "../config/db"; // Ensure this points to your DataSource configuration
// Removed the Connection import as it is not needed


export class ECommerceDAL {

    private connection: DataSource;

    private usersRepository: Repository<Users>;
    private categoryRepository: Repository<Category>;
    private productRepository: Repository<Product>;

    constructor() {
        this.connection = AppDataSource; // Use the configured DataSource
        this.usersRepository = this.connection.getRepository(Users); // Initialize the repository
        this.categoryRepository = this.connection.getRepository(Category); // Initialize the repository
        this.productRepository = this.connection.getRepository(Product); // Initialize the repository
    }

    async createUser(userDetails: IUsers) {
        const user = this.usersRepository.create(userDetails); // Create a new user instance
        return await this.usersRepository.save(user); // Save the user to the database
    }

    async getUserByEmail(email: string) {
        return await this.usersRepository.findOneBy({ email }); // Find a user by email
    }

    async updateUser(userUid: string, updateData: IUsersToken) {
        await this.usersRepository.update(userUid, updateData); // Update the user
    }

    async deleteUser(userUid: string) {
        return await this.usersRepository.delete(userUid); // Delete the user by ID
    }

    async getAllUsers() {
        return await this.usersRepository.find(); // Retrieve all users
    }

    async getCategoryByUid(Category_uid: string) {
        return await this.categoryRepository.findOneBy({ uid: Category_uid }); // Find a user by uid
    }

    async getAllCategories() {
        return await this.categoryRepository.find(); // Retrieve all Categories
    }

    async saveCategory(categoryDetails: Category) {
        const category = this.categoryRepository.create(categoryDetails); // Create a new category instance
        return await this.categoryRepository.save(category); // Save the category to the database
    }

    async getProductByUid(Category_uid: string) {
        return await this.productRepository.findOneBy({ uid: Category_uid }); // Find a user by uid
    }

    async getAllProducts() {
        return await this.productRepository.find(); // Retrieve all Products
    }

    async saveProduct(productDetails: Category) {
        const product = this.productRepository.create(productDetails); // Create a new category instance
        return await this.productRepository.save(product); // Save the category to the database
    }

    async getProductsDetails(whereClause: any, orderBy: string, take: number, skip: number) {

        //const query = await this.connection.createQueryBuilder(Product, "product")
        //.select(["product.uid as productUid", "product.product_name as productName", "product.price as price", 
        //    "product.image_url as imageUrl", "product.category_code as categoryCode","category.category_name as categoryName" ])
        //.innerJoin("category", "category", "category.uid = product.category_code")
        //.where(whereClause.sql, whereClause.params)
        //.orderBy(orderBy.sql, orderBy.params)
        //.limit(take)
        //.offset(skip)
        //.getManyAndCount();


        const sql = 
            `
            SELECT * FROM (
                SELECT 
                product.uid AS productUid,
                product.product_name AS productName,
                product.price AS price,
                product.image_url AS imageUrl,
                product.category_code AS categoryCode,
                category.category_name AS categoryName
                FROM product
                INNER JOIN category ON category.uid = product.category_code
            ) AS products
            WHERE ${whereClause.sql}
            ORDER BY ${orderBy}
            LIMIT ${take}
            OFFSET ${skip}

            `
        const query = await this.connection.query(sql)

        return query;
    }

}