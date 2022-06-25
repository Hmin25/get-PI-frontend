import { Flex, Text } from "@chakra-ui/react"
import '../App.css';

export default function FlexBox({title, value, unit}) {

    return (
        <Flex className="flexbox">
            <Text className="title-text">{title}</Text>
            <Text className="value-text">{value} {unit}</Text>
        </Flex>
    )
}