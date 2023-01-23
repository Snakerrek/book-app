import styled from "styled-components";
import { UserData } from "../../types";
import GenreRadarChart from "../UserCharts/GenreRadarChart";
import ShelvesPieChart from "../UserCharts/ShelvesPieChart";

type Props = {
  userData: UserData;
};

const UserStatsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  width: 100%;
  max-width: 1000px;
  background: ${(props) => props.theme.backgroundColors.white};
  box-shadow: ${(props) => props.theme.shadows.lightGreyShadow};
`;

const ChartsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin: 0 auto;
  flex-wrap: wrap;

  div {
    margin: 0;
    display: flex;
    flex-direction: column;
    text-align: center;
    h3 {
      margin: 15px 0 0 0;
    }
  }
`;

const UserStats = ({ userData }: Props) => {
  return (
    <UserStatsWrapper>
      <h2>Statystyki czytelnicze</h2>
      <ChartsWrapper>
        <div>
          <GenreRadarChart userData={userData} />
        </div>
        <div>
          <ShelvesPieChart userData={userData} />
        </div>
      </ChartsWrapper>
    </UserStatsWrapper>
  );
};

export default UserStats;
