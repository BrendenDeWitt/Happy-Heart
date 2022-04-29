import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
    constructor(params) {
        super(params);
        this.setTitle("Records");
    }

    async getHtml() {
        return `
           <!DOCTYPE html>
			<html lang="en">
			<head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Records</title>
                <link rel="stylesheet" href="/static/css/index.css">
                <script src="jquery.js"></script>
                <script type="module" src="Frontend/static/js/views/home.js"></script>
            </head>
			<body>
				<h1>Records</h1>
				<div class="record_cont">
					<button class="display_button" onclick="displayAll()">Display All Results</button>
				</div>
				<p id="allResults"></p>
				<a href = "https://www.facebook.com/">
				<button id = "facebook_icon" onclick="fileShare()"></button>
				</a>
				<p>Share data with Facebook</p>
				<br>
				<a href = "https://www.gmail.com">
				<button id = "gmail_icon" ></button>
				</a>
				<p>Share data with Gmail</p>
				<br>
				<a href = "https://login.microsoftonline.com">
				<button id = "office365_icon"></button>
				</a>
				<p>Share data with Office365</p>
			</body>
			</html>
        `;
    }
}
