import { Request, Response } from "express";
import { getRepository, getConnection } from "typeorm";
import { validate } from "class-validator";

import { ResidentManager } from "../entity/ResidentManager";

import { Project } from "../entity/Project";
import { City } from "../entity/City";

export default class ResidentManagerController {

    static listAll = async (req: Request, res: Response) => {
        const rep = getRepository(ResidentManager);
        const rm = await rep.find();
        res.send(rm);
    };

    static getOneById = async (req: Request, res: Response) => {
        const rep = getRepository(ResidentManager);
        try{
            const rm = await rep.findOneOrFail(req.params.id);
            res.send(rm);
        } catch(e){
            res.send(e);
        }
    };

    static new = async (req: Request, res: Response) => {
        const rep = getRepository(ResidentManager);
        const rm = await rep.create(req.body);
        const results = await rep.save(rm);
        res.status(201).send(results);
    };

    static edit = async (req: Request, res: Response) => {
        await getConnection()
            .createQueryBuilder()
            .update(ResidentManager)
            .set(req.body)
            .where("id = :id", { id: req.params.id })
            .execute();

        res.status(204).send();
    };

    static delete = async (req: Request, res: Response) => {
        const rep = getRepository(ResidentManager);
        const results = await rep.delete(req.params.id);
        res.status(204).send(results);
    };
};
