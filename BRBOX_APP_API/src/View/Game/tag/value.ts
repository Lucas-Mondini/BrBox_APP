import { Request, Response } from "express";

import View from "../..";

import ValueController from "../../../Controller/Game/tag/value";

export default class ValueView extends View {
    
    constructor(){
        super();
        this.controllerObject = new ValueController();
    }
}