import type { Access, AccessArgs, FieldAccess } from "payload";
import type { User } from "../payload-types";

type isAdmin = (args: AccessArgs<User>) => boolean;

export const isAdmin: isAdmin = ({ req: { user } }) => {
  // Return true or false based on if the user has an admin role
  return Boolean(user?.roles?.includes("admin"));
};

export const isAdminFieldLevel: FieldAccess<{ id: string }, User> = ({
  req: { user },
}) => {
  // Return true or false based on if the user has an admin role
  return Boolean(user?.roles?.includes("admin"));
};

export const isAdminOrSelf: Access = ({ req: { user } }) => {
  // Need to be logged in
  if (user) {
    // If user has role of 'admin'
    if (user.roles?.includes("admin")) {
      return true;
    }

    // If any other type of user, only provide access to themselves
    return {
      id: {
        equals: user.id,
      },
    };
  }

  // Reject everyone else
  return false;
};

export const isAnyone: Access = () => true;

type isAuthenticated = (args: AccessArgs<User>) => boolean;

export const isAuthenticated: isAuthenticated = ({ req: { user } }) => {
  return Boolean(user);
};
