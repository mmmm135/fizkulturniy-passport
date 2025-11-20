// ======= app.js (Исправленный и Доработанный) =======

// ... (Остальной код, включая insertCustomStyles, loadData, saveData, changeView, attachInputListeners и т.д.)

(function insertCustomStyles() {
  const css = `
    .table-container {
      overflow-x: auto;
      border: 1px solid #e2e8f0;
      border-radius: 16px;
      background: white;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.02);
      padding-bottom: 8px;
    }
    table { width: 100%; border-collapse: separate; border-spacing: 0; }
    th, td { 
      padding: 6px 8px; white-space: nowrap; border-bottom: 1px solid #f1f5f9;
      height: 54px; vertical-align: middle;
    }
    thead th {
      background: #f8fafc; font-weight: 600; color: #64748b; font-size: 0.7rem;
      text-transform: uppercase; letter-spacing: 0.05em; position: sticky; top: 0; z-index: 10;
      border-bottom: 1px solid #e2e8f0; text-align: center;
    }
    /* Исправляем z-index для липких колонок */
    .sticky-col {
      position: sticky; left: 0; background: white; z-index: 20;
      border-right: 1px solid #e2e8f0; box-shadow: 4px 0 8px rgba(0,0,0,0.01);
    }
    .sticky-header-col { z-index: 30; }
    
    /* Стили для оценки */
    .grade-badge, .norm-grade {
      display: inline-flex; justify-content: center; align-items: center;
      width: 32px; height: 32px; border-radius: 9999px; font-weight: 700;
      color: white; font-size: 0.875rem;
    }
    .grade-badge.bg-green-500, .norm-grade.bg-green-500 { background-color: #10b981; }
    .grade-badge.bg-yellow-500, .norm-grade.bg-yellow-500 { background-color: #f59e0b; }
    .grade-badge.bg-red-500, .norm-grade.bg-red-500 { background-color: #ef4444; }

    /* Анимации для переключения вкладок */
    .fade-enter {
        opacity: 0;
        transform: translateY(10px);
        transition: opacity 0.3s ease, transform 0.3s ease;
    }
    .fade-enter-active {
        opacity: 1;
        transform: translateY(0);
    }
    /* Скрываем стрелки у number input */
    .result-input::-webkit-outer-spin-button,
    .result-input::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
    .result-input[type=number] {
      -moz-appearance: textfield; /* Firefox */
    }
    /* Стили для контейнера с фильтрами/действиями */
    .controls-container {
      position: sticky;
      top: 0;
      z-index: 10;
      background: #f8fafc;
      padding: 12px 16px;
      margin: -16px -16px 16px -16px;
      border-bottom: 1px solid #e2e8f0;
    }
    /* Адаптивные стили для мобильных устройств */
    @media (max-width: 768px) {
        /* Убираем скроллбар в контейнере по умолчанию, он нужен только для таблицы */
        body { overflow-x: hidden; }
        .controls-container {
            margin: -24px -16px 16px -16px; /* Больше отступ сверху для мобильной шапки */
        }
    }
  `;
  const styleSheet = document.createElement("style");
  styleSheet.type = "text/css";
  styleSheet.innerText = css;
  document.head.appendChild(styleSheet);
})();

let app;
let db;
let auth;
let userId = "guest"; // Инициализация гостевым ID
let studentsData = []; // Основной массив данных учеников
let currentView = "dashboard"; // Текущая активная вкладка
let currentClass = "all"; // Текущий выбранный класс

// Константы Firebase
const appId = typeof __app_id !== 'undefined' ? __app_id : 'default-app-id';
const firebaseConfig = typeof __firebase_config !== 'undefined' ? JSON.parse(__firebase_config) : {};
const initialAuthToken = typeof __initial_auth_token !== 'undefined' ? __initial_auth_token : null;

// Функции-заглушки для работы с Firestore (имитация)
function getCollectionRef(collectionName, isPublic = false) {
    if (!db) {
        console.error("Firestore не инициализирован.");
        return null;
    }
    const path = isPublic
        ? `/artifacts/${appId}/public/data/${collectionName}`
        : `/artifacts/${appId}/users/${userId}/${collectionName}`;
    return collection(db, path);
}

// Заглушки для firestore - заменяем на localStorage для простоты в этом файле
function saveData() {
  localStorage.setItem("studentsData", JSON.stringify(studentsData));
}

function loadData() {
  const data = localStorage.getItem("studentsData");
  if (data) {
    studentsData = JSON.parse(data);
  } else {
    // Мок-данные для первого запуска
    studentsData = [
      { id: "s1", name: "Иванов А.", class: "7А", results: {} },
      { id: "s2", name: "Петрова Е.", class: "7А", results: {} },
      { id: "s3", name: "Сидоров Д.", class: "7Б", results: {} },
      { id: "s4", name: "Козлова М.", class: "8А", results: {} },
      { id: "s5", name: "Павлов С.", class: "9А", results: {} },
    ];
    saveData();
  }
}

// --- Утилиты ---

// Показ тоста
function showToast(message, isError = false) {
  const toast = document.getElementById("toast");
  if (!toast) return;

  toast.textContent = message;
  toast.classList.remove("translate-y-full", "bg-red-500", "bg-slate-800");
  toast.classList.add(isError ? "bg-red-500" : "bg-slate-800");
  
  // Убедиться, что он скрыт перед показом (для предотвращения бага при быстром вызове)
  toast.style.opacity = '0';
  toast.classList.remove("hidden");
  
  // Показываем
  setTimeout(() => {
    toast.style.opacity = '1';
    toast.classList.remove("translate-y-full");
  }, 10); // Небольшая задержка для срабатывания анимации

  // Скрываем через 3 секунды
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.classList.add("translate-y-full");
    setTimeout(() => {
      toast.classList.add("hidden");
    }, 500); // Скрываем элемент после завершения перехода
  }, 3000);
}

// --- Представления (Views) ---

// Отображение вкладки "Журнал"
function renderJournalView() {
  const allClasses = [...new Set(studentsData.map((s) => s.class))].sort();
  const filteredStudents = currentClass === "all"
    ? studentsData
    : studentsData.filter((s) => s.class === currentClass);

  const viewContent = `
    <div class="p-6 md:p-8 space-y-6">
        <h1 class="text-3xl font-bold text-slate-800 flex items-center gap-3">
            <i class="fa-solid fa-book text-indigo-500"></i> Журнал успеваемости
        </h1>
        <p class="text-slate-500">Вводите результаты и система автоматически рассчитает оценку по 10-балльной системе.</p>

        <!-- Фильтры и действия -->
        <div class="controls-container bg-white rounded-xl shadow-lg border border-slate-200">
            <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <!-- Выбор класса -->
                <div class="flex items-center gap-2">
                    <label for="class-select" class="text-sm font-medium text-slate-700 whitespace-nowrap">Класс:</label>
                    <select id="class-select" class="p-2 border border-slate-300 rounded-lg text-sm bg-white shadow-sm focus:ring-indigo-500 focus:border-indigo-500">
                        <option value="all" ${currentClass === "all" ? "selected" : ""}>Все классы</option>
                        ${allClasses.map(c => 
                            `<option value="${c}" ${currentClass === c ? "selected" : ""}>${c}</option>`
                        ).join("")}
                    </select>
                </div>
                <!-- Кнопка Анализа ИИ -->
                <button id="aiAnalysisBtn" class="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-xl shadow-md transition duration-150 ease-in-out active:scale-95 text-sm flex items-center justify-center gap-2 disabled:bg-indigo-400">
                    <i class="fa-solid fa-brain"></i> Адаптивный Анализ ИИ
                </button>
            </div>
        </div>
        
        <!-- Таблица результатов -->
        <div class="table-container shadow-xl">
            <table class="min-w-full">
                <thead>
                    <tr>
                        <th class="sticky-col sticky-header-col rounded-tl-xl text-left pl-4 w-40">Ученик</th>
                        <th class="w-16">Класс</th>
                        <!-- Предполагаемые нормативы для примера -->
                        <th>Бег 60 м (с)</th>
                        <th>Прыжок в длину (см)</th>
                        <th>Подтягивания (кол)</th>
                        <th>Наклон вперед (см)</th>
                        <th class="rounded-tr-xl w-32">Общая оценка</th>
                    </tr>
                </thead>
                <tbody>
                    ${filteredStudents.map(student => `
                        <tr data-student-id="${student.id}" class="hover:bg-slate-50 transition duration-100">
                            <td class="sticky-col font-medium text-slate-800 pl-4">${student.name}</td>
                            <td class="text-center text-slate-600">${student.class}</td>
                            
                            <!-- Ячейки для ввода результатов -->
                            ${renderResultCell(student, "Бег 60 м (с)", "s60", "number", { max: 12, min: 6, step: 0.1 })}
                            ${renderResultCell(student, "Прыжок в длину (см)", "jump", "number", { max: 300, min: 100 })}
                            ${renderResultCell(student, "Подтягивания (кол)", "pullups", "number", { max: 30, min: 0, integer: true })}
                            ${renderResultCell(student, "Наклон вперед (см)", "bend", "number", { max: 30, min: -10 })}

                            <!-- Общая оценка (заглушка) -->
                            <td class="text-center">
                                <span class="grade-badge bg-slate-300">N/A</span>
                            </td>
                        </tr>
                    `).join("")}
                </tbody>
            </table>
        </div>

        <p class="text-sm text-slate-500 mt-4">
          <i class="fa-solid fa-circle-info mr-1"></i> 
          Кликните по результату, чтобы отредактировать. Оценка рассчитывается по 10-балльной системе на основе введенного норматива.
          (На данный момент логика расчёта оценки упрощена для демонстрации)
        </p>

    </div>
  `;
  document.getElementById("viewContainer").innerHTML = viewContent;
  
  // Добавляем слушатели после рендеринга
  document.getElementById("class-select").addEventListener("change", (e) => {
    currentClass = e.target.value;
    changeView("journal", false); // Перерендерим журнал с новым фильтром
  });

  document.getElementById("aiAnalysisBtn").addEventListener("click", () => {
    openAiAnalysisModal(filteredStudents);
  });
  
  attachInputListeners();
}

// Вспомогательная функция для рендеринга ячейки результата
function renderResultCell(student, normName, key, type = "text", attrs = {}) {
    const result = student.results[key] || "";
    const grade = calculateGrade(key, result); // Получаем оценку
    const inputType = attrs.integer ? "tel" : type; // Используем 'tel' для целых чисел на мобильных
    
    // Используем 'result-input' для input-поля
    return `
        <td class="text-center result-cell">
            <div class="flex flex-col items-center justify-center h-full">
                <input 
                    type="${type}"
                    inputmode="${attrs.integer ? 'numeric' : 'decimal'}"
                    pattern="${attrs.integer ? '[0-9]*' : '[0-9]*[.]?[0-9]*'}"
                    class="result-input p-1 text-center w-20 border border-slate-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 text-sm font-medium"
                    data-norm-key="${key}" 
                    data-student-id="${student.id}"
                    value="${result}"
                    placeholder="-"
                    ${attrs.step ? `step="${attrs.step}"` : ''}
                    ${attrs.min ? `min="${attrs.min}"` : ''}
                    ${attrs.max ? `max="${attrs.max}"` : ''}
                />
                <span class="norm-grade mt-1 ${grade.css}" data-norm-grade>
                    ${grade.score}
                </span>
            </div>
        </td>
    `;
}

// Упрощенная логика расчета оценки (заглушка)
function calculateGrade(key, result) {
    result = parseFloat(result);
    if (isNaN(result) || result <= 0) {
        return { score: "-", css: "bg-slate-300" };
    }
    
    let score;
    let css;

    // Очень упрощенные и условные нормативы для примера (для 7 класса, муж)
    switch(key) {
        case 's60':
            // Чем меньше, тем лучше
            if (result <= 8.5) { score = 10; css = "bg-green-500"; }
            else if (result <= 9.5) { score = 8; css = "bg-yellow-500"; }
            else { score = 4; css = "bg-red-500"; }
            break;
        case 'jump':
            // Чем больше, тем лучше
            if (result >= 200) { score = 10; css = "bg-green-500"; }
            else if (result >= 180) { score = 8; css = "bg-yellow-500"; }
            else { score = 4; css = "bg-red-500"; }
            break;
        case 'pullups':
            // Чем больше, тем лучше
            if (result >= 10) { score = 10; css = "bg-green-500"; }
            else if (result >= 6) { score = 8; css = "bg-yellow-500"; }
            else { score = 4; css = "bg-red-500"; }
            break;
        case 'bend':
            // Чем больше, тем лучше
            if (result >= 10) { score = 10; css = "bg-green-500"; }
            else if (result >= 0) { score = 8; css = "bg-yellow-500"; }
            else { score = 4; css = "bg-red-500"; }
            break;
        default:
            score = "-"; css = "bg-slate-300";
    }

    return { score: score, css: css };
}

// Отображение вкладки "Дашборд"
function renderDashboardView() {
  const viewContent = `
    <div class="p-6 md:p-8 space-y-6">
        <h1 class="text-3xl font-bold text-slate-800 flex items-center gap-3">
            <i class="fa-solid fa-chart-pie text-indigo-500"></i> Дашборд
        </h1>
        <p class="text-slate-500">Общая статистика успеваемости по всем нормативам.</p>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <!-- Карточка: Общее количество учеников -->
            <div class="bg-white p-6 rounded-xl shadow-xl border border-slate-200">
                <div class="text-sm font-medium text-slate-500">Всего учеников</div>
                <div class="mt-1 text-4xl font-extrabold text-slate-800">${studentsData.length}</div>
                <p class="text-sm text-slate-400 mt-2">По всем классам</p>
            </div>
            
            <!-- Карточка: Средний балл (заглушка) -->
            <div class="bg-white p-6 rounded-xl shadow-xl border border-slate-200">
                <div class="text-sm font-medium text-slate-500">Средний балл (условно)</div>
                <div class="mt-1 text-4xl font-extrabold text-indigo-600">8.2</div>
                <p class="text-sm text-slate-400 mt-2">На основе последних результатов</p>
            </div>

            <!-- Карточка: Количество пятерок (заглушка) -->
            <div class="bg-white p-6 rounded-xl shadow-xl border border-slate-200">
                <div class="text-sm font-medium text-slate-500">Отличники (условно)</div>
                <div class="mt-1 text-4xl font-extrabold text-green-600">5</div>
                <p class="text-sm text-slate-400 mt-2">Учеников с общим баллом 9+</p>
            </div>
        </div>

        <!-- Раздел для графиков (заглушка) -->
        <div class="bg-white p-6 rounded-xl shadow-xl border border-slate-200">
            <h3 class="text-xl font-semibold text-slate-700 mb-4">Распределение результатов (График)</h3>
            <div class="h-64 flex items-center justify-center text-slate-400 border border-dashed rounded-lg">
                Место для интерактивного графика (например, D3.js)
            </div>
        </div>

        <button 
            data-view="journal" 
            class="quick-action-btn bg-indigo-500 hover:bg-indigo-600 text-white font-medium py-3 px-6 rounded-xl shadow-lg transition active:scale-95 flex items-center gap-2"
        >
            <i class="fa-solid fa-book"></i> Перейти к журналу
        </button>
    </div>
  `;
  document.getElementById("viewContainer").innerHTML = viewContent;
}

// Отображение заглушки для других вкладок
function renderPlaceholderView(title) {
  const viewContent = `
    <div class="p-6 md:p-8 space-y-6 flex flex-col items-center justify-center min-h-[calc(100vh-100px)] text-center">
        <div class="p-6 bg-white rounded-xl shadow-xl border border-slate-200 max-w-md">
            <h1 class="text-3xl font-bold text-slate-800 mb-3">${title}</h1>
            <p class="text-slate-500">Эта вкладка находится в разработке.</p>
            <p class="text-sm text-slate-400 mt-4">Функционал будет доступен в следующих обновлениях.</p>
            <button 
                data-view="dashboard" 
                class="quick-action-btn mt-6 bg-indigo-500 hover:bg-indigo-600 text-white font-medium py-2 px-4 rounded-xl shadow transition active:scale-95"
            >
                Вернуться на Дашборд
            </button>
        </div>
    </div>
  `;
  document.getElementById("viewContainer").innerHTML = viewContent;
}

function changeView(view, updateUrl = true) {
  const viewContainer = document.getElementById("viewContainer");
  
  // Добавляем класс для анимации выхода
  viewContainer.classList.remove("fade-enter-active");
  viewContainer.classList.add("fade-enter");

  // Обновляем активную кнопку в навигации
  document.querySelectorAll(".nav-btn, .mobile-nav-btn").forEach(btn => {
    btn.classList.remove("bg-indigo-500", "text-white");
    btn.classList.add("bg-slate-50", "text-slate-700");
  });
  document.querySelectorAll(`[data-view="${view}"]`).forEach(btn => {
    btn.classList.remove("bg-slate-50", "text-slate-700");
    btn.classList.add("bg-indigo-500", "text-white");
  });
  
  // Откладываем рендеринг, чтобы анимация сработала
  setTimeout(() => {
    currentView = view;
    switch (view) {
      case "dashboard":
        renderDashboardView();
        break;
      case "journal":
        renderJournalView();
        break;
      case "students":
        renderPlaceholderView("Список учеников");
        break;
      default:
        renderPlaceholderView("Ошибка");
    }

    // Запускаем анимацию входа
    requestAnimationFrame(() => {
      viewContainer.classList.remove("fade-enter");
      viewContainer.classList.add("fade-enter-active");
    });

    if (updateUrl) {
      window.history.pushState({ view: view, class: currentClass }, "", `#${view}`);
    }

  }, 300); // Соответствует длительности transition (0.3s)
}

// --- Логика ИИ-Анализа ---

let isAnalysisRunning = false;

async function openAiAnalysisModal(students) {
    if (isAnalysisRunning) return;

    const modal = document.getElementById('aiAnalysisModal');
    const contentDiv = document.getElementById('analysisContent');
    const analysisBtn = document.getElementById('aiAnalysisBtn');

    // 1. Показать модальное окно и лоадер
    contentDiv.innerHTML = `
        <div class="flex flex-col items-center justify-center gap-3 py-8 text-slate-400">
            <i class="fa-solid fa-circle-notch fa-spin text-2xl text-indigo-500"></i>
            <p>ИИ анализирует показатели...</p>
        </div>
    `;
    modal.showModal();
    analysisBtn.disabled = true;
    isAnalysisRunning = true;
    
    // 2. Собрать данные для ИИ
    const analysisData = students.map(s => {
        const studentResults = Object.keys(s.results).map(key => {
            const result = s.results[key];
            const grade = calculateGrade(key, result);
            return `"${key}": результат ${result} (${grade.score} баллов)`;
        }).join(', ');
        return `Ученик ${s.name} (${s.class}): {${studentResults}}`;
    }).join('; ');
    
    const userPrompt = `Ты опытный учитель физкультуры и методист. Проанализируй следующие анонимизированные данные учеников (${students.length} человек) и предоставь подробный, но лаконичный анализ, оформленный в виде отчета (без заголовков, но с абзацами). 
    Отчет должен включать:
    1. Общие выводы по классу (сильные и слабые стороны).
    2. Рекомендации по корректировке тренировочного процесса.
    3. Выдели 2-3 учеников, требующих наибольшего внимания, и объясни почему (например, "Иванов А. требует внимания, так как его результат по бегу 60м (4 балла) сильно отстает от средних показателей").
    
    Используй 10-балльную шкалу оценок.
    
    Данные для анализа: ${analysisData}`;
    
    // 3. Вызов API Gemini
    const systemPrompt = "Ты - опытный методист и учитель физкультуры. Твой анализ должен быть профессиональным, структурированным и полезным для учителя. Форматируй ответ в Markdown. Никогда не обращайся к пользователю напрямую.";
    const apiKey = ""; 
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`;

    const payload = {
        contents: [{ parts: [{ text: userPrompt }] }],
        systemInstruction: { parts: [{ text: systemPrompt }] },
    };

    let resultText = "Ошибка: Не удалось получить анализ от ИИ. Попробуйте снова.";
    let sources = [];
    let attempts = 0;
    const maxAttempts = 3;
    let success = false;

    while (attempts < maxAttempts && !success) {
        attempts++;
        try {
            // Реализация экспоненциальной задержки
            if (attempts > 1) {
                await new Promise(resolve => setTimeout(resolve, Math.pow(2, attempts - 2) * 1000));
            }

            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const result = await response.json();
            const candidate = result.candidates?.[0];

            if (candidate && candidate.content?.parts?.[0]?.text) {
                resultText = candidate.content.parts[0].text;
                success = true;
            } else {
                resultText = "Ошибка: ИИ не предоставил ответ. Проверьте запрос.";
            }

        } catch (error) {
            console.error(`Попытка ${attempts}: Ошибка при вызове Gemini API:`, error);
        }
    }

    // 4. Отобразить результат
    const renderedHtml = success ? marked.parse(resultText) : `<p class="text-red-500">${resultText}</p>`;
    contentDiv.innerHTML = renderedHtml;

    // 5. Завершение
    isAnalysisRunning = false;
    analysisBtn.disabled = false;
}

// --- Слушатели событий и Инициализация ---

// Слушатель для полей ввода результатов
function attachInputListeners() {
  document.querySelectorAll(".result-input").forEach((input) => {
    // Ввод данных
    input.addEventListener("input", (e) => {
      const studentId = e.target.dataset.studentId;
      const normKey = e.target.dataset.normKey;
      let value = e.target.value.trim();
      
      // Если это целое число, убираем нецифровые символы (кроме знака -)
      if (e.target.inputMode === 'numeric') {
          value = value.replace(/[^\d-]/g, '');
      } else {
          // Для дробных чисел: заменяем запятую на точку, убираем все, кроме цифр, точки и знака -
          value = value.replace(',', '.');
          // Разрешаем только одну точку
          const parts = value.split('.');
          if (parts.length > 2) {
            value = parts[0] + '.' + parts.slice(1).join('');
          }
          value = value.replace(/[^\d.-]/g, '');
      }

      e.target.value = value;
      
      const student = studentsData.find((s) => s.id === studentId);
      if (student) {
        student.results[normKey] = value;
        
        // Пересчет и обновление оценки
        const g = calculateGrade(normKey, value);
        const badge = e.target.nextElementSibling; // Ищем span с оценкой по data-norm-grade
        if (badge) {
          // Сначала сбрасываем старые классы, затем добавляем новые
          badge.className = "norm-grade mt-1 " + g.css;
          badge.textContent = g.score;
        }
        saveData();
      }
    });
  });
}


// Event Delegation Init (ИСПРАВЛЕННАЯ ЧАСТЬ)
document.addEventListener("DOMContentLoaded", () => {
  // Инициализация Firebase и загрузка данных
  try {
    // app = initializeApp(firebaseConfig);
    // db = getFirestore(app);
    // auth = getAuth(app);
    // if (initialAuthToken) {
    //   signInWithCustomToken(auth, initialAuthToken).then(userCredential => {
    //     userId = userCredential.user.uid;
    //     setLogLevel('Debug');
    //     console.log("Authenticated with custom token. User ID:", userId);
    //     // Загрузка данных после аутентификации
    //     loadData();
    //     // Запускаем отображение
    //     const initialView = window.location.hash.substring(1) || "dashboard";
    //     changeView(initialView, false);
    //   }).catch(error => {
    //     console.error("Error signing in with custom token:", error);
    //     // Если токен не сработал, пробуем анонимный вход
    //     signInAnonymously(auth).then(() => {
    //         userId = auth.currentUser.uid;
    //         setLogLevel('Debug');
    //         console.log("Signed in anonymously. User ID:", userId);
    //         loadData();
    //         const initialView = window.location.hash.substring(1) || "dashboard";
    //         changeView(initialView, false);
    //     });
    //   });
    // } else {
      loadData();
      const initialView = window.location.hash.substring(1) || "dashboard";
      changeView(initialView, false);
    // }
  } catch(e) {
    console.warn("Firebase imports not available in this environment. Using mock data/localStorage.");
    loadData();
    const initialView = window.location.hash.substring(1) || "dashboard";
    changeView(initialView, false);
  }

  // Mobile menu handlers
  const btn = document.getElementById("mobileMenuBtn");
  const close = document.getElementById("closeMobileMenu");
  const overlay = document.getElementById("mobileMenuOverlay");
  const drawer = document.getElementById("mobileMenuDrawer");
  const toggle = (open) => {
    if (open) {
      overlay.classList.remove("hidden");
      setTimeout(() => overlay.classList.remove("opacity-0"), 10);
      drawer.classList.remove("-translate-x-full");
    } else {
      overlay.classList.add("opacity-0");
      drawer.classList.add("-translate-x-full");
      setTimeout(() => overlay.classList.add("hidden"), 300);
    }
  };
  if (btn) btn.onclick = () => toggle(true);
  if (close) close.onclick = () => toggle(false);
  if (overlay) overlay.onclick = () => toggle(false); // Закрытие по клику на оверлей

  // Глобальный слушатель кликов (для навигации и предотвращения закрытия полей ввода)
  document.addEventListener("click", (e) => {
    // >>> НОВОЕ ИСПРАВЛЕНИЕ ДЛЯ МОБИЛЬНЫХ УСТРОЙСТВ <<<
    // Если клик был по полю ввода, текстовой области или элементу, используемому для ввода результата,
    // мы пропускаем выполнение глобальной логики, которая могла бы вызвать потерю фокуса и сворачивание клавиатуры.
    const isInputOrEditable = 
        e.target.tagName === 'INPUT' || 
        e.target.tagName === 'TEXTAREA' || 
        e.target.isContentEditable ||
        e.target.closest('.result-input'); // Класс на самом поле ввода результата
    
    if (isInputOrEditable) {
        // console.log("Клик по полю ввода, пропускаем глобальную обработку.");
        return;
    }

    // Ищем ближайшую кнопку с атрибутом data-view (для навигации)
    // Это чинит и боковую панель (.nav-btn), и мобильную (.mobile-nav-btn), и быстрые действия
    const navBtn = e.target.closest("[data-view]");
    if (navBtn) {
      e.preventDefault(); // Предотвращаем стандартное действие (например, переход по ссылке)
      const view = navBtn.dataset.view;
      changeView(view);
      
      // Закрываем мобильное меню, если навигация была из него
      if (btn && btn.offsetParent !== null) { // Проверяем, видимо ли мобильное меню
         toggle(false);
      }
    }
  });

  // Обработка перехода назад/вперед в браузере
  window.addEventListener('popstate', (e) => {
    const view = e.state?.view || window.location.hash.substring(1) || 'dashboard';
    const classId = e.state?.class || 'all';
    currentClass = classId;
    changeView(view, false); // false, чтобы не добавлять новую запись в историю
  });
});
