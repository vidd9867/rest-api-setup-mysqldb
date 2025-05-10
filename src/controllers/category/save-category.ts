import { Request, Response } from "express";
import { ECommerceBLL } from "../../bll/eCommerceBLL"; // Fixed import path

exports.post = async (req: Request, res: Response) => {
    try {
        const { name } = req.body;

        if (!name) {
            return res.status(400).send({ message: "Category name is required" });
        }

        const categoryData = new ECommerceBLL().saveCategory(name);
        
        if (!categoryData) {
            return res.status(400).send({ message: "Failed to create category" });
        }

        res.status(201).send({ message: "Category created successfully", categoryData });
    } catch (error) {
        res.status(400).send({ message: "Category name must be unique" });
    }
};

// static update = async (req: Request, res: Response) => {
//     const { id } = req.params;
//     const { name } = req.body;

//     if (!name) {
//         return res.status(400).send({ message: "Category name is required" });
//     }

//     const categoryRepository = getRepository(Category);
//     let category: Category;

//     try {
//         category = await categoryRepository.findOneOrFail({ where: { id } });
//         category.name = name;
//         await categoryRepository.save(category);
//         res.status(200).send({ message: "Category updated successfully", category });
//     } catch (error) {
//         res.status(404).send({ message: "Category not found" });
//     }
// };