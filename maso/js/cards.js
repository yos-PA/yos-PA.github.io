let verbs = [];
let current = null;

// Cargar Excel (Asegúrate de que lista.xlsx esté en la raíz)
fetch("lista.xlsx")
.then(res => res.arrayBuffer())
.then(data => {
    const wb = XLSX.read(data, { type: "array" });
    const sheet = wb.Sheets[wb.SheetNames[0]];
    const rows = XLSX.utils.sheet_to_json(sheet, { header: 1 });

    for (let i = 1; i < rows.length; i++) {
        if (rows[i][1]) {
            verbs.push({
                num: i,
                inf: rows[i][1],
                past: rows[i][2],
                part: rows[i][3],
                es: rows[i][4]
            });
        }
    }
    newVerb();
});

function resetFlips() {
    document.querySelectorAll(".flip-card").forEach(c => c.classList.remove("flipped"));
}

function newVerb() {
    if (verbs.length === 0) return;
    current = verbs[Math.floor(Math.random() * verbs.length)];

    // Llenar textos
    document.getElementById("infinitive").textContent = current.inf;
    document.getElementById("meaning").textContent = current.es;
    document.getElementById("pastSimple").textContent = current.past;
    document.getElementById("pastParticiple").textContent = current.part;
    document.getElementById("cardNum").textContent = "#" + current.num;

    const imgElement = document.getElementById("verbImage");
    
    // Resetear el estado de la imagen
    imgElement.style.display = "block";

    // Intentar primero con .jpg
    imgElement.src = `img/${current.num}.jpg`;

    // Si falla el .jpg, intentamos con .jpeg y nada más
    imgElement.onerror = function() {
        if (this.src.toLowerCase().endsWith('.jpg')) {
            this.src = `img/${current.num}.jpeg`;
        } else {
            // Si también falla el .jpeg, ocultamos la imagen
            this.style.display = "none";
            // Evitamos bucles infinitos eliminando el handler de error temporalmente
            this.onerror = null;
        }
    };

    resetFlips();
}
function flipMain() { document.getElementById("mainCard").parentElement.classList.toggle("flipped"); }
function flipPast() { document.getElementById("pastCard").parentElement.classList.toggle("flipped"); }
function flipPart() { document.getElementById("partCard").parentElement.classList.toggle("flipped"); }

