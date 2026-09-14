
export default async function parseRecipe(image:File | null){
  try{
    const formData = new FormData();
    if (!image) {
      return;
    }
    formData.append('image', image);

    const response = await fetch('/api/gemini',{
      method:'POST',
      body: formData,
    });

    const data = await response.json();

    console.log('status:', response.status);
    console.log('response:', data);

    if (!response.ok) {
      throw new Error(data.error || 'AIレシピ生成に失敗しました');
    }
  } catch (error) {
    console.error(error);
  }
}