import connectToDB from "@utils/database";
import Prompt from "@models/prompt";
import { NextResponse } from "next/server";

export const GET = async (request: Request) => {
  const url = new URL(request.url);
  const searchParams = new URLSearchParams(url.searchParams);
  const query = searchParams.get("query") || "";

  try {
    await connectToDB();
    const prompts = await Prompt.find({
      $or: [
        {
          prompt: new RegExp("" + query + "", "i"),
        },
        {
          tag: new RegExp("" + query + "", "i"),
        },
        {
          username: new RegExp("" + query + "", "i"),
        },
      ],
    }).populate("creator");

    return new NextResponse(JSON.stringify(prompts), { status: 200 });
  } catch (error) {
    return new NextResponse("Failed to fetch all prompts", { status: 500 });
  }
};
