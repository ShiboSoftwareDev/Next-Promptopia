import connectToDB from "@utils/database";
import Prompt from "@models/prompt";
import { NextResponse } from "next/server";
import { URLParams } from "@global-types";

export const GET = async (request: Request, { params }: URLParams) => {
  try {
    await connectToDB();
    const prompts = await Prompt.find({ creator: params.id }).populate(
      "creator"
    );

    return new NextResponse(JSON.stringify(prompts), { status: 200 });
  } catch (error) {
    return new NextResponse("Failed to fetch all prompts", { status: 500 });
  }
};
