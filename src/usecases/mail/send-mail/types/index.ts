export interface SendMail<T> {
  body?: T;
  to: string[] | string;
  from: string;
  subject: string;
  text?: string;
  html?: string;
}
