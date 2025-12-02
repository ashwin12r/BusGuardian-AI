export type SensorData = {
  engineTemperature: number;
  cabinTemperature: number;
  coolantLevel: number;
  ventilationQuality: 'Good' | 'Moderate' | 'Poor';
  cameraObservations: 'No visible issues' | 'Steam near engine' | 'Blocked air vents';
  outsideTemperature: number;
};

export type Message = {
  id: string;
  role: 'user' | 'assistant';
  content: string;
};
