import * as yup from "yup";

const requestSchema = yup
  .object({
    timeslots: yup.array().of(yup.object()).required(),
    clientId: yup.string().required(),
    workerId: yup.string().required(),
    accepted: yup.boolean().required(),
  })
  .required();

export type requestType = yup.InferType<typeof requestSchema>;
