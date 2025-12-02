import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Flame, Waves, Sun } from 'lucide-react';

export default function PhysicsSection() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>The Physics of Bus Overheating</CardTitle>
        <CardDescription>
          Understanding the three modes of heat transfer is key to monitoring bus heat energy.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger>
              <div className="flex items-center gap-2 font-medium">
                <Flame className="w-5 h-5 text-red-500" />
                Conduction
              </div>
            </AccordionTrigger>
            <AccordionContent>
              Conduction is heat transfer through direct contact. In a bus, the hot engine block directly heats the metal frame and other attached components. This heat can then travel through the bus's structure, eventually warming up the floor and seats near the engine compartment.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>
              <div className="flex items-center gap-2 font-medium">
                <Waves className="w-5 h-5 text-blue-500" />
                Convection
              </div>
            </AccordionTrigger>
            <AccordionContent>
              Convection is heat transfer through the movement of fluids (like air). Hot air from the engine and exhaust systems rises and circulates. If the ventilation system is poor, this hot air gets trapped inside the cabin, significantly increasing the temperature for passengers and causing discomfort.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>
              <div className="flex items-center gap-2 font-medium">
                <Sun className="w-5 h-5 text-yellow-500" />
                Radiation
              </div>
            </AccordionTrigger>
            <AccordionContent>
              Radiation is heat transfer through electromagnetic waves. Hot surfaces, like the engine and the dark-colored bus roof exposed to the sun, radiate heat. This infrared radiation travels through the air and is absorbed by passengers, seats, and interior surfaces, making them feel warm even without direct contact.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
  );
}
