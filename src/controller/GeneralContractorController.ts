import { Request, Response } from "express";
import { getRepository, getConnection } from "typeorm";
import { validate } from "class-validator";

import { GeneralContractor } from "../entity/GeneralContractor";

import { Project } from "../entity/Project";
import { City } from "../entity/City";

export default class GeneralContractorController {

    static listAll = async (req: Request, res: Response) => {
        const rep = getRepository(GeneralContractor);
        const gc = await rep.find();
        res.send(gc);
    };

    static getOneById = async (req: Request, res: Response) => {
        const rep = getRepository(GeneralContractor);
        try{
            const gc = await rep.findOneOrFail(req.params.id);
            res.send(gc);
        } catch(e){
            res.send(e);
        }
    };

    static new = async (req: Request, res: Response) => {
        const rep = getRepository(GeneralContractor);
        const gc = await rep.create(req.body);
        try {
            const results = await rep.save(gc);
            res.status(201).send(results);
        } catch (error) {
            res.status(409).send("General Contractor already exist");
        }
    };

    static edit = async (req: Request, res: Response) => {
        await getConnection()
            .createQueryBuilder()
            .update(GeneralContractor)
            .set(req.body)
            .where("id = :id", { id: req.params.id })
            .execute();

        res.status(204).send();
    };

    static delete = async (req: Request, res: Response) => {
        const rep = getRepository(GeneralContractor);
        const gc = await rep.delete(req.params.id);
        res.status(204).send(gc);
    };
};
