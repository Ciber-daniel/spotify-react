import { memo } from "react";
import ListItem from "./list-item/index";

export default memo(function Track({ album, id, name, artists }: any) {
  return (
    <ListItem
      imageUrl={album?.images[0].url}
      id={id}
      releaseDate={album?.release_date}
      name={name}
      artist={artists[0].name}
      //
    />
  );
});
