// ======= Физкультурный паспорт =======

(function insertCustomStyles() {
  const css = `
    /* --- Table Styles --- */
    .table-container {
      overflow-x: auto;
      border: 1px solid #e2e8f0;
      border-radius: 16px;
      background: white;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.02);
      padding-bottom: 8px;
      min-height: 200px;
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
    .sticky-col {
      position: sticky; left: 0; background: white; z-index: 20;
      border-right: 1px solid #e2e8f0; box-shadow: 4px 0 8px rgba(0,0,0,0.01);
    }
    thead th.sticky-col { z-index: 30; background: #f8fafc; }
    tbody tr:hover td, tbody tr:hover .sticky-col { background-color: #fcfcfc; }
    
    .cell-wrapper { display: flex; align-items: center; justify-content: center; gap: 6px; position: relative; width: 100%; }
    .input-group { position: relative; width: 64px; }
    .input-std {
      width: 100%; height: 34px; padding: 4px 4px 4px 8px;
      border: 1px solid #e2e8f0; border-radius: 8px; font-size: 14px; font-weight: 500;
      text-align: center; background: #fff; color: #334155; transition: all 0.2s; font-family: 'Inter', monospace;
    }
    .input-std:focus { border-color: #3b82f6; outline: none; box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1); z-index: 5; position: relative; }
    
    .input-hint {
        position: absolute; bottom: -16px; left: 50%; transform: translateX(-50%);
        color: #94a3b8; font-size: 9px; pointer-events: none; font-weight: 500;
        white-space: nowrap; opacity: 0; transition: opacity 0.2s;
    }
    .input-group:hover .input-hint, .input-std:focus + .input-hint { opacity: 1; }

    .grade-badge {
      width: 28px; height: 28px; border-radius: 8px; display: flex; align-items: center;
      justify-content: center; font-size: 13px; font-weight: 800; flex-shrink: 0;
      background: #f1f5f9; color: #cbd5e1; transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
    }

    .g-10, .g-9 { background-color: #15803d; color: #fff; box-shadow: 0 2px 4px rgba(21, 128, 61, 0.2); }
    .g-8, .g-7 { background-color: #22c55e; color: #fff; }
    .g-6, .g-5 { background-color: #facc15; color: #854d0e; }
    .g-4, .g-3 { background-color: #fdba74; color: #9a3412; }
    .g-2, .g-1 { background-color: #fee2e2; color: #991b1b; }
    .g-none { background-color: #f8fafc; color: #cbd5e1; border: 1px solid #f1f5f9; }
    
    /* Mobile Cards */
    .student-card { 
      background: white; border-radius: 16px; border: 1px solid #e2e8f0; 
      margin-bottom: 12px; overflow: hidden; transition: transform 0.1s;
    }
    .student-card:active { transform: scale(0.99); }
    .card-header { 
      padding: 16px; display: flex; justify-content: space-between; align-items: center; 
      cursor: pointer; background: white;
    }
    .card-header:active { background: #f8fafc; }
    .norm-grid { display: grid; grid-template-columns: 1fr; gap: 12px; padding: 16px; background: #f8fafc; border-top: 1px solid #e2e8f0; }
    @media(min-width: 500px) { .norm-grid { grid-template-columns: 1fr 1fr; } }
    .norm-item { 
      background: white; padding: 12px; border-radius: 12px; border: 1px solid #e2e8f0; 
      display: flex; flex-direction: column; gap: 8px; box-shadow: 0 1px 2px rgba(0,0,0,0.03);
    }
    .norm-controls { display: flex; gap: 8px; align-items: stretch; }
    .norm-grade { 
      width: 42px; display: flex; align-items: center; justify-content: center; border-radius: 10px; 
      font-weight: 800; font-size: 16px; background: #f1f5f9; color: #cbd5e1; flex-shrink: 0; 
    }

    /* Form Styles */
    .floating { position: relative; margin-bottom: 16px; }
    .floating input, .floating select {
        width: 100%; padding: 20px 16px 8px; border: 1px solid #e2e8f0; border-radius: 14px;
        font-size: 16px; outline: none; transition: all 0.2s; appearance: none; background: white;
        height: 56px;
    }
    .floating label {
        position: absolute; left: 16px; top: 50%; transform: translateY(-50%);
        font-size: 15px; color: #94a3b8; pointer-events: none; transition: 0.2s;
    }
    .floating.active label { top: 10px; transform: none; font-size: 11px; font-weight: 600; color: #3b82f6; }
    .floating input:focus, .floating select:focus { border-color: #3b82f6; ring: 2px; ring-color: #eff6ff; }
    
    /* Parallel Filter Buttons */
    .parallel-btn {
        width: 36px; height: 36px; border-radius: 50%; font-weight: 700; font-size: 14px;
        display: flex; align-items: center; justify-content: center;
        background: #f1f5f9; color: #64748b; transition: all 0.2s;
    }
    .parallel-btn:hover { background: #e2e8f0; color: #475569; }
    .parallel-btn.active { background: #2563eb; color: white; box-shadow: 0 4px 6px -2px rgba(37, 99, 235, 0.3); }

    /* Class Filter Pills */
    .class-pill {
        border: 1px solid #e2e8f0; border-radius: 8px; padding: 6px 10px;
        font-size: 12px; font-weight: 600; color: #64748b; cursor: pointer;
        transition: all 0.2s; background: white; text-align: center;
    }
    .class-pill:hover { border-color: #cbd5e1; }
    .class-pill.active { background: #eff6ff; border-color: #3b82f6; color: #2563eb; }
  `;
  const style = document.createElement("style");
  style.textContent = css;
  document.head.appendChild(style);
})();

// ======= 1. Нормативы (Беларусь 2023) =======

const EXERCISES = {
  run30m: { label: "Бег 30м", unit: "с", type: "speed", hint: "сек" },
  shuttle4x9: { label: "Челн. 4x9", unit: "с", type: "speed", hint: "сек" },
  jumpLong: { label: "Прыжок", unit: "см", type: "strength", hint: "см" },
  ropeJump: { label: "Скакалка", unit: "раз", type: "strength", hint: "раз" },
  pullUps: { label: "Подтяг.", unit: "раз", type: "strength", hint: "раз" },
  pushUps: { label: "Отжим.", unit: "раз", type: "strength", hint: "раз" },
  dips: { label: "Брусья", unit: "раз", type: "strength", hint: "раз" },
  sitUps: { label: "Пресс", unit: "раз", type: "strength", hint: "раз" },
  flexibility: { label: "Гибкость", unit: "см", type: "strength", hint: "см" },
  runLong: { label: "Бег 6мин", unit: "м", type: "strength", hint: "метры" },
  run1000: { label: "Бег 1000м", unit: "м.с", type: "speed", hint: "мин.сек" },
  run1500: { label: "Бег 1500м", unit: "м.с", type: "speed", hint: "мин.сек" },
  run2000: { label: "Бег 2000м", unit: "м.с", type: "speed", hint: "мин.сек" },
  run3000: { label: "Бег 3000м", unit: "м.с", type: "speed", hint: "мин.сек" },
};

const NORMS = {
  5: {
    M: {
      run30m: [5.3, 5.5, 5.6, 5.7, 5.9, 6.1, 6.4, 6.7, 7.0, 7.2],
      shuttle4x9: [10.1, 10.3, 10.5, 10.7, 10.9, 11.3, 11.7, 12.1, 12.5, 12.9],
      jumpLong: [179, 174, 170, 165, 160, 151, 143, 133, 123, 114],
      ropeJump: [40, 38, 36, 34, 32, 28, 24, 20, 16, 14],
      pullUps: [5, 4, 3, 2, 1, null, null, null, null, null],
      pushUps: [22, 19, 15, 13, 12, 9, 7, 6, 4, 2],
      sitUps: null,
      flexibility: [8, 6, 5, 3, 1, -3, -7, -11, -14, -18],
      runLong: [1140, 1080, 1020, 1000, 950, 900, 860, 800, 710, 700],
      run1000: [4.16, 4.28, 4.41, 4.53, 5.06, 5.31, 5.56, 6.21, 6.46, 7.11],
    },
    F: {
      run30m: [5.6, 5.7, 5.8, 5.9, 6.0, 6.2, 6.4, 6.7, 6.9, 7.1],
      shuttle4x9: [10.4, 10.7, 10.9, 11.1, 11.3, 11.8, 12.3, 12.7, 13.2, 13.6],
      jumpLong: [167, 162, 157, 153, 148, 138, 129, 120, 110, 100],
      ropeJump: [124, 115, 104, 95, 83, 75, 68, 60, 57, 52],
      pullUps: [16, 14, 12, 10, 8, 6, 4, 2, 1, 0],
      sitUps: [47, 45, 43, 41, 39, 35, 31, 27, 23, 19],
      flexibility: [12, 11, 9, 8, 6, 3, 0, -4, -7, -10],
      runLong: [1110, 1000, 970, 920, 890, 850, 800, 760, 660, 650],
      run1000: [4.55, 5.1, 5.2, 5.33, 5.46, 6.12, 6.39, 7.05, 7.31, 7.58],
    },
  },
  6: {
    M: {
      run30m: [5.2, 5.3, 5.4, 5.5, 5.6, 5.8, 6.0, 6.2, 6.4, 6.6],
      shuttle4x9: [9.6, 9.8, 10.0, 10.2, 10.4, 10.8, 11.2, 11.6, 12.0, 12.3],
      jumpLong: [189, 184, 179, 174, 169, 160, 150, 140, 130, 120],
      ropeJump: [96, 90, 82, 77, 74, 65, 53, 44, 32, 26],
      pullUps: [6, 5, 4, 3, 2, 1, null, null, null, null],
      pushUps: [28, 26, 22, 20, 17, 14, 11, 7, 4, 2],
      sitUps: null,
      flexibility: [9, 7, 5, 3, 2, -2, -5, -9, -12, -16],
      runLong: [1150, 1080, 1030, 1000, 960, 920, 870, 800, 710, 700],
      run1000: [4.1, 4.2, 4.32, 4.45, 4.57, 5.22, 5.46, 6.11, 6.36, 7.0],
    },
    F: {
      run30m: [5.3, 5.4, 5.6, 5.7, 5.8, 6.0, 6.3, 6.5, 6.8, 7.0],
      shuttle4x9: [10.3, 10.5, 10.7, 10.9, 11.1, 11.5, 11.9, 12.3, 12.7, 13.1],
      jumpLong: [174, 169, 165, 160, 156, 146, 137, 128, 119, 110],
      ropeJump: [132, 125, 115, 108, 102, 91, 80, 72, 64, 57],
      pullUps: [17, 15, 13, 11, 9, 7, 5, 3, 2, 1],
      sitUps: [50, 48, 46, 43, 41, 37, 32, 28, 23, 19],
      flexibility: [15, 13, 11, 10, 8, 4, 1, -3, -6, -10],
      runLong: [1220, 1190, 1130, 1090, 1030, 1000, 950, 890, 770, 760],
      run1000: [4.47, 5.0, 5.14, 5.27, 5.41, 6.1, 6.34, 7.0, 7.28, 7.55],
    },
  },
  7: {
    M: {
      run30m: [4.9, 5.0, 5.1, 5.2, 5.3, 5.5, 5.8, 6.0, 6.2, 6.4],
      shuttle4x9: [9.4, 9.6, 9.8, 9.9, 10.1, 10.4, 10.7, 11.0, 11.3, 11.7],
      jumpLong: [206, 201, 195, 190, 185, 174, 164, 153, 143, 132],
      ropeJump: [118, 110, 105, 97, 85, 74, 63, 50, 44, 36],
      pullUps: [7, 6, 5, 4, 3, 2, 1, null, null, null],
      pushUps: [30, 28, 25, 23, 21, 17, 14, 12, 10, 5],
      sitUps: null,
      flexibility: [11, 9, 8, 6, 5, 1, -2, -5, -8, -11],
      runLong: [1280, 1230, 1200, 1150, 1110, 1080, 1040, 1000, 920, 910],
      run1000: [3.57, 4.09, 4.2, 4.32, 4.43, 5.06, 5.28, 5.51, 6.14, 6.37],
    },
    F: {
      run30m: [5.2, 5.3, 5.4, 5.5, 5.6, 5.8, 6.0, 6.2, 6.4, 6.6],
      shuttle4x9: [10.2, 10.3, 10.5, 10.6, 10.8, 11.1, 11.4, 11.7, 12.0, 12.3],
      jumpLong: [183, 178, 174, 169, 164, 155, 146, 137, 128, 119],
      ropeJump: [127, 120, 114, 107, 102, 91, 83, 78, 71, 65],
      pullUps: [18, 16, 14, 12, 10, 8, 6, 4, 2, 1],
      sitUps: [51, 49, 47, 45, 43, 40, 36, 32, 29, 25],
      flexibility: [17, 15, 13, 11, 10, 8, 5, 2, -1, -4],
      runLong: [1190, 1120, 1080, 1030, 1000, 980, 930, 890, 780, 770],
      run1000: [4.37, 4.48, 4.59, 5.09, 5.2, 5.41, 6.02, 6.23, 6.44, 7.06],
    },
  },
  8: {
    M: {
      run30m: [4.7, 4.8, 4.9, 5.0, 5.1, 5.3, 5.5, 5.7, 5.9, 6.0],
      shuttle4x9: [9.2, 9.4, 9.5, 9.7, 9.8, 10.1, 10.4, 10.7, 10.9, 11.2],
      jumpLong: [217, 212, 208, 203, 198, 189, 179, 170, 160, 151],
      ropeJump: [123, 115, 103, 96, 89, 80, 72, 58, 45, 38],
      pullUps: [9, 8, 7, 6, 5, 4, 2, 1, null, null],
      pushUps: [32, 30, 26, 24, 21, 18, 15, 10, 7, 5],
      sitUps: null,
      flexibility: [13, 11, 9, 8, 6, 2, -1, -5, -8, -12],
      runLong: [1350, 1300, 1250, 1230, 1200, 1150, 1100, 1040, 1000, 990],
      run1000: [3.48, 3.59, 4.1, 4.2, 4.31, 4.53, 5.14, 5.35, 5.57, 6.18],
    },
    F: {
      run30m: [5.1, 5.3, 5.4, 5.5, 5.6, 5.8, 6.0, 6.2, 6.5, 6.7],
      shuttle4x9: [10.1, 10.3, 10.4, 10.6, 10.8, 11.1, 11.4, 11.8, 12.1, 12.4],
      jumpLong: [184, 180, 175, 170, 165, 155, 146, 136, 126, 117],
      ropeJump: [131, 126, 118, 112, 109, 100, 91, 86, 80, 76],
      pullUps: [19, 17, 15, 13, 11, 9, 7, 5, 3, 1],
      sitUps: [52, 50, 48, 46, 44, 41, 37, 33, 30, 26],
      flexibility: [16, 15, 13, 12, 10, 7, 4, 1, -2, -5],
      runLong: [1210, 1150, 1100, 1070, 1040, 1000, 980, 940, 840, 830],
      run1000: [4.41, 4.52, 5.04, 5.15, 5.27, 5.3, 6.13, 6.36, 6.59, 7.21],
    },
  },
  9: {
    M: {
      run30m: [4.5, 4.7, 4.8, 4.9, 5.0, 5.2, 5.4, 5.6, 5.8, 6.0],
      shuttle4x9: [9.0, 9.1, 9.3, 9.4, 9.6, 9.9, 10.1, 10.4, 10.7, 11.0],
      jumpLong: [233, 228, 223, 218, 212, 202, 192, 181, 171, 160],
      ropeJump: [124, 120, 110, 100, 90, 82, 73, 65, 58, 54],
      pullUps: [12, 11, 10, 8, 7, 5, 2, 1, null, null],
      pushUps: [34, 32, 29, 26, 24, 21, 18, 15, 12, 10],
      sitUps: null,
      flexibility: [14, 12, 11, 10, 9, 6, 4, 1, -1, -3],
      runLong: [1410, 1370, 1330, 1300, 1280, 1220, 1170, 1130, 1100, 1080],
      run1500: [5.49, 5.58, 6.1, 6.17, 6.28, 6.46, 7.07, 7.29, 7.48, 8.06],
    },
    F: {
      run30m: [5.1, 5.2, 5.3, 5.4, 5.5, 5.7, 5.9, 6.1, 6.3, 6.5],
      shuttle4x9: [10.0, 10.1, 10.3, 10.5, 10.7, 11.1, 11.4, 11.8, 12.1, 12.5],
      jumpLong: [189, 184, 180, 176, 171, 163, 154, 145, 136, 128],
      ropeJump: [135, 130, 120, 112, 107, 92, 80, 71, 68, 65],
      pullUps: [20, 18, 16, 14, 12, 10, 8, 6, 4, 2],
      sitUps: [55, 53, 51, 49, 47, 43, 39, 35, 31, 28],
      flexibility: [19, 17, 15, 14, 12, 9, 6, 2, -1, -4],
      runLong: [1215, 1180, 1120, 1100, 1070, 1000, 960, 910, 850, 855],
      run1000: [4.41, 4.51, 5.0, 5.12, 5.21, 5.43, 6.02, 6.23, 6.4, 7.04],
    },
  },
  10: {
    M: {
      run30m: [4.3, 4.4, 4.5, 4.6, 4.7, 4.9, 5.1, 5.3, 5.5, 5.7],
      shuttle4x9: [8.8, 8.9, 9.0, 9.2, 9.3, 9.6, 9.8, 10.1, 10.3, 10.6],
      jumpLong: [247, 242, 236, 231, 225, 215, 204, 193, 182, 171],
      ropeJump: [135, 125, 118, 110, 104, 96, 90, 83, 75, 60],
      pullUps: [13, 12, 11, 10, 9, 7, 4, 2, 1, null],
      dips: [15, 13, 12, 10, 9, 7, 5, 3, 2, 1],
      sitUps: null,
      flexibility: [17, 16, 14, 12, 10, 6, 3, -1, -5, -8],
      runLong: [1430, 1400, 1380, 1350, 1320, 1300, 1280, 1250, 1210, 1170],
      run1500: [5.25, 5.39, 5.52, 6.06, 6.19, 6.46, 7.13, 7.4, 8.07, 8.34],
      run3000: [
        13.2, 14.05, 14.45, 15.25, 16.05, 16.5, 17.4, 18.3, 19.2, 19.21,
      ],
    },
    F: {
      run30m: [4.9, 5.0, 5.1, 5.2, 5.3, 5.5, 5.7, 6.0, 6.2, 6.4],
      shuttle4x9: [9.8, 9.9, 10.1, 10.3, 10.5, 10.8, 11.2, 11.5, 11.9, 12.2],
      jumpLong: [196, 191, 187, 182, 177, 168, 159, 149, 140, 131],
      ropeJump: [139, 133, 126, 120, 114, 110, 104, 92, 85, 76],
      pullUps: [24, 21, 19, 18, 17, 15, 12, 11, 10, 9],
      sitUps: [58, 56, 54, 52, 50, 46, 42, 38, 34, 30],
      flexibility: [21, 20, 18, 16, 15, 12, 8, 5, 2, -2],
      runLong: [1285, 1250, 1200, 1170, 1130, 1110, 1090, 1040, 980, 910],
      run1000: [4.38, 4.5, 5.03, 5.15, 5.27, 5.52, 6.16, 6.41, 7.07, 7.3],
    },
  },
  11: {
    M: {
      run30m: [4.2, 4.3, 4.4, 4.5, 4.6, 4.8, 5.0, 5.1, 5.3, 5.5],
      shuttle4x9: [8.6, 8.8, 8.9, 9.0, 9.1, 9.3, 9.5, 9.7, 9.9, 10.1],
      jumpLong: [252, 247, 242, 237, 231, 220, 212, 203, 192, 182],
      ropeJump: [141, 136, 128, 120, 112, 98, 84, 68, 55, 40],
      pullUps: [16, 15, 13, 12, 11, 8, 6, 3, 2, 1],
      dips: [19, 17, 15, 13, 12, 10, 8, 5, 3, 2],
      sitUps: null,
      flexibility: [19, 16, 14, 12, 10, 6, 3, -1, -5, -8],
      runLong: [1505, 1460, 1410, 1370, 1335, 1300, 1210, 1170, 1100, 1010],
      run1500: [5.05, 5.29, 5.4, 5.5, 6.01, 6.11, 6.32, 6.52, 7.13, 7.34],
      run3000: [12.5, 13.3, 14.1, 14.5, 15.3, 16.0, 16.25, 16.4, 17.0, 17.2],
    },
    F: {
      run30m: [5.0, 5.1, 5.2, 5.3, 5.4, 5.5, 5.7, 5.9, 6.1, 6.3],
      shuttle4x9: [9.8, 9.9, 10.1, 10.2, 10.4, 10.7, 11.0, 11.2, 11.5, 11.8],
      jumpLong: [200, 194, 189, 184, 179, 168, 158, 147, 137, 126],
      ropeJump: [144, 140, 133, 128, 122, 110, 100, 85, 68, 50],
      pushUps: [18, 15, 12, 9, 6, 5, 4, 3, 2, 1],
      pullUps: null,
      sitUps: [57, 55, 53, 52, 50, 47, 44, 41, 38, 35],
      flexibility: [22, 21, 19, 17, 16, 12, 9, 5, 2, -2],
      runLong: [1245, 1200, 1180, 1145, 1105, 1090, 1040, 990, 930, 895],
      run1000: [4.36, 4.45, 4.55, 5.06, 5.15, 5.34, 5.54, 6.13, 6.33, 6.52],
      run2000: [10.17, 10.3, 10.43, 10.56, 12.1, 12.3, 12.5, 13.1, 13.3, 13.31],
    },
  },
};

// ======= 2. Данные и Логика =======
let classesData = JSON.parse(localStorage.getItem("classesData")) || {};
let currentView = "dashboard";
let selectedClassKey = null;
let sortState = 0;

// STATE FOR FILTERS
let filterState = {
  active: false,
  minYear: null,
  maxYear: null,
  sex: "all",
  performance: "all",
  selectedNorms: [],
  selectedClasses: [], // New: Store selected classes
};

function sortClasses(keys) {
  return keys.sort((a, b) => {
    const numA = parseInt(a) || 0;
    const numB = parseInt(b) || 0;
    if (numA !== numB) return numA - numB;
    return a.localeCompare(b);
  });
}

function validateAndRepairData() {
  if (Object.keys(classesData).length === 0) {
    ["5А", "6А", "7А", "8А", "9А", "10А", "11А"].forEach(
      (cls) => (classesData[cls] = [])
    );
    saveData();
    return;
  }
  let fixed = false;
  for (const key in classesData) {
    if (!Array.isArray(classesData[key])) {
      classesData[key] = [];
      fixed = true;
    }
  }
  if (fixed) saveData();
}

async function loadDefaultData() {
  // Проверяем, есть ли данные в localStorage.
  // Если там пусто, пробуем загрузить файл по умолчанию.
  const hasData = localStorage.getItem("classesData");
  
  // Используем глобальную переменную, заданную в HTML, или дефолтное значение 'fizra_db.json'
  const fileName = window.DB_FILE || 'fizra_db.json';

  if (!hasData) {
    try {
      console.log(`Загрузка базы данных по умолчанию: ${fileName}`);
      const response = await fetch(fileName);
      
      if (response.ok) {
        const data = await response.json();
        classesData = data;
        saveData();
        console.log("База данных успешно загружена и сохранена.");
        
        // Обновляем UI, если приложение уже запущено
        if (currentView === "dashboard") renderDashboard();
        if (currentView === "students") {
            const keys = sortClasses(Object.keys(classesData));
            if (keys.length > 0 && !selectedClassKey) selectedClassKey = keys[0];
            renderStudents();
        }
        showToast("База данных загружена");
      } else {
        console.warn("Не удалось загрузить файл базы данных (HTTP error).");
        showToast("Ошибка загрузки: файл не найден (" + fileName + ")", "error");
      }
    } catch (error) {
      console.warn("Ошибка при загрузке базы данных (возможно CORS):", error);
    }
  } else {
    // Если данные уже были, просто валидируем структуру
    validateAndRepairData();
  }
}

// Запускаем инициализацию
loadDefaultData();

function saveData() {
  localStorage.setItem("classesData", JSON.stringify(classesData));
  showToast();
}

function showToast(msg, type = 'success') {
  const toast = document.getElementById("toast");
  const toastMsg = document.getElementById("toastMsg");
  const icon = toast.querySelector("i");
  
  if (toast) {
    if(msg) toastMsg.innerText = msg;
    else toastMsg.innerText = "Сохранено";
    
    // Меняем стиль в зависимости от типа
    if (type === 'error') {
        icon.className = "fa-solid fa-circle-exclamation text-red-400";
    } else {
        icon.className = "fa-solid fa-circle-check text-emerald-400";
    }
    
    toast.classList.remove("translate-y-20", "opacity-0");
    setTimeout(() => {
      toast.classList.add("translate-y-20", "opacity-0");
    }, 3000);
  }
}

function calculateGrade(normKey, value, sex, classNum, group) {
  if ((group === "ЛФК" || group === "СМГ") && value !== "" && value !== null) {
    return { score: "Осв", css: "g-none", val: null };
  }

  if (!value || value === "") return { score: "-", css: "g-none", val: 0 };

  let val = parseFloat(String(value).replace(",", "."));
  if (isNaN(val)) return { score: "-", css: "g-none", val: 0 };

  let effectiveClass = classNum;
  if (isNaN(effectiveClass)) effectiveClass = parseInt(classNum);
  if (!NORMS[effectiveClass]) effectiveClass = 5;

  const genderKey = sex === "Мужской" ? "M" : "F";
  const genderNorms = NORMS[effectiveClass]?.[genderKey];

  if (!genderNorms) return { score: "-", css: "g-none", val: 0 };
  if (!genderNorms[normKey]) return { score: "-", css: "g-none", val: 0 };

  const table = genderNorms[normKey];
  const type = EXERCISES[normKey].type;
  let score = 0;

  if (type === "speed") {
    for (let i = 0; i < 10; i++) {
      if (table[i] !== null && val <= table[i]) {
        score = 10 - i;
        break;
      }
    }
    if (score === 0 && table[9] !== null && val > table[9]) score = 1;
  } else {
    for (let i = 0; i < 10; i++) {
      if (table[i] !== null && val >= table[i]) {
        score = 10 - i;
        break;
      }
    }
    if (score === 0 && table[9] !== null && val < table[9]) score = 1;
  }

  if (score === 0) score = 1;
  return { score: score, css: `g-${score}`, val: score };
}

// Helper to calculate student average for sorting/filtering
function calculateStudentAverage(student, normsList) {
  const normsToCheck = normsList || Object.keys(EXERCISES);
  let sum = 0;
  let count = 0;

  normsToCheck.forEach((n) => {
    const res = student.results?.[n];
    if (res) {
      const g = calculateGrade(
        n,
        res,
        student.sex,
        student.className,
        student.group
      );
      if (g.val !== null && g.val !== 0) {
        // Only count actual scores
        sum += g.val;
        count++;
      }
    }
  });

  return { avg: count === 0 ? 0 : sum / count, count };
}

function generatePDF(students, norms) {
  if (!window.pdfMake) {
    alert("Библиотека PDF еще не загрузилась. Попробуйте через секунду.");
    return;
  }

  const headers = [
    { text: "Ученик", style: "tableHeader" },
    { text: "Класс", style: "tableHeader" },
    { text: "Пол", style: "tableHeader" },
    { text: "Гр.", style: "tableHeader" },
    ...norms.map((n) => ({
      text: EXERCISES[n].label,
      style: "tableHeader",
      fontSize: 8,
    })),
  ];

  const body = [headers];

  students.forEach((s) => {
    const row = [
      { text: s.name, style: "cell" },
      { text: s.className, style: "cell", alignment: "center" },
      {
        text: s.sex === "Мужской" ? "М" : "Ж",
        style: "cell",
        alignment: "center",
      },
      { text: s.group.substring(0, 3), style: "cell", alignment: "center" },
    ];

    norms.forEach((n) => {
      const val = s.results[n] || "";
      const g = calculateGrade(n, val, s.sex, parseInt(s.className), s.group);
      row.push({
        text: g.score !== "-" ? g.score : "",
        style: "cell",
        alignment: "center",
        fillColor:
          g.val && g.val >= 9
            ? "#dcfce7"
            : g.val && g.val <= 4
            ? "#fee2e2"
            : null,
      });
    });

    body.push(row);
  });

  const docDefinition = {
    pageOrientation: "landscape",
    pageSize: "A4",
    pageMargins: [20, 20, 20, 20],
    content: [
      {
        text: `Журнал нормативов (${new Date().toLocaleDateString()})`,
        style: "header",
      },
      {
        table: {
          headerRows: 1,
          widths: ["auto", "auto", "auto", "auto", ...norms.map(() => "*")],
          body: body,
        },
        layout: "lightHorizontalLines",
      },
    ],
    styles: {
      header: {
        fontSize: 18,
        bold: true,
        margin: [0, 0, 0, 10],
      },
      tableHeader: {
        bold: true,
        fontSize: 10,
        color: "black",
        fillColor: "#f1f5f9",
        margin: [0, 2, 0, 2],
      },
      cell: {
        fontSize: 10,
        margin: [0, 2, 0, 2],
      },
    },
    defaultStyle: {
      font: "Roboto",
    },
  };

  pdfMake
    .createPdf(docDefinition)
    .download(`journal_${new Date().toLocaleDateString()}.pdf`);
}

// ======= 3. UI Core =======
window.switchView = (view) => {
  currentView = view;
  document.querySelectorAll(".nav-btn, .mobile-nav-btn").forEach((btn) => {
    if (btn.dataset.view === view) {
      btn.classList.add("bg-blue-50", "text-blue-600", "nav-active");
      btn.classList.remove("text-slate-600");
    } else {
      btn.classList.remove("bg-blue-50", "text-blue-600", "nav-active");
      btn.classList.add("text-slate-600");
    }
  });

  const container = document.getElementById("viewContainer");
  if (container) {
    container.innerHTML = "";
    const drawer = document.getElementById("mobileMenuDrawer");
    const overlay = document.getElementById("mobileMenuOverlay");
    if (drawer) drawer.classList.add("-translate-x-full");
    if (overlay) {
      overlay.classList.add("hidden");
      overlay.classList.add("opacity-0");
    }

    try {
      if (view === "dashboard") renderDashboard();
      else if (view === "students") renderStudents();
      else if (view === "journal") renderJournal();
    } catch (e) {
      console.error(e);
      container.innerHTML = `<div class="p-10 text-center text-red-500">Ошибка отрисовки: ${e.message}</div>`;
    }
  }
};

window.downloadData = async () => {
  const json = JSON.stringify(classesData);
  const date = new Date().toLocaleDateString("ru-RU").replace(/\./g, "-");
  // Используем короткое имя для скачивания и последующей перезаливки
  const filename = 'fizra_db.json';

  const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(json);
  const node = document.createElement("a");
  node.href = dataStr;
  node.download = filename;
  document.body.appendChild(node);
  node.click();
  node.remove();
};

window.shareData = async () => {
  const json = JSON.stringify(classesData);
  const date = new Date().toLocaleDateString("ru-RU").replace(/\./g, "-");
  const fileName = `fizra_db_${date}.json`;

  if (navigator.canShare && navigator.share) {
    const file = new File([json], fileName, { type: "application/json" });
    const shareData = {
      files: [file],
      title: "Физкультурный паспорт",
      text: "База данных учеников",
    };
    if (navigator.canShare(shareData)) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        if (err.name !== "AbortError") console.error("Ошибка шаринга:", err);
      }
    }
  }
};

window.editStudent = (id) => {
  let studentClass = selectedClassKey;
  let student = null;

  if (filterState.active) {
    for (const cls in classesData) {
      const s = classesData[cls].find((x) => x.id === id);
      if (s) {
        student = s;
        studentClass = cls;
        break;
      }
    }
  } else {
    student = classesData[selectedClassKey]?.find((x) => x.id === id);
  }

  if (!student) return;

  const originalClassKey = selectedClassKey;
  if (filterState.active) {
    selectedClassKey = studentClass;
  }

  const idInput = document.getElementById("mId");
  if (idInput) {
    idInput.value = student.id;
    document.getElementById("mName").value = student.name;

    const sexRadio = document.querySelector(
      `input[name="mSex"][value="${student.sex}"]`
    );
    if (sexRadio) sexRadio.checked = true;

    document.getElementById("mGroup").value = student.group;
    document.getElementById("mYear").value = student.year || "";

    document.querySelectorAll(".floating").forEach((el) => {
      const inp = el.querySelector("input, select");
      if (inp && inp.value) el.classList.add("active");
      else if (inp && inp.tagName === "SELECT") el.classList.add("active");

      el.querySelector("input, select")?.classList.remove("input-error");
      const err = el.querySelector(".error-text");
      if (err) err.remove();
    });

    const delBtn = document.getElementById("mDelete");
    if (delBtn) delBtn.style.display = "block";

    const modal = document.getElementById("studentModal");
    modal.onclose = () => {
      if (filterState.active) {
        selectedClassKey = originalClassKey;
      }
    };
    modal.showModal();
  }
};

// ======= 4. Render Functions =======
function renderDashboard() {
  const container = document.getElementById("viewContainer");
  const totalStudents = Object.values(classesData).reduce(
    (a, b) => a + b.length,
    0
  );

  container.innerHTML = `
    <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8 fade-enter">
       <div class="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm relative overflow-hidden">
          <div class="absolute top-0 right-0 p-4 opacity-10"><i class="fa-solid fa-user-graduate text-6xl text-blue-600"></i></div>
          <p class="text-slate-400 text-xs uppercase font-bold tracking-wider">Всего учеников</p>
          <p class="text-3xl font-bold text-slate-800 mt-2">${totalStudents}</p>
       </div>
       <div class="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm relative overflow-hidden">
          <div class="absolute top-0 right-0 p-4 opacity-10"><i class="fa-solid fa-layer-group text-6xl text-emerald-600"></i></div>
          <p class="text-slate-400 text-xs uppercase font-bold tracking-wider">Классов</p>
          <p class="text-3xl font-bold text-slate-800 mt-2">${
            Object.keys(classesData).length
          }</p>
       </div>
    </div>
    <div class="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm fade-enter" style="animation-delay: 0.1s">
        <h3 class="font-bold text-lg mb-4">Быстрые действия</h3>
        <div class="flex gap-3 flex-wrap">
            <button data-view="students" class="flex items-center gap-2 px-4 py-3 bg-slate-50 text-slate-700 rounded-xl text-sm font-bold hover:bg-slate-100 transition quick-action-btn">
                <i class="fa-solid fa-plus"></i> Добавить ученика
            </button>
            <button data-view="journal" class="flex items-center gap-2 px-4 py-3 bg-blue-600 text-white rounded-xl text-sm font-bold hover:bg-blue-700 transition shadow-lg shadow-blue-200 quick-action-btn">
                <i class="fa-solid fa-pen-to-square"></i> Перейти в журнал
            </button>
        </div>
    </div>
  `;
}

function renderStudents() {
  const container = document.getElementById("viewContainer");
  if (!selectedClassKey || !classesData[selectedClassKey]) {
    const keys = sortClasses(Object.keys(classesData));
    selectedClassKey = keys[0];
  }

  container.innerHTML = `
    <div class="bg-white rounded-2xl shadow-sm border border-slate-100 flex flex-col h-[calc(100vh-120px)] fade-enter">
       <div class="p-4 border-b border-slate-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white rounded-t-2xl">
          <div class="flex items-center gap-2 w-full sm:w-auto">
             <div class="flex gap-1">
                 <select id="stdClassSelect" class="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-sm font-bold outline-none focus:border-blue-500 cursor-pointer w-28">
                    ${sortClasses(Object.keys(classesData))
                      .map((k) => `<option value="${k}">${k}</option>`)
                      .join("")}
                 </select>
                 <button id="addClassBtn" class="w-10 bg-slate-100 text-slate-600 rounded-xl hover:bg-slate-200 font-bold flex items-center justify-center" title="Добавить класс"><i class="fa-solid fa-plus"></i></button>
             </div>
             <button id="addStudentBtn" class="bg-blue-600 text-white px-4 py-2.5 rounded-xl text-sm font-bold hover:bg-blue-700 shadow-md shadow-blue-100 active:scale-95 transition whitespace-nowrap ml-2">+ Ученик</button>
          </div>
          <div class="flex gap-2 w-full sm:w-auto">
             <button id="shareBtn" class="w-10 h-10 rounded-xl bg-slate-100 text-slate-600 flex items-center justify-center hover:bg-slate-200 transition" title="Поделиться (только мобильные)"><i class="fa-solid fa-share-nodes"></i></button>
             <button id="downloadBtn" class="flex-1 sm:flex-none px-3 py-2 rounded-lg bg-slate-100 text-slate-600 text-xs font-bold hover:bg-slate-200 transition flex items-center justify-center"><i class="fa-solid fa-download mr-1"></i> Скачать</button>
             <label class="flex-1 sm:flex-none px-3 py-2 rounded-lg bg-slate-100 text-slate-600 text-xs font-bold hover:bg-slate-200 transition cursor-pointer flex items-center justify-center"><i class="fa-solid fa-upload mr-1"></i> Загрузить<input type="file" id="importFile" class="hidden" accept=".json"></label>
          </div>
       </div>
       <div id="stdList" class="flex-1 overflow-y-auto p-4 bg-slate-50"></div>
    </div>
    
    <!-- Modal -->
    <dialog id="studentModal" class="rounded-2xl shadow-2xl p-0 w-full max-w-[400px] backdrop:bg-black/40">
       <form method="dialog" class="bg-white flex flex-col h-full">
          <div class="p-6 border-b font-bold flex justify-between items-center text-xl text-slate-800">
             <span>Ученик</span>
             <button type="button" class="text-slate-400 hover:text-slate-600 w-8 h-8 rounded-full hover:bg-slate-100 closeModalBtn"><i class="fa-solid fa-xmark"></i></button>
          </div>
          <div class="p-8 space-y-4"> 
             <input type="hidden" id="mId">
             <div class="floating">
                <input type="text" id="mName" placeholder=" ">
                <label>ФИО Ученика</label>
             </div>
             
             <div>
                <label class="block text-sm font-bold text-slate-700 mb-2">Пол</label>
                <div class="flex gap-2 bg-slate-50 p-1 rounded-xl">
                    <label class="flex-1 cursor-pointer">
                        <input type="radio" name="mSex" value="Мужской" class="peer hidden" checked>
                        <div class="py-2 text-center text-sm font-medium rounded-lg text-slate-500 peer-checked:bg-white peer-checked:text-blue-600 peer-checked:shadow-sm transition">Мужской</div>
                    </label>
                    <label class="flex-1 cursor-pointer">
                        <input type="radio" name="mSex" value="Женский" class="peer hidden">
                        <div class="py-2 text-center text-sm font-medium rounded-lg text-slate-500 peer-checked:bg-white peer-checked:text-pink-600 peer-checked:shadow-sm transition">Женский</div>
                    </label>
                </div>
             </div>

             <div class="floating">
                <input type="number" id="mYear" placeholder=" " inputmode="numeric">
                <label>Год рожд.</label>
             </div>

             <div class="floating active">
                <select id="mGroup"><option>Основная</option><option>Подготовительная</option><option>СМГ</option><option>ЛФК</option></select>
                <label>Группа</label>
             </div>
          </div>
          <div class="p-6 bg-slate-50 flex justify-between rounded-b-2xl border-t border-slate-100">
             <button id="mDelete" type="button" class="text-red-500 font-bold text-sm hover:bg-red-50 px-4 py-2 rounded-xl transition">Удалить</button>
             <button id="mSave" type="button" class="bg-blue-600 text-white px-8 py-3 rounded-xl font-bold shadow-lg shadow-blue-200 hover:bg-blue-700 transition text-sm">Сохранить</button>
          </div>
       </form>
    </dialog>
  `;

  const select = document.getElementById("stdClassSelect");
  if (select && selectedClassKey) select.value = selectedClassKey;
  select.onchange = () => {
    selectedClassKey = select.value;
    renderStudentList();
  };

  document.getElementById("addClassBtn").onclick = () => {
    const newClass = prompt("Введите название класса (например: 9Б):");
    if (newClass && newClass.trim() !== "") {
      if (classesData[newClass]) {
        alert("Такой класс уже существует!");
        selectedClassKey = newClass;
      } else {
        classesData[newClass] = [];
        selectedClassKey = newClass;
        saveData();
      }
      renderStudents();
    }
  };

  document.getElementById("importFile").onchange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        classesData = JSON.parse(event.target.result);
        saveData();
        validateAndRepairData();
        selectedClassKey = sortClasses(Object.keys(classesData))[0];
        renderStudents();
        alert("База успешно загружена!");
      } catch (err) {
        alert("Ошибка чтения файла: " + err.message);
      }
    };
    reader.readAsText(file);
  };

  const modal = document.getElementById("studentModal");
  document.getElementById("addStudentBtn").onclick = () => {
    document.getElementById("mId").value = "new";
    document.getElementById("mName").value = "";
    document.getElementById("mYear").value = "";

    const maleRadio = document.querySelector(
      'input[name="mSex"][value="Мужской"]'
    );
    if (maleRadio) maleRadio.checked = true;

    document.querySelectorAll(".floating").forEach((el) => {
      const inp = el.querySelector("input, select");
      if (inp && inp.tagName === "SELECT") {
        el.classList.add("active");
      } else {
        el.classList.remove("active");
      }
      el.querySelector("input, select")?.classList.remove("input-error");
      const err = el.querySelector(".error-text");
      if (err) err.remove();
    });

    const delBtn = document.getElementById("mDelete");
    if (delBtn) delBtn.style.display = "none";

    modal.showModal();
  };
  document.querySelector(".closeModalBtn").onclick = () => modal.close();
  document.getElementById("downloadBtn").onclick = window.downloadData;
  document.getElementById("shareBtn").onclick = window.shareData;

  const delBtn = document.getElementById("mDelete");
  if (delBtn) {
    delBtn.onclick = () => {
      const id = document.getElementById("mId").value;
      if (!id || id === "new") return;

      if (confirm("Точно удалить ученика?")) {
        classesData[selectedClassKey] = classesData[selectedClassKey].filter(
          (s) => s.id != id
        );
        saveData();
        renderStudentList();
        modal.close();
      }
    };
  }

  document.getElementById("mSave").onclick = () => {
    const idField = document.getElementById("mId");
    const nameField = document.getElementById("mName");
    const yearField = document.getElementById("mYear");

    document.querySelectorAll(".error-text").forEach((e) => e.remove());
    document
      .querySelectorAll(".input-error")
      .forEach((e) => e.classList.remove("input-error"));

    let isValid = true;

    const nameVal = nameField.value.trim();
    if (!nameVal || /[^а-яА-ЯёЁa-zA-Z\s\-]/.test(nameVal)) {
      nameField.classList.add("input-error");
      const err = document.createElement("div");
      err.className = "error-text";
      err.innerText = "Только буквы";
      nameField.parentNode.appendChild(err);
      isValid = false;
    }

    const yearVal = parseInt(yearField.value);
    const currentYear = new Date().getFullYear();
    if (!yearVal || yearVal < 2000 || yearVal > currentYear) {
      yearField.classList.add("input-error");
      const err = document.createElement("div");
      err.className = "error-text";
      err.innerText = `2000 - ${currentYear}`;
      yearField.parentNode.appendChild(err);
      isValid = false;
    }

    if (!isValid) return;

    const id = idField.value;
    const sexVal = document.querySelector('input[name="mSex"]:checked').value;

    const student = {
      id: id === "new" ? Date.now() : Number(id),
      name: nameVal,
      sex: sexVal,
      group: document.getElementById("mGroup").value,
      year: yearVal,
      results:
        id === "new"
          ? {}
          : classesData[selectedClassKey].find((s) => s.id == id)?.results ||
            {},
    };

    if (id === "new") classesData[selectedClassKey].push(student);
    else {
      const idx = classesData[selectedClassKey].findIndex((s) => s.id == id);
      if (idx !== -1) classesData[selectedClassKey][idx] = student;
    }
    saveData();
    renderStudentList();
    modal.close();
  };

  document
    .querySelectorAll(".floating input, .floating select")
    .forEach((inp) => {
      const check = () => {
        if (inp.value || inp.tagName === "SELECT")
          inp.parentElement.classList.add("active");
        else inp.parentElement.classList.remove("active");
      };
      inp.addEventListener("blur", check);
      inp.addEventListener("input", check);
      inp.addEventListener("change", check);
      check();
    });
  renderStudentList();
}

function renderStudentList() {
  const list = document.getElementById("stdList");
  const students = classesData[selectedClassKey] || [];
  if (students.length === 0) {
    list.innerHTML = `<div class="flex flex-col items-center justify-center h-full text-slate-400 py-10"><i class="fa-solid fa-clipboard-list text-4xl mb-3 text-slate-300"></i><p>Класс ${selectedClassKey} пуст.</p><p class="text-sm text-slate-300 mt-1">Добавьте учеников кнопкой выше.</p></div>`;
    return;
  }
  list.innerHTML = students
    .sort((a, b) => a.name.localeCompare(b.name))
    .map(
      (s) => `
        <div class="bg-white p-4 rounded-xl border border-slate-200 mb-3 flex justify-between items-center shadow-sm hover:shadow-md cursor-pointer transition group" onclick="editStudent(${
          s.id
        })">
            <div class="flex items-center gap-4">
                <div class="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold ${
                  s.sex === "Мужской"
                    ? "bg-blue-50 text-blue-600"
                    : "bg-pink-50 text-pink-600"
                }">${s.name[0]}</div>
                <div>
                    <div class="font-bold text-slate-700 text-[15px]">${
                      s.name
                    }</div>
                    <div class="text-xs text-slate-400 mt-0.5 font-medium flex gap-2">
                        <span class="${
                          s.group === "Основная"
                            ? "text-emerald-600"
                            : "text-orange-600"
                        }">${s.group}</span><span>•</span><span>${
        s.sex
      }</span><span>•</span><span>${s.year || "?"} г.р.</span>
                    </div>
                </div>
            </div>
            <div class="w-8 h-8 rounded-full bg-slate-50 text-slate-300 flex items-center justify-center group-hover:bg-blue-50 group-hover:text-blue-500 transition"><i class="fa-solid fa-pen"></i></div>
        </div>
    `
    )
    .join("");
}

function renderJournal() {
  const container = document.getElementById("viewContainer");
  const sortLabels = [
    "По алфавиту",
    "По возрасту (мл -> ст)",
    "По возрасту (ст -> мл)",
    "Сначала мальчики",
    "Сначала девочки",
    "По группе",
    "По успеваемости (лучшие)",
    "По успеваемости (худшие)",
  ];

  // Variables to hold current state for PDF generation
  let currentFilteredList = [];
  let currentViewNorms = [];

  if (
    !selectedClassKey ||
    !classesData[selectedClassKey] ||
    classesData[selectedClassKey].length === 0
  ) {
    const sortedKeys = sortClasses(Object.keys(classesData));
    const populatedClass = sortedKeys.find(
      (k) => classesData[k] && classesData[k].length > 0
    );
    selectedClassKey = populatedClass || sortedKeys[0];
  }

  // Determine header elements based on active filter state
  let headerControls = "";
  if (filterState.active) {
    headerControls = `
        <div class="flex gap-2 items-center">
            <button id="editFilterBtn" class="flex gap-2 items-center bg-blue-50 text-blue-700 px-3 py-2 rounded-xl text-sm font-bold border border-blue-100 hover:bg-blue-100 transition">
                <i class="fa-solid fa-filter"></i>
                <span class="hidden sm:inline">Фильтры: Вкл</span>
                <span class="text-[10px] bg-blue-200 px-1.5 py-0.5 rounded text-blue-800">Изменить</span>
            </button>
            <button id="resetFiltersBtn" class="w-9 h-9 flex items-center justify-center rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-500 transition" title="Сбросить фильтры"><i class="fa-solid fa-xmark"></i></button>
        </div>
      `;
  } else {
    headerControls = `
         <select id="jClass" class="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm font-bold outline-none cursor-pointer w-28 sm:w-auto text-center sm:text-left">
             ${sortClasses(Object.keys(classesData))
               .map((k) => `<option value="${k}">${k}</option>`)
               .join("")}
         </select>
         <button id="filterBtn" class="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-xl text-sm font-bold transition flex items-center gap-2">
            <i class="fa-solid fa-filter"></i> <span class="hidden sm:inline">Фильтры</span>
         </button>
      `;
  }

  container.innerHTML = `
    <div class="bg-white rounded-2xl shadow-sm border border-slate-100 flex flex-col h-[calc(100vh-120px)] fade-enter">
       <div class="p-4 border-b border-slate-100 flex flex-col sm:flex-row gap-3 justify-between items-center bg-white rounded-t-2xl z-20">
          <div class="flex gap-2 w-full sm:w-auto items-center">
             ${headerControls}
             <button id="sortBtn" class="flex-1 sm:flex-none px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-xl text-sm font-bold transition flex items-center gap-2 ml-auto sm:ml-0">
                 <i class="fa-solid fa-arrow-down-a-z"></i> <span class="hidden sm:inline">${sortLabels[sortState]}</span>
             </button>
             <button id="pdfBtn" class="px-4 py-2 bg-rose-50 text-rose-600 hover:bg-rose-100 rounded-xl text-sm font-bold transition flex items-center gap-2" title="Сохранить в PDF">
                <i class="fa-solid fa-file-pdf"></i> <span class="hidden sm:inline">PDF</span>
             </button>
          </div>
          <div class="hidden sm:flex items-center gap-2 text-xs font-bold text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-lg">
             <i class="fa-solid fa-check"></i> Автосохранение
          </div>
       </div>
       <div id="jContent" class="flex-1 overflow-y-auto bg-slate-50 p-2 sm:p-4 relative min-h-[300px]"></div>
    </div>

    <!-- Filter Modal -->
    <dialog id="filterModal" class="rounded-2xl shadow-2xl p-0 w-full max-w-[450px] backdrop:bg-black/40">
        <form method="dialog" class="bg-white flex flex-col h-full max-h-[85vh]">
            <div class="p-6 border-b font-bold flex justify-between items-center text-xl text-slate-800">
                <span>Фильтры</span>
                <button type="button" class="text-slate-400 hover:text-slate-600 w-8 h-8 rounded-full hover:bg-slate-100 closeFilterBtn"><i class="fa-solid fa-xmark"></i></button>
            </div>
            <div class="p-6 overflow-y-auto space-y-6 flex-1">
                
                <!-- Классы -->
                <div>
                     <label class="block text-sm font-bold text-slate-700 mb-2">Классы</label>
                     <div id="filterClassContainer" class="space-y-3"></div>
                </div>

                <!-- Год рождения -->
                <div>
                    <label class="block text-sm font-bold text-slate-700 mb-2">Год рождения</label>
                    <div class="flex gap-3">
                        <input type="number" id="fYearMin" placeholder="От" class="w-full p-3 border border-slate-200 rounded-xl text-sm outline-none focus:border-blue-500">
                        <input type="number" id="fYearMax" placeholder="До" class="w-full p-3 border border-slate-200 rounded-xl text-sm outline-none focus:border-blue-500">
                    </div>
                </div>

                <!-- Пол -->
                <div>
                    <label class="block text-sm font-bold text-slate-700 mb-2">Пол</label>
                    <div class="flex gap-2 bg-slate-50 p-1 rounded-xl">
                        <label class="flex-1 cursor-pointer">
                            <input type="radio" name="fSex" value="all" class="peer hidden" checked>
                            <div class="py-2 text-center text-sm font-medium rounded-lg text-slate-500 peer-checked:bg-white peer-checked:text-blue-600 peer-checked:shadow-sm transition">Все</div>
                        </label>
                        <label class="flex-1 cursor-pointer">
                            <input type="radio" name="fSex" value="Мужской" class="peer hidden">
                            <div class="py-2 text-center text-sm font-medium rounded-lg text-slate-500 peer-checked:bg-white peer-checked:text-blue-600 peer-checked:shadow-sm transition">М</div>
                        </label>
                        <label class="flex-1 cursor-pointer">
                            <input type="radio" name="fSex" value="Женский" class="peer hidden">
                            <div class="py-2 text-center text-sm font-medium rounded-lg text-slate-500 peer-checked:bg-white peer-checked:text-pink-600 peer-checked:shadow-sm transition">Ж</div>
                        </label>
                    </div>
                </div>

                <!-- Успеваемость -->
                <div>
                    <label class="block text-sm font-bold text-slate-700 mb-2">Успеваемость (ср. балл)</label>
                    <select id="fPerformance" class="w-full p-3 border border-slate-200 rounded-xl text-sm outline-none focus:border-blue-500 bg-white">
                        <option value="all">Любая</option>
                        <option value="high">Отличная (9-10)</option>
                        <option value="good">Хорошая (6-8)</option>
                        <option value="avg">Средняя (3-5)</option>
                        <option value="low">Низкая (1-2)</option>
                    </select>
                </div>

                <!-- Нормативы -->
                <div>
                    <label class="block text-sm font-bold text-slate-700 mb-2">Нормативы (отображение)</label>
                    <div class="grid grid-cols-2 gap-2" id="fNormsContainer">
                        <!-- JS injected -->
                    </div>
                </div>
            </div>
            <div class="p-5 bg-slate-50 border-t border-slate-100">
                <button id="applyFiltersBtn" type="button" class="w-full bg-blue-600 text-white py-3 rounded-xl font-bold shadow-lg shadow-blue-200 hover:bg-blue-700 transition">Применить</button>
            </div>
        </form>
    </dialog>
  `;

  // --- Handlers ---
  const cSel = document.getElementById("jClass");
  if (cSel && selectedClassKey && !filterState.active)
    cSel.value = selectedClassKey;
  if (cSel)
    cSel.onchange = () => {
      selectedClassKey = cSel.value;
      refresh();
    };

  const filterBtn = document.getElementById("filterBtn");
  if (filterBtn) filterBtn.onclick = openFilterModal;

  const editFilterBtn = document.getElementById("editFilterBtn");
  if (editFilterBtn) editFilterBtn.onclick = openFilterModal;

  // Attach PDF Handler
  document.getElementById("pdfBtn").onclick = () => {
    if (currentFilteredList.length > 0) {
      generatePDF(currentFilteredList, currentViewNorms);
    } else {
      alert("Нет данных для экспорта");
    }
  };

  const resetFiltersBtn = document.getElementById("resetFiltersBtn");
  if (resetFiltersBtn)
    resetFiltersBtn.onclick = () => {
      filterState.active = false;
      filterState.selectedClasses = []; // Reset selected classes
      renderJournal();
    };

  const sortBtn = document.getElementById("sortBtn");
  sortBtn.onclick = () => {
    sortState = (sortState + 1) % 8; // Increased modulo for new sort types
    const span = sortBtn.querySelector("span");
    if (span) span.textContent = sortLabels[sortState];
    refresh();
  };

  const refresh = () => {
    if (!filterState.active)
      selectedClassKey = cSel ? cSel.value : selectedClassKey;

    const normsToRender =
      filterState.active && filterState.selectedNorms.length > 0
        ? filterState.selectedNorms
        : Object.keys(EXERCISES);

    // FETCH LOGIC
    let list = [];
    if (filterState.active) {
      // Collect ALL students
      for (const key in classesData) {
        classesData[key].forEach((s) => {
          list.push({ ...s, className: key });
        });
      }

      // Apply Filters
      list = list.filter((s) => {
        // Class Filter
        if (filterState.selectedClasses.length > 0) {
          if (!filterState.selectedClasses.includes(s.className)) return false;
        }

        // Year
        if (filterState.minYear && (!s.year || s.year < filterState.minYear))
          return false;
        if (filterState.maxYear && (!s.year || s.year > filterState.maxYear))
          return false;
        // Sex
        if (filterState.sex !== "all" && s.sex !== filterState.sex)
          return false;

        // Performance
        if (filterState.performance !== "all") {
          const { avg, count } = calculateStudentAverage(s, normsToRender);

          // New Requirement: Hide if count is 0
          if (count === 0) return false;

          if (filterState.performance === "high" && avg < 9) return false;
          if (filterState.performance === "good" && (avg < 6 || avg >= 9))
            return false;
          if (filterState.performance === "avg" && (avg < 3 || avg >= 6))
            return false;
          if (filterState.performance === "low" && (avg < 1 || avg >= 3))
            return false;
        }
        return true;
      });
    } else {
      list = [...(classesData[selectedClassKey] || [])].map((s) => ({
        ...s,
        className: selectedClassKey,
      }));
    }

    // Sort Logic
    list.sort((a, b) => {
      if (sortState === 1) return (b.year || 0) - (a.year || 0);
      else if (sortState === 2) return (a.year || 0) - (b.year || 0);
      else if (sortState === 3) {
        if (a.sex !== b.sex) return a.sex === "Мужской" ? -1 : 1;
      } else if (sortState === 4) {
        if (a.sex !== b.sex) return a.sex === "Женский" ? -1 : 1;
      } else if (sortState === 5) {
        const order = { Основная: 0, Подготовительная: 1, СМГ: 2, ЛФК: 3 };
        if (order[a.group] !== order[b.group])
          return order[a.group] - order[b.group];
      } else if (sortState === 6) {
        // Best performance
        const avgA = calculateStudentAverage(a, normsToRender).avg;
        const avgB = calculateStudentAverage(b, normsToRender).avg;
        return avgB - avgA;
      } else if (sortState === 7) {
        // Worst performance
        const avgA = calculateStudentAverage(a, normsToRender).avg;
        const avgB = calculateStudentAverage(b, normsToRender).avg;
        return avgA - avgB;
      }
      return a.name.localeCompare(b.name);
    });

    // Update variables for PDF generator
    currentFilteredList = list;
    currentViewNorms = normsToRender;

    const content = document.getElementById("jContent");
    const emptyMsg = filterState.active
      ? "Нет учеников, подходящих под фильтры"
      : `В классе ${selectedClassKey} нет учеников`;

    if (list.length === 0) {
      content.innerHTML = `
        <div class="flex flex-col items-center justify-center h-full text-slate-400 py-20">
            <div class="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4">
                <i class="fa-solid fa-filter-circle-xmark text-2xl text-slate-300"></i>
            </div>
            <p class="font-bold text-slate-500 text-center">${emptyMsg}</p>
        </div>`;
      return;
    }

    try {
      if (window.innerWidth < 768)
        renderMobileJournal(content, list, normsToRender);
      else renderDesktopJournal(content, list, normsToRender);
    } catch (e) {
      console.error(e);
      content.innerHTML = `<div class="text-red-500 p-4">Ошибка таблицы: ${e.message}</div>`;
    }
  };

  let lastWidth = window.innerWidth;
  const onResize = () => {
    if (window.innerWidth !== lastWidth) {
      lastWidth = window.innerWidth;
      refresh();
    }
  };
  if (window.journalResizeHandler) {
    window.removeEventListener("resize", window.journalResizeHandler);
  }
  window.journalResizeHandler = onResize;
  window.addEventListener("resize", onResize);

  setTimeout(refresh, 0);
}

function openFilterModal() {
  const modal = document.getElementById("filterModal");
  const normsContainer = document.getElementById("fNormsContainer");
  const classContainer = document.getElementById("filterClassContainer");

  // === 1. Render Norms ===
  normsContainer.innerHTML = Object.keys(EXERCISES)
    .map(
      (key) => `
        <label class="flex items-center gap-2 p-2 border border-slate-100 rounded-lg bg-slate-50 cursor-pointer hover:bg-white hover:border-blue-200 transition">
            <input type="checkbox" class="custom-checkbox w-4 h-4 rounded text-blue-600 focus:ring-blue-500" value="${key}" ${
        filterState.selectedNorms.includes(key) ? "checked" : ""
      }>
            <span class="text-xs font-bold text-slate-700">${
              EXERCISES[key].label
            }</span>
        </label>
    `
    )
    .join("");

  // === 2. Render Classes ===
  const allClasses = sortClasses(Object.keys(classesData));
  const uniqueNumbers = [
    ...new Set(allClasses.map((c) => parseInt(c) || c.replace(/\D/g, ""))),
  ].sort((a, b) => a - b);

  let parallelsHtml = uniqueNumbers
    .map(
      (num) => `
    <button type="button" class="parallel-btn ${
      checkParallelActive(num, allClasses) ? "active" : ""
    }" data-num="${num}">${num}</button>
  `
    )
    .join("");

  let classesGridHtml = allClasses
    .map(
      (cls) => `
    <div class="class-pill ${
      filterState.selectedClasses.includes(cls) ? "active" : ""
    }" data-cls="${cls}">${cls}</div>
  `
    )
    .join("");

  classContainer.innerHTML = `
    <div class="flex gap-2 flex-wrap mb-3">${parallelsHtml}</div>
    <div class="grid grid-cols-4 sm:grid-cols-6 gap-2">${classesGridHtml}</div>
  `;

  // Attach events for classes
  const updateVisuals = () => {
    document.querySelectorAll(".class-pill").forEach((pill) => {
      const cls = pill.dataset.cls;
      if (selectedClassesTemp.includes(cls)) pill.classList.add("active");
      else pill.classList.remove("active");
    });
    document.querySelectorAll(".parallel-btn").forEach((btn) => {
      const num = btn.dataset.num;
      // Check if ALL classes of this parallel are selected
      const parallelClasses = allClasses.filter(
        (c) => (parseInt(c) || c.replace(/\D/g, "")) == num
      );
      const allSelected = parallelClasses.every((c) =>
        selectedClassesTemp.includes(c)
      );
      if (allSelected && parallelClasses.length > 0)
        btn.classList.add("active");
      else btn.classList.remove("active");
    });
  };

  let selectedClassesTemp = [...filterState.selectedClasses];

  // Parallel click logic
  classContainer.querySelectorAll(".parallel-btn").forEach((btn) => {
    btn.onclick = () => {
      const num = btn.dataset.num;
      const parallelClasses = allClasses.filter(
        (c) => (parseInt(c) || c.replace(/\D/g, "")) == num
      );

      const allSelected = parallelClasses.every((c) =>
        selectedClassesTemp.includes(c)
      );

      if (allSelected) {
        // Deselect all
        selectedClassesTemp = selectedClassesTemp.filter(
          (c) => !parallelClasses.includes(c)
        );
      } else {
        // Select all
        parallelClasses.forEach((c) => {
          if (!selectedClassesTemp.includes(c)) selectedClassesTemp.push(c);
        });
      }
      updateVisuals();
    };
  });

  // Individual class click logic
  classContainer.querySelectorAll(".class-pill").forEach((pill) => {
    pill.onclick = () => {
      const cls = pill.dataset.cls;
      if (selectedClassesTemp.includes(cls)) {
        selectedClassesTemp = selectedClassesTemp.filter((c) => c !== cls);
      } else {
        selectedClassesTemp.push(cls);
      }
      updateVisuals();
    };
  });

  // === 3. Set Other Values ===
  document.getElementById("fYearMin").value = filterState.minYear || "";
  document.getElementById("fYearMax").value = filterState.maxYear || "";
  document.getElementById("fPerformance").value = filterState.performance;
  const sexRadio = document.querySelector(
    `input[name="fSex"][value="${filterState.sex}"]`
  );
  if (sexRadio) sexRadio.checked = true;

  // === 4. Handlers ===
  document.querySelector(".closeFilterBtn").onclick = () => modal.close();
  document.getElementById("applyFiltersBtn").onclick = () => {
    // Read values
    const minY = document.getElementById("fYearMin").value;
    const maxY = document.getElementById("fYearMax").value;
    filterState.minYear = minY ? parseInt(minY) : null;
    filterState.maxYear = maxY ? parseInt(maxY) : null;

    const checkedSex = document.querySelector('input[name="fSex"]:checked');
    filterState.sex = checkedSex ? checkedSex.value : "all";

    filterState.performance = document.getElementById("fPerformance").value;

    const selectedNorms = [];
    document
      .querySelectorAll("#fNormsContainer input:checked")
      .forEach((cb) => selectedNorms.push(cb.value));
    filterState.selectedNorms = selectedNorms;

    // Save selected classes
    filterState.selectedClasses = selectedClassesTemp;

    filterState.active = true;
    renderJournal(); // Re-render whole view to update header
    modal.close();
  };

  modal.showModal();
}

// Helper for UI state of parallel buttons
function checkParallelActive(num, allClasses) {
  const parallelClasses = allClasses.filter(
    (c) => (parseInt(c) || c.replace(/\D/g, "")) == num
  );
  if (parallelClasses.length === 0) return false;
  return parallelClasses.every((c) => filterState.selectedClasses.includes(c));
}

function renderDesktopJournal(container, students, norms) {
  const headers = norms
    .map(
      (n) => `
        <th class="text-center min-w-[90px]">
            <div class="flex flex-col items-center justify-center h-full leading-tight py-1">
                <span class="text-[11px] font-bold text-slate-700 mb-0.5">${EXERCISES[n].label}</span>
                <span class="text-[9px] text-slate-400 font-medium bg-slate-100 px-1.5 py-0.5 rounded">${EXERCISES[n].unit}</span>
            </div>
        </th>`
    )
    .join("");

  const rows = students
    .map((s) => {
      if (!s.results) s.results = {};
      const inputs = norms
        .map((n) => {
          const val = s.results[n] || "";
          const g = calculateGrade(
            n,
            val,
            s.sex,
            parseInt(s.className),
            s.group
          );
          return `
                <td class="text-center p-1">
                    <div class="cell-wrapper">
                        <div class="input-group">
                            <input type="text" class="input-std j-inp" value="${val}" data-id="${s.id}" data-class="${s.className}" data-norm="${n}" inputmode="decimal" autocomplete="off">
                            <div class="input-hint">${EXERCISES[n].hint}</div>
                        </div>
                        <div class="grade-badge ${g.css}">${g.score}</div>
                    </div>
                </td>`;
        })
        .join("");

      const classBadge = filterState.active
        ? `<div class="text-[10px] font-bold bg-slate-100 text-slate-500 px-1.5 rounded ml-auto border border-slate-200">${s.className}</div>`
        : ``;

      return `
            <tr>
                <td class="sticky-col pl-4 border-r border-slate-100 bg-white">
                    <div class="flex items-center gap-2 max-w-[220px]">
                        <div class="font-bold text-sm text-slate-700 truncate">${
                          s.name
                        }</div>
                        ${classBadge}
                    </div>
                </td>
                <td class="text-center text-xs">
                    <span class="font-bold ${
                      s.sex === "Мужской" ? "text-blue-600" : "text-pink-600"
                    }">${s.sex === "Мужской" ? "М" : "Ж"}</span>
                </td>
                <td class="text-center">
                    <div class="inline-block w-2 h-2 rounded-full ${
                      s.group === "Основная"
                        ? "bg-emerald-400"
                        : "bg-orange-400"
                    }" title="${s.group}"></div>
                </td>
                <td class="text-center text-xs font-medium text-slate-500">${
                  s.year || "-"
                }</td>
                ${inputs}
            </tr>`;
    })
    .join("");

  container.innerHTML = `<div class="table-container"><table><thead><tr><th class="sticky-col text-left pl-4 shadow-sm min-w-[220px]">Ученик</th><th class="w-10">Пол</th><th class="w-10">Гр.</th><th class="w-12">Год</th>${headers}</tr></thead><tbody class="bg-white">${rows}</tbody></table></div>`;
  bindInputs();
}

function renderMobileJournal(container, students, norms) {
  container.innerHTML = students
    .map((s) => {
      if (!s.results) s.results = {};
      const items = norms
        .map((n) => {
          const val = s.results[n] || "";
          const g = calculateGrade(
            n,
            val,
            s.sex,
            parseInt(s.className),
            s.group
          );
          return `
                <div class="norm-item">
                    <div class="flex justify-between items-center mb-1">
                        <span class="text-xs font-bold text-slate-600">${EXERCISES[n].label}</span>
                        <span class="text-[10px] text-slate-400 bg-slate-50 px-1.5 py-0.5 rounded">${EXERCISES[n].unit}</span>
                    </div>
                    <div class="norm-controls">
                        <div class="relative flex-1">
                            <input type="text" class="input-std w-full text-left pl-3 j-inp" value="${val}" data-id="${s.id}" data-class="${s.className}" data-norm="${n}" inputmode="decimal" placeholder="...">
                            <span class="absolute right-2 top-1/2 -translate-y-1/2 text-[10px] text-slate-300 pointer-events-none">${EXERCISES[n].hint}</span>
                        </div>
                        <div class="norm-grade ${g.css}">${g.score}</div>
                    </div>
                </div>`;
        })
        .join("");

      return `
            <div class="student-card group">
                <div class="card-header" onclick="const c=this.nextElementSibling; c.classList.toggle('hidden'); this.querySelector('.chevron').classList.toggle('rotate-180')">
                    <div class="flex flex-col w-full">
                        <div class="flex justify-between items-start w-full">
                             <div class="font-bold text-slate-800 text-[15px]">${
                               s.name
                             }</div>
                             ${
                               filterState.active
                                 ? `<div class="text-[10px] font-bold bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded border border-slate-200 ml-2">${s.className}</div>`
                                 : ""
                             }
                        </div>
                        <div class="text-xs text-slate-400 mt-1 flex gap-2 font-medium">
                             <span class="${
                               s.sex === "Мужской"
                                 ? "text-blue-500"
                                 : "text-pink-500"
                             }">${s.sex}</span>
                             <span class="text-slate-300">•</span>
                             <span class="${
                               s.group === "Основная"
                                 ? "text-emerald-500"
                                 : "text-orange-500"
                             }">${s.group}</span>
                             <span class="text-slate-300">•</span>
                             <span>${s.year || "?"} г.р.</span>
                        </div>
                    </div>
                    <i class="fa-solid fa-chevron-down text-slate-300 chevron transition-transform duration-300 ml-2"></i>
                </div>
                <div class="hidden p-3 bg-slate-50 border-t border-slate-100 animate-fade-in">
                    <div class="norm-grid">${items}</div>
                </div>
            </div>`;
    })
    .join("");
  bindInputs();
}

function bindInputs() {
  document.querySelectorAll(".j-inp").forEach((inp) => {
    inp.addEventListener("input", (e) => {
      let val = e.target.value;
      if (val.includes(",")) {
        val = val.replace(",", ".");
        e.target.value = val;
      }
      const id = Number(e.target.dataset.id);
      const norm = e.target.dataset.norm;
      const cls = e.target.dataset.class; // Get Class from Data Attribute

      const student = classesData[cls]?.find((x) => x.id === id);
      if (student) {
        if (!student.results) student.results = {};
        student.results[norm] = val;
        const g = calculateGrade(
          norm,
          val,
          student.sex,
          parseInt(cls),
          student.group
        );
        const wrapper =
          e.target.closest(".cell-wrapper") ||
          e.target.closest(".norm-controls");
        const badge =
          wrapper.querySelector(".grade-badge") ||
          wrapper.querySelector(".norm-grade");
        if (badge) {
          badge.className =
            (badge.classList.contains("grade-badge")
              ? "grade-badge "
              : "norm-grade ") + g.css;
          badge.textContent = g.score;
        }
        saveData();
      }
    });
  });
}

document.addEventListener("DOMContentLoaded", () => {
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
  if (overlay) overlay.onclick = () => toggle(false);

  document.addEventListener("click", (e) => {
    const navBtn = e.target.closest("[data-view]");
    if (navBtn) {
      e.preventDefault();
      const view = navBtn.dataset.view;
      if (view) switchView(view);
    }
  });

  if (typeof switchView === "function") switchView("dashboard");
});
