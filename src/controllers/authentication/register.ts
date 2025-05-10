import { Request, Response } from 'express';
import { ECommerceBLL } from '../../bll/eCommerceBLL'; // Fixed import path


exports.post = async (req: Request, res: Response): Promise<any> => {
    try {
        const { email, password } = req.body

        if (!email || !password){
            return res.sendStatus(400).send('Missing required fields: email, password, username');
        }

        const saveUSer = await new ECommerceBLL().saveUser(email, password)
        if (!saveUSer) {
            return res.sendStatus(400);
        }
        else if (saveUSer?.message) {
            return res.status(400).send(`${saveUSer}`);
        }

        res.status(200).json(saveUSer);

    } catch (error) {
        console.log(error);
        return res.sendStatus(400).send(`Method: post \nClass: register \nError: '${error}'`);
    }
}