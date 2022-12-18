import React from "react";
import {
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
} from "recharts";
import { getGenreOptions } from "../../configService";
import { UserData } from "../../types";

type Props = {
  userData: UserData;
};

const GenreRadarChart = ({ userData }: Props) => {
  const getGenreData = () => {
    const genreData: any = [];
    getGenreOptions().forEach((genre) => {
      const booksInThisGenre = userData.books.filter((book) =>
        book.bookDetails?.categories.includes(genre.value)
      ).length;
      if (booksInThisGenre > 0) {
        genreData.push({
          subject: genre.label,
          A: booksInThisGenre,
        });
      }
    });
    console.log(genreData);
    return genreData;
  };

  const getMaxValueFromGenreData = () => {
    const genreData = getGenreData();
    let maxValue = 0;
    genreData.forEach((genre: any) => {
      if (genre.A > maxValue) {
        maxValue = genre.A;
      }
    });
    return maxValue;
  };

  return (
    <>
      <h3>Ulubione gatunki</h3>
      <RadarChart
        cx={225}
        cy={175}
        outerRadius={130}
        width={450}
        height={350}
        data={getGenreData()}
      >
        <PolarGrid />
        <PolarAngleAxis dataKey="subject" />
        <PolarRadiusAxis domain={[0, getMaxValueFromGenreData()]} />
        <Radar
          name="Mike"
          dataKey="A"
          stroke="#8884d8"
          fill="#8884d8"
          fillOpacity={0.8}
        />
      </RadarChart>
    </>
  );
};

export default GenreRadarChart;
