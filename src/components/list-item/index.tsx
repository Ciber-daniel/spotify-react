import { memo } from "react";
// styles
import "../../styles/list-item.css";

export default memo(function ListItem({
  imageUrl,
  id,
  externalUrl,
  releaseDate,
  name,
  artist,
}: any) {
  const handleListItemClick = () => {
    window.open(externalUrl, "_blank");
  };

  return (
    <div className="col-md-3 p-4 container-fluid">
      <div className="list-item card card-body" onClick={handleListItemClick}>
        <img
          className="list-img d-flex justify-content-between"
          src={imageUrl}
          alt={id}
        />
        <p className="list-item-title">{name}</p>
        <p className="list-item-artist">{artist}</p>
        <p className="list-item-release-date">{releaseDate}</p>
      </div>
    </div>
  );
});
