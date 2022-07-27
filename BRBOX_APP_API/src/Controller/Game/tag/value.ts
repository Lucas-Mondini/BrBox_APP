import { Request } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";
import {Controller} from "../..";

import { AppDataSource } from "../../../data-source";
import Value from "../../../Model/Game/tag/value";

export default class ValueController extends Controller {
    constructor() {
        super(Value, []);
    }

    Delete = async (req: Request) => {
        return {status: 500, value: {
            message: "error, Method not implemented."
        } }
    }
}