import React, { useCallback, useState } from "react";
import { Cell, Pie, PieChart, Sector } from "recharts";
import { ShelfNames, UserData } from "../../types";

type Props = {
  userData: UserData;
};

const ShelvesPieChart = (props: Props) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const onPieEnter = useCallback(
    (_: any, index: number) => {
      setActiveIndex(index);
    },
    [setActiveIndex]
  );

  const renderActiveShape = (props: any) => {
    const RADIAN = Math.PI / 180;
    const {
      cx,
      cy,
      midAngle,
      innerRadius,
      outerRadius,
      startAngle,
      endAngle,
      fill,
      payload,
      percent,
      value,
    } = props;
    const sin = Math.sin(-RADIAN * midAngle);
    const cos = Math.cos(-RADIAN * midAngle);
    const sx = cx + (outerRadius + 10) * cos;
    const sy = cy + (outerRadius + 10) * sin;
    const mx = cx + (outerRadius + 30) * cos;
    const my = cy + (outerRadius + 30) * sin;
    const ex = mx + (cos >= 0 ? 1 : -1) * 22;
    const ey = my;
    const textAnchor = cos >= 0 ? "start" : "end";

    return (
      <g>
        <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
          {payload.name}
        </text>
        <Sector
          cx={cx}
          cy={cy}
          innerRadius={innerRadius}
          outerRadius={outerRadius}
          startAngle={startAngle}
          endAngle={endAngle}
          fill={fill}
        />
        <Sector
          cx={cx}
          cy={cy}
          startAngle={startAngle}
          endAngle={endAngle}
          innerRadius={outerRadius + 6}
          outerRadius={outerRadius + 10}
          fill={fill}
        />
        <path
          d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
          stroke={fill}
          fill="none"
        />
        <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
        <text
          x={ex + (cos >= 0 ? 1 : -1) * 12}
          y={ey}
          textAnchor={textAnchor}
          fill="#333"
        >{`Dodane ${value}`}</text>
        <text
          x={ex + (cos >= 0 ? 1 : -1) * 12}
          y={ey}
          dy={18}
          textAnchor={textAnchor}
          fill="#999"
        >
          {`(${(percent * 100).toFixed(2)}%)`}
        </text>
      </g>
    );
  };

  const getShelvesData = () => {
    const shelvesData: any = [];
    Object.values(ShelfNames).forEach((shelf) => {
      const booksInShelf = props.userData.books.filter((book) => {
        return ShelfNames[book.shelf as keyof typeof ShelfNames] === shelf;
      }).length;
      if (booksInShelf > 0) {
        shelvesData.push({ name: shelf, value: booksInShelf });
      }
    });
    console.log(shelvesData);
    return shelvesData;
  };

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28"];

  return (
    <>
      <h3>Półki</h3>
      <PieChart width={450} height={350}>
        <Pie
          activeIndex={activeIndex}
          activeShape={renderActiveShape}
          data={getShelvesData()}
          cx={225}
          cy={150}
          innerRadius={70}
          outerRadius={90}
          fill="#FF8C29"
          dataKey="value"
          onMouseEnter={onPieEnter}
        >
          {getShelvesData().map((entry: any, index: number) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
      </PieChart>
    </>
  );
};

export default ShelvesPieChart;
