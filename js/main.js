var app = new Vue({
    el: '#app',
    data:
        {
            page: "start", // Startseite
            pageHistory: [], // Speichert die Seitenhistorie, um zurücknavigieren zu können
            error: "",
            info: "",
            phoneNumberInput: "", // Hält die Eingabe
            phoneNumberOutput: { // Ausgabe der Telefonnummer; Vorausgefüllt, um Beispieltelefonnummer anzuzeigen
                prefixNumber: "Testnummer: +49",
                areaCode: "1789",
                phoneNumber: "76897",
                phoneExtension: "123"
            },
        },
	computed: {

	},
    methods:
        {
            switchPage: function (page) {
                this.error = "";
                this.info = "";
                this.pageHistory.push(this.page);
                this.page = page
            },
            goBack: function(){
                if(this.pageHistory.length > 0)
                {
                    if (this.page === "game") {
                        this.exitsession();
                    }
                    this.error = "";
                    this.info = "";
                    this.page = this.pageHistory[this.pageHistory.length - 1];
                    this.pageHistory.pop()
                }
            },
            log: function (log, logType){
                this.info = ""
                this.error = ""
                if (logType === "error" || logType === "Error"){
                    this.error = log
      
                } else if (logType === "info" || logType === "Info") {
                    this.info = log
                }
            },
            // Sendet die an "phoneNumberInput" gebundene Telefonnummer an das Backend und schiebt diese in "phoneNumberOutput", welches diese anzeigt
            checkPhoneNumber: function (){
                fetch("http://localhost:5000/hierkommtdasBackendrein", {
                    body: JSON.stringify({phoneNumberString: this.phoneNumberInput}),
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    }
                }).then(response =>{
                    response.json().then(json =>{
                        console.log("Antwort empfangen: " + json)
                        phoneNumberOutput = json;
                        // Eingabefeld für nächste Telefonnummer leeren
                        this.phoneNumberInput = "";
                    } )}   );
            },
            
        },
});
