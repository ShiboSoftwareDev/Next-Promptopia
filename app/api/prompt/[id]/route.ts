// GET

import connectToDB from "@utils/database";
import Prompt from "@models/prompt";
import { NextResponse } from "next/server";
import { URLParams } from "@global-types";

export const GET = async (request: Request, { params }: URLParams) => {
  try {
    await connectToDB();
    const prompt = await Prompt.findById(params.id).populate("creator");
    if (!prompt) return new NextResponse("Prompt not found", { status: 404 });

    return new NextResponse(JSON.stringify(prompt), { status: 200 });
  } catch (error) {
    return new NextResponse("Failed to fetch all prompts", { status: 500 });
  }
};

// EDIT

export const PATCH = async (request: Request, { params }: URLParams) => {
  const { prompt, tag } = await request.json();

  try {
    await connectToDB();

    const existingPrompt = await Prompt.findById(params.id);
    if (!existingPrompt)
      return new NextResponse("Prompt not found", { status: 404 });

    existingPrompt.prompt = prompt;
    existingPrompt.tag = tag.split("#").join("").split(" ").join("");

    await existingPrompt.save();

    return new NextResponse(JSON.stringify(existingPrompt), { status: 200 });
  } catch (error) {
    return new NextResponse("Failed to update prompt", { status: 500 });
  }
};

// DELETE

export const DELETE = async (request: Request, { params }: URLParams) => {
  try {
    await connectToDB();

    await Prompt.findByIdAndDelete(params.id);

    return new NextResponse("Prompt deleted successfully", { status: 200 });
  } catch (error) {
    return new NextResponse("Failed to delete prompt", { status: 500 });
  }
};
