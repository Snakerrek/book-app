import React from "react";
import { useNavigate } from "react-router-dom";
import { getAvatar } from "../../configService";
import { Post } from "../../types";
import AuthorData from "./AuthorData";
import PostContainer from "./PostContainer";
import PostDateTime from "./PostDateTime";

type Props = {
  post: Post;
};

const FollowPost = ({ post }: Props) => {
  const navigate = useNavigate();
  const redirectToUserProfile = (userId: string) => {
    if (userId) {
      navigate(`/profile/${userId}`);
    }
  };

  return (
    <>
      {post.followedUser && (
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
                {post.author.username} <span>zaobserwował użytkownika</span>
              </h4>
            </AuthorData>
            <AuthorData
              onClick={() =>
                redirectToUserProfile(
                  post.followedUser ? post.followedUser._id : ""
                )
              }
            >
              <img
                src={
                  post.followedUser.avatar
                    ? post.followedUser.avatar
                    : getAvatar("default")?.url
                }
                alt={post.followedUser.username + "avatar"}
              />
              <h4>{post.followedUser.username}</h4>
            </AuthorData>
          </div>
          <PostDateTime date={post.datetime} />
        </PostContainer>
      )}
    </>
  );
};

export default FollowPost;
