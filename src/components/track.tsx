import { memo, useState } from "react";
import ListItem from "./list-item/index";
import { Items } from "../interfaces/spotify-search-response.interface";
export default memo(function Track({
  album,
  id,
  name,
  artists,
  imageUrl,
}: any) {
  return (
    <ListItem
      imageUrl={album?.images[0].url}
      id={id}
      // externalUrl={external_urls?.spotify}
      releaseDate={album?.release_date}
      name={name}
      artist={artists[0].name}
      //
    />
  );
});
