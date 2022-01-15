import { User } from "../../model/User";
import { IUsersRepository } from "../../repositories/IUsersRepository";

interface IRequest {
  name: string;
  email: string;
}

class CreateUserUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  execute({ email, name }: IRequest): User {
    const user = this.usersRepository.create({ name, email });

    const users = this.usersRepository.list();

    const userAlreadyExists = users.find((user) => user.email === email);

    if (userAlreadyExists) {
      throw new Error(`User ${email} already exists`);
    }

    return user;
  }
}

export { CreateUserUseCase };
