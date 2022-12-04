import React from "react";
import styled from "styled-components";
import { UserData } from "../../types";
import { IoIosPeople } from "react-icons/io";
import { FaUserPlus } from "react-icons/fa";

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
  p:first-child {
    font-size: 1.1rem;
    color: #dc143c;
    font-weight: 700;
    margin: 0;
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

const ProfileCard = ({ userData }: Props) => {
  return (
    <Card>
      <Top />
      <Body>
        <Avatar src={userData.avatar} alt="avatar" />
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
            <p>100</p>
          </Stat>
          <Stat>
            <p>Read pages</p>
            <p>100000</p>
          </Stat>
        </StatsContainer>
        *Statystyki odnośnie expa*
      </Body>
    </Card>
  );
};

export default ProfileCard;
