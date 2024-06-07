import { BasicDBEmailConfig } from "@core/types";
import NotFoundError from "@errors/NotFoundError";
import { getSystemConfigurations } from "@repositories/organizationRepository";
import sgMail from "@sendgrid/mail";

export const emailCodes = {
  INVITE_DASHBOARD_STAFF: "dashboard_user_invite",
  ONBOARD_DASHBOARD_STAFF: "dashboard_user_onboard",
  USER_FORGOT_PASSWORD: "user_forgot_password",
  USER_RESET_PASSWORD: "user_reset_password",
}

const getEmailConfigurations = async (code: string) => {
  const emailConfigs = await getSystemConfigurations("EMAIL_CONFIGURATIONS");
  return emailConfigs?.defaultConfigurations?.[code];
}

export const sendEmail = async (to: string, code: string, templateData: unknown) => {
  sgMail.setApiKey(process.env.EMAIL_KEY!);

  const emailConfigs: BasicDBEmailConfig = await getEmailConfigurations(code) || {};
  if (!emailConfigs.from || !emailConfigs.templateId) {
    throw new NotFoundError("Email Configurations not found");
  }

  const msg = {
    to,
    from: {
      email: emailConfigs.from,
      name: emailConfigs.name,
    },
    templateId: emailConfigs.templateId,
    dynamic_template_data: templateData
  };

  try {
    await sgMail.send(msg);
    console.log("Email sent successfully");
  } catch (error: unknown) {
    throw new Error("Invalid email")
  }
};
