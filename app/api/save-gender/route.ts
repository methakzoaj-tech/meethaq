import { NextResponse } from 'next/server'
import { supabase } from '@/app/supabaseClient'

export async function POST(req: Request) {
  const { gender } = await req.json()

  if (!gender) {
    return NextResponse.json({ error: 'gender is required' }, { status: 400 })
  }

  // نحفظ اختيار الجنس في جدول answers أو جدول users
  const { error } = await supabase
    .from('answers')
    .insert([
      {
        question_id: 0, // سؤال "من أنت؟"
        answer: gender
      }
    ])

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ success: true })
}
