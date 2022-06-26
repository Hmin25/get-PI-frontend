import './App.css';
import { ChakraProvider, Center, Text, Button, Flex, Box, Grid, Divider } from "@chakra-ui/react"
import { useState, useEffect } from 'react'
import Axios from 'axios'
import FlexBox from './Components/FlexBox';

function App() {

  const [currentPiValue, setCurrentPiValue] = useState();
  const [currentSunCircumference, setCurrentSunCircumference] = useState();

  const [currentPiValue2, setCurrentPiValue2] = useState();
  const [currentSunCircumference2, setCurrentSunCircumference2] = useState();


  const getValuesV1 = async () => {
    await Axios.post(
      `http://localhost:5000/pi-value-v1`
    )
      .catch((err) => {
        console.log(err);
      })
      .then((res) => {
        if (res && res.data) {
          setCurrentPiValue(res.data.piValue);
          setCurrentSunCircumference(res.data.circumferenceValue);
        }
      });
  }

  const getValuesV2 = async () => {
    await Axios.post(
      `http://localhost:5000/pi-value-v2`
    )
      .catch((err) => {
        console.log(err);
      })
      .then((res) => {
        if (res && res.data) {
          setCurrentPiValue2(res.data.piValue);
          setCurrentSunCircumference2(res.data.circumferenceValue);
        }
      });
  }

  useEffect(() => {
    async function initialize() {
      await Axios.get(
        `http://localhost:5000`
      )
    }

    setCurrentPiValue(null);
    setCurrentSunCircumference(null);

    setCurrentPiValue2(null);
    setCurrentSunCircumference2(null);

    initialize();
  }, [])

  useEffect(() => {
    getValuesV1();
    getValuesV2();
  }, [])



  return (
    <ChakraProvider>

      <Center id="parent-center-box">

        <Flex>
          <Text id="topic-text">Calculator of Circumference of Sun</Text>
        </Flex>

        <Grid id="grid-box">
          <Box className="grid-item-box">
            <FlexBox title="Servers' current known value of Pi" value={currentPiValue} />
            <FlexBox title="Circumference of the Sun" value={currentSunCircumference} unit="km" />

            <Button id='btn-grad' onClick={getValuesV1}>Get Pi value decimal point one by one</Button>
          </Box>

          <Box className="grid-item-box">
            <FlexBox title="Servers' current known value of Pi" value={currentPiValue2} />
            <FlexBox title="Circumference of the Sun" value={currentSunCircumference2} unit="km" />

            <Button id='btn-grad' onClick={getValuesV2}>Get increasingly accurate Pi value</Button>
          </Box>
        </Grid>

      </Center>

    </ChakraProvider>
  );
}

export default App;
