import { Request } from "express"
import Mailer from "../mailer"
import 'dotenv'

const sugestionService = async (req: Request) => {
    try {
        const {text} = req.body

        Mailer.getInstance().Send(process.env.MAIL || "", `Sugestion from ${req.user.username}`, "suggestion", {name:req.user.username, text: text});
        return {status: 200, value: "Mail sent successfully"};
    }
     catch (e : any) {
        return {status: 500, value: {message: {"something went wrong" : (e.detail || e.message || e)}}};
    }

}

export default sugestionService