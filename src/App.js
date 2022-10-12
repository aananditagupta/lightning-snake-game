import { Router, Utils } from "@lightningjs/sdk";
import colors from "./lib/colors";
import routes from "./routes";

export default class App extends Router.App {
  static getFonts() {
    return [
      { family: "Regular", url: Utils.asset("fonts/Roboto-Regular.ttf") },
    ];
  }

  _setup() {
    Router.startRouter(routes);
  }

  static colors() {
    return colors;
  }

  static _template() {
    return {
      ...super._template(),
      w: 1920,
      h: 1080,

      color: 0xff333333,
      rect: true,
    };
  }
}