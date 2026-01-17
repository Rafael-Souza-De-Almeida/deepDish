import React from "react";
import InputFile from "./components/inputFile";
import { Button } from "./components/ui/button";
import { Loader2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./components/ui/card";
import { Progress } from "@radix-ui/react-progress";

export default function App() {
  const [file, setFile] = React.useState<File | null>(null);
  const [prediction, setPrediction] = React.useState<{
    class: string;
    conf: number;
  } | null>(null);
  const [loading, setLoading] = React.useState(false);

  async function handlePredict() {
    if (!file) return;

    setLoading(true);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("http://localhost:8000/predict", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      setPrediction(data);
    } catch (error) {
      alert("Error during prediction. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col items-center justify-center pt-8 gap-16 border-primary">
      <h1 className="text-5xl font-quicksand font-bold">
        Is it sushi, pizza, or steak? Upload to find out!
      </h1>
      <div className="flex flex-col items-center gap-4 w-full">
        <InputFile handleSetFile={setFile} />
        <Button
          onClick={() => handlePredict()}
          className="w-full max-w-5xl h-15 text-lg font-montserrat transition-all active:scale-95"
        >
          {loading ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              Analyzing dish...
            </>
          ) : (
            "Predict Food"
          )}
        </Button>

        {prediction && (
          <Card className="w-full max-w-5xl mt-8 border-2 border-green-100 bg-green-50/30 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-green-600 uppercase tracking-wider font-inter">
                Analysis Result
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center gap-4">
              <div className="text-center">
                <h2 className="text-4xl font-bold text-slate-900 font-montserrat uppercase">
                  {prediction.class}
                </h2>
                <p className="text-sm text-slate-500 font-inter mt-1">
                  Confidence Level: {(prediction.conf * 100).toFixed(1)}%
                </p>
              </div>

              <div className="w-full max-w-md mt-2">
                <Progress
                  value={prediction.conf * 100}
                  className="h-2 bg-green-200"
                />
              </div>

              <p className="text-xs text-slate-400 font-inter italic mt-2">
                *This prediction is based on the DeepDish CNN model.
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
