import { Avatar } from "./types";

const avatars: Avatar[] = [
  { name: "default", url: "/avatars/default.png", isAvailable: false },
  { name: "zebra", url: "/avatars/zebra.jpg", isAvailable: true },
  { name: "panda", url: "/avatars/panda.jpg", isAvailable: true },
];

export const getAvatar = (name: string): Avatar | undefined => {
  return avatars.find((avatar) => avatar.name === name);
};

export const getAvailableAvatars = (): Avatar[] => {
  return avatars.filter((avatar) => avatar.isAvailable);
};
