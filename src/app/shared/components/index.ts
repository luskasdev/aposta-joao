import { DialogComponent } from "./dialog/dialog.component"
import { TitleBarComponent } from "./title-bar/title-bar.component"
import { TransferFundsDialog } from "./transfer-funds-dialog.component/transfer-funds-dialog.component" 

export * from "./dialog/dialog.component"
export * from "./title-bar/title-bar.component"
export * from "./transfer-funds-dialog.component/transfer-funds-dialog.component"

export const SHARED_COMPONENTS = [
    DialogComponent,
    TransferFundsDialog ,
    TitleBarComponent
]