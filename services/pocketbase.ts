import PocketBase from "pocketbase";

export const pb = new PocketBase(
  "https://cautious-happiness-4xwx74rg4gh7gwj-8090.app.github.dev/"
);

const data = {
  username: "test_username",
  email: "test@example.com",
  emailVisibility: true,
  password: "12345678",
  passwordConfirm: "12345678",
  name: "test",
};

type User = {
  username?: string;
  email: string;
  emailVisibility?: boolean;
  password: string;
  passwordConfirm?: string;
  name?: string;
};

export async function createUser(data: User) {
  const user = await pb.collection("users").create(data);
  console.log(user);
  return user;
}

// const authData = await pb.collection('users').authWithPassword('YOUR_USERNAME_OR_EMAIL', '1234567890');

export async function signInUser(data: User) {
  const user = await pb
    .collection("users")
    .authWithPassword(data.email, data.password);
  return user;
}
