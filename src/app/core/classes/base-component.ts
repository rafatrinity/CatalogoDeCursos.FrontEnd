import { UiService } from './../services/ui/ui.service';

export class BaseComponent {

    constructor(public ui: UiService) {}

    handleError(reason: any) {
        if (reason != null) {
            this.ui.alert.error(reason.title, reason.message);
        }
    }

}
