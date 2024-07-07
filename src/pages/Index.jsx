import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";

const statusData = [
  { service: "Tube", status: "Good Service", details: "All lines are running smoothly." },
  { service: "Bus", status: "Minor Delays", details: "Some routes are experiencing delays due to traffic." },
  { service: "Overground", status: "Severe Delays", details: "Major disruptions on several lines." },
];

const Index = () => {
  return (
    <div className="container mx-auto p-4">
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold">TfL Status</h1>
      </header>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Status Overview</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {statusData.map((item, index) => (
            <Card key={index} className="text-center">
              <CardHeader>
                <CardTitle>{item.service}</CardTitle>
              </CardHeader>
              <CardContent>
                <Badge
                  className={`${
                    item.status === "Good Service"
                      ? "bg-green-500"
                      : item.status === "Minor Delays"
                      ? "bg-yellow-500"
                      : "bg-red-500"
                  } text-white`}
                >
                  {item.status}
                </Badge>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Detailed Status</h2>
        <Accordion type="single" collapsible>
          {statusData.map((item, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger>{item.service}</AccordionTrigger>
              <AccordionContent>
                <p>{item.details}</p>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>

      <footer className="mt-8 text-center">
        <p>&copy; {new Date().getFullYear()} TfL Status. All rights reserved.</p>
        <div className="flex justify-center space-x-4 mt-4">
          <a href="https://tfl.gov.uk" target="_blank" rel="noopener noreferrer" className="text-blue-500">
            Official TfL Website
          </a>
          <a href="https://twitter.com/tfl" target="_blank" rel="noopener noreferrer" className="text-blue-500">
            Twitter
          </a>
          <a href="https://www.facebook.com/transportforlondon" target="_blank" rel="noopener noreferrer" className="text-blue-500">
            Facebook
          </a>
        </div>
      </footer>
    </div>
  );
};

export default Index;