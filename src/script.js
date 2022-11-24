const getProses = document.querySelectorAll("input");
const replaceData = document.querySelectorAll(".replace")[0];
const output = document.querySelector(".output");
const input = document.querySelectorAll("input");
const bankData = [];


input[1].addEventListener("input", (e) => {
    e.target.value = e.target.value.replace(/[^0-9]/g, "").trim();
})

input[2].addEventListener("input", (e) => {
    e.target.value = e.target.value.replace(/[^0-9]/g, "").trim();
})

input[3].addEventListener("input", (e) => {
    e.target.value = e.target.value.replace(/[^0-9]/g, "").trim();
})
function takeData() {
    let DataProses = getProses[0].value;
    let BurstTime = getProses[1].value;
    let SaatTiba = getProses[2].value;
    let Prioritas = getProses[3].value;

if (DataProses == '' && BurstTime == '' && SaatTiba == '' && Prioritas == '' ) {
alert("Harap Isi Data Dengan Benar")
} else {
    getProses[0].value = "";
    getProses[1].value = "";
    getProses[2].value = "";
    getProses[3].value = "";

    replaceData.style.display = "";
    replaceData.innerHTML += `<tr>
    <td>${DataProses}</td>
    <td>${BurstTime}</td>
    <td>${SaatTiba}</td>
    <td>${Prioritas}</td>
    </tr>`;
    document.querySelector(".process").style.display = "flex";
    bankData.push({"Proses":DataProses,"BurstTime":Number(BurstTime), "SaatTiba":Number(SaatTiba), "Prioritas":Number(Prioritas)});
}
}


function FifoPS() {
    bankData.forEach((e, i) => {

    });
}

function Fifo() {
    let hasilFifo = [];
    let SaatMulai = [];
    let SaatSelesai = [];
    let TAT = [];
    bankData.sort((a, b) => {
        return a.SaatTiba - b.SaatTiba
    })

    bankData.forEach((e, i) => {
        let lastElemenntData = SaatMulai[SaatMulai.length - 1];
        let lastElemenntData1 = SaatSelesai[SaatSelesai.length - 1];
        if (i == 0) {
            SaatMulai.push(e.SaatTiba);
            SaatSelesai.push(Number(e.SaatTiba) + Number(e.BurstTime));
        } else {
            SaatMulai.push(Number(lastElemenntData) + Number(bankData[i-1].BurstTime));
            SaatSelesai.push(Number(lastElemenntData1) + Number(e.BurstTime));
        }
        TAT.push(Number(SaatSelesai[i]) - Number(e.SaatTiba));
    })
    
    bankData.forEach((e,i) => {
        hasilFifo.push(`<tr><td>${e.Proses}</td><td>${SaatMulai[i]}</td><td>${SaatSelesai[i]}</td><td>${TAT[i]}</td></tr>`)
        console.log(SaatSelesai[i])
    });
    output.innerHTML = `<h2>FIFO</h2><table><tr>
    <th>Proses</th>
    <th>Saat Mulai</th>
    <th>Saat Selesai</th>
    <th>TAT</th>
    </tr>
    ${hasilFifo.join("")}
    <tr>
    <td></td>
    <td></td>
    <td></td>
    <td>TAT = ${TAT.reduce((e,i)=> {return e + i})}</td></tr></table>`;
}

function PS() {
    let SaatMulai = [];
    let SaatSelesai = [];
    let hasilPS = [];
    bankData.sort((a, b) => {
        return a.Prioritas + b.Prioritas
    });
 
    bankData.forEach((e , i) => {
        let lastElemenntData = SaatMulai[SaatMulai.length - 1];
        let lastElemenntData1 = SaatSelesai[SaatSelesai.length - 1];
        if (i == 0) {
            SaatMulai.push(0);
            SaatSelesai.push(e.BurstTime);
        } else {
            SaatMulai.push(lastElemenntData + e.BurstTime);
            SaatSelesai.push(lastElemenntData1 + e.BurstTime);
        }
    });
    bankData.forEach((e,i) => {
        hasilPS.push(`<tr><td>${e.Proses}</td><td>${SaatMulai[i]}</td><td>${SaatSelesai[i]}</td><td>${SaatMulai[i]}</td></tr>`)
    });
    output.innerHTML = `<table><tr>
    <th>Proses</th>
    <th>Saat Mulai</th>
    <th>Saat Selesai</th>
    <th>AWT</th>
    </tr> ${hasilPS.join("")}
    <tr>
    <th></th>
    <th></th>
    <th></th>
    <th>AWT = ${SaatMulai.reduce((e,i)=> {return e + i})}</th>
    </tr>
    </table>`;
}