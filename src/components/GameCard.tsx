import { Game } from "@/models/game";
import { Card, CardContent } from "./ui/card";

export function GameCard({ game, navigate = () => {}, iconSize = 32 }: { game: Game, navigate?: any, iconSize?: number }) {
  return (
    <Card
      onClick={() => navigate(`/fixture/${game.tournament.slug}/${game.slug}`)}
      className={`mt-4 ${iconSize === 32 ? "hover:cursor-pointer hover:shadow-lg" : ""}`}>
      <CardContent className="p-6 flex items-center">
        {/* <div>{new Date(game.datetime).toLocaleDateString()}</div> */}

        <div className="font-semibold text-center flex items-center gap-5 font-normal ml-auto mr-auto">
          <div className="flex items-center gap-0.5 font-normal">
            <span>{game.teams.h.name}</span>
            <img src={game.teams.h.logoUrl} width={iconSize} height={iconSize} style={{ borderRadius: "50%" }} alt="" />
          </div>
          <div> {new Date(game.datetime).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</div>
          <div className="flex items-center gap-0.5 font-normal">
            <img width={iconSize} height={iconSize} style={{ borderRadius: "50%" }} alt="" src={game.teams.a.logoUrl} />
            {game.teams.a.name}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
