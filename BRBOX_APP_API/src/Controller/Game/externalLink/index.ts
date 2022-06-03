import { Request } from "express";
import {Controller} from "../..";
import ExternalLink from "../../../Model/Game/externalLink";

export default class ExternalLinkController extends Controller {
    constructor() {
        super(ExternalLink, ["platform"]);
    }
}