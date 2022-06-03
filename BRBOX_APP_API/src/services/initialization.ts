import { AppDataSource } from "../data-source";
import 'dotenv/config';
import bcrypt from "bcrypt";

import User from "../Model/User";
import Admin from "../Model/User/Admin";
import Value from "../Model/Game/tag/value";

async function initializeUser() {
    console.log("trying to find users");
    const users = await AppDataSource.getRepository(User).find();
    if(users.length > 0) {
        console.log(`${users.length} users found, proceding with initialization`)
    } else {
        
        console.log("no user found, creating default user administrator")
        
        const user_admin = new User();
        
        user_admin.Email     = process.env.ADMIN_EMAIL       || "administrator@adm.com"
        user_admin.username  = process.env.ADMIN_USER        || "Administrator"
        user_admin.Password  = await bcrypt.hash(process.env.ADMIN_PASSWORD    || "123", 10);
        await AppDataSource.getRepository(User).save(user_admin);
        
        console.log(`new user ${user_admin.username} created\nwith email: "${user_admin.Email}" and password "${user_admin.Password}"`)
        console.log(`setting up user ${user_admin.username} as an administrator`)
        
        const admin = await new Admin();
        admin.user    = user_admin;
        await AppDataSource.getRepository(Admin).save(admin);
        
        console.log(`user ${user_admin.username} now is an administrator`)
    }
}

async function initalizeAvaliationValues() {
    console.log("trying to find values");
    const values = await AppDataSource.getRepository(Value).find();
    if(values.length > 0) {
        console.log(`${values.length} values found, proceding with initialization`)
        return 0
    }
    
    console.log("no value found, creating default values")
    
    const goodValue = new Value();
    const neutralValue = new Value();
    const badValue = new Value();
    
    const good      = process.env.AVALIATION_GOOD || "Up vote"
    const neutral   = process.env.AVALIATION_NEUTRAL || "Neutral Vote"
    const bad       = process.env.AVALIATION_BAD || "Down Vote"
    
    goodValue.name      = good;
    neutralValue.name   = neutral;
    badValue.name       = bad;
    
    await AppDataSource.getRepository(Value).save([goodValue, neutralValue, badValue]);
    console.log(`default values: ${[goodValue, neutralValue, badValue]}`)
    
}

export default async function () {
    await initializeUser();
    await initalizeAvaliationValues();
    
    
}