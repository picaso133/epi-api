import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { validate } from "class-validator";

import { City } from "../entity/City";

class CityController {

    static listAll = async (req: Request, res: Response) => {
        //Get states from database
        const cityRep = getRepository(City);
        const cities = await cityRep.find();

        //Send the states object
        res.send(cities);
    };

    static getOneById = async (req: Request, res: Response) => {
        //Get the ID from the url
        const id = req.params.id;

        //Get the city from database
        const cityRep = getRepository(City);
        try {
            const city = await cityRep.findOneOrFail(id, {
                cache: true,
                relations: ['state'],
            });
            res.send(city);
        } catch (error) {
            res.status(404).send("City not found");
        }
    };

    static new = async (req: Request, res: Response) => {
        //Get parameters from the body
        let { name, stateId} = req.body;
        let city = new City();
        city.name = name;
        city.state = stateId;

        //Validade if the parameters are ok
        const errors = await validate(city);
        if (errors.length > 0) {
            res.status(400).send(errors);
            return;
        }

        //Try to save. If fails, the state is already in use
        const cityRep = getRepository(City);
        try {
            await cityRep.save(city);
        } catch (e) {
            res.status(409).send("City already in use");
            return;
        }

        //If all ok, send 201 response
        res.status(201).send("City created");
    };

    static edit = async (req: Request, res: Response) => {
        //Get the ID from the url
        const id = req.params.id;

        //Get values from the body
        const { stateId, name } = req.body;

        //Try to find user on database
        const cityRep = getRepository(City);
        let city;
        try {
            city = await cityRep.findOneOrFail(id);
        } catch (error) {
            //If not found, send a 404 response
            res.status(404).send("User not found");
            return;
        }

        //Validate the new values on model
        city.name = name;
        city.state = stateId;
        const errors = await validate(city);
        if (errors.length > 0) {
            res.status(400).send(errors);
            return;
        }

        //Try to safe, if fails, that means username already in use
        try {
            await cityRep.save(city);
        } catch (e) {
            res.status(409).send(e);
            return;
        }
        //After all send a 204 (no content, but accepted) response
        res.status(204).send();
    };

    static delete = async (req: Request, res: Response) => {
        //Get the ID from the url
        const id = req.params.id;

        const cityRep = getRepository(City);
        let city: City;
        try {
            city = await cityRep.findOneOrFail(id);
        } catch (error) {
            res.status(404).send("State not found");
            return;
        }
        cityRep.delete(id);

        //After all send a 204 (no content, but accepted) response
        res.status(204).send();
    };
};

export default CityController;