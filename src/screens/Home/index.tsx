import { useState, useEffect } from "react";
import { Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { SignOut, ChatTeardropText } from "phosphor-react-native";

import { HStack, VStack, IconButton, useTheme, Text, Heading, FlatList, Center } from "native-base";
import firestore from "@react-native-firebase/firestore"
import auth from '@react-native-firebase/auth';
import { dateFormat } from "../../utils/firestoreDateFormat";

import { Filter } from "../../components/Filter";
import { Order, OrderProps } from "../../components/Order";
import { Button } from "../../components/Button";
import { Loading } from "../../components/Loading";
import Logo from '../../assets/logo_secondary.svg'

export function Home() {
const [isLoading, setIsLoading] = useState(true)
const [isStatusSelected, setIsStatusSelected] = useState<'open' | 'closed' >('open')
const [isOrder, setIsOrder] = useState<OrderProps[]>([])

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

  useEffect(() => {
    setIsLoading(true)

    const subscriber = firestore()
    .collection('orders')
    .where('status', '==', isStatusSelected )
    .onSnapshot(snapshot => {
      const data = snapshot.docs.map(doc => {
         const { patrimony, description, status, created_at } = doc.data()

         return {
           id: doc.id,
           patrimony,
           description,
           status,
           when: dateFormat(created_at)
         }
      })

      setIsOrder(data)
      setIsLoading(false)

    })

      return subscriber

  }, [isStatusSelected])

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
            {isOrder.length}
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
          {
            isLoading ? <Loading /> :
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
           }
          <Button
          title="Nova solicitação"
          onPress={handleNemOrder}
          />
        </VStack>
    </VStack>
  )
}  