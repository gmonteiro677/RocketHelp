import { VStack } from "native-base";
import { Header } from "../../components/Header";
import { Inpunt } from "../../components/Input";
import { Button } from "../../components/Button";

export function Register() {
  return(
    <VStack flex={1} p={6} bg="gray.600">
     <Header title="Nova solicitação" /> 

     <Inpunt
       placeholder="Numero do patrimônio"
       mt={4}
     />

     <Inpunt
       placeholder="Descrição do problema"
       flex={1}
       mt={5}
       multiline
       textAlignVertical="top"
     />

     <Button
        title="Cadastrar"
        mt={5}
     />
    </VStack>
  )
}