import { HStack, VStack, IconButton, useTheme, Text, Heading, FlatList } from "native-base";
import { useState } from "react";
import { SignOut } from "phosphor-react-native";
import Logo from '../../assets/logo_secondary.svg'
import { Filter } from "../../components/Filter";
import { Order, OrderProps } from "../../components/Order";

export function Home() {

const [isStatusSelected, setIsStatusSelected] = useState<'open' | 'closed' >('open')
const [isOrder, setIsOrder] = useState<OrderProps[]>([{
  id: '123',
  patrimony: '123456',
  when: '18/45/1526 ás 10:30',
  status: 'open'
}])
const {colors} = useTheme();

  return(
    <VStack flex={1} pb={6} bg="gray.700">
       <HStack
       w="full"
       justifyContent="space-between"
       alignItems="center"
       bg="gray.600"
       pt={12}
       pb={5}
       px={6}
       >
      <Logo/>
      <IconButton
        icon={<SignOut size={26} color={colors.gray[300]} />}
      />
       </HStack>
        <VStack flex={1} px={6}>
          <HStack w="full" mt={8} mb={4} justifyContent="space-between" alignItems="center">
            <Heading color="gray.100">
              Meus chamados
            </Heading>
          <Text color="gray.200">
            3
          </Text>
          </HStack>
           <HStack space={3} mb={8}>
            <Filter
              type="open"
              title="em andamento"
              onPress={() => setIsStatusSelected('open')}
              isActive={isStatusSelected === 'open'}
             />
             <Filter
              type="closed"
              title="finalizados"
              onPress={() => setIsStatusSelected('closed')}
              isActive={isStatusSelected === 'closed'}
             />
          </HStack>
          <FlatList
           data={isOrder}
           keyExtractor={item => item.id}
           renderItem={({item}) => <Order data={item} />} 
          />
        </VStack>
    </VStack>
  )
}  