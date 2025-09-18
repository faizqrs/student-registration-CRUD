import type { Request, Response } from 'express';
export declare function registerStudent(req: Request, res: Response): Promise<void>;
export declare function getStudents(req: Request, res: Response): Promise<void>;
export declare function updateStudent(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
export declare function deleteStudent(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
//# sourceMappingURL=studentController.d.ts.map