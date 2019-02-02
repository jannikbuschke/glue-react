import * as React from "react";
import { useState } from "react";

export type FilterOperand = "contains" | "equals";
export type DataType = "number" | "string" | "guid";

export interface OdataFilter {
  name: string;
  operand: FilterOperand;
  value: string;
  dataType: DataType;
}

export interface OrderBy {
  name: string;
  direction: "asc" | "desc";
}

const mapToOdataFilter = ({ name, operand, value, dataType }: OdataFilter) => {
  switch (operand) {
    case "contains":
      return `contains(${name},${
        dataType === "number" ? value : `'${value}'`
      })`;
    case "equals":
      return `${name} eq ${dataType !== "string" ? value : `'${value}'`}`;
  }
  throw Error(`unknown operand '${operand}'`);
};

export const useOdata = () => {
  const [top, setTop] = useState(20);
  const [skip, setSkip] = useState(0);
  const [filters, setFilters] = useState<OdataFilter[]>([]);
  const [orderBy, setOrderBy] = useState<OrderBy[]>([]);

  const orderByPara = orderBy
    .map(sort => `${sort.name} ${sort.direction}`)
    .join(",");
  const orderByQuery = orderByPara ? `&$orderBy=${orderByPara}` : "";

  const query = `$top=${top}${skip ? `&$skip=${skip}` : ""}${
    filters.length > 0
      ? `&$filter=${filters
          // .map(({ name, operand, value }) => `${name} ${operand} ${value}`)
          // .map(({ name, operand, value }) => `contains(${name},'${value}')`)
          .map(mapToOdataFilter)
          .reduce((prev, curr) => `${prev} and ${curr}`)}`
      : ""
  }${orderByQuery}`;
  return { query, setTop, setSkip, setFilters, setOrderBy };
};
