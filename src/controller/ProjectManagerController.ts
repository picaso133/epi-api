import { Request, Response } from "express";
import { getRepository, getConnection } from "typeorm";
import { validate } from "class-validator";

import { ProjectManager } from "../entity/ProjectManager";

import { Project } from "../entity/Project";
import { City } from "../entity/City";

export default class ProjectManagerController {

    static listAll = async (req: Request, res: Response) => {
        const rep = getRepository(ProjectManager);
        const pm = await rep.find();
        res.send(pm);
    };

    static getOneById = async (req: Request, res: Response) => {
        const rep = getRepository(ProjectManager);
        try{
            const pm = await rep.findOneOrFail(req.params.id);
            res.send(pm);
        } catch(e){
            res.send(e);
        }
    };

    static new = async (req: Request, res: Response) => {
        const rep = getRepository(ProjectManager);
        const pm = await rep.create(req.body);
        try {
            const results = await rep.save(pm);
            res.status(201).send(results);
        } catch (error) {
            res.status(409).send("PM is already exist");
        }
    };

    static edit = async (req: Request, res: Response) => {
        await getConnection()
            .createQueryBuilder()
            .update(ProjectManager)
            .set(req.body)
            .where("id = :id", { id: req.params.id })
            .execute();

        res.status(204).send();
    };

    static delete = async (req: Request, res: Response) => {
        const rep = getRepository(ProjectManager);
        const pm = await rep.delete(req.params.id);
        res.status(204).send(pm);
    };
};
