import * as React from "react";
import { useState } from "react";

// export interface OdataContext {
//   setTop: (top: number) => void;
//   setSkip: (skip: number) => void;
//   setQueryParameter: (key: string, value: string) => void;
//   getQueryParameter: (key: string) => string;
//   params: string;
//   top: number;
// }

// const OdataContext = createContext<OdataContext | null>(null);

export type FilterOperand = "contains" | "equals";
export type DataType = "number" | "string";

interface OdataFilter {
  name: string;
  operand: FilterOperand;
  value: string;
  dataType: DataType;
}

const mapToOdataFilter = ({ name, operand, value, dataType }: OdataFilter) => {
  console.log("datatype", dataType);
  switch (operand) {
    case "contains":
      return `contains(${name},${
        dataType === "number" ? value : `'${value}'`
      })`;
    case "equals":
      return `${name} eq ${dataType === "number" ? value : `'${value}'`}`;
  }
  throw Error(`unknown operand '${operand}'`);
};

export const useOdata = () => {
  const [top, setTop] = useState(20);
  const [skip, setSkip] = useState(0);
  const [filters, setFilters] = useState<OdataFilter[]>([]);
  //   const [query, setQuery] = useState(`$top=${top}`);

  const query = `$top=${top}${skip ? `&$skip=${skip}` : ""}${
    filters.length > 0
      ? `&$filter=${filters
          // .map(({ name, operand, value }) => `${name} ${operand} ${value}`)
          // .map(({ name, operand, value }) => `contains(${name},'${value}')`)
          .map(mapToOdataFilter)
          .reduce((prev, curr) => `${prev} and ${curr}`)}`
      : ""
  }`;

  return { query, setTop, setSkip, setFilters };
};
