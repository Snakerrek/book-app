import React from "react";
import { useNavigate } from "react-router-dom";
import { getAvatar } from "../../configService";
import { BasicBookType, Post } from "../../types";
import SmallCoverPlaceholder from "../BookCoverPlaceholder/SmallCoverPlaceholder";
import SmallBookThumbnail from "../BookThumbnail/SmallBookThumbnail";
import StarRatingDisplay from "../StarRating/StarRatingDisplay";
import AuthorData from "./AuthorData";
import PostContainer from "./PostContainer";
import PostDateTime from "./PostDateTime";
import PostTextContainer from "./PostTextContainer";

type Props = {
  post: Post;
};

const StarRatingPost = ({ post }: Props) => {
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
  return (
    <>
      {post.book && post.starRating && (
        <>
          <PostContainer>
            <div>
              <AuthorData
                onClick={() => redirectToUserProfile(post.author._id)}
              >
                <img
                  src={
                    post.author.avatar
                      ? post.author.avatar
                      : getAvatar("default")?.url
                  }
                  alt={post.author.username + "avatar"}
                />
                <h4>
                  {post.author.username} <span>ocenił książkę</span>
                </h4>
              </AuthorData>
              {getBookThumbnail(post.book)}
            </div>
            <PostTextContainer>
              {<StarRatingDisplay rating={post.starRating} />}
            </PostTextContainer>
            <PostDateTime date={post.datetime} />
          </PostContainer>
        </>
      )}
    </>
  );
};

export default StarRatingPost;
