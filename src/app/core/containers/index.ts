import { GamesContainer } from "./games/games-container"
import { HomeContainer } from "./home/home-container"

export * from "./home/home-container"
export * from "./games/games-container"

export const CORE_CONTAINERS = [
    HomeContainer,
    GamesContainer
]