'use client';

import type { Dispatch, SetStateAction } from 'react';
import type { SensorData } from '@/lib/types';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Loader2, Sparkles, Thermometer, Wind, Droplets, Camera, Sun } from 'lucide-react';

interface SensorPanelProps {
  sensorData: SensorData;
  setSensorData: Dispatch<SetStateAction<SensorData>>;
  onAnalyze: () => void;
  isLoading: boolean;
}

export default function SensorPanel({ sensorData, setSensorData, onAnalyze, isLoading }: SensorPanelProps) {
  const handleSliderChange = (key: keyof SensorData) => (value: number[]) => {
    setSensorData(prev => ({ ...prev, [key]: value[0] }));
  };

  const handleSelectChange = (key: keyof SensorData) => (value: string) => {
    setSensorData(prev => ({ ...prev, [key]: value }));
  };
  
  const handleInputChange = (key: keyof SensorData) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setSensorData(prev => ({ ...prev, [key]: Number(e.target.value) }));
  };


  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Sparkles className="w-6 h-6 text-primary" />
          Simulation Panel
        </CardTitle>
        <CardDescription>Adjust the sliders and inputs to simulate sensor data from the bus.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-3">
          <Label htmlFor="engineTemp" className="flex items-center gap-2">
            <Thermometer className="w-4 h-4" />
            Engine Temperature: {sensorData.engineTemperature}°C
          </Label>
          <Slider
            id="engineTemp"
            min={50}
            max={150}
            step={1}
            value={[sensorData.engineTemperature]}
            onValueChange={handleSliderChange('engineTemperature')}
            disabled={isLoading}
          />
        </div>
        <div className="space-y-3">
          <Label htmlFor="cabinTemp" className="flex items-center gap-2">
            <Thermometer className="w-4 h-4 text-blue-500" />
            Cabin Temperature: {sensorData.cabinTemperature}°C
          </Label>
          <Slider
            id="cabinTemp"
            min={10}
            max={50}
            step={1}
            value={[sensorData.cabinTemperature]}
            onValueChange={handleSliderChange('cabinTemperature')}
            disabled={isLoading}
          />
        </div>
         <div className="space-y-3">
          <Label htmlFor="outsideTemp" className="flex items-center gap-2">
            <Sun className="w-4 h-4" />
            Outside Temperature (°C)
          </Label>
          <Input
            id="outsideTemp"
            type="number"
            value={sensorData.outsideTemperature}
            onChange={handleInputChange('outsideTemperature')}
            disabled={isLoading}
            placeholder="e.g., 35"
          />
        </div>
        <div className="space-y-3">
          <Label htmlFor="coolantLevel" className="flex items-center gap-2">
            <Droplets className="w-4 h-4" />
            Coolant Level: {sensorData.coolantLevel}%
          </Label>
          <Slider
            id="coolantLevel"
            min={0}
            max={100}
            step={5}
            value={[sensorData.coolantLevel]}
            onValueChange={handleSliderChange('coolantLevel')}
            disabled={isLoading}
          />
        </div>
        <div className="space-y-3">
          <Label htmlFor="ventilation" className="flex items-center gap-2">
            <Wind className="w-4 h-4" />
            Ventilation Quality
          </Label>
          <Select
            value={sensorData.ventilationQuality}
            onValueChange={handleSelectChange('ventilationQuality')}
            disabled={isLoading}
          >
            <SelectTrigger id="ventilation">
              <SelectValue placeholder="Select quality" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Good">Good</SelectItem>
              <SelectItem value="Moderate">Moderate</SelectItem>
              <SelectItem value="Poor">Poor</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-3">
          <Label htmlFor="camera" className="flex items-center gap-2">
            <Camera className="w-4 h-4" />
            Camera Observations
          </Label>
          <Select
            value={sensorData.cameraObservations}
            onValueChange={handleSelectChange('cameraObservations')}
            disabled={isLoading}
          >
            <SelectTrigger id="camera">
              <SelectValue placeholder="Select observation" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="No visible issues">No visible issues</SelectItem>
              <SelectItem value="Steam near engine">Steam near engine</SelectItem>
              <SelectItem value="Blocked air vents">Blocked air vents</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={onAnalyze} disabled={isLoading} className="w-full bg-accent text-accent-foreground hover:bg-accent/90">
          {isLoading ? (
            <Loader2 className="w-4 h-4 animate-spin mr-2" />
          ) : (
            <Sparkles className="w-4 h-4 mr-2" />
          )}
          Analyze Heat Status
        </Button>
      </CardFooter>
    </Card>
  );
}
// forcing a git update