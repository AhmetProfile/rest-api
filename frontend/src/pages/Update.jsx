import React from "react";
import BookForm from "../components/BookForm";
import { useParams } from "react-router-dom";

function Update() {
  const method = "update";

  const { id } = useParams();

  return (
    <div>
      <BookForm method={method} id={id} />
    </div>
  );
}

export default Update;
