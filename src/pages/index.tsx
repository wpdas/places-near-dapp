import PlaceInfo from "@dapp/components/PlaceInfo";
import Search from "@dapp/components/Search";
import { Box, Stack, Typography, useMediaQuery } from "@mui/material";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";
import Image from "next/image";
import nearLogo from "@dapp/images/near-logo.png";
import useCSCService from "@dapp/hooks/useCSCService";
import { useCallback, useEffect, useState } from "react";
import { contract } from "@dapp/web3-services";
import { placesUpdateObservable } from "@dapp/utils/observables";
import { Place } from "@dapp/web3-services/near-interface";
import Spinner from "@dapp/components/Spinner";

const Home = () => {
  const isUnder1230 = useMediaQuery("(max-width:1230px)");
  const isUnder818 = useMediaQuery("(max-width:818px)");
  const [places, setPlaces] = useState<Place[] | null>(null);
  const [filteredPlaces, setFilteredPlaces] = useState<Place[] | null>(null);
  useCSCService();

  // Fetch places
  const fetchPlaces = useCallback(async () => {
    const _places = await contract.getPlaces();
    setPlaces(_places);
  }, [setPlaces]);

  // Initial setup for places
  useEffect(() => {
    const handler = () => {
      fetchPlaces();
    };
    placesUpdateObservable.subscribe(handler);
    return () => {
      placesUpdateObservable.unsubscribe(handler);
    };
  }, [fetchPlaces]);

  // Call fetchPlaces only once
  useEffect(() => {
    fetchPlaces();
  }, [fetchPlaces]);

  // Handle the filtered places
  const handleFilteredPlaces = useCallback((filteredPlaces: Place[] | null) => {
    setFilteredPlaces(filteredPlaces);
  }, []);

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
          <Search places={places} onFilterPlaces={handleFilteredPlaces} />
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

      {!places && (
        <Box mt={20}>
          <Spinner />
        </Box>
      )}

      {/* No places registered message */}
      {places && places.length === 0 && (
        <Stack alignItems="center" mt={8}>
          <Typography color="text.secondary" mb={1}>
            no places registered still
          </Typography>
          <SentimentVeryDissatisfiedIcon
            sx={{ color: "text.secondary" }}
            fontSize="large"
          />
        </Stack>
      )}

      <Stack
        direction="row"
        flexWrap="wrap"
        justifyContent={isUnder818 ? "center" : "space-between"}
      >
        {/* Give preference to filteredPlaces */}
        {filteredPlaces ? (
          <>
            {filteredPlaces &&
              filteredPlaces.map((place) => (
                <PlaceInfo key={place.id} place={place} />
              ))}
          </>
        ) : (
          <>
            {places &&
              places.map((place) => <PlaceInfo key={place.id} place={place} />)}
          </>
        )}
      </Stack>
    </Stack>
  );
};

export default Home;
