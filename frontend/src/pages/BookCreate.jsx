import React from "react";
import BookForm from "../components/BookForm";

function BookCreate() {
  const method = "create";

  return (
    <div>
      <BookForm method={method} />
    </div>
  );
}

export default BookCreate;
