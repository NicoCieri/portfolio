import * as yup from "yup";

export type ContactValues = {
  name: string;
  email: string;
  company: string;
  reason: string;
  message: string;
};

export type ContactErrorMessages = {
  nameRequired: string;
  nameMax: string;
  emailRequired: string;
  emailValid: string;
  emailMax: string;
  companyMax: string;
  reason: string;
  messageRequired: string;
  messageMin: string;
  messageMax: string;
};

export function createContactSchema(reasons: readonly string[], messages: ContactErrorMessages) {
  return yup.object({
    name: yup.string().trim().required(messages.nameRequired).max(100, messages.nameMax),
    email: yup.string().trim().required(messages.emailRequired).email(messages.emailValid).max(254, messages.emailMax),
    company: yup.string().trim().max(150, messages.companyMax).defined(),
    reason: yup.string().oneOf(reasons, messages.reason).required(messages.reason),
    message: yup.string().trim().required(messages.messageRequired).min(20, messages.messageMin).max(5000, messages.messageMax),
  });
}
