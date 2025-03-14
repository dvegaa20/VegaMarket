"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Maximize2,
  Minimize2,
  Smartphone,
  Tablet,
  Monitor,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { templates } from "@/lib/data";

interface PreviewPageProps {
  params: {
    id: string;
  };
}

export default function PreviewPage({ params }: PreviewPageProps) {
  const router = useRouter();
  const [viewMode, setViewMode] = useState<"desktop" | "tablet" | "mobile">(
    "desktop"
  );
  const [isFullscreen, setIsFullscreen] = useState(false);

  const template = templates.find((t) => t.id === params.id);

  if (!template) {
    router.push("/templates");
    return null;
  }

  // Toggle fullscreen
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().then(() => {
        setIsFullscreen(true);
      });
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().then(() => {
          setIsFullscreen(false);
        });
      }
    }
  };

  // Listen for fullscreen change
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);

    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, []);

  // Get preview width based on view mode
  const getPreviewWidth = () => {
    switch (viewMode) {
      case "mobile":
        return "w-[375px]";
      case "tablet":
        return "w-[768px]";
      case "desktop":
      default:
        return "w-full";
    }
  };

  return (
    <div className="flex flex-col h-screen">
      {/* Preview Header */}
      <div className="flex items-center justify-between border-b p-4">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={() => router.back()}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="font-semibold">{template.title} - Preview</h1>
        </div>

        <div className="flex items-center gap-2">
          <div className="border rounded-md flex">
            <Button
              variant={viewMode === "mobile" ? "secondary" : "ghost"}
              size="icon"
              onClick={() => setViewMode("mobile")}
              className="rounded-none border-r"
            >
              <Smartphone className="h-5 w-5" />
            </Button>
            <Button
              variant={viewMode === "tablet" ? "secondary" : "ghost"}
              size="icon"
              onClick={() => setViewMode("tablet")}
              className="rounded-none border-r"
            >
              <Tablet className="h-5 w-5" />
            </Button>
            <Button
              variant={viewMode === "desktop" ? "secondary" : "ghost"}
              size="icon"
              onClick={() => setViewMode("desktop")}
            >
              <Monitor className="h-5 w-5" />
            </Button>
          </div>

          <Button variant="ghost" size="icon" onClick={toggleFullscreen}>
            {isFullscreen ? (
              <Minimize2 className="h-5 w-5" />
            ) : (
              <Maximize2 className="h-5 w-5" />
            )}
          </Button>

          <Button
            variant="outline"
            onClick={() => router.push(`/templates/${template.id}`)}
          >
            Buy Template
          </Button>
        </div>
      </div>

      {/* Preview Content */}
      <div className="flex-1 bg-muted p-4 overflow-auto">
        <div
          className={`mx-auto bg-background h-full ${getPreviewWidth()} shadow-lg overflow-hidden transition-all duration-300`}
        >
          <iframe
            src={template.demoUrl || "https://example.com"}
            className="w-full h-full border-0"
            title={`${template.title} preview`}
          />
        </div>
      </div>
    </div>
  );
}
