import { supabase } from '@/lib/supabase'
import { Database } from '@/types/supabase'

export type User = Database['public']['Tables']['users']['Row']
export type UserInsert = Database['public']['Tables']['users']['Insert']

export async function createUser(user: UserInsert): Promise<User | null> {
  const { data, error } = await supabase
    .from('users')
    .insert([user])
    .select()
    .single()

  if (error) {
    console.error('Error creating user:', error)
    return null
  }

  return data
}

export async function getUserByWorldUserId(
  worldUserId: string
): Promise<User | null> {
  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("world_user_id", worldUserId)
    .single();

  if (error) {
    console.error('Error fetching user:', error)
    return null
  }

  return data
}
