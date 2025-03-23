import { supabase } from '@/lib/supabase'
import { Database } from '@/types/supabase'

export type Loan = Database['public']['Tables']['loans']['Row']
export type LoanInsert = Database['public']['Tables']['loans']['Insert']

export type LoanWithBackerCount = Loan & { backer_count: number }

export async function createLoan(loan: LoanInsert): Promise<Loan | null> {
  const { data, error } = await supabase
    .from('loans')
    .insert([loan])
    .select()
    .single()

  if (error) {
    console.error('Error creating loan:', error)
    return null
  }

  return data
}

export async function getLoanById(id: string): Promise<Loan | null> {
  const { data, error } = await supabase
    .from('loans')
    .select('*')
    .eq('id', id)
    .single()

  if (error) {
    console.error('Error fetching loan:', error)
    return null
  }

  return data
}

export async function getLoansByBorrowerId(borrowerId: string): Promise<LoanWithBackerCount[] | null> {
  const { data, error } = await supabase
    .from('loans')
    .select(`
      *,
      backer_count:loan_backings(count)
    `)
    .eq('borrower_id', borrowerId)

  if (error) {
    console.error('Error fetching loans:', error)
    return null
  }

  // Transform the count from { count: number } to just number for each loan
  return data ? data.map(loan => ({
    ...loan,
    backer_count: loan.backer_count[0]?.count ?? 0
  })) : null
}

export async function updateLoan(id: string, updates: Partial<Loan>): Promise<Loan | null> {
  const { data, error } = await supabase
    .from('loans')
    .update(updates)
    .eq('id', id)
    .select()
    .single()

  if (error) {
    console.error('Error updating loan:', error)
    return null
  }

  return data
}