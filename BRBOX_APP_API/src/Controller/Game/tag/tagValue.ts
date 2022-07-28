import {Controller} from "../..";

import TagValue from "../../../Model/Game/tag/tagValue";

export default class TagValueController extends Controller {
    constructor() {
        super(TagValue, ["user", "value", "tag"]);
    }
}