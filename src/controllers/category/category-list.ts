import { Request, Response } from "express";
import { ECommerceBLL } from "../../bll/eCommerceBLL"; // Fixed import path



exports.get = async (req: Request, res: Response) => {
    try {
        const CategoryList = await new ECommerceBLL().getAllCategories()

        if (!CategoryList) {
            return res.sendStatus(400).send('No categories found');
        }

        res.status(200).json(CategoryList);

    } catch (error) {
        console.log(error);
        return res.sendStatus(400).send(`Method: get \nClass: category-list \nError: '${error}'`);
    }
};

    // static getOne = async (req: Request, res: Response) => {
    //     const { id } = req.params;
    //     const categoryRepository = getRepository(Category);
        
    //     try {
    //         const category = await categoryRepository.findOneOrFail({ where: { id } });
    //         res.send(category);
    //     } catch (error) {
    //         res.status(404).send({ message: "Category not found" });
    //     }
    // };
