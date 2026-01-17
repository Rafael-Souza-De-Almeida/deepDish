import React from "react";
import InputFile from "./components/inputFile";
import { Button } from "./components/ui/button";
import { Loader2, ImageIcon, Pizza } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "./components/ui/card";
import { Progress } from "@radix-ui/react-progress";

export default function App() {
  const [file, setFile] = React.useState<File | null>(null);
  const [prediction, setPrediction] = React.useState<{
    predicted_class: string;
    confidence: number;
  } | null>(null);
  const [loading, setLoading] = React.useState(false);

  async function handlePredict() {
    if (!file) return;

    setLoading(true);
    setPrediction(null);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("http://localhost:8000/predict", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      setPrediction(data);
    } catch {
      alert("Error during prediction. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="pt-8 flex items-center justify-center px-4 pb-24">
      <Card className="w-full max-w-4xl shadow-xl">
        <CardHeader className="text-center space-y-2">
          <CardTitle className="text-4xl font-quicksand font-bold">
            <div className="flex gap-4 items-center justify-center">
              <Pizza size={32} />
              <h1>DeepDish AI</h1>
            </div>
          </CardTitle>
          <CardDescription className="text-lg">
            Upload an image and discover if it’s sushi, pizza, or steak
          </CardDescription>
        </CardHeader>

        <CardContent className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <InputFile handleSetFile={setFile} />
            {file && (
              <p className="text-sm text-slate-500 flex items-center gap-2">
                <ImageIcon className="w-4 h-4" />
                {file.name}
              </p>
            )}
          </div>

          <Button
            onClick={handlePredict}
            disabled={!file || loading}
            className="h-14 text-lg transition-all disabled:opacity-50"
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Analyzing image...
              </>
            ) : (
              "Predict Food"
            )}
          </Button>

          {prediction && (
            <div className="mt-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <Card className="border-2 border-green-200">
                <CardContent className="py-6 flex flex-col items-center gap-4">
                  <h2 className="text-4xl font-bold uppercase tracking-wide">
                    {prediction.predicted_class}
                  </h2>

                  <p className="text-sm text-slate-600">
                    Confidence:{" "}
                    <span className="font-semibold">
                      {(prediction.confidence * 100).toFixed(1)}%
                    </span>
                  </p>

                  <div className="w-full max-w-md">
                    <Progress
                      value={prediction.confidence * 100}
                      className="h-3 rounded-full bg-green-200"
                    />
                  </div>

                  {prediction.confidence < 0.6 && (
                    <p className="text-xs text-amber-600 italic">
                      Low confidence — try another image for better results
                    </p>
                  )}

                  <p className="text-xs text-slate-400 italic">
                    Powered by DeepDish CNN
                  </p>
                </CardContent>
              </Card>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
