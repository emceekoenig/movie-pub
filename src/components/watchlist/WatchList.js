import { Link } from "react-router-dom";
import {
  ImageList,
  ImageListItem,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlay } from "@fortawesome/free-solid-svg-icons";

export default function WatchList({ movies }) {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <div className="p-2 container">
      <h1 className="text-center my-3 my-sm-5">Watch List - August</h1>

      <ImageList
        sx={{ flexGrow: 1 }}
        className="p-sm-2"
        cols={isSmallScreen ? 2 : 3}
      >
        {movies.map((movie) => (
          <ImageListItem
            key={movie.imdbId}
            className="m-1 m-sm-3"
          >
            <img
              srcSet={`${movie.poster}?w=248&fit=crop&auto=format&dpr=2 2x`}
              src={`${movie.poster}?w=248&fit=crop&auto=format`}
              alt={movie.title}
              loading="lazy"
            />
            <p className="text-center mt-3 mb-0">{movie.title}</p>
            <p className="text-center mb-3">
              <Link
                to={`/Trailer/${movie.trailerLink.substring(
                  movie.trailerLink.length - 11
                )}`}
              >
                <div>
                  <FontAwesomeIcon
                    className="me-1"
                    icon={faCirclePlay}
                  />
                  Trailer
                </div>
              </Link>
            </p>
          </ImageListItem>
        ))}
      </ImageList>
    </div>
  );
}
