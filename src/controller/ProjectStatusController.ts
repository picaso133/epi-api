import { Request, Response } from "express";
import { getRepository, getConnection } from "typeorm";
import { validate } from "class-validator";

import { ProjectStatus } from "../entity/ProjectStatus";

export default class ProjectStatusController {

    static listAll = async (req: Request, res: Response) => {
        const rep = getRepository(ProjectStatus);
        const ps = await rep.find();
        res.send(ps);
    };

    static getOneById = async (req: Request, res: Response) => {
        const rep = getRepository(ProjectStatus);
        try{
            const ps = await rep.findOneOrFail(req.params.id);
            res.send(ps);
        } catch(e){
            res.send(e);
        }
    };

    static new = async (req: Request, res: Response) => {
        const rep = getRepository(ProjectStatus);
        const ps = await rep.create(req.body);
        try {
            const results = await rep.save(ps);
            res.status(201).send(results);
        } catch (error) {
            res.status(409).send("Status already exist");
        }
    };

    static edit = async (req: Request, res: Response) => {
        
        await getConnection()
            .createQueryBuilder()
            .update(ProjectStatus)
            .set(req.body)
            .where("id = :id", { id: req.params.id })
            .execute();

        res.status(204).send();
    };

    static delete = async (req: Request, res: Response) => {
        const rep = getRepository(ProjectStatus);
        const dp = await rep.delete(req.params.id);
        res.status(204).send(dp);
    };
};
