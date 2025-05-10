import { Request, Response } from 'express';
import { ECommerceBLL } from '../../bll/eCommerceBLL'; // Fixed import path


exports.post = async (req: Request, res: Response): Promise<any> => {
    try {
        const { email, password } = req.body

        if (!email || !password){
            return res.sendStatus(400).send('Missing required fields: email, password');
        }

        const userLogin = await new ECommerceBLL().loginUser(email, password)

        res.status(200).json(userLogin);

        await new ECommerceBLL().updateUserDetails({uid: userLogin.uid, email: email, sessiontoken: userLogin.token})

    } catch (error) {
        console.log(error);
        return res.sendStatus(400).send(`Method: post \nClass: register \nError: '${error}'`);
    }
}