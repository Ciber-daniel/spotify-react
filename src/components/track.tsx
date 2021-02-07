import { memo, useState } from "react";
import ListItem from "./list-item/index";

export default memo(function Track({
  album,
  id,
  external_urls,
  name,
  artists,
}: any) {
  return (
    <ListItem
      imageUrl={album?.images[0].url}
      id={id}
      externalUrl={external_urls?.spotify}
      releaseDate={album?.release_date}
      name={name}
      artist={artists[0].name}
    />
  );
});
