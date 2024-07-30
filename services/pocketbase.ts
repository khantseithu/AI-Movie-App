import PocketBase from "pocketbase";

export const pb = new PocketBase("http://167.172.72.120/");

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

export async function signInUser(data: User) {
  const user = await pb
    .collection("users")
    .authWithPassword(data.email, data.password);
  return user;
}

// const record = await pb.collection('users').getOne('RECORD_ID', {
//   expand: 'relField1,relField2.subRelField',
// });
// get profile

export async function getProfile(recordId: string) {
  const user = await pb.collection("users").getOne(recordId);
  console.log(user);
  return user;
}
