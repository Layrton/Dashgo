import {
  Box,
  Button,
  Divider,
  Flex,
  Heading,
  HStack,
  SimpleGrid,
  VStack,
} from '@chakra-ui/react'
import Link from 'next/link'
import { Input } from '../../components/Form/Input'
import { Header } from '../../components/Header'
import { Sidebar } from '../../components/Sidebar'
import * as y from 'yup'
import { useForm, SubmitHandler } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from 'react-query'
import { api } from '../../services/api'
import { queryClient } from '../../services/queryClient'
import { useRouter } from 'next/router'

type CreateUserFormData = {
  name: string
  email: string
  password: string
  password_confirmation: string
}

const createUserFormSchema = y.object().shape({
  name: y.string().required('Nome obrigatório'),
  email: y.string().required('E-mail obrigatório').email('E-mail invalido'),
  password: y
    .string()
    .required('Senha obrigatória')
    .min(6, 'No mínimo 6 caracteres'),
  password_confirmation: y
    .string()
    .oneOf([null, y.ref('password')], 'As senhas precisam ser iguais'),
})

export default function CreateUser() {
  const router = useRouter()

  const createUser = useMutation(
    async (user: CreateUserFormData) => {
      const response = await api.post('users', {
        user: {
          ...user,
          created_at: new Date(),
        },
      })
      return response.data.user
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('users')
      },
    },
  )

  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(createUserFormSchema),
  })
  const errors = formState.errors

  const handleCreateUser: SubmitHandler<CreateUserFormData> = (values) => {
    createUser.mutateAsync(values)
    router.push('/users')
  }

  return (
    <Box>
      <Header />
      <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
        <Sidebar />
        <Box
          as="form"
          flex="1"
          borderRadius="8"
          bg="gray.800"
          p={['6', '8']}
          onSubmit={handleSubmit(handleCreateUser as any)}
        >
          <Heading size="lg" fontWeight="normal">
            Criar usuário
          </Heading>
          <Divider my="6" borderColor="gray.700" />

          <VStack spacing="8">
            <SimpleGrid minChildWidth="240px" spacing={['6', '8']} w="100%">
              <Input
                type="text"
                label="Nome Completo"
                {...register('name')}
                error={errors.name as any}
              />
              <Input
                type="email"
                label="E-mail"
                {...register('email')}
                error={errors.email as any}
              />
            </SimpleGrid>
            <SimpleGrid minChildWidth="240px" spacing={['6', '8']} w="100%">
              <Input
                type="password"
                label="Senha"
                {...register('password')}
                error={errors.password as any}
              />
              <Input
                type="password"
                label="Confirmação da senha"
                {...register('password_confirmation')}
                error={errors.password_confirmation as any}
              />
            </SimpleGrid>
          </VStack>
          <Flex mt="8" justify="flex-end">
            <HStack spacing="4">
              <Link href="/users">
                <Button colorScheme="whiteAlpha">Cancelar</Button>
              </Link>
              <Button
                type="submit"
                colorScheme="pink"
                isLoading={formState.isSubmitting}
              >
                Salvar
              </Button>
            </HStack>
          </Flex>
        </Box>
      </Flex>
    </Box>
  )
}
