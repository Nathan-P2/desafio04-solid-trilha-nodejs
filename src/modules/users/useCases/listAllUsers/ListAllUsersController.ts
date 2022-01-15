import { Request, Response } from "express";

import { ListAllUsersUseCase } from "./ListAllUsersUseCase";

class ListAllUsersController {
  constructor(private listAllUsersUseCase: ListAllUsersUseCase) {}

  handle(request: Request, response: Response): Response {
    const { user_id } = request.headers;

    try {
      const users = this.listAllUsersUseCase.execute({ user_id } as {
        user_id: string;
      });

      return response.status(200).json(users);
    } catch (err) {
      const errorHandler = JSON.parse(err.message);
      return response
        .status(errorHandler.status)
        .json({ error: errorHandler.message });
    }
  }
}

export { ListAllUsersController };
