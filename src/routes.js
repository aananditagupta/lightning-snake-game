import Game from "./pages/Game";
import Highscore from "./pages/Highscore";
import MainMenu from "./pages/MainMenu";

export default {
  routes: [
    {
      path: "mainMenu",
      component: MainMenu,
    },
    {
      path: "game",
      component: Game,
    },
    {
      path: "highscore",
      component: Highscore,
    },
  ],
  root: "mainMenu",
};