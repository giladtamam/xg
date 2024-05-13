
interface Season {
    id: number;
    start: number;
    end: number;
    active: boolean;
}

export interface Tournament {
    id: string;
    name: string;
    displayName: null;
    slug: string;
    logoUrl: string;
    type: string;
    teamType: string;
    rank: number;
    countryId: string;  
}

interface ForecastScore {
    h: number;
    a: number;
}

interface Team {
    id: string;
    name: string;
    fullName: string;
    slug: string;
    shortName: null;
    logoUrl: string;
    backgroundUrl: string;
    popularity: number;
    type: string;
}

export interface Teams {
    h: Team;
    a: Team;
}

export interface Game {
    id: string;
    slug: string;
    datetime: string;
    gameweek: number;
    played: boolean;
    popularity: number;
    derby: boolean;
    featured: boolean;
    active: boolean;
    postponed: boolean;
    cancelled: boolean;
    walkover: boolean;
    neutralVenue: boolean;
    preview: boolean;
    stage: string;
    ending: null;
    group: null;
    advancedTeamId: null;
    previewImageUrl: null;
    season: Season;
    tournament: Tournament;
    forecastScore: ForecastScore;
    teams: Teams;
}