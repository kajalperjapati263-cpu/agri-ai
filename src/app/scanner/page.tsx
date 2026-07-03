"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Upload, Camera, LeafyGreen, AlertTriangle, Droplet, Bug, Search } from "lucide-react";
import { GlassCard } from "@/components/GlassCard";
import { cn } from "@/lib/utils";

export default function ScannerPage() {
  const [isScanning, setIsScanning] = React.useState(false);
  const [result, setResult] = React.useState<any>(null);

  const handleScan = () => {
    setIsScanning(true);
    setResult(null);
    
    // Mock scanning process
    setTimeout(() => {
      setIsScanning(false);
      setResult({
        disease: "Leaf Blight",
        confidence: 94,
        status: "Critical",
        recommendations: [
          "Apply Mancozeb 75% WP @ 2.5g/litre of water.",
          "Ensure proper drainage to reduce humidity.",
          "Remove and destroy heavily infected lower leaves."
        ]
      });
    }, 2500);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <h1 className="text-4xl font-bold mb-4 flex items-center justify-center gap-3">
          <Search className="w-8 h-8 text-primary" />
          Crop Health Scanner
        </h1>
        <p className="text-lg text-muted-foreground">
          Upload a photo of your crop to instantly detect diseases, pest attacks, and nutrient deficiencies using AI.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        <GlassCard className="p-8 flex flex-col items-center justify-center min-h-[400px] border-dashed border-2 border-primary/30 bg-primary/5 hover:bg-primary/10 transition-colors cursor-pointer group" onClick={handleScan}>
          {isScanning ? (
            <div className="flex flex-col items-center space-y-6">
              <div className="relative">
                <div className="w-24 h-24 rounded-full border-4 border-primary/20 border-t-primary animate-spin" />
                <LeafyGreen className="w-8 h-8 text-primary absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
              </div>
              <p className="text-xl font-medium animate-pulse">AI is analyzing the image...</p>
            </div>
          ) : (
            <>
              <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Upload className="w-10 h-10 text-primary" />
              </div>
              <h3 className="text-2xl font-bold mb-2">Upload Image</h3>
              <p className="text-muted-foreground text-center mb-8">Drag and drop or click to browse</p>
              
              <div className="flex items-center gap-4 w-full">
                <div className="h-px bg-border flex-grow" />
                <span className="text-muted-foreground text-sm font-medium">OR</span>
                <div className="h-px bg-border flex-grow" />
              </div>
              
              <button className="mt-8 flex items-center gap-2 px-6 py-3 bg-card border border-border shadow-sm rounded-full font-medium hover:bg-muted transition-colors w-full justify-center">
                <Camera className="w-5 h-5" />
                Open Camera
              </button>
            </>
          )}
        </GlassCard>

        <div className="space-y-6">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            Analysis Results
            {!result && !isScanning && <span className="text-sm font-normal text-muted-foreground ml-2">(Upload an image to see results)</span>}
          </h2>

          {result ? (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <GlassCard className="p-4 bg-red-500/10 border-red-500/20">
                  <div className="flex items-center gap-2 text-red-600 dark:text-red-400 font-medium mb-1">
                    <AlertTriangle className="w-4 h-4" /> Disease Detected
                  </div>
                  <div className="text-2xl font-bold">{result.disease}</div>
                </GlassCard>
                <GlassCard className="p-4 bg-primary/10 border-primary/20">
                  <div className="flex items-center gap-2 text-primary font-medium mb-1">
                    <Search className="w-4 h-4" /> Confidence Score
                  </div>
                  <div className="text-2xl font-bold">{result.confidence}%</div>
                </GlassCard>
              </div>

              <GlassCard className="p-6">
                <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                  <Bug className="w-5 h-5 text-primary" /> Actionable Recommendations
                </h3>
                <ul className="space-y-3">
                  {result.recommendations.map((rec: string, i: number) => (
                    <li key={i} className="flex gap-3">
                      <div className="w-6 h-6 rounded-full bg-primary/20 text-primary flex items-center justify-center flex-shrink-0 text-sm font-bold">
                        {i + 1}
                      </div>
                      <span className="text-muted-foreground">{rec}</span>
                    </li>
                  ))}
                </ul>
              </GlassCard>
              
              <div className="grid grid-cols-2 gap-4">
                 <button className="px-4 py-3 bg-primary text-primary-foreground rounded-xl font-medium hover:bg-primary/90 transition-colors">
                   Buy Fertilizer Nearby
                 </button>
                 <button className="px-4 py-3 bg-card border border-border shadow-sm rounded-xl font-medium hover:bg-muted transition-colors flex items-center justify-center gap-2">
                   <Droplet className="w-4 h-4 text-blue-500" /> Need Watering?
                 </button>
              </div>
            </motion.div>
          ) : (
             <GlassCard className="p-8 h-full min-h-[400px] flex flex-col items-center justify-center text-center opacity-50 border-dashed">
                <LeafyGreen className="w-16 h-16 text-muted-foreground mb-4 opacity-50" />
                <p className="text-lg font-medium text-muted-foreground">Results will appear here</p>
                <p className="text-sm text-muted-foreground mt-2 max-w-xs">Upload a clear photo of the affected leaf or plant part for accurate AI diagnosis.</p>
             </GlassCard>
          )}
        </div>
      </div>
    </div>
  );
}
