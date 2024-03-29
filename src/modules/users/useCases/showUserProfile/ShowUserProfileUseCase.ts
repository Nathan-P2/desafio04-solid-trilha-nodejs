import { User } from "../../model/User";
import { IUsersRepository } from "../../repositories/IUsersRepository";

interface IRequest {
  user_id: string;
}

class ShowUserProfileUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  execute({ user_id }: IRequest): User {
    const user = this.usersRepository.findById(user_id);

    if (!user) {
      throw new Error(
        JSON.stringify({
          status: 404,
          message: `User ${user_id} not found`,
        })
      );
    }

    return user;
  }
}

export { ShowUserProfileUseCase };
