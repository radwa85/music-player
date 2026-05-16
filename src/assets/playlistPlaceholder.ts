import { Image } from "react-native";

const PLAYLIST_PLACEHOLDER_ASSET = require("./playlist-placeholder.png");

export const PLAYLIST_PLACEHOLDER = PLAYLIST_PLACEHOLDER_ASSET;
export const PLAYLIST_PLACEHOLDER_URI = Image.resolveAssetSource(
  PLAYLIST_PLACEHOLDER_ASSET,
).uri;
