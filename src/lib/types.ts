//

export interface CreatePostInputs {
  title: string;
  content: string;
  authorId: string;
}

export interface CreateUserInputs {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

export interface LocalUserInputs {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
}
