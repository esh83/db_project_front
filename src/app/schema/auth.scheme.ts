export type TRegisterPayload = {
  password: string;
  username: string;
  email: string;
  birthdate: string;
  address: string;
  image? : any;
};

export type TLoginPayload = {
    password: string;
    username: string;
  };
