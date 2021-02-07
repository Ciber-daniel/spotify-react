import { memo } from "react";
import ListItem from "./list-item/index";

export default memo(function Artist({
  images,
  id,
  external_urls,
  name,
}: any): JSX.Element {
  return (
    <ListItem
      imageUrl={images.length ? images[0].url : ""}
      id={id}
      externalUrl={external_urls?.spotify}
      releaseDate=""
      name={name}
      artist={name}
    />
  );
});
