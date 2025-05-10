import { Request, Response } from "express";
import { ECommerceBLL } from "../../bll/eCommerceBLL"; // Fixed import path

exports.post = async (req: Request, res: Response) => {
    try {
        const {
            $filter,
            $orderby,
            $skip,
            $top,
            $count
          } = req.query;
        
          const results = await new ECommerceBLL().getProductList({
            filter: $filter as string,
            orderBy: $orderby as string,
            skip: parseInt($skip as string) || 0,
            take: parseInt($top as string) || 10,
            count: $count === 'true'
          });

          res.status(200).send(results);

    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "Error fetching products", error });
    }
};
