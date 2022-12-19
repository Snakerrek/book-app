import React, { useEffect } from "react";
import styled from "styled-components";
import { wrapPostsWithType } from "../../helpers";
import { PostTypes, UserData, WrappedPost } from "../../types";
import FollowPost from "../Posts/FollowPost";
import ReviewPost from "../Posts/ReviewPost";
import ShelvingPost from "../Posts/ShelvingPost";
import StarRatingPost from "../Posts/StarRatingPost";

const LastActivityWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const PostSectionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  max-width: 1400px;
  width: min(800px, 90vw);
  border-radius: 5px;
  padding: 1rem;
  & form {
    width: 100%;
  }
`;

type Props = {
  userData: UserData;
  followingMode?: boolean;
};

const LastActivity = ({ userData, followingMode }: Props) => {
  const [wrappedPosts, setWrappedPosts] = React.useState<WrappedPost[]>([]);

  const fetchPosts = async () => {
    const resJson = await fetch(`/api/post/getUserPosts/${userData._id}`);
    const res = await resJson.json();
    setWrappedPosts(wrapPostsWithType(res.posts));
  };

  const fetchFollowingPosts = async () => {
    const resJson = await fetch(
      `/api/post/getFollowedUsersPosts/${userData._id}`
    );
    const res = await resJson.json();
    setWrappedPosts(wrapPostsWithType(res.posts));
  };

  const renderPost = (wp: WrappedPost) => {
    switch (wp.type) {
      case PostTypes.FOLLOW:
        return <FollowPost post={wp.post} key={wp.post._id} />;
      case PostTypes.REVIEW:
        return <ReviewPost post={wp.post} key={wp.post._id} />;
      case PostTypes.SHELVING:
        return <ShelvingPost post={wp.post} key={wp.post._id} />;
      case PostTypes.STAR_RATING:
        return <StarRatingPost post={wp.post} key={wp.post._id} />;
      default:
        return <div>Unknown post type</div>;
    }
  };

  useEffect(() => {
    if (followingMode) {
      fetchFollowingPosts();
    } else {
      fetchPosts();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userData]);

  return (
    <LastActivityWrapper>
      {!followingMode && <h2>Ostatnia aktywność</h2>}
      <PostSectionWrapper>
        {wrappedPosts &&
          wrappedPosts.length > 0 &&
          wrappedPosts.map((wp) => renderPost(wp))}
      </PostSectionWrapper>
    </LastActivityWrapper>
  );
};

export default LastActivity;
