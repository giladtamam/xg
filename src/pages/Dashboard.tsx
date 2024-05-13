import { GameCard } from "@/components/GameCard";
import { PageHeader, PageHeaderHeading } from "@/components/page-header";
import {  buttonVariants } from "@/components/ui/button";
import useAnalyticsEventTracker from "@/lib/useAnalyticsEventTracker";
import { LoaderIcon } from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import clsx from 'clsx';
import { TabsDemo } from "@/components/TabsDemo";

export default function Dashboard() {
  const [coming, setComing] = useState([]);
  const [loading, setLoading] = useState(true);
  const { tournament = "" } = useParams();
  const navigate = useNavigate();
  const gaEventTracker = useAnalyticsEventTracker("Dashboard page");

  const tournamentMap = useMemo(() => ({
    "la-liga": "spa-1",
    "epl": "eng-1",
  }), [])
  
  useEffect(() => {
    let tournamentQuery = "";
    if (tournamentMap[tournament as keyof typeof tournamentMap]) {
      tournamentQuery = `?tournament=${tournamentMap[tournament as keyof typeof tournamentMap]}`
    }
    fetch(`https://footballxg.netlify.app/api/coming${tournamentQuery}`)
      .then(response => response.json())
      .then(data => {
        setComing(data);
        setLoading(false);
      });
  }, [tournament]);

  const navigateToGame = useCallback(
    (url: string) => {
      navigate(url);
      gaEventTracker(url);
    },
    [gaEventTracker, navigate]
  );

  return (
    <>
      <PageHeader>
        <PageHeaderHeading>Up coming matches</PageHeaderHeading>
        <TabsDemo />
        {/* <div>
          <NavLink to="/"  className={({ isActive }) => clsx(buttonVariants({ variant: "outline" }), {"bg-primary": isActive})}>
            All
          </NavLink>
          <NavLink to="/fixture/la-liga" className={({ isActive }) => clsx(buttonVariants({ variant: "outline" }), {"bg-primary": isActive})}>
            La Liga
          </NavLink>
          <NavLink to="/fixture/epl" className={({ isActive }) => clsx(buttonVariants({ variant: "outline" }), {"bg-primary": isActive})}>
            Premier League
          </NavLink>
        </div> */}
      </PageHeader>
      {loading && <LoaderIcon className="animate-spin" />}
      {coming.map((item: any) => (
        <GameCard key={item.id} game={item.game} navigate={navigateToGame} />
      ))}
    </>
  );
}
