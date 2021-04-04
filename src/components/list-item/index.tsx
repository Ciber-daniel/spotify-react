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
}: any) {
  const history = useHistory();

  const handleListItemClick = () => {
    history.push(`/app/detail/${id}`, "_blank");
  };

  return (
    <div className="col-md-3 p-4 container-fluid" onClick={handleListItemClick}>
      <div className="list-item card card-body" id={id}>
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
