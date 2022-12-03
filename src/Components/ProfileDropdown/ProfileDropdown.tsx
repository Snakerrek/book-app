import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { getUserData } from "../../helpers";
import { profileDropdownLinks } from "./ProfileDropdownLinks";
import DropdownItem from "./DropdownItem";
import { UserData } from "../../types";

const ProfileLogoWrapper = styled.div`
  margin-left: 1rem;
  cursor: pointer;

  & img {
    object-fit: cover;
    border-radius: 50%;
    width: 3.5rem;
    height: 3.5rem;
    border: 1px solid #e6e6e6;
  }
`;

type DropdownMenuProps = {
  isOpen: boolean;
};

const DropdownMenu = styled.div`
  position: absolute;
  top: 70px;
  right: 10px;
  background-color: ${(p) => p.theme.backgroundColors.white};
  border-radius: 5px;
  padding: 0 20px;
  width: 200px;
  opacity: ${(p: DropdownMenuProps) => (p.isOpen ? 1 : 0)};
  transform: ${(p: DropdownMenuProps) =>
    p.isOpen ? "translateY(0)" : "translateY(-20px)"};
  visibility: ${(p: DropdownMenuProps) => (p.isOpen ? "visible" : "hidden")};

  & ul {
    padding: 0;
  }

  &::before {
    content: "";
    position: absolute;
    top: -5px;
    right: 20px;
    height: 20px;
    width: 20px;
    background: var(--secondary-bg);
    transform: rotate(45deg);
  }
`;

const ProfileDropdown = () => {
  const [open, setOpen] = useState(false);
  const [userData, setUserData] = useState<UserData | null>(null);

  const menuRef = useRef<HTMLDivElement>(null);

  const fetchUserData = async () => {
    const userDataToken = getUserData();
    const userDataJson = await fetch(`/api/user/get/${userDataToken?.id}`);
    const userData = await userDataJson.json();
    setUserData(userData);
  };

  useEffect(() => {
    fetchUserData();

    const handler = (e: any) => {
      if (!menuRef?.current?.contains(e.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    };
  }, []);

  return (
    <div ref={menuRef}>
      <ProfileLogoWrapper
        onClick={() => {
          setOpen(!open);
        }}
      >
        {userData?.avatar && <img src={userData?.avatar} alt="Profile" />}
      </ProfileLogoWrapper>
      <DropdownMenu isOpen={open}>
        <h3>{userData?.username}</h3>
        <ul>
          {profileDropdownLinks.map((link) => (
            <DropdownItem
              key={`dropdownItem-${link.text}`}
              Icon={link.icon}
              text={link.text}
              link={link.link}
              onRedirect={() => setOpen(false)}
            />
          ))}
        </ul>
      </DropdownMenu>
    </div>
  );
};

export default ProfileDropdown;
