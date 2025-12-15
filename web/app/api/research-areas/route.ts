import { NextResponse } from "next/server";
import { client } from "@/src/sanity/client";
import { researchAreasQuery } from "@/src/sanity/queries";

export async function GET() {
  try {
    const researchAreas = await client.fetch(researchAreasQuery);
    return NextResponse.json(researchAreas);
  } catch (error) {
    return NextResponse.json(
      { error: "Research Areas 데이터를 불러오는데 실패했습니다." },
      { status: 500 }
    );
  }
}

