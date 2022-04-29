import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
    constructor(params) {
        super(params);
        this.setTitle("Home");
    }

    async getHtml() {
        return `
<!DOCTYPE html>
              
                <h1 class="home_title">Happy Heart ♥️</h1>
				<div class="home_cont">
					<div class="home_message">
						<p>Please enter your current Systolic and Diastolic pressure.</p>
					</div>
					<div class="home_input-group">
						<input class="home_input" id="sysPress" type="text" placeholder="Systolic pressure">
					</div>
					<div class="home_input-group">
						<input class="home_input" id="diaPress" type="text" placeholder="Diastolic pressure">
					</div>
					<button class="home_button" id="home_button" type = "submit" onclick="showResult()">Enter</button>
					<br>
				</div>
				<div class="home_results">
					<p id="result"></p>
				</div>
        `;
    }
};
