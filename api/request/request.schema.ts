import * as yup from "yup";

export const requestSchema = yup
  .object({
    timeslots: yup.object().required(),
    clientId: yup.string(),
    pay: yup.string(),
    workerId: yup.string().required(),
    workerContact: yup.string(),
    accepted: yup.boolean().required(),
    services: yup.array().required(),
  })
  .required();
export const assignSchema = yup.object({
  worker: yup.string().required(),
  client: yup.string().required(),
  profession: yup.array().required(),
  timeslots: yup.object().required(),
});
export type assignType = yup.InferType<typeof assignSchema>;
export type requestType = yup.InferType<typeof requestSchema>;
