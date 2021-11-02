import bcrypt from "bcryptjs";

const users = [
  {
    name: "Arbab Hussain33",
    email: "zack@gmail.com",
    password: bcrypt.hashSync("@Admin@786@123", 10),
    isAdmin: true,
  },
];

export default users;
