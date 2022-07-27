import { Request } from "express";
import {Controller} from "../..";

import { AppDataSource } from "../../../data-source";
import Game from "../../../Model/Game";
import GameTime from "../../../Model/Game/gameTime";
import Tag from "../../../Model/Game/tag";
import TagValue from "../../../Model/Game/tag/tagValue";
import Value from "../../../Model/Game/tag/value";
import User from "../../../Model/User";
import {weightCalculator} from "../../../Utils/Calculator"

export default class TagValueController extends Controller {
    constructor() {
        super(TagValue, ["user", "value", "tag"]);
    }
}