import React, { useEffect } from "react";
import styled from "styled-components";
import { UserData } from "../../types";
import { IoIosPeople } from "react-icons/io";
import { FaUserPlus } from "react-icons/fa";
import { getAvatar } from "../../configService";
import {
  calculateReadPages,
  calculateUserLevel,
  getUserData,
  getXpRequired,
} from "../../helpers";
import ProgressBar from "../ProgressBar/ProgressBar";

type Props = {
  userData: UserData;
  onOpenFollowers: (open: boolean) => void;
  onOpenFollowing: (open: boolean) => void;
  onUserDataChange: (userData: UserData) => void;
};

const Card = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 300px;
  height: 500px;
  max-height: 500px;
  margin: 10px;
`;

const Top = styled.div`
  width: 100%;
  height: 100px;
  background-color: #dc143c;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
`;

const Body = styled.div`
  width: 100%;
  height: 100%;
  background-color: #151515;
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;

  svg {
    height: 25px;
    width: 25px;
  }
`;

const FollowersContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

const Followers = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px;
  color: #dc143c;
  font-weight: 600;

  & div {
    display: flex;
    color: white;
    justify-content: center;
    align-items: center;

    :hover {
      background-color: #dc143c;
      cursor: pointer;
      border-radius: 5px;
      transition: 0.2s ease-in-out;
    }
  }
`;

const Follow = styled.button`
  width: 100px;
  height: 30px;
  background-color: transparent;
  border: none;
  border-radius: 5px;
  color: white;
  margin-top: 10px;
  display: flex;
  flex-direction: row;
  padding-top: 2px;
  cursor: pointer;
  &:hover {
    background-color: #dc143c;
  }

  svg {
    margin-left: -15px;
  }
  span {
    font-size: 1rem;
    position: relative;
    width: 100px;
    p {
      position: absolute;
      top: -12px;
    }
  }
`;

const StatsContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  width: 100%;
  margin-top: 10px;
`;

const Stat = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  p {
    font-size: 1.3rem;
    font-weight: 700;
    margin: 0;
  }
  p:first-child {
    color: #dc143c;
    font-size: 1rem;
  }
  p:last-child {
    margin-top: 5px;
  }
`;

const Avatar = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  margin-top: -50px;
`;

const LevelData = styled.div`
  padding: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  p {
    margin-top: 0;
  }
  h3 {
    margin-bottom: 0;
  }
`;
const Level = styled.span`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${(props) => props.theme.gradients.blue};
  font-size: 1.5rem;
  font-weight: 700;
`;

const ProfileCard = ({
  userData,
  onOpenFollowers,
  onOpenFollowing,
  onUserDataChange,
}: Props) => {
  const userDataToken = getUserData();
  const [loggedUserData, setLoggedUserData] = React.useState<UserData | null>();
  const [showFollow, setShowFollow] = React.useState<boolean>(true);
  const [showUnfollow, setShowUnfollow] = React.useState<boolean>(false);

  useEffect(() => {
    console.log("henlo");
    if (
      !userDataToken ||
      !userDataToken.id ||
      userDataToken.id === userData._id
    ) {
      setShowFollow(false);
      setShowUnfollow(false);
      return;
    }
    if (loggedUserData) {
      if (
        loggedUserData.following.filter(
          (followedUser) => followedUser._id === userData._id
        ).length > 0
      ) {
        setShowFollow(false);
        setShowUnfollow(true);
      } else {
        setShowFollow(true);
        setShowUnfollow(false);
      }
    }
    //eslint-disable-next-line
  }, [loggedUserData, userDataToken, userData]);

  useEffect(() => {
    fetchLoggedInUserData();
    //eslint-disable-next-line
  }, [userData]);

  const fetchLoggedInUserData = async () => {
    if (!userDataToken || !userDataToken.id) return;
    const loggedUserJson = await fetch(`api/user/get/${userDataToken.id}`);
    const loggedUser = await loggedUserJson.json();
    setLoggedUserData(loggedUser);
  };

  const FollowUser = async () => {
    if (
      !userDataToken ||
      !userDataToken.id ||
      userDataToken.id === userData._id
    )
      return;

    const resJson = await fetch("api/user/follow", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: userDataToken.id,
        userToFollowId: userData._id,
      }),
    });
    const res = await resJson.json();
    onUserDataChange(res.updatedUser);
  };

  const UnfollowUser = async () => {
    if (
      !userDataToken ||
      !userDataToken.id ||
      userDataToken.id === userData._id
    )
      return;

    const resJson = await fetch("api/user/unfollow", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: userDataToken.id,
        userToUnfollowId: userData._id,
      }),
    });
    const res = await resJson.json();
    onUserDataChange(res.updatedUser);
  };

  const userLvlData = calculateUserLevel(userData.books);
  return (
    <Card>
      <Top />
      <Body>
        <Avatar
          src={userData.avatar ? userData.avatar : getAvatar("default")?.url}
          alt="avatar"
        />
        <h2>{userData.username}</h2>
        <FollowersContainer>
          <Followers onClick={() => onOpenFollowers(true)}>
            <span>
              <p>Obserwujący</p>
              <div>
                <span> {userData.followers.length}</span>
                <IoIosPeople />
              </div>
            </span>
          </Followers>
          <Followers onClick={() => onOpenFollowing(true)}>
            <span>
              <p>Obserwowani</p>
              <div>
                <span>{userData.following.length}</span>
                <IoIosPeople />
              </div>
            </span>
          </Followers>
        </FollowersContainer>
        {showFollow && (
          <Follow onClick={FollowUser}>
            <span>
              <p>Follow </p>
            </span>
            <FaUserPlus />
          </Follow>
        )}
        {showUnfollow && (
          <Follow onClick={UnfollowUser}>
            <span>
              <p>Unfollow </p>
            </span>
          </Follow>
        )}
        <StatsContainer>
          <Stat>
            <p>Read books</p>
            <p>
              {userData.books.filter((book) => book.shelf === "READ").length}
            </p>
          </Stat>
          <Stat>
            <p>Read pages</p>
            <p>{calculateReadPages(userData.books)}</p>
          </Stat>
        </StatsContainer>
        <LevelData>
          <h3>Level</h3>
          <Level>{userLvlData.lvl}</Level>
          <div>
            <ProgressBar
              done={userLvlData.xpLeft}
              max={getXpRequired(userLvlData.lvl)}
            />
          </div>
        </LevelData>
      </Body>
    </Card>
  );
};

export default ProfileCard;
