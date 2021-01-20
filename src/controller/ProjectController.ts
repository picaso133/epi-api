import { Request, Response } from "express";
import { getRepository, getConnection, getCustomRepository } from "typeorm";
import { validate } from "class-validator";
import Container from "typedi";

import { Project } from "../entity/Project";
import { ProjectRepository } from "../entity/repository/Project";
import { City } from "../entity/City";
import { ProjectStatus } from "../entity/ProjectStatus";
import { ResidentManager } from "../entity/ResidentManager";
import { FileStorage } from "../entity/FileStorage";
import ProjectService  from "../services/ProjectService";

export default class ProjectController {

    static listAll = async (req: Request, res: Response) => {
        const rep = getRepository(Project);
        const projects = await rep.find();
        res.send(projects);
    };

    static getOneById = async (req: Request, res: Response) => {
        const rep = getCustomRepository(ProjectRepository);
        const project = await rep.get(req.params.id);
        res.send(project);
    };

    static new = async (req: Request, res: Response) => {
        const rep = getCustomRepository(ProjectRepository);
        try{
            const project = await rep.create(req.body);
            res.status(201).send(project);
        } catch(e){
            res.status(409).send(e);
        }
    };

    static edit = async (req: Request, res: Response) => {
        const rep = getCustomRepository(ProjectRepository);
        try{
            await rep.edit(req.params.id, req.body);
        } catch(e){
            console.log(e);
            res.status(409).send(e.message);
        }
        res.status(204).send();
    };

    static delete = async (req: Request, res: Response) => {
        const rep = getRepository(Project);
        const results = await rep.delete(req.params.id);
        res.status(204).send(results);
    };
    static attachDrawings = async (req: Request, res: Response) => {
        let projectService = Container.get(ProjectService);
        projectService.attachDrawings(req.params.id, req.body);
        res.status(200).send("File was asociated!");
    }
};