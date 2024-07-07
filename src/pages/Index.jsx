import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const fetchStatusData = async () => {
  const response = await fetch("https://api.tfl.gov.uk/Line/Mode/tube,overground,dlr,tram,river-bus,coach,cycle,walking,interchange,elizabeth-line/Status", {
    headers: {
      "Cache-Control": "no-cache",
      "Content-Type": "application/json",
      "app_key": "f084bc824d174b0ebea5ea07d9ce45fe",
      "app_id": "1eff0ff162d4405ba146ca3523f155ea"
    }
  });
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

const Index = () => {
  const { data, error, isLoading } = useQuery({
    queryKey: ["statusData"],
    queryFn: fetchStatusData,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return (
      <Alert>
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>Failed to load status data. Please try again later.</AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold">TfL Status</h1>
      </header>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Status Overview</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {data.map((item, index) => (
            <Card key={index} className="text-center">
              <CardHeader>
                <CardTitle>{item.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <Badge
                  className={`${
                    item.lineStatuses[0].statusSeverityDescription === "Good Service"
                      ? "bg-green-500"
                      : item.lineStatuses[0].statusSeverityDescription === "Minor Delays"
                      ? "bg-yellow-500"
                      : "bg-red-500"
                  } text-white`}
                >
                  {item.lineStatuses[0].statusSeverityDescription}
                </Badge>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Detailed Status</h2>
        <Accordion type="single" collapsible>
          {data.map((item, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger>{item.name}</AccordionTrigger>
              <AccordionContent>
                <p>{item.lineStatuses[0].reason || "No further details available."}</p>
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