import { Resend } from 'resend';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import handlebars from 'handlebars';

const resend = new Resend(process.env.RESEND_API_KEY);

// Derive __dirname equivalent
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const sendEmail = async ({ templateName, templateData, ...rest }) => {
  try {
    const templatePath = path.join(
      __dirname,
      '../templates',
      `${templateName}.html`
    );
    const templateSource = fs.readFileSync(templatePath, 'utf8');
    const template = handlebars.compile(templateSource);
    const html = template(templateData);

    const emailOptions = { html, ...rest };

    await resend.emails.send(emailOptions);
  } catch (error) {
    throw error;
  }
};

export default sendEmail;
