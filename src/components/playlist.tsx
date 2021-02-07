import { memo } from "react";
import ListItem from "./list-item/index";

export default memo(function Playlist({
  images,
  id,
  description,
  name,
  external_urls,
}: any): JSX.Element {
  return (
    <ListItem
      imageUrl={images.length ? images[0].url : ""}
      id={id}
      externalUrl={external_urls?.spotify}
      releaseDate=""
      name={description}
      artist={name}
    />
  );
});
