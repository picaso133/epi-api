import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { validate } from "class-validator";

import { State } from "../entity/State";

class StateController {

    static listAll = async (req: Request, res: Response) => {
        //Get states from database
        const stateRepository = getRepository(State);
        const states = await stateRepository.find();

        //Send the states object
        res.send(states);
    };

    static getOneById = async (req: Request, res: Response) => {
        //Get the ID from the url
        const id = req.params.id;

        //Get the user from database
        const stateRepository = getRepository(State);
        try {
            const state = await stateRepository.findOneOrFail(id, {
                cache: true,
                relations: ['cities'],
            });
            res.send(state);
        } catch (error) {
            res.status(404).send("User not found");
        }
    };

    static new = async (req: Request, res: Response) => {
        //Get parameters from the body
        let { code, name} = req.body;
        let state = new State();
        state.code = code;
        state.name = name;

        //Validade if the parameters are ok
        const errors = await validate(state);
        if (errors.length > 0) {
            res.status(400).send(errors);
            return;
        }

        //Try to save. If fails, the state is already in use
        const stateRepository = getRepository(State);
        try {
            await stateRepository.save(state);
        } catch (e) {
            res.status(409).send("state already in use");
            return;
        }

        //If all ok, send 201 response
        res.status(201).send("State created");
    };

    static edit = async (req: Request, res: Response) => {
        //Get the ID from the url
        const id = req.params.id;

        //Get values from the body
        const { code, name } = req.body;

        //Try to find user on database
        const stateRepository = getRepository(State);
        let state;
        try {
            state = await stateRepository.findOneOrFail(id);
        } catch (error) {
            //If not found, send a 404 response
            res.status(404).send("User not found");
            return;
        }

        //Validate the new values on model
        state.code = code;
        state.name = name;
        const errors = await validate(state);
        if (errors.length > 0) {
            res.status(400).send(errors);
            return;
        }

        //Try to safe, if fails, that means username already in use
        try {
            await stateRepository.save(state);
        } catch (e) {
            res.status(409).send("state already in use");
            return;
        }
        //After all send a 204 (no content, but accepted) response
        res.status(204).send();
    };

    static delete = async (req: Request, res: Response) => {
        //Get the ID from the url
        const id = req.params.id;

        const stateRepository = getRepository(State);
        let state: State;
        try {
            state = await stateRepository.findOneOrFail(id);
        } catch (error) {
            res.status(404).send("State not found");
            return;
        }
        stateRepository.delete(id);

        //After all send a 204 (no content, but accepted) response
        res.status(204).send();
    };
};

export default StateController;