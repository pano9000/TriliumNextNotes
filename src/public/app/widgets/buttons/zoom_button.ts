import { t } from "../../services/i18n.js";
import utils from "../../services/utils.js";
import BasicWidget from "../basic_widget.js";


const TPL = 
`
        <span class="zoom-container dropdown-item dropdown-item-container">
            <div>
                <span class="bx bx-empty"></span>
                ${t("global_menu.zoom")}
            </div>

            <div class="zoom-buttons">
                <a data-trigger-command="toggleFullscreen" title="${t("global_menu.toggle_fullscreen")}" class="bx bx-expand-alt"></a>

                &nbsp;

                <a data-trigger-command="zoomOut" title="${t("global_menu.zoom_out")}" class="bx bx-minus"></a>

                <span data-trigger-command="zoomReset" title="${t("global_menu.reset_zoom_level")}" class="zoom-state"></span>

                <a data-trigger-command="zoomIn" title="${t("global_menu.zoom_in")}" class="bx bx-plus"></a>
            </div>
        </span>
`


export default class ZoomButtonsWidget extends BasicWidget {
    private $zoomState!: JQuery<HTMLElement>;
    
    doRender(): void {
        this.$widget = $(TPL);

        this.$widget.on("click", ".dropdown-item", (e) => {
            if ($(e.target).parent(".zoom-buttons")) {
                return;
            }

            this.dropdown.toggle();
        });


        this.$zoomState = this.$widget.find(".zoom-state");
        this.$widget.on("show.bs.dropdown", () => {
            this.updateZoomState();
            if (this.tooltip) {
                this.tooltip.hide();
                this.tooltip.disable();
            }
        });

        this.$widget.find(".zoom-buttons").on(
            "click",
            // delay to wait for the actual zoom change
            () => setTimeout(() => this.updateZoomState(), 300)
        );
    }

    updateZoomState() {
        if (!utils.isElectron()) {
            return;
        }

        const zoomFactor = utils.dynamicRequire("electron").webFrame.getZoomFactor();
        const zoomPercent = Math.round(zoomFactor * 100);

        this.$zoomState.text(`${zoomPercent}%`);
    }

}