import { createClient } from '@supabase/supabase-js'

export default async function handler(req, res) {
  console.log('method:', req.method)
  console.log('body:', req.body)
  console.log('SUPABASE_URL exists:', !!process.env.SUPABASE_URL)
  console.log('SUPABASE_SERVICE_ROLE_KEY exists:', !!process.env.SUPABASE_SERVICE_ROLE_KEY)
  console.log('SUPABASE_URL value:', process.env.SUPABASE_URL)

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const { name, contactMethod, productInterest, message } = req.body || {}

    if (!name || !contactMethod || !message) {
      return res.status(400).json({ error: 'Missing required fields' })
    }

    const supabase = createClient(
      process.env.SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY
    )

    const { data, error } = await supabase.from('contacts').insert([
      {
        name,
        contact_method: contactMethod,
        product_interest: productInterest || null,
        message,
        status: 'new',
      },
    ])

    console.log('insert data:', data)
    console.log('insert error:', error)

    if (error) {
      return res.status(500).json({ error: error.message })
    }

    return res.status(200).json({ success: true })
  } catch (err) {
    console.error('handler catch error:', err)
    console.error('handler catch cause:', err?.cause)
    return res.status(500).json({
      error: err?.message || 'Server error',
    })
  }
}