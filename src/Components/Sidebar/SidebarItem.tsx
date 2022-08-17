import React from "react";
import { Link } from "react-router-dom";
import { IconType } from "react-icons";
import styled from "styled-components";

const Item = styled.li`
  width: 100%;
`;

export const ItemText = styled.span`
  display: none;
`;

const ItemLink = styled(Link)`
  display: flex;
  align-items: center;
  height: 4rem;
  color: ${(p) => p.theme.textColors.grey};
  text-decoration: none;

  svg {
    font-size: 2rem;
    margin: 0 1rem;
  }
`;

const SidebarLogo = styled.li`
  font-weight: ${(props) => props.theme.fontWeight.bold};
  text-transform: uppercase;
  margin-bottom: 1rem;
  text-align: center;
  color: ${(props) => props.theme.textColors.white};
  background: ${(props) => props.theme.gradients.blue};
  font-size: ${(props) => props.theme.fontSize.M};
  text-transform: uppercase;
  letter-spacing: 0.3ch;
  width: 100%;
`;

type Props = {
  item: { path: string; text: string; Icon: IconType; isLogo?: boolean };
};

const SidebarItem = (props: Props) => {
  const {
    item: { path, Icon, text, isLogo },
  } = props;
  return (
    <>
      {isLogo ? (
        <SidebarLogo>
          <ItemLink to={path}>
            {<Icon />}
            <ItemText>{text}</ItemText>
          </ItemLink>
        </SidebarLogo>
      ) : (
        <Item>
          <ItemLink to={path}>
            {<Icon />}
            <ItemText>{text}</ItemText>
          </ItemLink>
        </Item>
      )}
    </>
  );
};

export default SidebarItem;
