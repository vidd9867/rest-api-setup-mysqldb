import { ECommerceDAL } from '../dal/eCommerceDAL';
import { encryptPassword, comparePassword, generateToken, verifyToken } from '../Utils/encrypt';
import { parseODataFilter } from '../Utils/parseODataFilter';
import { IUsers, IUsersToken } from '../interfaces/IUsers'; // Ensure this points to your IUsers interface
import { Category } from '../entities/Category';
import { IOdataFilter } from '../interfaces/IOdataFilter'; // Ensure this points to your IOdataFilter interface

export class ECommerceBLL {
    private exampleBLL: ECommerceDAL;

    constructor() {
        this.exampleBLL = new ECommerceDAL();
    }

    async saveUser(email: string, password: string): Promise<any> {
        try {
            // Check if the user already exists
            const existingUser = await this.exampleBLL.getUserByEmail(email);

            if (existingUser) {
                return { existingUser, message: 'User already exists' };
            }

            // Encrypt the password
            const encryptedPassword = await encryptPassword(password);

            // Create a new user
            const newUser = await this.exampleBLL.createUser({
                email,
                password: encryptedPassword
            });

            return newUser
        } catch (error) {
            throw new Error(`Method: saveUser \nClass: ECommerceBLL \nError: '${error}'`);
        }
    }

    async loginUser(email: string, password: string): Promise<any> {
        try {
            // Check if the user already exists
            const existingUser = await this.exampleBLL.getUserByEmail(email);

            if (!existingUser) {
                return { message: `Invalid User ${email}` }
            }

            if (!existingUser?.password || !(await comparePassword(password, existingUser.password)))
                return { message: "Invalid credentials" }

            // if(existingUser?.sessiontoken){
            //     const token = authentication(existingUser?.sessiontoken);

            // }

            return { uid: existingUser.uid, email: existingUser.email, token: generateToken({ uid: existingUser.uid, email: existingUser.email }), message: `${existingUser.email} Logged in Successfully` }
        } catch (error) {
            throw new Error(`Method: loginUser \nClass: ECommerceBLL \nError: '${error}'`);
        }
    }

    async updateUserDetails( userDetails: IUsersToken ) {
        try {
            const updateData: IUsersToken = { updated_at: new Date(), ...userDetails };

            // Update the user
            this.exampleBLL.updateUser(userDetails.uid, updateData);
        }
        catch (error) {
            throw new Error(`Method: updateUserDetails \nClass: ECommerceBLL \nError: '${error}'`);
        }
    }

    async getAllCategories() {
        try {
            return await this.exampleBLL.getAllCategories();
        } catch (error) {
            throw new Error(`Method: getAllCategories \nClass: ECommerceBLL \nError: '${error}'`);
        }
    }

    async saveCategory(categoryDetails: Category) {
        try {
            return await this.exampleBLL.saveCategory(categoryDetails);
        } catch (error) {
            throw new Error(`Method: saveCategory \nClass: ECommerceBLL \nError: '${error}'`);
        }
    }

    async getAllProducts() {
        try {
            return await this.exampleBLL.getAllProducts();
        } catch (error) {
            throw new Error(`Method: getAllProducts \nClass: ECommerceBLL \nError: '${error}'`);
        }
    }

    async saveProduct(productDetails: any) {
        try {
            return await this.exampleBLL.saveProduct(productDetails);
        } catch (error) {
            throw new Error(`Method: saveProduct \nClass: ECommerceBLL \nError: '${error}'`);
        }
    }

    async getProductByUid(product_uid: string) {    
        try {
            return await this.exampleBLL.getProductByUid(product_uid);
        } catch (error) {
            throw new Error(`Method: getProductByUid \nClass: ECommerceBLL \nError: '${error}'`);
        }
    }

    async getCategoryByUid(category_uid: string) {      
        try {
            return await this.exampleBLL.getCategoryByUid(category_uid);
        } catch (error) {
            throw new Error(`Method: getCategoryByUid \nClass: ECommerceBLL \nError: '${error}'`);
        }
    }

    async getProductList(odata:IOdataFilter){
        try {
            let whereClause = {};
            let orderBy = '';
            let skip = 0;
            let take = 0;
    
            // ✅ Handle $filter
            if (odata.filter) {
                const odataFilter = parseODataFilter(odata.filter);
                whereClause = odataFilter
            }
    
            // ✅ Handle $orderby
            if (odata.orderBy) {
                const [field, order] = odata.orderBy.split(' ');
                orderBy = `${field} ${order.toUpperCase()}`
            }
    
            // ✅ Handle $skip and $top
            if (typeof odata.skip === 'number') {
                skip = odata.skip;
            }
    
            if (typeof odata.take === 'number') {
                take = odata.take
            }
    
            // ✅ Handle $count
            // if (odata.count) {
            //     const [data, total] = await qb.getManyAndCount();
            //     return { data, count: total };
            // }    

            return await this.exampleBLL.getProductsDetails( whereClause, orderBy, take, skip )

        } catch (error) {
            throw new Error(`Method: getProductList \nClass: ECommerceBLL \nError: '${error}'`);
        }
    }

}