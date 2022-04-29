import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
    constructor(params) {
        super(params);
        this.setTitle("Settings");
    }

    async getHtml() {
        return `
            <h1>Settings</h1>
            <button class="settings_button" id="settings_button" type="submit" onclick="deleteAll()">Delete Records</button>
            <p></p>
        `;
    }
}
