import { memo } from "react";
import ListItem from "./list-item/index";

export default memo(function Track({
  album,
  id,
  name,
  artists,
  imageUrl,
  external_urls,
}: any) {
  return (
    <ListItem
      imageUrl={album?.images[0].url}
      id={id}
      externalUrl={external_urls?.spotify}
      releaseDate={album?.release_date}
      name={name}
      artist={artists[0].name}
      //
    />
  );
});
