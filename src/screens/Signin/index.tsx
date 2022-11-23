import { useState } from 'react';
import { VStack, Heading, Icon, useTheme } from 'native-base';
import {User, Key } from 'phosphor-react-native';
import Logo from '../../assets/logo_primary.svg'
import { Inpunt } from '../../components/Input';
import { Button } from '../../components/Button';

export function Signin() {

const [isName, setIsName] = useState('')
const [isSenha, setIsSenha] = useState('')
const { colors } = useTheme()

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
      onChangeText={setIsName}
      />

      <Inpunt
      placeholder="Senha"
      InputLeftElement={<Icon as={<Key color={colors.gray[300]} />} ml={4}/>}
      secureTextEntry
      mb={6}
      onChangeText={setIsSenha}
      />

      <Button title="Entrar" w="full"/>
    </VStack>
  )
} 