import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import LoadingOverlay from "../../Components/LoadingOverlay/LoadingOverlay";

type Props = {};

const BookList = (props: Props) => {
  const { userId } = useParams();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      <LoadingOverlay />
      Lista ksiażek użytkownika: {userId}
    </div>
  );
};

export default BookList;
