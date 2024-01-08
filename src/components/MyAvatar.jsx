// faker
import { faker } from "@faker-js/faker";
// utils
import createAvatar from "../utils/createAvatar";
//
import Avatar from "./Avatar";

// ----------------------------------------------------------------------

export default function MyAvatar({ ...other }) {
  return (
    <Avatar
      src={faker.image.avatar()}
      alt={faker.person.fullName()}
      color={
        faker.image.avatar()
          ? "default"
          : createAvatar(faker.person.fullName()).color
      }
      {...other}
    >
      {createAvatar(faker.person.fullName()).name}
    </Avatar>
  );
}
