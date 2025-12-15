import { NextResponse } from "next/server";
import { client } from "@/src/sanity/client";
import { newsQuery } from "@/src/sanity/queries";

export async function GET() {
  try {
    const news = await client.fetch(newsQuery);
    return NextResponse.json(news);
  } catch (error) {
    return NextResponse.json(
      { error: "News 데이터를 불러오는데 실패했습니다." },
      { status: 500 }
    );
  }
}

