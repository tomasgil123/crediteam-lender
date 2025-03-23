import { supabase } from '@/lib/supabase'
import { Database } from '@/types/supabase'

export type LoanBacking = Database['public']['Tables']['loan_backings']['Row']
export type LoanBackingInsert = Database['public']['Tables']['loan_backings']['Insert']

export async function createLoanBacking(loanBacking: LoanBackingInsert): Promise<LoanBacking | null> {
  const { data, error } = await supabase
    .from('loan_backings')
    .insert([loanBacking])
    .select()
    .single()

  if (error) {
    console.error('Error creating loan backing:', error)
    return null
  }

  return data
}

export async function getLoanBackingsByUserId(userId: string): Promise<LoanBacking[] | null> {
  const { data, error } = await supabase
    .from('loan_backings')
    .select('*')
    .eq('backer_id', userId)

  if (error) {
    console.error('Error fetching loan backings:', error)
    return null
  }

  return data
}