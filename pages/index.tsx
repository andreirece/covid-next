import React from "react";
import axios from "axios";
import { GetStaticProps } from "next";
import { Box, Paper, Grid, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import Image from "next/image";
import imageCoronavirus from "../src/Coronavirus.png";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#000000" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.primary,
}));

interface CountriesProps {
  countries: string[];
}

const Home = ({ countries }: CountriesProps) => {
  return (
    <div
      style={{
        position: "relative",
        width: "100vw",
        height: "100vh",
      }}
    >
      <div style={{ zIndex: "-1" }}>
        <Image
          priority
          src={imageCoronavirus}
          layout="fill"
          objectFit="cover"
          objectPosition="center"
          alt="Coronavirus image"
        />
        <div style={{ height: "100vh", overflow: "scroll" }}>
          <Box sx={{ flexGrow: 1, position: "relative" }}>
            <h3
              style={{
                backgroundColor: "rgb(255, 255, 255)",
                width: "190px",
                border: "2px solid black",
                borderRadius: "5px",
                margin: "10px",
                padding: "5px",
                color: "#000000",
              }}
            >
              Selecione um País:
            </h3>

            <Grid container spacing={1}>
              {countries.map((country) => (
                <Grid item xs={2} key={country} sx={{ bgcolor: "000000" }}>
                  <Item>
                    <a href={`/${country}`}>
                      <div> {country} </div>
                    </a>
                  </Item>
                </Grid>
              ))}
            </Grid>
          </Box>
        </div>
      </div>
    </div>
  );
};

export default Home;

export const getStaticProps: GetStaticProps<CountriesProps> = async () => {
  const response = await axios.get(`https://covid-api.mmediagroup.fr/v1/cases`);
  const countries = await Object.keys(response.data);

  return {
    props: {
      countries,
    },
  };
};
