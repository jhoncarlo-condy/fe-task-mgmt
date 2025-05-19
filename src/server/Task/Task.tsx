import { AxiosInstance } from '@/utils/axios'
import { useQuery } from '@tanstack/vue-query'
import type { Ref } from 'vue'

export const getTasks = async (page = 1) => {
  return await AxiosInstance.get('/tasks', {
    params: { page },
  })
    .then((response) => response.data)
    .catch((error) => error.response?.data)
}

export const useGetTasks = (page: Ref<number>) => {
  const { data, error, isLoading } = useQuery({
    queryKey: ['getTasks', page],
    queryFn: () => getTasks(page.value),
    staleTime: Infinity,
  })

  return { data, error, isLoading }
}

export const createTask = async ({
  title,
  description,
  status,
  priority,
}: {
  title: string
  description: string
  status: string
  priority: string
}) => {
  return await AxiosInstance.post('/tasks', {
    title: title,
    description: description,
    status: status.toLowerCase(),
    priority: priority,
  })
    .then((response) => response.data)
    .catch((error) => error.response?.data)
}

export const editTask = async ({
  id,
  title,
  description,
  status,
  priority,
}: {
  id: number
  title: string
  description: string
  status: string
  priority: string
}) => {
  return await AxiosInstance.put(`/tasks/${id}`, {
    title: title,
    description: description,
    status: status.toLowerCase(),
    priority: priority,
  })
    .then((response) => response.data)
    .catch((error) => error.response?.data)
}
