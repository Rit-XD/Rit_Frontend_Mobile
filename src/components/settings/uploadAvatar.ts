export async function handleUploadAvatar(
  url: string
): Promise<{error: string}> {
  
  const logo: string = url

  let query = supabaseAdmin
    .from('Carecenter')
    .update({
      logo
    })
    .eq('id', user!.id)
    .select()
  const res = await query
  console.log(res)
  return {error: '', ...res.data}
}
