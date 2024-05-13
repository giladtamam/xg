import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from "react-router-dom";

export function TabsDemo() {
  const navigate = useNavigate();
  const location = useLocation();
  const currentTab = location.pathname.split("/")[2] || "all";

  const handleValueChange = (value: any) => {
    navigate(`/fixture/${value}`);
  };

  return (
    <Tabs defaultValue={currentTab} value={currentTab} onValueChange={handleValueChange} className="w-[400px]">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="all">All</TabsTrigger>
        <TabsTrigger value="la-liga">LaLiga</TabsTrigger>
        <TabsTrigger value="epl">Premier League</TabsTrigger>
      </TabsList>
    </Tabs>
  );
}
