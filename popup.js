// Initialize button with user's preferred color
// let changeColor = document.getElementById('changeColor');
let level = document.querySelector('#level');
let levelIcon = document.querySelector('.level i');

let state = document.querySelector('.charge');
let stateIcon = document.querySelector('.charge_state i');

let info = document.querySelector('.info');


let color = "#3aa757";
let battery = null;
let charging = null;
/* 
<i class='bx bxs-battery-low' ></i>
<i class='bx bxs-battery-full'></i>
<i class='bx bxs-battery-low' ></i>
<i class='bx bxs-battery' ></i>
<i class='bx bxs-battery-charging' ></i>
 */

console.log("Hello World")

let messages = {
    iconsClass: {
        charge: 'bx bxs-battery-charging red',
        noCharge: 'bx bxs-battery-full',
        stable: 'bx bxs-battery'
    },
    charge: 'You Should Charge',
    noCharge: 'You should Stop Charging',
    stable: 'No need to charge',
    loadMessage: () => {
        // console.log(battery);
        if (battery > 0.70 && battery <= 0.90) {
            // console.log("this", messages.stable);
            return messages.stable;
        } else if (battery > 0.90) {
            // console.log("this", messages.stable);
            return messages.noCharge;
        } else {
            return messages.charge;
        }
    },
    getIcon: () => {
        if (battery > 0.70 && battery <= 0.90) {
            // console.log("this", messages.stable);
            return messages.iconsClass.stable;
        } else if (battery > 0.90) {
            // console.log("this", messages.stable);
            return messages.iconsClass.noCharge;
        } else {
            return messages.iconsClass.charge;
        }
    }

}


let LowAlertoptions = {
    type: "basic",
    title: "Charge Alert!",
    message: "You Need to Charge",
    iconUrl: "/images/get_started128.png"
}

let highAlertoptions = {
    type: "basic",
    title: "Charge Alert!",
    message: "Your Battery Is Fully Charged",
    iconUrl: "/images/get_started128.png"
}

let sent = false;

let sendNotification = () => {

    if (battery < 0.30) {
        // Notification Options
        chrome.notifications.create(LowAlertoptions, () => {
            console.log("Popup Done");

        });
        sent = true;
        return

    }
    if (battery === 1 && !sent) {
        chrome.notifications.create(highAlertoptions, () => {
            console.log("Popup Done");
        });
        sent = true;
        return
    }

    sent = false



}

setInterval(() => {
    navigator.getBattery().then(response => {
        battery = response.level;
        charging = response.charging;
    });

    chrome.storage.sync.get("color", ({ color }) => {
        chrome.action.setBadgeText({ text: `${battery*100}%` });

        levelIcon.classList = charging ? ['bx bxs-battery-charging'] : ['bx bxs-battery']
        level.textContent = `${battery*100}%`;

        state.textContent = charging ? 'Charging' : 'Not Charging';
        stateIcon.classList = charging ? ['bx bxs-battery-charging'] : []
        info.textContent = messages.loadMessage();

        sendNotification();
    });
}, 1000)