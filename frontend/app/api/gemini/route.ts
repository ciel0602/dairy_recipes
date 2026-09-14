import { GoogleGenAI } from '@google/genai';
import { NextResponse } from 'next/server';
import { recipeSchema } from './recipeSchema';

const gemini = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

export async function POST(request: Request) {
  try {
    const formData = await request.formData();

    const image = formData.get('image');

    if (!(image instanceof File)) {
      return NextResponse.json(
        { error: '画像が送信されていません' },
        { status: 400 }
      );
    }
    const bytes = await image.arrayBuffer();
    const base64Image = Buffer.from(bytes).toString('base64');  
    const prompt = `
あなたはレシピ情報を構造化するAIです。

添付された画像からレシピ情報を読み取り、
JSON形式で返してください。
画像から読み取れない情報は推測せず、
空文字にしてください。

JSON以外の文章は返さないでください。
`;
    const response = await gemini.models.generateContent({
      model: 'gemini-3.6-flash',
      // contents:'軽く自己紹介をしてください。'
      contents: [
        {
          role: 'user',
          parts: [
            {
              text: prompt,
            },
            {
              inlineData: {
                mimeType: image.type,
                data: base64Image,
              },
            },
          ],
        },
      ],
      config: {
        responseMimeType: 'application/json',
        responseSchema: recipeSchema,
      },
    });
    const text = response.text;
    if (!text) {
      throw new Error('Geminiから回答が返ってきませんでした');
    }
    const recipe = JSON.parse(text);
    console.log(recipe)

    return NextResponse.json({recipe,});
  }catch(error) {
    return NextResponse.json(
      {
      error: error instanceof Error ? error.message : String(error),
      cause: error && typeof error === 'object' && 'cause' in error ? String((error).cause) : undefined,
    },
    { status: 500 }
    );
  }
  
}