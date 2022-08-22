import React from "react";
import { GetServerSideProps } from "next";
import axios from "axios";

// TODO: Move to another file
interface ApiResponseData {
  [stateName: string]: {
    lat: string;
    long: string;
    confirmed: number;
    recovered: number;
    deaths: number;
    updated: string;
  };
}

interface CountryDetailsProps {
  countryParams: string;
  countryDataMap: {
    [stateName: string]: {
      deaths: number;
      confirmed: number;
    };
  };
}

export default function CountryDetails(props: CountryDetailsProps) {
  const { countryParams, countryDataMap } = props;
  return (
    <div>
      <h2>{countryParams}</h2>

      <table>
        <thead>
          <tr>
            <th>State</th>
            <th>Confirmed</th>
            <th>Deaths</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(countryDataMap).map(([key, value]) => (
            <tr key={key}>
              <td>{key}</td>
              <td>{value.confirmed}</td>
              <td>{value.deaths}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const countryParams: string = (params as { country: string }).country;

  const response = await axios.get<ApiResponseData>(
    `https://covid-api.mmediagroup.fr/v1/cases?country=${countryParams}`
  );

  const countryDataMap: CountryDetailsProps["countryDataMap"] = {};

  Object.entries(response.data).map(([state, stateInfo]) => {
    countryDataMap[state] = {
      deaths: stateInfo.deaths,
      confirmed: stateInfo.confirmed,
    };
  });

  return {
    props: {
      countryParams,
      countryDataMap,
    },
  };
};
