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
