import PlaceInfo from "@dapp/components/PlaceInfo";
import Search from "@dapp/components/Search";
import { Box, Grid, Stack, Typography, useMediaQuery } from "@mui/material";
import Image from "next/image";
import nearLogo from "@dapp/images/near-logo.png";

const Home = () => {
  const isUnder1230 = useMediaQuery("(max-width:1230px)");
  const isUnder818 = useMediaQuery("(max-width:818px)");

  return (
    <Stack p={4}>
      <Stack
        pl={isUnder818 ? 0 : 2}
        pr={isUnder818 ? 0 : 2}
        direction="row"
        justifyContent="space-between"
      >
        <Stack
          justifyContent="center"
          mb={4}
          width={isUnder1230 ? "100%" : "50%"}
        >
          <Typography
            fontSize={48}
            color="white"
            lineHeight={1}
            mb={2}
            sx={{
              backgroundColor: "#fffff",
              backgroundImage:
                "radial-gradient(at 4% 40%, rgb(255, 255, 255) 100px, transparent 100%), radial-gradient(at 100% 60%, rgb(77, 77, 77) 0px, rgba(255, 255, 255, 0.5) 50%)",
              backgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Get to know
            <br />
            the best places
          </Typography>

          <Typography fontSize={16} color="white" mb={2} maxWidth={500}>
            Discover a selection of global wonders that cater to all interests.
            Whether you&apos;re a <strong>seasoned traveler</strong>, a{" "}
            <strong>food enthusiast</strong>, or a{" "}
            <strong>shopping aficionado</strong>, our curated collection has
            something for everyone. Dive into the cards below for valuable
            insights into these remarkable destinations. Don&apos;t forget to{" "}
            <strong>rate the place</strong> to help others discover their next
            adventure!
          </Typography>
          <Search />
        </Stack>

        <Stack
          justifyContent="center"
          alignItems="center"
          display={isUnder1230 ? "none" : "flex"}
        >
          <Box
            sx={{
              borderRadius: 999,
              overflow: "hidden",
              width: 36,
              height: 36,
              mb: 2,
            }}
          >
            <Image width={36} height={36} alt="NEAR logo" src={nearLogo} />
          </Box>
          <Typography fontSize={16} color="white" mb={1}>
            An experience built under NEAR Network.
          </Typography>
        </Stack>
      </Stack>

      {/* TODO: Ir carregando de 16 em 16 quando for baixando a tela */}
      <Grid container columns={12} justifyContent="space-between">
        <Grid
          item
          xs="auto"
          sm="auto"
          md={4}
          lg="auto"
          xl="auto"
          margin={isUnder818 ? "auto" : 0}
        >
          <PlaceInfo name="Lizard" />
        </Grid>
        <Grid
          item
          xs="auto"
          sm="auto"
          md={4}
          lg="auto"
          xl="auto"
          margin={isUnder818 ? "auto" : 0}
        >
          <PlaceInfo name="Bagulho" />
        </Grid>
        <Grid
          item
          xs="auto"
          sm="auto"
          md={4}
          lg="auto"
          xl="auto"
          margin={isUnder818 ? "auto" : 0}
        >
          <PlaceInfo name="Coffe and Happy" />
        </Grid>
        <Grid
          item
          xs="auto"
          sm="auto"
          md={4}
          lg="auto"
          xl="auto"
          margin={isUnder818 ? "auto" : 0}
        >
          <PlaceInfo name="Underground Train" />
        </Grid>
      </Grid>
    </Stack>
  );
};

export default Home;
