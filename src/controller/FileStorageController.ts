import { Request, Response } from "express";
import { getRepository, getConnection } from "typeorm";
import { validate } from "class-validator";

import { FileStorage } from "../entity/FileStorage";

import { Project } from "../entity/Project";
import { City } from "../entity/City";

export default class FileStorageController {

    static listAll = async (req: Request, res: Response) => {
        const rep = getRepository(FileStorage);
        const foo = await rep.find();
        res.send(foo);
    };

    static getOneById = async (req: Request, res: Response) => {
        const rep = getRepository(FileStorage);
        try{
            const foo = await rep.findOneOrFail(req.params.id);
            res.send(foo);
        } catch(e){
            res.send(e);
        }
    };

    static new = async (req, res: Response) => {
        try {
            if (!req.files) {
                res.send({
                    status: false,
                    message: 'No file uploaded'
                });
            } else {
                req.files.files.forEach( async function(f){
                    f.mv('./uploads/' + f.name);
                    let fs = {
                        fileName: f.name,
                        mimetype: f.mimetype,
                        size: f.size,
                        md5: f.md5,
                        filePath: "/uploads/" + f.name
                    };
                    debugger;
                    const rep = await getRepository(FileStorage);
                    const file =  await rep.create(fs);
                    try {
                        const response = await rep.save(file);
                    } catch (error) {
                        res.status(409).send("File is already uploaded");
                    }
                });
                res.status(201).send();
            }
        } catch (err) {
            res.status(500).send(err);
        }
    };

    static edit = async (req: Request, res: Response) => {
        await getConnection()
            .createQueryBuilder()
            .update(FileStorage)
            .set(req.body)
            .where("id = :id", { id: req.params.id })
            .execute();

        res.status(204).send();
    };

    static delete = async (req: Request, res: Response) => {
        const rep = getRepository(FileStorage);
        const results = await rep.delete(req.params.id);
        res.status(204).send(results);
    };
};
