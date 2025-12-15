import type { NextApiRequest, NextApiResponse } from "next";
import { fal } from "@fal-ai/client";

// Configure fal client with API key
fal.config({
  credentials: process.env.FAL_KEY,
});

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "10mb",
    },
  },
};

interface GenerateRequest {
  image: string; // Base64 image data URL
}

interface GenerateResponse {
  success: boolean;
  imageUrl?: string;
  error?: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<GenerateResponse>
) {
  if (req.method !== "POST") {
    return res.status(405).json({ success: false, error: "Method not allowed" });
  }

  try {
    const { image } = req.body as GenerateRequest;

    if (!image) {
      return res.status(400).json({ success: false, error: "No image provided" });
    }

    // Validate that we have a data URL
    if (!image.startsWith("data:image")) {
      return res.status(400).json({ success: false, error: "Invalid image format" });
    }

    // Upload the base64 image to fal storage first
    const base64Data = image.split(",")[1];
    const mimeType = image.split(";")[0].split(":")[1];
    const imageBuffer = Buffer.from(base64Data, "base64");

    // Create a Uint8Array from buffer for Blob compatibility
    const uint8Array = new Uint8Array(imageBuffer);
    const blob = new Blob([uint8Array], { type: mimeType });
    const uploadedUrl = await fal.storage.upload(blob);

    console.log("Image uploaded to fal storage:", uploadedUrl);

    // Call the flux-kontext-lora model with the custom LoRA
    const result = await fal.subscribe("fal-ai/flux-kontext-lora", {
      input: {
        prompt: "buss down",
        image_url: uploadedUrl,
        loras: [
          {
            path: "https://v3.fal.media/files/monkey/01u1Tzt979b9YgJamxzOD_adapter_model.safetensors",
            scale: 1,
          },
        ],
        guidance_scale: 7.5,
        num_inference_steps: 28,
        seed: Math.floor(Math.random() * 1000000),
      },
      logs: true,
      onQueueUpdate: (update) => {
        console.log("Queue update:", update.status);
      },
    });

    console.log("Generation result:", JSON.stringify(result, null, 2));

    // Extract the generated image URL from result
    // The fal.ai response structure may vary, so we check multiple paths
    const data = result.data as Record<string, unknown>;
    let generatedImageUrl: string | undefined;

    if (data?.images && Array.isArray(data.images) && data.images[0]) {
      generatedImageUrl = (data.images[0] as { url?: string })?.url;
    } else if (data?.image && typeof data.image === "object") {
      generatedImageUrl = (data.image as { url?: string })?.url;
    } else if (typeof data?.image === "string") {
      generatedImageUrl = data.image;
    }

    if (!generatedImageUrl) {
      console.error("No image URL in result:", result);
      throw new Error("No image generated");
    }

    return res.status(200).json({
      success: true,
      imageUrl: generatedImageUrl,
    });
  } catch (error) {
    console.error("Generation error:", error);
    return res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : "Generation failed",
    });
  }
}
