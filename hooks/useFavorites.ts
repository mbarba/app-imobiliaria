import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import * as favoritesService from '@/lib/services/favorites'

export function useToggleFavorite() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ propertyId, userId }: { propertyId: string, userId: string }) => 
      favoritesService.toggleFavorite(propertyId, userId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['favorites'] })
    },
    onError: (error) => {
      console.error('Error toggling favorite:', error)
      toast.error('Erro ao atualizar favoritos')
    }
  })
}

export function useUserFavorites(userId: string) {
  return useQuery({
    queryKey: ['favorites', userId],
    queryFn: () => favoritesService.getUserFavorites(userId),
    enabled: !!userId
  })
}

export function useIsFavorite(propertyId: string, userId: string) {
  return useQuery({
    queryKey: ['favorite', propertyId, userId],
    queryFn: () => favoritesService.isFavorite(propertyId, userId),
    enabled: !!userId
  })
}
