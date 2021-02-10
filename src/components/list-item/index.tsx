import { memo } from "react";
import { useHistory } from "react-router-dom";
// styles
import "../../styles/list-item.css";

export default memo(function ListItem({
  imageUrl,
  id,
  releaseDate,
  name,
  artist,
  externalUrl,
}: any) {
  const history = useHistory();

  const handleListItemClick = () => {
    history.push(`/app/detail/${id}`, "_blank");
  };

  const handleClickExternal = () => {
    window.open(externalUrl, "_blank");
  };

  return (
    <div className="col-md-3 p-4 container-fluid">
      <div
        className="list-item card card-body"
        onClick={handleClickExternal}
        id={id}
      >
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
