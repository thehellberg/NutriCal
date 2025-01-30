//Zod Validation by https://dev.to/osalumense/validating-request-data-in-expressjs-using-zod-a-comprehensive-guide-3a0j
import { z, ZodError } from "zod";

export function validateData(schema: z.ZodObject<any, any>, req: object) {
  try {
    schema.parse(req);
    return "OK";
  } catch (error) {
    if (error instanceof ZodError) {
      // const errorMessages = error.errors.map((issue: any) => ({
      //     message: `${issue.path.join('.')} is ${issue.message}`,
      // }))
      return error.errors;
    } else {
      return "Internal Server Error";
    }
  }
}
