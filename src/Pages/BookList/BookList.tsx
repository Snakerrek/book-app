import React from "react";
import { useParams } from "react-router-dom";
import LoadingOverlay from "../../Components/LoadingOverlay/LoadingOverlay";

type Props = {};

const BookList = (props: Props) => {
  const { userId } = useParams();

  return (
    <div>
      <LoadingOverlay />
      Lista ksiażek użytkownika: {userId}
    </div>
  );
};

export default BookList;
