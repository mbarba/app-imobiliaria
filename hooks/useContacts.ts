import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import * as contactsService from '@/lib/services/contacts'

export function useCreateContact() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: contactsService.createContact,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['contacts'] })
      toast.success('Mensagem enviada com sucesso!')
    },
    onError: (error) => {
      console.error('Error creating contact:', error)
      toast.error('Erro ao enviar mensagem')
    }
  })
}

export function usePropertyContacts(propertyId: string) {
  return useQuery({
    queryKey: ['contacts', 'property', propertyId],
    queryFn: () => contactsService.getContactsByProperty(propertyId)
  })
}

export function useAgentContacts(agentId: string) {
  return useQuery({
    queryKey: ['contacts', 'agent', agentId],
    queryFn: () => contactsService.getContactsByAgent(agentId)
  })
}
