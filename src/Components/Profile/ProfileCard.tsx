import React from "react";
import styled from "styled-components";
import { UserData } from "../../types";
import { IoIosPeople } from "react-icons/io";
import { FaUserPlus } from "react-icons/fa";
import { getAvatar } from "../../configService";
import {
  calculateReadPages,
  calculateUserLevel,
  getXpRequired,
} from "../../helpers";
import ProgressBar from "../ProgressBar/ProgressBar";

type Props = {
  userData: UserData;
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

const Followers = styled.div`
  display: flex;
  flex-direction: row;
  span {
    font-size: 1.2rem;
    position: relative;
    margin-left: 5px;
    width: 25px;
    p {
      position: absolute;
      top: -18px;
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

const ProfileCard = ({ userData }: Props) => {
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
        <Followers>
          <IoIosPeople />
          <span>
            <p>100</p>
          </span>
        </Followers>
        <Follow onClick={() => console.log("Follow")}>
          <span>
            <p>Follow </p>
          </span>
          <FaUserPlus />
        </Follow>
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
