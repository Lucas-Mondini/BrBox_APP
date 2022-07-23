import nodeMailer, {Transporter} from "nodemailer";

import 'dotenv/config';
import ejs from 'ejs';

interface Data {
  name?: string;
  code?: string;
}

class MailTemplateConfigurator
{
  private data: Data;
  private template: string;
  
  constructor(data: Data, template: string)
  {
    this.data = data;
    this.template = template;
  }
  
  async renderTemplate(): Promise<string>
  {
    return await ejs.renderFile(`${__dirname}/mails/${this.template}.ejs`, this.data);
  }
}

interface MailInfo {
  from?: string;
  to: string;
  subject: string;
  text?: string;
  html?: string;
}

interface ConnectionSettings {
  host: string;
  service: string;
  port: number;
  secure: boolean;
  auth: any;
}

export default class Mailer {
  private transporter: any
  private connSettings: ConnectionSettings
  private mailInfo: MailInfo
  private oAuth2: any
  
  public sent: boolean
  public errorMessage: string = ""
  private static instance: Mailer
  
  private constructor() {

  }

  public static getInstance() : Mailer {
    if(!this.instance) {
      this.instance = new Mailer();
      
      this.instance.connSettings = {
        host: process.env.MAIL_HOST || 'smtp-relay.sendinblue.com', 
        service: process.env.MAIL_HOST || 'smtp-relay.sendinblue.com', 
        secure: false,
        port: Number(process.env.MAIL_PORT) || 587,
        auth: { 
          user: process.env.MAIL, 
          pass: process.env.MAIL_PASS
        } 
      }
    }
    return this.instance;
  }
    
    public async Send(to: string, subject: string, template: string, data: Data) {
      
      this.mailInfo = {
        from: process.env.MAIL,
        to: to,
        subject: subject,
        html: await new MailTemplateConfigurator(data, template).renderTemplate()
      }
      
      this.transporter = nodeMailer.createTransport(this.connSettings)
      
      if (typeof this.transporter == 'object') {
        try {
          const ret = await this.transporter.sendMail(this.mailInfo)
          this.sent = true;
        } catch (error: any) {
          this.sent = false;
          this.errorMessage = error.message;
          return console.log(error)
        }
      } else {
        const message = "could not send email"
        console.log(message)
        this.errorMessage = message;
        this.sent = false;
      }
    }
  }