import { useState } from 'react';
import auth from '@react-native-firebase/auth';
import { Alert } from 'react-native';
import { VStack, Heading, Icon, useTheme } from 'native-base';
import {User, Key } from 'phosphor-react-native';
import Logo from '../../assets/logo_primary.svg'
import { Inpunt } from '../../components/Input';
import { Button } from '../../components/Button';

export function Signin() {

const [isLoading, setIsloading] = useState(false)
const [isEmail, setIsEmail] = useState('')
const [isSenha, setIsSenha] = useState('')
const { colors } = useTheme()

function handleSignIn() {
  if (!isEmail || !isSenha) {
    return Alert.alert('Entrar', 'Informe e-mail e senha.')
  }
  setIsloading(true);

  auth()
  .signInWithEmailAndPassword(isEmail, isSenha)
  .catch((error) => {
    console.log(error);
    setIsloading(false); 

    if(error.code === 'auth/invalid-email') {
      return Alert.alert('Entrar', 'E-mail ou senha inválido')
    }

    if(error.code === 'auth/wrong-password') {
      return Alert.alert('Entrar', 'E-mail ou senha inválido')
   }
    
    if(error.code === 'auth/user-not-found') {
       return Alert.alert('Entrar', 'E-mail ou senha inválido')
    }

    return Alert.alert('Entrar', 'Não foi possivel acessar')

  })
}

  return(
    <VStack flex={1} alignItems="center" bg="gray.600" px={8} pt={24}>
      <Logo/>
      <Heading color={"gray.100"} fontSize="xl" mt={20} mb={6}>
        Acesse sua conta
      </Heading>
      <Inpunt 
      placeholder="Usuario"
      mb={4}
      InputLeftElement={<Icon as={<User color={colors.gray[300]} />} ml={4} />}
      onChangeText={setIsEmail}
      />

      <Inpunt
      placeholder="Senha"
      InputLeftElement={<Icon as={<Key color={colors.gray[300]} />} ml={4}/>}
      secureTextEntry
      mb={6}
      onChangeText={setIsSenha}
      />

      <Button
      title="Entrar"
      w="full"
      onPress={handleSignIn}
      isLoading={isLoading}
      />
    </VStack>
  )
} 