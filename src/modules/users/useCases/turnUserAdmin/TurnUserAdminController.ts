import { Request, Response } from "express";

import { TurnUserAdminUseCase } from "./TurnUserAdminUseCase";

class TurnUserAdminController {
  constructor(private turnUserAdminUseCase: TurnUserAdminUseCase) {}

  handle(request: Request, response: Response): Response {
    const { user_id } = request.params;

    try {
      const user = this.turnUserAdminUseCase.execute({ user_id });

      return response.status(200).json(user);
    } catch (err) {
      const errorHandler = JSON.parse(err.message);
      return response
        .status(errorHandler.status)
        .json({ error: errorHandler.message });
    }
  }
}

export { TurnUserAdminController };
