import { User } from "../../model/User";
import { IUsersRepository } from "../../repositories/IUsersRepository";

interface IRequest {
  user_id: string;
}

class ListAllUsersUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  execute({ user_id }: IRequest): User[] {
    const users = this.usersRepository.list();

    const user = users.find((user) => user.id === user_id);

    if (!user) {
      throw new Error(
        JSON.stringify({
          status: 400,
          message: `User ${user_id} does not exist`,
        })
      );
    } else if (!user.admin) {
      throw new Error(
        JSON.stringify({
          status: 400,
          message: `User ${user_id} is not admin`,
        })
      );
    }

    return users;
  }
}

export { ListAllUsersUseCase };
