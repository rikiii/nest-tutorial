import { Injectable } from '@nestjs/common';
import { createTransport } from 'nodemailer';

@Injectable()
export class NodemailerService {
  constructor() {}

  async send(message: {
    from: string;
    to: string;
    subject: string;
    text: string;
  }): Promise<void> {
    const smtp = createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: 'rikinotricky@gmail.com',
        pass: 'wnemqffvekqqvokz',
      },
    });

    try {
      console.log('sending...');

      smtp.sendMail(message, (error) => {
        if (error) {
          console.log('failed to send');
          console.log('error: ', error.message);
        }

        console.log('successfully sent');
      });
    } catch (e) {
      console.log('error: ', e);
    }
  }
}
