import { useState, useEffect } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import * as propertiesService from '@/lib/services/properties'
import { Database } from '@/types/database'

type Property = Database['public']['Tables']['properties']['Row'] & {
  property_images: Database['public']['Tables']['property_images']['Row'][]
}

export function useProperties(filters?: Parameters<typeof propertiesService.getProperties>[0]) {
  return useQuery({
    queryKey: ['properties', filters],
    queryFn: () => propertiesService.getProperties(filters)
  })
}

export function useProperty(id: string) {
  return useQuery({
    queryKey: ['property', id],
    queryFn: () => propertiesService.getPropertyById(id)
  })
}

export function useCreateProperty() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ property, images }: { 
      property: Parameters<typeof propertiesService.createProperty>[0],
      images: File[]
    }) => propertiesService.createProperty(property, images),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['properties'] })
      toast.success('Imóvel cadastrado com sucesso!')
    },
    onError: (error) => {
      console.error('Error creating property:', error)
      toast.error('Erro ao cadastrar imóvel')
    }
  })
}

export function useUpdateProperty() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, property, images }: {
      id: string,
      property: Parameters<typeof propertiesService.updateProperty>[1],
      images?: File[]
    }) => propertiesService.updateProperty(id, property, images),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['properties'] })
      queryClient.invalidateQueries({ queryKey: ['property', variables.id] })
      toast.success('Imóvel atualizado com sucesso!')
    },
    onError: (error) => {
      console.error('Error updating property:', error)
      toast.error('Erro ao atualizar imóvel')
    }
  })
}

export function useDeleteProperty() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: propertiesService.deleteProperty,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['properties'] })
      toast.success('Imóvel removido com sucesso!')
    },
    onError: (error) => {
      console.error('Error deleting property:', error)
      toast.error('Erro ao remover imóvel')
    }
  })
}
