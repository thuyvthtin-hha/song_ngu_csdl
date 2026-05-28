// ==========================================
// 1. CHỨC NĂNG HỆ THỐNG & ĐIỀU HƯỚNG
// ==========================================
const bgMusic = document.getElementById('bg-music');
let isPlaying = false;
function toggleMusic() {
    if (isPlaying) { bgMusic.pause(); document.getElementById('music-control').innerText = "🔇"; } 
    else { bgMusic.play(); document.getElementById('music-control').innerText = "🔊"; }
    isPlaying = !isPlaying;
}

function showMainUI() {
    document.getElementById('game-area').style.display = 'none';
    document.getElementById('flashcard-area').style.display = 'none';
    document.getElementById('sql-area').style.display = 'none';
    document.getElementById('quiz-area').style.display = 'none';
    document.getElementById('main-ui').style.display = 'block';
}

// ==========================================
// 2. BẢNG XẾP HẠNG & QUẢN LÝ DỮ LIỆU
// ==========================================
const STORAGE_KEY = 'db_master_leaderboard';
let leaderboardData = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [
    {name: "Admin", score: 2500}, {name: "Học sinh Giỏi", score: 1800}, {name: "Chiến thần Ẩn danh", score: 1200}
];

function getRankName(score) {
    if(score >= 3000) return "👑 Chiến thần Độc tôn";
    if(score >= 1500) return "⚔️ Đại tướng Truy vấn";
    if(score >= 500) return "🛡️ Hiệp sĩ Lược đồ";
    return "🌱 Tân binh Dữ liệu";
}

function updateLeaderboardUI() {
    const container = document.getElementById('leaderboard-list');
    if(!container) return;
    container.innerHTML = "";
    leaderboardData.sort((a, b) => b.score - a.score).slice(0, 5).forEach((item, index) => {
        const div = document.createElement('div');
        div.className = 'rank-item';
        div.innerHTML = `<span>#${index + 1} - ${item.name} <br><small style="color:var(--secondary); font-size:0.8rem;">${getRankName(item.score)}</small></span><span>${item.score} Điểm</span>`;
        container.appendChild(div);
    });
}
window.addEventListener('load', updateLeaderboardUI);

function saveScore(finalScore) {
    if (finalScore === 0) return;
    let pName = document.getElementById('player-name').value.trim();
    if (!pName) pName = "Chiến thần Ẩn danh";
    leaderboardData.push({ name: pName, score: finalScore });
    localStorage.setItem(STORAGE_KEY, JSON.stringify(leaderboardData));
    updateLeaderboardUI();
}

function exportLeaderboard() {
    const password = prompt("Nhập mật mã Quản Tướng để xuất dữ liệu:");
    if (password !== "admin123") { alert("Mật mã không chính xác!"); return; }
    if (!leaderboardData || leaderboardData.length === 0) { alert("Chưa có chiến tích!"); return; }
    let csvContent = "\uFEFFXếp hạng,Danh xưng,Điểm chiến tích\n"; 
    const sortedData = [...leaderboardData].sort((a, b) => b.score - a.score);
    sortedData.forEach((row, index) => { csvContent += `${index + 1},"${row.name}",${row.score}\n`; });
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob); link.download = "Bang_Vinh_Danh_Chien_Than.csv";
    document.body.appendChild(link); link.click(); document.body.removeChild(link);
}

// ==========================================
// 3. GAME TỪ VỰNG (TRẮC NGHIỆM & GÕ PHÍM)
// ==========================================
let score = 0, combo = 1, currentWords = [], currentIndex = 0;
let isAnswered = false, isHardcore = false, currentGameLevel = 0;

function startGame(i) {
    currentGameLevel = i;
    document.getElementById('main-ui').style.display = 'none';
    document.getElementById('game-area').style.display = 'block';
    
    if (i === 5) { 
        isHardcore = true;
        currentWords = lessons.flat().sort(() => Math.random() - 0.5).slice(0, 15);
    } else {
        isHardcore = false;
        currentWords = [...lessons[i]].sort(() => Math.random() - 0.5);
    }
    currentIndex = 0; score = 0; combo = 1; isAnswered = false;
    updateGameUI(); loadNext();
}

function loadNext() {
    isAnswered = false;
    if(currentIndex >= currentWords.length){ 
        if(document.getElementById('sound-win')) document.getElementById('sound-win').play(); 
        alert(`${isHardcore ? "🏆 CHIẾN THẦN THỰC THỤ!" : "🎉 VƯỢT ẢI THÀNH CÔNG!"}\nĐiểm chiến tích: ${score}`); 
        saveScore(score); quitGame(); return; 
    }
    const d = currentWords[currentIndex]; 
    const displayEl = document.getElementById('word-display'), optionBox = document.getElementById('option-box'), typingBox = document.getElementById('typing-box'), inputEl = document.getElementById('typing-input'), feedbackEl = document.getElementById('typing-feedback');
    if (isHardcore) {
        displayEl.innerText = d.vi; displayEl.style.color = "var(--danger)"; 
        optionBox.style.display = 'none'; typingBox.style.display = 'block';
        inputEl.value = ""; inputEl.disabled = false; inputEl.className = ""; inputEl.style.borderColor = "var(--primary)"; inputEl.style.color = "white"; feedbackEl.innerHTML = "";
        setTimeout(() => inputEl.focus(), 100); 
    } else {
        displayEl.innerText = d.en; displayEl.style.color = "white";
        optionBox.style.display = 'block'; typingBox.style.display = 'none'; optionBox.innerHTML = "";
        const opts = [{text: d.vi, correct: true}, ...d.alt.map(a => ({text: a, correct: false}))].sort(() => Math.random() - 0.5);
        opts.forEach((o, index) => {
            const b = document.createElement('button'); b.className = 'option-btn'; 
            b.innerHTML = `<span class="shortcut-hint">[Phím ${index + 1}]</span> ${o.text}`;
            b.dataset.correct = o.correct; b.onclick = () => handleAnswer(b, o.correct); optionBox.appendChild(b);
        });
    }
}

function handleAnswer(button, isCorrect) {
    if (isAnswered) return; isAnswered = true;
    const allBtns = document.querySelectorAll('.option-btn');
    allBtns.forEach(btn => btn.disabled = true); 
    if (isCorrect) {
        if(document.getElementById('sound-correct')) document.getElementById('sound-correct').play(); 
        score += (10 * combo); combo++; button.style.background = "var(--success)"; button.style.borderColor = "var(--success)"; button.style.color = "var(--dark)";
        setTimeout(() => { currentIndex++; loadNext(); updateGameUI(); }, 800);
    } else {
        if(document.getElementById('sound-wrong')) document.getElementById('sound-wrong').play(); combo = 1; 
        button.style.background = "var(--danger)"; button.style.borderColor = "var(--danger)";
        allBtns.forEach(btn => { if (btn.dataset.correct === "true") { btn.style.background = "var(--success)"; btn.style.color = "var(--dark)"; } });
        setTimeout(() => { currentIndex++; loadNext(); updateGameUI(); }, 2000);
    }
    updateGameUI();
}

function checkTyping() {
    if (isAnswered) return;
    const inputEl = document.getElementById('typing-input'), feedbackEl = document.getElementById('typing-feedback');
    const userAns = inputEl.value.trim().toLowerCase(), correctAns = currentWords[currentIndex].en.toLowerCase();
    if (!userAns) { inputEl.focus(); return; }
    isAnswered = true; inputEl.disabled = true;
    if (userAns === correctAns) {
        if(document.getElementById('sound-correct')) document.getElementById('sound-correct').play(); 
        score += (20 * combo); combo++; inputEl.style.borderColor = "var(--success)"; inputEl.style.color = "var(--success)"; feedbackEl.innerText = "CHÍNH XÁC!"; feedbackEl.style.color = "var(--success)";
        setTimeout(() => { currentIndex++; loadNext(); updateGameUI(); }, 800);
    } else {
        if(document.getElementById('sound-wrong')) document.getElementById('sound-wrong').play(); combo = 1; 
        inputEl.style.borderColor = "var(--danger)"; inputEl.style.color = "var(--danger)"; inputEl.classList.add("shake"); 
        feedbackEl.innerHTML = `SAI RỒI! Đáp án chuẩn: <span style="color:var(--success)">${currentWords[currentIndex].en.toUpperCase()}</span>`; feedbackEl.style.color = "var(--danger)";
        setTimeout(() => { currentIndex++; loadNext(); updateGameUI(); }, 2500);
    }
    updateGameUI();
}

function updateGameUI() {
    document.getElementById('score-display').innerText = "CHIẾN TÍCH: " + score;
    document.getElementById('combo-display').innerText = "COMBO x" + combo;
}

function quitGame() {
    if(score > 0 && currentIndex < currentWords.length) saveScore(score);
    showMainUI(); document.getElementById('leaderboard').scrollIntoView();
}

// ==========================================
// 4. GÓC LUYỆN BINH (FLASHCARDS)
// ==========================================
let flashcardWords = [], fcIndex = 0;
function showFlashcards() {
    showMainUI(); document.getElementById('main-ui').style.display = 'none'; document.getElementById('flashcard-area').style.display = 'block';
    flashcardWords = lessons.flat(); fcIndex = 0; updateFlashcard();
}
function updateFlashcard() {
    const card = document.getElementById('fc-card'); card.classList.remove('is-flipped'); 
    setTimeout(() => {
        document.getElementById('fc-en').innerText = flashcardWords[fcIndex].en;
        document.getElementById('fc-vi').innerText = flashcardWords[fcIndex].vi;
        document.getElementById('fc-counter').innerText = `${fcIndex + 1} / ${flashcardWords.length}`;
    }, 150); 
}
function flipCard() { document.getElementById('fc-card').classList.toggle('is-flipped'); }
function nextCard() { if (fcIndex < flashcardWords.length - 1) { fcIndex++; updateFlashcard(); } }
function prevCard() { if (fcIndex > 0) { fcIndex--; updateFlashcard(); } }

// ==========================================
// 5. THỰC CHIẾN SQL (ALASQL SANDBOX)
// ==========================================
const sqlMissions = [
    { desc: "Lấy ra tất cả các cột và tất cả các dòng dữ liệu từ bảng HOCSINH.", hint: "SELECT * FROM HOCSINH;", validate: (res) => res && res.length === 5 && Object.keys(res[0]).length === 5 },
    { desc: "Trích xuất danh sách học sinh thuộc lớp '11B3'.", hint: "Dùng WHERE Lop = '11B3'", validate: (res) => res && res.length === 3 && res.every(r => r.Lop === '11B3') },
    { desc: "Tìm học sinh trường 'THPT A Hai Hau' có DiemTin từ 9 trở lên.", hint: "Dùng WHERE ... AND ...", validate: (res) => res && res.length === 2 && res.every(r => r.DiemTin >= 9 && r.Truong === 'THPT A Hai Hau') },
    { desc: "Sắp xếp DiemTin theo thứ tự giảm dần.", hint: "Dùng ORDER BY DiemTin DESC", validate: (res) => { if (!res || res.length < 5) return false; return res[0].DiemTin >= res[1].DiemTin && res[1].DiemTin >= res[res.length-1].DiemTin; } }
];
let currentMissionIndex = -1;
function showSQLSandbox() {
    showMainUI(); document.getElementById('main-ui').style.display = 'none'; document.getElementById('sql-area').style.display = 'block';
    document.getElementById('sql-mission-select').value = "-1"; document.getElementById('mission-desc').innerText = ""; document.getElementById('sql-input').value = ""; document.getElementById('sql-result').innerHTML = "<i>Kết quả truy vấn sẽ hiển thị tại đây...</i>";
    currentMissionIndex = -1; initDatabase();
}
function initDatabase() {
    alasql('DROP TABLE IF EXISTS HOCSINH'); alasql('CREATE TABLE HOCSINH (MaHS INT, HoTen STRING, DiemTin INT, Lop STRING, Truong STRING)');
    alasql("INSERT INTO HOCSINH VALUES (1, 'Bui Van Tuan', 9, '11B3', 'THPT A Hai Hau'), (2, 'Tran Ngoc Linh', 7, '11B3', 'THPT A Hai Hau'), (3, 'Le Quoc Khanh', 10, '11B3', 'THPT A Hai Hau'), (4, 'Pham Duc Duy', 5, '11A1', 'THPT A Hai Hau'), (5, 'Vu Hoang Hiep', 8, '12A2', 'THPT B Hai Hau')");
}
function loadMission() {
    currentMissionIndex = parseInt(document.getElementById('sql-mission-select').value);
    if (currentMissionIndex >= 0) { document.getElementById('mission-desc').innerHTML = `🎯 <b>Nhiệm vụ:</b> ${sqlMissions[currentMissionIndex].desc}`; document.getElementById('sql-input').focus(); } else { document.getElementById('mission-desc').innerText = ""; }
}
function showHint() { if (currentMissionIndex === -1) { alert("Vui lòng chọn một bài thực hành trước!"); return; } alert("💡 GỢI Ý:\n" + sqlMissions[currentMissionIndex].hint); }
function executeSQL() {
    const query = document.getElementById('sql-input').value.trim(); const resultBox = document.getElementById('sql-result');
    if(!query) { resultBox.innerHTML = "<span style='color:red; font-weight:bold;'>⚠️ Vui lòng nhập lệnh!</span>"; return; }
    try {
        const res = alasql(query);
        if (Array.isArray(res) && res.length > 0) {
            let html = "<table class='sql-table'><tr>"; Object.keys(res[0]).forEach(key => { html += `<th>${key}</th>`; }); html += "</tr>";
            res.forEach(row => { html += "<tr>"; Object.values(row).forEach(val => { html += `<td>${val}</td>`; }); html += "</tr>"; }); html += "</table>"; resultBox.innerHTML = html;
            if (currentMissionIndex >= 0) {
                if (sqlMissions[currentMissionIndex].validate(res)) {
                    if(document.getElementById('sound-correct')) document.getElementById('sound-correct').play();
                    resultBox.innerHTML += `<div style="margin-top: 15px; padding: 12px; background: #d1fae5; color: #065f46; border: 1px solid #10b981; border-radius: 8px; font-weight: bold; font-size:1.1rem; text-align:center;">✅ CHÍNH XÁC!</div>`;
                } else {
                    if(document.getElementById('sound-wrong')) document.getElementById('sound-wrong').play();
                    resultBox.innerHTML += `<div style="margin-top: 15px; padding: 12px; background: #fee2e2; color: #b91c1c; border: 1px solid #ef4444; border-radius: 8px; font-weight: bold; text-align:center;">❌ CHƯA ĐẠT! Vui lòng thử lại.</div>`;
                }
            }
        } else { resultBox.innerHTML = "<i>Không có dữ liệu trả về (Bảng trống).</i>"; }
    } catch (error) { resultBox.innerHTML = `<span style='color:red; font-weight:bold;'>❌ LỖI CÚ PHÁP: ${error.message}</span>`; }
}

// ==========================================
// 6. THI THỬ TRẮC NGHIỆM & TẢI FILE CSV
// ==========================================
let userAnswers = [], currentQuiz = [];

function showQuiz(type) {
    showMainUI(); document.getElementById('main-ui').style.display = 'none'; document.getElementById('quiz-area').style.display = 'block';
    document.getElementById('quiz-result').style.display = 'none'; document.getElementById('quiz-actions').style.display = 'block';
    
    // Nạp dữ liệu mảng từ file data.js
    if(type === 'VN') {
        currentQuiz = typeof quizVN !== 'undefined' ? quizVN : [];
        document.getElementById('quiz-title').innerText = "BÀI THI TỔNG HỢP (TIẾNG VIỆT)"; document.getElementById('quiz-title').style.color = "var(--success)";
    } else if (type === 'EN') {
        currentQuiz = typeof quizEN !== 'undefined' ? quizEN : [];
        document.getElementById('quiz-title').innerText = "BÀI THI TỔNG HỢP (TIẾNG ANH)"; document.getElementById('quiz-title').style.color = "var(--gold)";
    }
    userAnswers = new Array(currentQuiz.length).fill(null); renderQuiz();
}

function renderQuiz() {
    const container = document.getElementById('quiz-container'); container.innerHTML = ""; 
    currentQuiz.forEach((q, qIndex) => {
        const qDiv = document.createElement('div'); qDiv.className = 'quiz-question';
        let html = `<h4>${q.question}</h4><div class="quiz-options">`;
        q.options.forEach((opt, oIndex) => {
            html += `<label class="quiz-opt-label" id="label-${qIndex}-${oIndex}"><input type="radio" name="q${qIndex}" value="${oIndex}" onclick="selectOption(${qIndex}, ${oIndex})">${opt}</label>`;
        });
        html += `</div>`; qDiv.innerHTML = html; container.appendChild(qDiv);
    });
}

function selectOption(qIndex, oIndex) {
    userAnswers[qIndex] = oIndex;
    document.querySelectorAll(`input[name="q${qIndex}"]`).forEach(radio => {
        const lbl = document.getElementById(`label-${qIndex}-${radio.value}`);
        if(radio.checked) lbl.classList.add('selected'); else lbl.classList.remove('selected');
    });
}

function submitQuiz() {
    if (userAnswers.includes(null)) { if (!confirm("Bạn chưa làm hết. Vẫn nộp bài chứ?")) return; }
    let correctCount = 0;
    currentQuiz.forEach((q, qIndex) => {
        const userChoice = userAnswers[qIndex], correctChoice = q.answer;
        document.querySelectorAll(`input[name="q${qIndex}"]`).forEach(input => input.disabled = true);
        if (userChoice !== null) {
            if (userChoice === correctChoice) { correctCount++; document.getElementById(`label-${qIndex}-${userChoice}`).classList.add('correct'); } 
            else { document.getElementById(`label-${qIndex}-${userChoice}`).classList.add('wrong'); document.getElementById(`label-${qIndex}-${correctChoice}`).classList.add('correct'); }
        } else { document.getElementById(`label-${qIndex}-${correctChoice}`).classList.add('correct'); }
    });
    document.getElementById('quiz-actions').style.display = 'none';
    const resultBox = document.getElementById('quiz-result'); resultBox.style.display = 'block'; resultBox.scrollIntoView(); 
    
    const scoreDisplay = document.getElementById('quiz-score-display'), feedback = document.getElementById('quiz-feedback');
    scoreDisplay.innerText = `${correctCount}/${currentQuiz.length}`;
    const percentage = currentQuiz.length > 0 ? correctCount / currentQuiz.length : 0;
    
    if (percentage === 1) {
        if(document.getElementById('sound-win')) document.getElementById('sound-win').play();
        feedback.innerHTML = "🏆 <b>XUẤT SẮC!</b> Bạn nắm kiến thức vô cùng vững vàng!"; scoreDisplay.style.color = "var(--success)";
    } else if (percentage >= 0.6) {
        if(document.getElementById('sound-correct')) document.getElementById('sound-correct').play();
        feedback.innerHTML = "👍 <b>TỐT!</b> Nền tảng khá ổn, hãy ôn tập thêm các câu làm sai nhé."; scoreDisplay.style.color = "var(--gold)";
    } else {
        if(document.getElementById('sound-wrong')) document.getElementById('sound-wrong').play();
        feedback.innerHTML = "⚠️ <b>CHƯA ĐẠT!</b> Lỗ hổng kiến thức còn nhiều. Hãy quay lại xem lại bài học!"; scoreDisplay.style.color = "var(--danger)";
    }
}

function handleCSVUpload(event) {
    const file = event.target.files[0]; if (!file) return;
    const reader = new FileReader();
    reader.onload = function(e) { parseCSVToQuiz(e.target.result); };
    reader.readAsText(file, 'UTF-8'); event.target.value = ''; 
}

function parseCSVToQuiz(text) {
    let p = '', row = [''], ret = [row], i = 0, r = 0, s = !0, l;
    for (l of text) {
        if ('"' === l) { if (s && l === p) row[i] += l; s = !s; } 
        else if (',' === l && s) l = row[++i] = '';
        else if ('\n' === l && s) { if ('\r' === p) row[i] = row[i].slice(0, -1); row = ret[++r] = [l = '']; i = 0; } 
        else row[i] += l; p = l;
    }
    const newQuestions = [];
    for (let j = 1; j < ret.length; j++) {
        const cols = ret[j];
        if (cols.length >= 6 && cols[0].trim() !== "") {
            newQuestions.push({ question: cols[0], options: [cols[1], cols[2], cols[3], cols[4]], answer: parseInt(cols[5]) });
        }
    }
    if (newQuestions.length > 0) {
        quizVN = newQuestions; // Tạm thời đẩy đề CSV vào kho Tiếng Việt
        alert(`✅ Nạp đạn thành công! Đã tải lên ${newQuestions.length} câu hỏi.`);
        if (document.getElementById('quiz-area').style.display === 'block') { showQuiz('VN'); }
    } else { alert("❌ Lỗi: Cấu trúc file CSV chưa đúng chuẩn."); }
}

// ==========================================
// 7. LẮNG NGHE SỰ KIỆN BÀN PHÍM
// ==========================================
window.addEventListener('keydown', function(e) {
    if (document.getElementById('sql-area').style.display === 'block' && e.key === 'F5') { e.preventDefault(); executeSQL(); }
    const gameArea = document.getElementById('game-area');
    if (gameArea.style.display === 'block') {
        if (isHardcore && e.key === 'Enter' && !isAnswered) { checkTyping(); } 
        else if (!isHardcore && !isAnswered) {
            const key = parseInt(e.key);
            if (key >= 1 && key <= 4) { const btns = document.querySelectorAll('.option-btn'); if (btns[key - 1]) btns[key - 1].click(); }
        }
    }
});