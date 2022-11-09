import { Button, Flex, Stack } from '@chakra-ui/react'
import { Input } from '../components/Form/Input'
import { useForm, SubmitHandler } from 'react-hook-form'
import * as y from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

type SignInFormData = {
  email: string
  password: string
}

const signInFormSchema = y.object().shape({
  email: y.string().required('E-mail obrigatório').email('E-mail inválido'),
  password: y.string().required('Senha obrigatória'),
})

export default function SignIn() {
  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(signInFormSchema),
  })

  const errors = formState.errors

  console.log(errors)

  const handleSignIn: SubmitHandler<SignInFormData> = (data, event) => {
    console.log(data)
  }

  return (
    <Flex w="100vw" h="100vh" alignItems="center" justifyContent="center">
      <Flex
        as="form"
        width="100%"
        maxWidth={360}
        bg="gray.800"
        p={8}
        borderRadius={8}
        flexDir="column"
        onSubmit={handleSubmit(handleSignIn as any)}
      >
        <Stack spacing={4}>
          <Input
            error={errors.email as any}
            type="email"
            label="E-mail"
            {...register('email')}
          />
          <Input
            error={errors.password as any}
            type="password"
            label="Senha"
            {...register('password')}
          />
        </Stack>
        <Button
          type="submit"
          mt="6"
          size="lg"
          colorScheme="pink"
          isLoading={formState.isSubmitting}
        >
          Entrar
        </Button>
      </Flex>
    </Flex>
  )
}
