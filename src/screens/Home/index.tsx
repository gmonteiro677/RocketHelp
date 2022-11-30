import { HStack, VStack, IconButton, useTheme, Text, Heading, FlatList, Center } from "native-base";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { SignOut, ChatTeardropText } from "phosphor-react-native";
import Logo from '../../assets/logo_secondary.svg'
import { Filter } from "../../components/Filter";
import { Order, OrderProps } from "../../components/Order";
import { Button } from "../../components/Button";
import auth from '@react-native-firebase/auth';
import { Alert } from "react-native";

export function Home() {

const [isStatusSelected, setIsStatusSelected] = useState<'open' | 'closed' >('open')
const [isOrder, setIsOrder] = useState<OrderProps[]>([
  {
   id: '123',
   patrimony: '123456',
   when: '18/45/1526 ás 10:30',
   status: 'open'
  }
])

const navigation = useNavigation()
const {colors} = useTheme();

function handleNemOrder() {
  navigation.navigate('novo')
}

function handleOpenDetails(orderId: string) {
  navigation.navigate('details', {orderId})
}

  function handleLogout() {
      auth()
      .signOut()
      .catch(error => {
        return Alert.alert('Sair', 'Não foi possivel sair.')
      })
  }

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
        onPress={handleLogout}
        icon={<SignOut size={26} color={colors.gray[300]} />}
      />
       </HStack>
        <VStack flex={1} px={6}>
          <HStack w="full" mt={8} mb={4} justifyContent="space-between" alignItems="center">
            <Heading color="gray.100">
              Solicitações
            </Heading>
          <Text color="gray.200">
            {Order.length}
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
           renderItem={({item}) => <Order data={item} onPress={() => handleOpenDetails(item.id)} />} 
           showsVerticalScrollIndicator={false}
           _contentContainerStyle={{ paddingBottom: 100}}
           ListEmptyComponent={() => (
            <Center>
              <ChatTeardropText color={colors.gray[300]} size={40} />
              <Text color="gray.300" fontSize="xl" mt={6} textAlign="center">
                Você ainda não possui {'\n'}
                solicitações {isStatusSelected === "open" ? "em andamento" : "finalizadas"}
              </Text>
            </Center>
           )}
          />
          <Button
          title="Nova solicitação"
          onPress={handleNemOrder}
          />
        </VStack>
    </VStack>
  )
}  