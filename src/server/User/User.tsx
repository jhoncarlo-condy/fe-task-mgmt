import { AxiosInstance } from '@/utils/axios'
import { useQuery } from '@tanstack/vue-query'

export const loginUser = async ({ email, password }: { email: string; password: string }) => {
  return await AxiosInstance.post('/login', {
    email: email,
    password: password,
  })
    .then((response) => {
      return response.data
    })
    .catch((error) => {
      return error.response?.data
    })
}

export const logoutUser = async () => {
  return await AxiosInstance.post('/logout')
    .then((response) => {
      return response.data
    })
    .catch((error) => {
      return error.response?.data
    })
}

export const registerUser = async ({
  firstName,
  lastName,
  email,
  password,
  passwordConfirmation,
}: {
  firstName: string
  lastName: string
  email: string
  password: string
  passwordConfirmation: string
}) => {
  return await AxiosInstance.post('/register', {
    first_name: firstName,
    last_name: lastName,
    email: email,
    password: password,
    password_confirmation: passwordConfirmation,
  })
    .then((response) => {
      return response.data
    })
    .catch((error) => {
      return error.response?.data
    })
}

export const getUser = async () => {
  return await AxiosInstance.get('/user/profile')
    .then((response) => {
      return response.data
    })
    .catch((error) => {
      return error.response?.data
    })
}

export const useGetUser = () => {
  const { data, error, isLoading } = useQuery({
    queryKey: ['getUser'],
    queryFn: getUser,
    staleTime: Infinity,
  })

  return { data: data, error, isLoading }
}

export const updateUser = async ({
  firstName,
  lastName,
  email,
}: {
  firstName: string
  lastName: string
  email: string
}) => {
  return await AxiosInstance.put(`/user/${email}`, {
    first_name: firstName,
    last_name: lastName,
  })
    .then((response) => {
      return response.data
    })
    .catch((error) => {
      return error.response?.data
    })
}

export const updatePassword = async ({
  oldPassword,
  password,
  passwordConfirmation,
}: {
  oldPassword: string
  password: string
  passwordConfirmation: string
}) => {
  return await AxiosInstance.post('/user/change-password', {
    old_password: oldPassword,
    new_password: password,
    new_password_confirmation: passwordConfirmation,
  })
    .then((response) => {
      return response.data
    })
    .catch((error) => {
      return error.response?.data
    })
}
