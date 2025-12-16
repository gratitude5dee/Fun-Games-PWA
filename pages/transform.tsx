"use client";
import { useState } from "react";
import { withAuth } from "../components/withAuth";
import ImageUploader from "../components/ImageUploader";
import CameraCapture from "../components/CameraCapture";
import ImagePreview from "../components/ImagePreview";
import ResultDisplay from "../components/ResultDisplay";
import TransformationProgress from "../components/TransformationProgress";
import { useImageTransform } from "../hooks/useImageTransform";
import { GlassPanel } from "../components/ui/glass-panel";
import { GlowButton } from "../components/ui/glow-button";
import { LoadingSpinner } from "../components/ui/loading-spinner";
import { Camera, Flame, X, Trash2 } from "lucide-react";

function TransformPage() {
  const [sourceImage, setSourceImage] = useState<string | null>(null);
  const [showCamera, setShowCamera] = useState(false);

  const {
    transformedImage,
    isTransforming,
    progress,
    streamEvents,
    transform,
    error,
    reset,
  } = useImageTransform();

  const handleImageSelect = (imageDataUrl: string) => {
    setSourceImage(imageDataUrl);
    setShowCamera(false);
  };

  const handleTransform = async () => {
    if (!sourceImage) return;
    await transform(sourceImage);
  };

  const handleReset = () => {
    reset();
    setSourceImage(null);
  };

  const handleClearSource = () => {
    setSourceImage(null);
    reset();
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] pt-24 pb-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 animate-fade-up">
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-3">
            <span className="text-gradient-gold">Transform Your Image</span>
          </h1>
          <p className="text-white/60 text-lg">
            Upload a photo or take a selfie to get bussed down
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Upload Section */}
          <GlassPanel className="p-6 animate-fade-up animation-delay-100">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-white flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-[#f4a623] text-black text-sm font-bold flex items-center justify-center">
                  1
                </span>
                Select Image
              </h2>
              {sourceImage && !isTransforming && (
                <button
                  onClick={handleClearSource}
                  className="p-2 rounded-lg hover:bg-white/10 transition-colors text-white/60 hover:text-white"
                  aria-label="Clear image"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
            </div>

            {showCamera ? (
              <CameraCapture
                onCapture={handleImageSelect}
                onClose={() => setShowCamera(false)}
              />
            ) : sourceImage ? (
              <div className="space-y-4">
                <ImagePreview src={sourceImage} alt="Selected image" />
                <button
                  onClick={handleClearSource}
                  className="w-full py-2 text-sm text-white/60 hover:text-white transition-colors flex items-center justify-center gap-2"
                >
                  <X className="w-4 h-4" />
                  Choose different image
                </button>
              </div>
            ) : (
              <>
                <ImageUploader onImageSelect={handleImageSelect} />
                <div className="mt-4">
                  <button
                    onClick={() => setShowCamera(true)}
                    className="w-full py-3 px-4 rounded-xl bg-white/5 border border-white/10 text-white/80 hover:bg-white/10 hover:border-[#f4a623]/30 transition-all flex items-center justify-center gap-2"
                  >
                    <Camera className="w-5 h-5" />
                    Take Selfie
                  </button>
                </div>
              </>
            )}
          </GlassPanel>

          {/* Preview & Transform Section */}
          <GlassPanel className="p-6 animate-fade-up animation-delay-200">
            <h2 className="text-xl font-semibold mb-4 text-white flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-[#f4a623] text-black text-sm font-bold flex items-center justify-center">
                2
              </span>
              Transform
            </h2>

            {sourceImage ? (
              <div className="space-y-4">
                {!transformedImage && !isTransforming && (
                  <div className="aspect-square rounded-xl bg-white/5 border border-dashed border-white/10 flex items-center justify-center">
                    <div className="text-center p-6">
                      <Flame className="w-12 h-12 text-[#f4a623] mx-auto mb-3 animate-float" />
                      <p className="text-white/60 text-sm">
                        Ready to transform your image
                      </p>
                    </div>
                  </div>
                )}

                {isTransforming && (
                  <div className="aspect-square rounded-xl bg-white/5 flex items-center justify-center">
                    <div className="text-center p-6">
                      <div className="relative">
                        <div className="w-20 h-20 rounded-full border-4 border-[#f4a623]/20 border-t-[#f4a623] animate-spin mx-auto" />
                        <Flame className="w-8 h-8 text-[#f4a623] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                      </div>
                      <p className="text-white/80 mt-4 font-medium">
                        Bussing it down...
                      </p>
                    </div>
                  </div>
                )}

                {!transformedImage && (
                  <GlowButton
                    onClick={handleTransform}
                    disabled={isTransforming}
                    className="w-full"
                    size="lg"
                  >
                    {isTransforming ? (
                      <>
                        <LoadingSpinner size="sm" />
                        Transforming...
                      </>
                    ) : (
                      <>
                        <Flame className="w-5 h-5" />
                        BUSS IT DOWN
                      </>
                    )}
                  </GlowButton>
                )}

                {isTransforming && (
                  <TransformationProgress
                    progress={progress}
                    events={streamEvents}
                  />
                )}
              </div>
            ) : (
              <div className="aspect-square rounded-xl border-2 border-dashed border-white/10 flex items-center justify-center">
                <p className="text-white/40 text-center px-4">
                  Select an image first to transform
                </p>
              </div>
            )}
          </GlassPanel>

          {/* Result Section */}
          <GlassPanel className="p-6 animate-fade-up animation-delay-300">
            <h2 className="text-xl font-semibold mb-4 text-white flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-[#f4a623] text-black text-sm font-bold flex items-center justify-center">
                3
              </span>
              Result
            </h2>

            {error && (
              <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 mb-4">
                <p className="font-medium mb-1">Error</p>
                <p className="text-sm text-red-400/80">{error}</p>
              </div>
            )}

            {transformedImage ? (
              <ResultDisplay
                originalImage={sourceImage!}
                transformedImage={transformedImage}
                onReset={handleReset}
              />
            ) : (
              <div className="aspect-square rounded-xl border-2 border-dashed border-white/10 flex items-center justify-center">
                <div className="text-center px-4">
                  <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-3">
                    <Flame className="w-8 h-8 text-white/20" />
                  </div>
                  <p className="text-white/40">
                    {isTransforming
                      ? "Your bussed down image is cooking..."
                      : "Your transformed image will appear here"}
                  </p>
                </div>
              </div>
            )}
          </GlassPanel>
        </div>
      </div>
    </div>
  );
}

export default withAuth(TransformPage);
