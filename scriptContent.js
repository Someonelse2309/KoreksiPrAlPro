let persentasePlagiasiMateri = 100;  // Default: 100%
let persentasePlagiasiSoal = 100;
let persentaseHalaman = 50;   // Default: 50% dari skor awal jika halaman tidak sesuai
let bobotCaraAplikasi = { tepat: 100, kurangTepat: 50, tidakTepat: 10 };
let bobotOutput = { sesuai: 100, kurangSesuai: 50, tidakSesuai: 10 };
let persentaseCaraAplikasi = 70;
let persentaseOutput = 30;

function openModal(id) {
    document.getElementById(id).style.display = "block";
}

function closeModal(id) {
    document.getElementById(id).style.display = "none";
}

function updateDistribusiPoin() {
    // Tutup modal setelah simpan
    closeModal('modalSetting');

    // Ambil nilai baru dari input modal
    let newMateriLengkap = document.getElementById("inputMateriLengkap").value;
    let newMateriKurangLengkap = document.getElementById("inputMateriKurangLengkap").value;
    let newMateriTidakLengkap = document.getElementById("inputMateriTidakLengkap").value;
    let newMateriHanyaPoin = document.getElementById("inputMateriHanyaPoin").value;
    let newMateriTidakAda = document.getElementById("inputMateriTidakAda").value;

    // Perbarui nilai radio button
    document.getElementById("radioMateri1").value = newMateriLengkap;
    document.getElementById("radioMateri2").value = newMateriKurangLengkap;
    document.getElementById("radioMateri3").value = newMateriTidakLengkap;
    document.getElementById("radioMateri4").value = newMateriHanyaPoin;
    document.getElementById("radioMateri5").value = newMateriTidakAda;

    // Ambil persentase pengurangan nilai dari plagiasi dan ketentuan halaman
    persentasePlagiasiMateri = document.getElementById("inputPenguranganPlagiasi").value;
    persentaseHalaman = document.getElementById("inputPenguranganHalaman").value;

    // Ambil nilai cara aplikasi baru
    bobotCaraAplikasi.tepat = document.getElementById("bobotCaraTepat").value;
    bobotCaraAplikasi.kurangTepat = document.getElementById("bobotCaraKurangTepat").value;
    bobotCaraAplikasi.tidakTepat = document.getElementById("bobotCaraTidakTepat").value;

    // Ambil nilai output baru
    bobotOutput.sesuai = document.getElementById("bobotOutputSesuai").value;
    bobotOutput.kurangSesuai = document.getElementById("bobotOutputKurangSesuai").value;
    bobotOutput.tidakSesuai = document.getElementById("bobotOutputTidakSesuai").value;

    // Ambil persentase pengurangan nilai dari plagiasi dan ketentuan halaman
    persentasePlagiasiMateri = document.getElementById("inputPenguranganPlagiasi").value;
    persentasePlagiasiSoal = document.getElementById("inputPenguranganPlagiasiSoal").value;
    persentaseHalaman = document.getElementById("inputPenguranganHalaman").value;

    // Jika ada radio yang sudah dipilih, hitung ulang skornya
    hitungTotalSkor();

    // Tampilkan alert bahwa perubahan berhasil disimpan
    alert("Distribusi poin telah diperbarui!");
}


// Pasang event listener untuk bagian materi
document.querySelectorAll('input[name="materi"], input[name="plagiasiMateri"], input[name="halamanMateri"]').forEach(input => {
    input.addEventListener('change', hitungTotalSkor);
});

function updateTotalBobot(type) {
    let total = 0;
    if (type === 'cara') {
        let tepat = parseInt(document.getElementById("bobotCaraTepat").value) || 0;
        let kurangTepat = parseInt(document.getElementById("bobotCaraKurangTepat").value) || 0;
        let tidakTepat = parseInt(document.getElementById("bobotCaraTidakTepat").value) || 0;
        total = tepat + kurangTepat + tidakTepat;
        document.getElementById("totalBobotCara").textContent = total + "%";
    } else if (type === 'output') {
        let sesuai = parseInt(document.getElementById("bobotOutputSesuai").value) || 0;
        let kurangSesuai = parseInt(document.getElementById("bobotOutputKurangSesuai").value) || 0;
        let tidakSesuai = parseInt(document.getElementById("bobotOutputTidakSesuai").value) || 0;
        total = sesuai + kurangSesuai + tidakSesuai;
        document.getElementById("totalBobotOutput").textContent = total + "%";
    }

    if (total !== 100) {
        alert("Total bobot harus 100%! Silakan sesuaikan.");
    }
}

function generateSoal() {
    const jumlah = parseInt(document.getElementById("jumlahSoal").value);
    const container = document.getElementById("containerSoal");
    container.innerHTML = "";

    for (let i = 1; i <= jumlah; i++) {
        const section = document.createElement("div");
        section.className = "section";
        section.innerHTML = `
                <div>
                    <div class="soal-title">Soal ${i}</div>

                    <strong>Cara Aplikasi:</strong><br>
                    <input type="radio" name="caraAplikasi${i}" value="1" onchange="hitungTotalSkor()"> Tepat<br>
                    <input type="radio" name="caraAplikasi${i}" value="0.5" onchange="hitungTotalSkor()"> Kurang Tepat<br>
                    <input type="radio" name="caraAplikasi${i}" value="0" onchange="hitungTotalSkor()"> Tidak Tepat<br><br>

                    <strong>Output Program:</strong><br>
                    <input type="radio" name="outputProgram${i}" value="1" onchange="hitungTotalSkor()"> Sesuai<br>
                    <input type="radio" name="outputProgram${i}" value="0.5" onchange="hitungTotalSkor()"> Kurang Sesuai<br>
                    <input type="radio" name="outputProgram${i}" value="0" onchange="hitungTotalSkor()"> Tidak Sesuai<br><br>

                    <strong>Plagiasi:</strong><br>
                    <input type="radio" name="plagiasiSoal${i}" value="1" onclick="toggleTextbox(true, 'plagiasiSoalSubjek${i}')" onchange="hitungTotalSkor()"> Ya<br>
                    <input type="radio" name="plagiasiSoal${i}" value="0" onclick="toggleTextbox(false, 'plagiasiSoalSubjek${i}')" onchange="hitungTotalSkor()"> Tidak<br>
                    <div id="plagiasiSoalSubjek${i}" class="bagianPlagiasi">
                        <label>Plagiasi dengan siapa:</label>
                        <input type="text" name='plagiasiSoalSubjekNama${i}' id='plagiasiSoalSubjekNama${i}'><br>
                    </div>
                    <br>
                    <strong>Skor Soal ${i}: <span id="skorSoal${i}">0</span></strong>
                    <hr>
                </div>
            `;
        container.appendChild(section);
    }
    const section = document.createElement("div");
    section.className = "section";
    section.innerHTML = '<h3>Skor Total Soal: <span id="totalSkorSoal">0</span></h3> <br/>';
    container.appendChild(section);
    container.querySelectorAll('input[type="radio"]').forEach(r => {
        r.addEventListener('change', hitungTotalSkor);
    });
}

function hitungSkorMateri() {
    const materi = document.querySelector('input[name="materi"]:checked');
    const plagiasi = document.querySelector('input[name="plagiasiMateri"]:checked');
    const halaman = document.querySelector('input[name="halamanMateri"]:checked');

    let total = 0;
    if (materi) total += parseInt(materi.value);

    // Terapkan pengurangan nilai jika plagiat
    if (plagiasi && plagiasi.value === "0") { // Jika "Ya" (plagiat)
        total *= (100 - persentasePlagiasiMateri) / 100; // Kurangi berdasarkan persentase
    }

    // Terapkan pengurangan jika halaman tidak sesuai
    if (halaman && halaman.value === "1") { // Jika "Tidak Sesuai"
        total *= persentaseHalaman / 100; // Terapkan persentase halaman
    }

    document.getElementById("totalSkorMateri").textContent = Math.round(total);
    return total;
}

function hitungSkorSoal() {
    const jumlah = parseInt(document.getElementById("jumlahSoal").value);
    const poinPerSoal = jumlah ? 60 / jumlah : 0;
    let totalSoalScore = 0;
    let adaPlagiasi = false;
    if (jumlah > 0) {
        for (let i = 1; i <= jumlah; i++) {
            const plagiasi = document.querySelector(`input[name="plagiasiSoal${i}"]:checked`);
            const cara = document.querySelector(`input[name="caraAplikasi${i}"]:checked`);
            const output = document.querySelector(`input[name="outputProgram${i}"]:checked`);

            let finalSkor = 0;
            let skorCara = 0;
            let skorOutput = 0;
            // Jika plagiat, skor soal ini = 0 dan beri tanda
            if (plagiasi && plagiasi.value === "1") {
                document.getElementById(`skorSoal${i}`).textContent = "0 (Plagiasi)";
                adaPlagiasi = true;
                continue;
            }

            let bobotCaraTerpilih = 0;
            if (cara) {
                if (cara.value === "1") bobotCaraTerpilih = bobotCaraAplikasi.tepat;
                if (cara.value === "0.5") bobotCaraTerpilih = bobotCaraAplikasi.kurangTepat;
                if (cara.value === "0") bobotCaraTerpilih = bobotCaraAplikasi.tidakTepat;
                skorCara = bobotCaraTerpilih * (persentaseCaraAplikasi / 100);
            }

            let bobotOutputTerpilih = 0;
            if (output) {
                if (output.value === "1") bobotOutputTerpilih = bobotOutput.sesuai;
                if (output.value === "0.5") bobotOutputTerpilih = bobotOutput.kurangSesuai;
                if (output.value === "0") bobotOutputTerpilih = bobotOutput.tidakSesuai;
                skorOutput = bobotOutputTerpilih * (persentaseOutput / 100);
            }

            finalSkor = (skorCara + skorOutput) / 100 * poinPerSoal;

            // Update tampilan skor soal
            document.getElementById(`skorSoal${i}`).textContent = Math.round(finalSkor);
            totalSoalScore += finalSkor;
        }

        if (adaPlagiasi) {
            document.getElementById("totalSkorSoal").textContent = "0 (Ada Plagiasi)";
            return 0;
        } else {
            // Update total skor di tampilan
            document.getElementById("totalSkorSoal").textContent = Math.round(totalSoalScore);
            return totalSoalScore;
        }
    }
    return 0;
}

function cekPlagiasiSoal(){
    const jumlah = parseInt(document.getElementById("jumlahSoal").value);
    if (jumlah > 0) {
        for (let i = 1; i <= jumlah; i++) {
            const plagiasi = document.querySelector(`input[name="plagiasiSoal${i}"]:checked`);
            if (plagiasi && plagiasi.value === "1") {
                document.getElementById(`skorSoal${i}`).textContent = "0 (Plagiasi)";
                return true;
            }
        }
        return false;
    }
}

function toggleTextbox(radio, inputId) {
    const inputBox = document.getElementById(inputId);
    if (radio) {
        inputBox.style.display = "inline-block";
    } else {
        inputBox.style.display = "none";
        inputBox.value = "";
    }
}

// Panggil fungsi saat ada perubahan input
document.querySelectorAll('input[type="radio"]').forEach(input => {
    input.addEventListener('change', hitungSkorSoal);
});

function hitungTotalSkor() {
    const formatPengumpulan = document.querySelector('input[name="format"]:checked').value;
    if (formatPengumpulan==="PDF") {
        let skorFinalSkor = 0;
        const skorMateri = hitungSkorMateri();
        skorFinalSkor = skorFinalSkor + skorMateri;
        document.getElementById("totalSkor").textContent = skorFinalSkor;
        const skorSoal = hitungSkorSoal();
        skorFinalSkor = skorFinalSkor + skorSoal;
        document.getElementById("totalSkor").textContent = skorFinalSkor;
        summaryGenerator(skorMateri, skorSoal, skorFinalSkor);
    }
    else if (formatPengumpulan === "Lainnya") {
        let skorFinalSkor = 0;
        const skorMateri = hitungSkorMateri();
        skorFinalSkor = skorFinalSkor + skorMateri;
        const skorSoal = hitungSkorSoal();
        skorFinalSkor = skorFinalSkor + skorSoal;
        summaryGenerator(skorMateri, skorSoal, `0 (Tidak mengumpulkan PDF)`);
        document.getElementById("totalSkor").textContent = `0 (Tidak mengumpulkan PDF)`;
    }
}

function updateBobotOutput() {
    let bobotCara = parseInt(document.getElementById("inputBobotCaraAplikasi").value);
    if (bobotCara > 100) bobotCara = 100; // Pastikan tidak lebih dari 100%
    document.getElementById("inputBobotOutput").value = 100 - bobotCara;
}

function reset() {
    const radios = document.querySelectorAll('input[type="radio"]');
    radios.forEach(radio => radio.checked = false);
    const bagianPlagiasi = document.getElementsByClassName('bagianPlagiasi');
    for (let i = 0; i < bagianPlagiasi.length; i++) {
        bagianPlagiasi[i].style.display = 'none';
        if (bagianPlagiasi[i].tagName === 'INPUT' || bagianPlagiasi[i].querySelector('input')) {
            const input = bagianPlagiasi[i].querySelector('input');
            if (input) input.value = '';
        }
    }
    document.getElementById('NIMSubjek').value = '';
    hitungTotalSkor();
}

function getLabel(id) {
    const data = document.querySelector(`input[name="${id}"]:checked`);
    if (data) {
        const labelText = data.parentNode.textContent.trim();
        return labelText;
    }
    return 0;
}

function summaryGenerator(skorMateri, skorSoal, skorFinalSkor){
    const container = document.getElementById("summaryContent");
    if (!container) {
        console.error("Elemen #summaryContent tidak ditemukan!");
        return;
    }
    container.innerHTML = "";

    // Get data
    const NIMSubjek = document.getElementById("NIMSubjek").value;
    const materi = getLabel('materi');
    const nilaiMateri = document.querySelector('input[name="materi"]:checked').value;
    let catatanKorektor = document.getElementById("catatanPenilai").value;

    const ketentuanHalaman = document.querySelector('input[name="halamanMateri"]:checked');
    let ketentuanHalamanText   = "Memenuhi ketentuan halaman"
    if (ketentuanHalaman && ketentuanHalaman.value === "1") {
        ketentuanHalamanText = "Tidak memenuhi ketentuan halaman (-50%)";
    }

    const plagiasiMateri = document.querySelector('input[name="plagiasiMateri"]:checked');
    let kataPlagiasi = "Tidak ada indikasi plagiasi"
    if (plagiasiMateri && plagiasiMateri.value === "0") {
        const subjekPlagiasiMateri = document.getElementById("subjekPlagiasiMateri").value;
        kataPlagiasi = `Ada indikasi plagiasi dengan ${subjekPlagiasiMateri} (-100%)`;
    }

    const section = document.createElement("div");
    section.className = "modal-body";

    let adaPlagiasiSoal = cekPlagiasiSoal();
    let stringPlagiasiSoal = '';
    if (adaPlagiasiSoal) {
        stringPlagiasiSoal = '(Ada indikasi plagiasi)';
    }
    if (catatanKorektor === '') {
        catatanKorektor = 'Tidak ada';
    }

    section.innerHTML = `
      <h2>${NIMSubjek}</h2>
      <h3>Penilaian Materi (${skorMateri}/40)</h3>
      <ul>
        <li>${materi} - ${nilaiMateri}</li>
        <li>${ketentuanHalamanText}</li>
        <li>${kataPlagiasi}</li>
      </ul>
      <h3>Penilaian Soal (${skorSoal}/60) ${stringPlagiasiSoal}</h3>
      <div></div>
        <ol id="penilaianSoal">
            
        </ol>
      </div>
      <h3>Nilai Akhir - ${skorFinalSkor}</h3>
      <h2>Catatan penilai</h2>
      <p>${catatanKorektor}</p>
    `;
    container.appendChild(section);

    const containerSoal = document.getElementById("penilaianSoal");
    containerSoal.innerHTML = "";

    const jumlah = parseInt(document.getElementById("jumlahSoal").value);
    if (jumlah>0) {
        for (let i = 1; i <= jumlah; i++) {
            const plagiasi = document.querySelector(`input[name="plagiasiSoal${i}"]:checked`);
            const cara = document.querySelector(`input[name="caraAplikasi${i}"]:checked`);
            const output = document.querySelector(`input[name="outputProgram${i}"]:checked`);
            const nilaiSkor = document.getElementById(`skorSoal${i}`).textContent;

            let kataPlagiasi = "Tidak ada indikasi plagiasi"
            if (plagiasi && plagiasi.value === "1") {
                const inputSubjek = document.getElementById(`plagiasiSoalSubjekNama${i}`);
                if (inputSubjek) {
                    const subjekPlagiasiSoal = inputSubjek.value;
                    kataPlagiasi = `Ada indikasi plagiasi dengan ${subjekPlagiasiSoal} (-100%)`;
                } else {
                    console.warn(`Input text plagiasiSoalSubjekNama${i} tidak ditemukan`);
                }
            }


            let stringCaraTerpilih = '';
            if (cara) {
                if (cara.value === "1") stringCaraTerpilih = 'Aplikasi program sesuai';
                if (cara.value === "0.5") stringCaraTerpilih = 'Aplikasi program kurang sesuai';
                if (cara.value === "0") stringCaraTerpilih = 'Aplikasi program tidak sesuai';
            }

            let stringOutputTerpilih = '';
            if (output) {
                if (output.value === "1") stringOutputTerpilih = 'Output project sesuai';
                if (output.value === "0.5") stringOutputTerpilih = 'Output project kurang sesuai';
                if (output.value === "0") stringOutputTerpilih = 'Output project tidak sesuai';
            }
            let sectionSoal = document.createElement("li");
            sectionSoal.innerHTML = `
            <h4>Soal ${i} - ${nilaiSkor}</h4>
            <ul>
              <li>${stringCaraTerpilih}</li>
              <li>${stringOutputTerpilih}</li>
              <li>${kataPlagiasi}</li>
            </ul>
            `;
            containerSoal.appendChild(sectionSoal);
        }
    }

}
