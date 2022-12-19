import React from "react";
import { useNavigate } from "react-router-dom";
import { getAvatar } from "../../configService";
import { BasicBookType, Post, ShelfNames } from "../../types";
import SmallCoverPlaceholder from "../BookCoverPlaceholder/SmallCoverPlaceholder";
import SmallBookThumbnail from "../BookThumbnail/SmallBookThumbnail";
import AuthorData from "./AuthorData";
import PostContainer from "./PostContainer";
import PostDateTime from "./PostDateTime";

type Props = {
  post: Post;
};

const ShelvingPost = ({ post }: Props) => {
  const navigate = useNavigate();
  const redirectToUserProfile = (userId: string) => {
    if (userId) {
      navigate(`/profile/${userId}`);
    }
  };
  const redirectToBookDetails = (bookId?: string) => {
    if (bookId) {
      navigate(`/bookDetails/${bookId}`);
    }
  };

  const getBookThumbnail = (book: BasicBookType) => {
    if (book.cover) {
      return (
        <SmallBookThumbnail
          src={book.cover}
          alt={`${book.title} cover`}
          onClick={() => redirectToBookDetails(book._id)}
          key={book._id}
        />
      );
    } else {
      return (
        <SmallCoverPlaceholder
          onClick={() => redirectToBookDetails(book._id)}
          key={book._id}
        >
          <p>{book.title}</p>
          <br />
          <p>{book.authors?.join(", ")}</p>
        </SmallCoverPlaceholder>
      );
    }
  };

  const getUserActionText = (shelfName: string) => {
    const shelfNameValue = ShelfNames[shelfName as keyof typeof ShelfNames];
    switch (shelfNameValue) {
      case ShelfNames.READ:
        return "właśnie przeczytał";
      case ShelfNames.CURRENTLY_READING:
        return "rozpoczął czytać";
      case ShelfNames.WANT_TO_READ:
        return "chciałby przeczytać";
      default:
        return "";
    }
  };

  return (
    <>
      {post.shelfName && post.book && (
        <PostContainer>
          <div>
            <AuthorData onClick={() => redirectToUserProfile(post.author._id)}>
              <img
                src={
                  post.author.avatar
                    ? post.author.avatar
                    : getAvatar("default")?.url
                }
                alt={post.author.username + "avatar"}
              />
              <h4>
                {post.author.username}
                <span> {getUserActionText(post.shelfName)}</span>
              </h4>
            </AuthorData>
            {getBookThumbnail(post.book)}
          </div>
          <PostDateTime date={post.datetime} />
        </PostContainer>
      )}
    </>
  );
};

export default ShelvingPost;
