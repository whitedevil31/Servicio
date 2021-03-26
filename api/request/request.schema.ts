import * as yup from "yup";

export const requestSchema = yup
  .object({
    timeslots: yup.object().required(),
    clientId: yup.string(),
    workerId: yup.string().required(),
    accepted: yup.boolean().required(),
  })
  .required();

export type requestType = yup.InferType<typeof requestSchema>;
