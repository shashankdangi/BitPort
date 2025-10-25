import { authClient } from "../auth-client";

export const updateName = async (name: string, image?: string) => {
  const res = await authClient.updateUser({
    name,
  });

  return res;
};

export const changePassword = async (
  newPassword: string,
  currentPassword: string
) => {
  const res = await authClient.changePassword({
    newPassword,
    currentPassword,
    revokeOtherSessions: true,
  });

  return res;
};

export const deleteUser = async () => {
  const res = await authClient.deleteUser({
    callbackURL: "/auth",
  });

  return res;
};
