import { BreadcrumbDemo } from "@/components/BreadCrumbDemo";
import { GameCard } from "@/components/GameCard";
import { PageHeader, PageHeaderHeading } from "@/components/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Game } from "@/models/game";
import { LoaderIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export default function Fixture() {
  const { match } = useParams();
  const [loading, setLoading] = useState(true);
  const [game, setGame] = useState<Game>();
  const [hth, setHth] = useState([]);
  const [homeGames, setHomeGames] = useState([]);
  const [awayGames, setAwayGames] = useState([]);
  useEffect(() => {
    fetch(`https://footballxg.netlify.app/api/games/${match}`)
      .then(response => response.json())
      .then(data => {
        setGame(data);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (game?.id) {
      fetch(`https://footballxg.netlify.app/api/game/${game?.id}`)
        .then(response => response.json())
        .then(data => {
          const rows = data.homeTeamMetadata.gameTables.find((t: { type: string }) => t.type === "hth").rows;
          const home = data.homeTeamMetadata.gameTables.find((t: { type: string }) => t.type === "home").rows;
          const away = data.awayTeamMetadata.gameTables.find((t: { type: string }) => t.type === "away").rows;
          setHth(rows);
          setHomeGames(home);
          setAwayGames(away);
        });
    }
  }, [game?.id]);

  const homeData = homeGames
    .map(({ game }: { game: any }) => ({
      date: new Date(game.datetime).toLocaleDateString(),
      score: game.goals?.s,
      conceded: game.goals?.c,
    }))
    .reverse();

  const awayData = awayGames
    .map(({ game }: { game: any }) => ({
      date: new Date(game.datetime).toLocaleDateString(),
      score: game.goals?.s,
      conceded: game.goals?.c,
    }))
    .reverse();

  return (
    <div className="flex flex-col gap-4">
      <PageHeader>
        <PageHeaderHeading>
          {game?.tournament && <BreadcrumbDemo tournament={game?.tournament} teams={game?.teams} />}
        </PageHeaderHeading>
      </PageHeader>
      {loading && <LoaderIcon className="animate-spin" />}
      {game && <GameCard game={game} iconSize={64} />}
      <div className="flex gap-4">
        {hth && (
          <Card className="w-full sm:w-1/2">
            <CardTitle className="text-center m-2">Head to Head</CardTitle>
            <CardContent className="flex flex-col gap-2">
              {hth?.map((row: any, index: number) => (
                <div key={index} className="flex gap-2 items-center justify-center">
                  <span>
                    {game?.teams.h.name}
                    {`(${row.game.side === "a" ? "Away" : "Home"})`}
                  </span>
                  {row.game.goals.s} - {row.game.goals.c}
                  <span>
                    {game?.teams.a.name}
                    {`(${row.game.side === "a" ? "Home" : "Away"})`}
                  </span>
                </div>
              ))}
            </CardContent>
          </Card>
        )}
        <Card className="w-full sm:w-1/2"></Card>
      </div>
      <div className="flex">
        <Card className="w-1/2">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-base font-normal">Home Score Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart
                data={homeData}
                height={250}
                margin={{
                  top: 5,
                  right: 10,
                  left: 10,
                  bottom: 0,
                }}>
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="score" stroke="#82ca9d" />
                <Line type="monotone" dataKey="conceded" stroke="red" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card className="w-1/2">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-base font-normal">Away Score Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart
                data={awayData}
                height={250}
                margin={{
                  top: 5,
                  right: 10,
                  left: 10,
                  bottom: 0,
                }}>
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="score" stroke="#82ca9d" />
                <Line type="monotone" dataKey="conceded" stroke="red" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
