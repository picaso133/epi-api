import { EntityRepository, Repository, getCustomRepository, AbstractRepository, getRepository, getConnection } from "typeorm";
import Container from "typedi";

import { Project } from "../Project";
import {ProjectStatus} from "../ProjectStatus";
import { ResidentManager } from "../ResidentManager";

import { City } from "../City";
import ProjectService from "../../services/ProjectService";
import { FileStorage } from "../FileStorage";

@EntityRepository(Project)
export class ProjectRepository extends AbstractRepository<Project> {

    async get(id) {
        const project =  await getRepository(Project)
            .createQueryBuilder("project")
            .leftJoinAndSelect("project.city", "city")
            .leftJoinAndSelect("city.state", "state")
            .leftJoinAndSelect("project.residentManager", "residentManager")
            .leftJoinAndSelect("project.projectManager", "projectManager")
            .leftJoinAndSelect("project.designPackage", "designPackage")
            .leftJoinAndSelect("project.rqForm", "fileStorage")
            .leftJoinAndSelect("project.drawings", "drawings")
            .leftJoinAndSelect("project.projectStatus", "projectStatus")
            .where("project.id = :id", { id: id })
            .getOne();
        return project;
    }
    async create(req){
        let { cityId, residentManagerId, projectStatusId, rqFormId, drawingIds} = req;
        const cityRep = getRepository(City);
        const city = await cityRep.findOneOrFail(cityId);
        req.city = city;

        const rqRep = getRepository(FileStorage);
        const rq = await rqRep.findOneOrFail(rqFormId);
        req.rqForm = rq;

        const rmRep = getRepository(ResidentManager);
        const rm = await rmRep.findOneOrFail(residentManagerId);
        req.residentManager = rm;

        const psRep = getRepository(ProjectStatus);
        const ps = await psRep.findOneOrFail(projectStatusId);
        req.projectStatus = ps;

        const rep = getRepository(Project);
        const project = await rep.create(req);
        try {
            const result = await rep.save(project);
            return result;
        } catch (e) {
            return e;
        }
    }
    async edit(id, req){
        delete req.jobNumber;
        const rep = getCustomRepository(ProjectRepository);
        const project = await rep.get(id);
        
        if (req.cityId){
            const cityRep = getRepository(City);
            const city = await cityRep.findOneOrFail(req.cityId);
            req.city = city;
            delete req.cityId;
        }
        
        if (req.rqFormId){
            const rqRep = getRepository(FileStorage);
            const rq = await rqRep.findOneOrFail({ where: { id: req.rqFormId } });
            req.rqForm = rq;
            delete req.rqFormId;
        }
        
        if (req.projectStatusId){
            const projectStatusRep = getRepository(ProjectStatus);
            const projectStatus = await projectStatusRep.findOneOrFail(req.projectStatusId);
            req.projectStatus = projectStatus;
            delete req.projectStatusId;
        }
        
        if (req.residentManagerId){
            const rmRep = getRepository(ResidentManager);
            const rm = await rmRep.findOneOrFail(req.residentManagerId);
            req.residentManager = rm;
            delete req.residentManagerId;
        }

        let projectService = Container.get(ProjectService);
        let r = await projectService.statusUpdate(project.projectStatus.uuid, req.projectStatus.uuid);
        if (r !== false) {
            return await getRepository(Project)
            .createQueryBuilder("project")
            .update(Project)
            .set(req)
            .where("id = :id", { id: id })
            .execute();
        } else{
            throw new Error("Invalid workflow");
        }
    }
}