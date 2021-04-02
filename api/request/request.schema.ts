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

export type requestType = yup.InferType<typeof requestSchema>;
