import './App.css';
import { ChakraProvider, Center, Text, Button, Flex } from "@chakra-ui/react"
import { useState, useEffect } from 'react'
import Axios from 'axios'
import FlexBox from './Components/FlexBox';

function App() {

  const [currentPiValue, setCurrentPiValue] = useState();
  const [currentSunCircumference, setCurrentSunCircumference] = useState();

  const [click, setClick] = useState(3);

  useEffect(() => {
    async function getValues() {
      await Axios.post(
        `http://localhost:5000/pi-value`, { count: click }
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
    getValues();
  }, [click])

  useEffect(() => {
    async function initialize() {
      await Axios.get(
        `http://localhost:5000`
      )
    }
    initialize();
  }, [])


  return (
    <ChakraProvider>

      <Center id="parent-center-box">
        <Flex>
          <Text id="topic-text">Calculator of Circumference of Sun</Text>
        </Flex>

        <FlexBox title="Servers' current known value of Pi" value={currentPiValue} />
        <FlexBox title="Circumference of the Sun" value={currentSunCircumference} unit="km" />

        <Button id='btn-grad' onClick={() => setClick(click + 1)}>Get more accurate Pi value</Button>
      </Center>

    </ChakraProvider>
  );
}

export default App;
