import { NextResponse } from "next/server";
import pdfParse from "pdf-parse";

export async function POST(req) {
  try {
    const formData = await req.formData();
    const file = formData.get("resume");

    if (!file) {
      return NextResponse.json({ error: "No resume file provided" }, { status: 400 });
    }

    const buffer = await file.arrayBuffer();
    const parsedData = await pdfParse(Buffer.from(buffer));

    return NextResponse.json({ text: parsedData.text });
  } catch (error) {
    console.error("Error parsing resume:", error);
    return NextResponse.json({ error: "Failed to parse resume PDF" }, { status: 500 });
  }
}
