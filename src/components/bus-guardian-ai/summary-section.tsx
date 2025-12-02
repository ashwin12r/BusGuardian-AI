import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle2, Fuel, Shield, UserCheck } from 'lucide-react';

export default function SummarySection() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Project Summary & Impact</CardTitle>
        <CardDescription>
          This system demonstrates how combining physics and AI leads to tangible real-world benefits.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="italic text-muted-foreground">
          Presentation script for "Student A":
        </p>
        <blockquote className="border-l-2 pl-6 italic">
          "Our AI-Based Bus Heat Energy Monitoring System isn't just a technical exercise; it's a solution that directly improves safety, comfort, and efficiency."
        </blockquote>

        <div className="space-y-3">
          <div className="flex items-start gap-3">
            <Shield className="w-6 h-6 text-green-500 mt-1 shrink-0" />
            <div>
              <h4 className="font-semibold">Improves Safety</h4>
              <p className="text-sm text-muted-foreground">
                By providing early warnings for overheating, the system allows drivers to take preventive action, reducing the risk of engine fires or breakdowns on the road.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <UserCheck className="w-6 h-6 text-blue-500 mt-1 shrink-0" />
            <div>
              <h4 className="font-semibold">Enhances Passenger Comfort</h4>
              <p className="text-sm text-muted-foreground">
                The AI monitors cabin temperature and ventilation, ensuring a comfortable environment for passengers, which is especially critical for long journeys and school routes.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Fuel className="w-6 h-6 text-orange-500 mt-1 shrink-0" />
            <div>
              <h4 className="font-semibold">Increases Fuel Efficiency</h4>
              <p className="text-sm text-muted-foreground">
                An engine running at its optimal temperature is more fuel-efficient. By preventing overheating, our system helps reduce fuel consumption and operational costs.
              </p>
            </div>
          </div>
        </div>

         <div className="pt-4">
            <h4 className="font-semibold flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-primary" />
                A Synthesis of Disciplines
            </h4>
            <p className="text-sm text-muted-foreground mt-1">
                This project successfully combines the principles of heat energy physics with modern Artificial Intelligence to solve a practical problem, showcasing the power of interdisciplinary innovation.
            </p>
        </div>

      </CardContent>
    </Card>
  );
}
