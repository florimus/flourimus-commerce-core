import { BasicDBEmailConfig } from '@core/types';
import NotFoundError from '@errors/NotFoundError';
import { getSystemConfigurations } from '@repositories/organizationRepository';
import sgMail from '@sendgrid/mail';

export const emailCodes = {
  INVITE_DASHBOARD_STAFF: "dashboard_user_invite"
}

const getEmailConfigurations = async (code: string) => {
  const emailConfigs = await getSystemConfigurations("EMAIL_CONFIGURATIONS");
  return emailConfigs?.defaultConfigurations?.[code];
}

export const sendEmail = async (to: string, code: string, templateData: Object) => {
  sgMail.setApiKey(process.env.EMAIL_KEY!);

  const emailConfigs: BasicDBEmailConfig = await getEmailConfigurations(code) || {};
  if (!emailConfigs.from || !emailConfigs.templateId) {
    throw new NotFoundError("Email Configurations not found");
  }

  const msg = {
    to,
    from: emailConfigs.from,
    templateId: emailConfigs.templateId,
    dynamic_template_data: templateData
  };

  try {
    await sgMail.send(msg);
    console.log('Email sent successfully');
  } catch (error: any) {
    if (error.response) {
      console.error(error.response.body);
    } else {
      console.error(error.message);
    }
    throw new Error("Invalid email")
  }
};
