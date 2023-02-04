import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
import SendGrid, { MailDataRequired } from '@sendgrid/mail';

const fromEmail =
  process.env.NODE_ENV === 'production'
    ? process.env.EMAIL_ADDRESS!
    : '82uii.betsy-mcstandard@inbox.testmail.app';
const sendgridKey = process.env.SENDGRID_KEY!;

SendGrid.setApiKey(sendgridKey);

const handler: NextApiHandler = async (req, res) => {
  const { email, message } = req.body;
  if (typeof email !== 'string' || typeof message !== 'string') {
    console.log('not strings!');
    res.status(500).send('Internal server error');
    return;
  }

  const msg: MailDataRequired = {
    to: '82uii.betsy-mcstandard@inbox.testmail.app',
    from: 'miciahjohnhenderson@gmail.com',
    subject: `Ancient Path form submission from: ${email}`,
    text: message,
  };

  console.log(msg);

  try {
    const sendRes = await SendGrid.send(msg);
    console.log('sendRes: ', JSON.stringify(sendRes, null, 2));
    res.status(200).send('OK');
    return;
  } catch (error) {
    res.status(500).send('Internal Server Error');
    return;
  }
};

export default handler;
