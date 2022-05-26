import User from "../Model/User";
import Admin from "../Model/User/Admin";
import { AppDataSource } from "../data-source";
import 'dotenv/config';

export default async function () {

    console.log("trying to find users");
    const users = await AppDataSource.getRepository(User).find();
    if(users.length > 0) {
        console.log(`${users.length} users found, proceding with initialization`)
        return 0
    }

    console.log("no user found, creating default user administrator")
    
    const user_admin = new User();

    user_admin.Email     = process.env.ADMIN_EMAIL       || "administrator@adm.com"
    user_admin.username  = process.env.ADMIN_USER        || "Administrator"
    user_admin.Password  = process.env.ADMIN_PASSWORD    || "123"
    await AppDataSource.getRepository(User).save(user_admin);

    console.log(`new user ${user_admin.username} created\nwith email: "${user_admin.Email}" and password "${user_admin.Password}"`)
    console.log(`setting up user ${user_admin.username} as an administrator`)

    const admin = await new Admin();
    admin.user    = user_admin;
    AppDataSource.getRepository(Admin).save(admin);

    console.log(`user ${user_admin.username} now is an administrator`)


}