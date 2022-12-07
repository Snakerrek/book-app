import { Avatar, GenreType } from "./types";

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

const genreOptions: GenreType[] = [
  { value: "FANTASY", label: "Fantasy" },
  { value: "SCIFI", label: "Sci-fi" },
  { value: "CRIMINAL", label: "Kryminał" },
];

export const getGenresByValue = (values: string[]): GenreType[] => {
  return genreOptions.filter((genre) => values.includes(genre.value));
};

export const getGenreLabel = (value: string): string => {
  const genre = genreOptions.find((genre) => genre.value === value);
  return genre ? genre.label : value;
};

export const getGenreLabelsByValue = (values: string[]): string[] => {
  return getGenresByValue(values).map((genre) => genre.label);
};

export const getGenreOptions = (): GenreType[] => {
  return genreOptions;
};
