import { Request, Response } from "express";
import { getRepository, getConnection } from "typeorm";
import { validate } from "class-validator";

import { DesignPackage } from "../entity/DesignPackage";

export default class DesignPackageController {

    static listAll = async (req: Request, res: Response) => {
        const rep = getRepository(DesignPackage);
        const dp = await rep.find();
        res.send(dp);
    };

    static getOneById = async (req: Request, res: Response) => {
        const rep = getRepository(DesignPackage);
        try{
            const dp = await rep.findOneOrFail(req.params.id);
            res.send(dp);
        } catch(e){
            res.send(e);
        }
    };

    static new = async (req: Request, res: Response) => {
        const rep = getRepository(DesignPackage);
        const dp = await rep.create(req.body);
        try {
            const results = await rep.save(dp);
            res.status(201).send(results);
        } catch (error) {
            res.status(409).send("Design package already exist");
        }
    };

    static edit = async (req: Request, res: Response) => {
        await getConnection()
            .createQueryBuilder()
            .update(DesignPackage)
            .set(req.body)
            .where("id = :id", { id: req.params.id })
            .execute();

        res.status(204).send();
    };

    static delete = async (req: Request, res: Response) => {
        const rep = getRepository(DesignPackage);
        const dp = await rep.delete(req.params.id);
        res.status(204).send(dp);
    };
};
