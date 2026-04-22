import { GameActionsComponent } from "./games/game-actions/game-actions.component";
import { SlotMachineComponent } from "./games/slot-machine/slot-machine.component";
import { AccountHistoryTableComponent } from "./home/account-history-table/account-history-table.component";
import { MainActionsComponent } from "./home/main-actions/main-actions.component";
import { HomeComponent } from "./home/home/home.component";
import { LoginComponent } from "./login/login.component";
import { AccountSelectTableComponent } from "./home/account-select-table/account-select-table.component";

export * from "./home/home/home.component";
export * from "./home/main-actions/main-actions.component";
export * from "./home/account-history-table/account-history-table.component";
export * from "./games/slot-machine/slot-machine.component";
export * from "./games/game-actions/game-actions.component";
export * from "./login/login.component";
export * from "./home/account-select-table/account-select-table.component";

export const CORE_COMPONENTS = [
    HomeComponent,
    MainActionsComponent,
    SlotMachineComponent,
    LoginComponent,
    GameActionsComponent,
    AccountHistoryTableComponent,
    AccountSelectTableComponent
]