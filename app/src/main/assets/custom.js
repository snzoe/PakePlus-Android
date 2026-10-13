window.addEventListener("DOMContentLoaded",()=>{const t=document.createElement("script");t.src="https://www.googletagmanager.com/gtag/js?id=G-W5GKHM0893",t.async=!0,document.head.appendChild(t);const n=document.createElement("script");n.textContent="window.dataLayer = window.dataLayer || [];function gtag(){dataLayer.push(arguments);}gtag('js', new Date());gtag('config', 'G-W5GKHM0893');",document.body.appendChild(n)});<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1,user-scalable=no,viewport-fit=cover">
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="mobile-web-app-capable" content="yes">
<meta name="theme-color" content="#f5f5f7">
<title>多计划打卡</title>
<style>
  :root{ --theme:#6366f1; --theme-grad:#8b5cf6; }
  *{box-sizing:border-box;-webkit-tap-highlight-color:transparent;}
  html,body{margin:0;padding:0;}
  body{
    font-family:-apple-system,BlinkMacSystemFont,"PingFang SC","Helvetica Neue","Microsoft YaHei",sans-serif;
    background:#f5f5f7;color:#1c1c1e;min-height:100vh;
    display:flex;justify-content:center;
    padding:20px 16px calc(32px + env(safe-area-inset-bottom));
  }
  body.modal-open{overflow:hidden;}
  .app{width:100%;max-width:420px;}

  /* 头部 */
  header{margin-bottom:14px;}
  .header-top{display:flex;align-items:center;justify-content:space-between;}
  h1{font-size:22px;margin:0;font-weight:600;}
  #today{font-size:13px;color:#8e8e93;margin:4px 0 0;}
  .icon-btn{width:38px;height:38px;border:none;background:#fff;border-radius:50%;
    font-size:18px;color:#6366f1;cursor:pointer;box-shadow:0 1px 3px rgba(0,0,0,.06);
    font-family:inherit;display:flex;align-items:center;justify-content:center;flex-shrink:0;}
  .icon-btn:active{background:#f0f0f5;}

  /* 计划切换 */
  .plan-tabs{
    display:flex;gap:8px;overflow-x:auto;padding:2px 2px 14px;
    scrollbar-width:none;-webkit-overflow-scrolling:touch;
  }
  .plan-tabs::-webkit-scrollbar{display:none;}
  .plan-chip{
    flex-shrink:0;display:flex;align-items:center;gap:6px;
    height:38px;padding:0 14px;border:none;border-radius:999px;
    background:#fff;color:#3a3a3c;font-size:14px;font-family:inherit;
    box-shadow:0 1px 3px rgba(0,0,0,.06);cursor:pointer;
    transition:background .2s,color .2s;max-width:150px;
  }
  .plan-chip .chip-icon{font-size:15px;line-height:1;}
  .plan-chip .chip-name{overflow:hidden;text-overflow:ellipsis;white-space:nowrap;}
  .plan-chip.active{background:var(--theme);color:#fff;box-shadow:0 4px 12px rgba(0,0,0,.12);}
  .plan-chip.add{
    color:#6366f1;font-size:22px;padding:0;width:38px;
    justify-content:center;font-weight:300;
  }

  /* 提醒横幅 */
  .banner{background:#fff7ed;color:#c2410c;border-radius:14px;padding:12px 14px;
    font-size:13px;margin-bottom:14px;border:1px solid #fed7aa;line-height:1.5;}
  .banner.hidden{display:none;}

  /* 目标卡片 */
  .goal-card{background:#fff;border-radius:18px;padding:16px;margin-bottom:14px;
    box-shadow:0 1px 3px rgba(0,0,0,.06);}
  .goal-top{display:flex;justify-content:space-between;align-items:baseline;margin-bottom:10px;}
  .goal-label{font-size:14px;color:#8e8e93;}
  .goal-value{font-size:16px;font-weight:700;color:var(--theme);}
  .progress-track{height:10px;background:#f0f0f5;border-radius:999px;overflow:hidden;}
  .progress-fill{height:100%;width:0;border-radius:999px;
    background:linear-gradient(90deg,var(--theme),var(--theme-grad));
    transition:width .45s cubic-bezier(.4,0,.2,1);}
  .goal-sub{font-size:12px;color:#8e8e93;margin-top:8px;}

  /* 打卡按钮 */
  .check-btn{
    width:100%;height:122px;border:none;border-radius:24px;
    background:linear-gradient(135deg,var(--theme),var(--theme-grad));
    color:#fff;font-size:22px;font-weight:600;letter-spacing:1px;
    box-shadow:0 10px 26px rgba(99,102,241,.3);
    transition:transform .12s ease,background .25s,box-shadow .25s,color .25s;
    cursor:pointer;margin-bottom:10px;font-family:inherit;line-height:1.4;
    padding:0 16px;white-space:pre-line;
  }
  .check-btn:active{transform:scale(.97);}
  .check-btn.done{
    background:#f5f5f7;color:var(--theme);
    box-shadow:inset 0 0 0 2px var(--theme);font-size:19px;
  }

  .btn-row{display:flex;gap:10px;margin-bottom:18px;}
  .mini-btn{
    flex:1;height:42px;border:none;background:#fff;border-radius:12px;
    font-size:14px;color:#6366f1;font-weight:500;cursor:pointer;
    box-shadow:0 1px 3px rgba(0,0,0,.06);font-family:inherit;
    transition:background .15s,color .15s;
  }
  .mini-btn:active{background:#f0f0f5;}
  .mini-btn:disabled{color:#c7c7cc;box-shadow:none;background:#efeff4;cursor:default;}

  /* 统计 */
  .stats{display:flex;gap:10px;margin-bottom:18px;}
  .stat{flex:1;background:#fff;border-radius:16px;padding:14px 6px;text-align:center;
    box-shadow:0 1px 3px rgba(0,0,0,.06);}
  .stat .num{display:block;font-size:24px;font-weight:700;color:var(--theme);line-height:1.2;}
  .stat .label{display:block;font-size:12px;color:#8e8e93;margin-top:2px;}

  /* 日历 */
  .calendar{background:#fff;border-radius:20px;padding:16px;
    box-shadow:0 1px 3px rgba(0,0,0,.06);}
  .cal-head{display:flex;align-items:center;justify-content:space-between;margin-bottom:10px;}
  .cal-head button{width:36px;height:36px;border:none;background:#f2f2f7;border-radius:50%;
    font-size:20px;color:#6366f1;line-height:1;cursor:pointer;
    display:flex;align-items:center;justify-content:center;font-family:inherit;}
  .cal-head button:active{background:#e5e5ea;}
  #monthLabel{font-size:16px;font-weight:600;}
  .cal-grid{display:grid;grid-template-columns:repeat(7,1fr);gap:3px;}
  .cal-week{text-align:center;font-size:12px;color:#8e8e93;padding:4px 0;}
  .cal-cell{
    position:relative;aspect-ratio:1/1;display:flex;align-items:center;justify-content:center;
    border-radius:50%;font-size:14px;color:#3a3a3c;cursor:pointer;
    transition:background .15s;
  }
  .cal-cell.empty{visibility:hidden;pointer-events:none;}
  .cal-cell:not(.done):not(.empty):active{background:#f0f0f5;}
  .cal-cell.done{background:var(--theme);color:#fff;font-weight:600;}
  .cal-cell.done:active{opacity:.8;}
  .cal-cell.today{box-shadow:inset 0 0 0 2px var(--theme);}
  .cal-cell.done.today{box-shadow:inset 0 0 0 2px rgba(0,0,0,.35);}
  .cal-cell.has-memo::after{
    content:'';position:absolute;bottom:3px;left:50%;
    transform:translateX(-50%);width:4px;height:4px;border-radius:50%;
    background:#f59e0b;
  }
  .cal-cell.done.has-memo::after{background:#fff;}

  /* 弹窗 */
  .modal-mask{position:fixed;inset:0;background:rgba(0,0,0,.45);
    display:none;align-items:flex-end;justify-content:center;z-index:100;}
  .modal-mask.show{display:flex;}
  #editMask{z-index:110;}
  #dateMask{z-index:120;}
  .modal{width:100%;max-width:420px;background:#fff;border-radius:24px 24px 0 0;
    max-height:92vh;display:flex;flex-direction:column;
    padding-bottom:env(safe-area-inset-bottom);
    animation:slideUp .26s cubic-bezier(.32,.72,0,1);}
  @keyframes slideUp{from{transform:translateY(100%);}to{transform:translateY(0);}}
  .modal-head{display:flex;align-items:center;justify-content:space-between;
    padding:18px 20px 12px;font-size:17px;font-weight:600;}
  .modal-body{padding:0 20px;overflow-y:auto;flex:1;-webkit-overflow-scrolling:touch;}
  .modal-foot{display:flex;gap:10px;padding:14px 20px 22px;}

  /* 表单 */
  .field{display:block;margin-bottom:18px;}
  .field-label{display:block;font-size:13px;color:#8e8e93;margin-bottom:8px;}
  .field-row{display:flex;align-items:center;justify-content:space-between;}
  .field input[type=text],.field input[type=number],.field select{
    width:100%;height:46px;border:1px solid #e5e5ea;border-radius:12px;
    padding:0 14px;font-size:16px;font-family:inherit;background:#fafafa;
    color:#1c1c1e;-webkit-appearance:none;appearance:none;
  }
  .field input:focus,.field select:focus{outline:none;border-color:#6366f1;background:#fff;}
  .field select{
    background-image:url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8'%3E%3Cpath fill='%238e8e93' d='M6 8L0 0h12z'/%3E%3C/svg%3E");
    background-repeat:no-repeat;background-position:right 14px center;padding-right:38px;
  }
  .field-hint{font-size:12px;color:#c7c7cc;margin-top:6px;}

  .textarea{
    width:100%;min-height:104px;border:1px solid #e5e5ea;border-radius:12px;
    padding:12px 14px;font-size:15px;font-family:inherit;background:#fafafa;
    color:#1c1c1e;resize:vertical;-webkit-appearance:none;line-height:1.5;
  }
  .textarea:focus{outline:none;border-color:#6366f1;background:#fff;}

  /* 日期弹窗专用 */
  .date-status{
    text-align:center;font-size:15px;font-weight:600;
    color:#8e8e93;padding:2px 0 16px;
  }
  .date-status.done{color:var(--theme);}
  .date-action-row{display:flex;gap:10px;}

  /* 图标/颜色选择 */
  .icon-grid{display:grid;grid-template-columns:repeat(8,1fr);gap:6px;}
  .icon-opt{
    aspect-ratio:1/1;border:none;border-radius:10px;background:#f2f2f7;
    font-size:17px;cursor:pointer;display:flex;align-items:center;justify-content:center;
    font-family:inherit;padding:0;transition:background .15s;
  }
  .icon-opt.active{background:#eef2ff;box-shadow:inset 0 0 0 2px #6366f1;}
  .color-grid{display:grid;grid-template-columns:repeat(8,1fr);gap:8px;}
  .color-opt{
    aspect-ratio:1/1;border-radius:50%;border:none;cursor:pointer;padding:0;
    transition:box-shadow .15s;
  }
  .color-opt.active{box-shadow:0 0 0 2px #fff,0 0 0 4px #1c1c1e;}

  /* 提醒列表 */
  .reminder-item{display:flex;gap:8px;margin-bottom:8px;align-items:center;}
  .reminder-item input[type=time]{
    flex:1;height:46px;border:1px solid #e5e5ea;border-radius:12px;
    padding:0 14px;font-size:16px;font-family:inherit;background:#fafafa;color:#1c1c1e;
    -webkit-appearance:none;appearance:none;
  }
  .reminder-item input[type=time]:focus{outline:none;border-color:#6366f1;background:#fff;}
  .reminder-item button{width:46px;height:46px;border:none;background:#fef2f2;color:#ef4444;
    border-radius:12px;font-size:16px;cursor:pointer;font-family:inherit;flex-shrink:0;}
  .reminder-item button:active{background:#fee2e2;}
  .empty-hint{font-size:13px;color:#c7c7cc;padding:4px 0 10px;}

  /* 开关 */
  .switch{position:relative;display:inline-block;width:50px;height:30px;flex-shrink:0;}
  .switch input{opacity:0;width:0;height:0;}
  .slider{position:absolute;inset:0;background:#e5e5ea;border-radius:999px;
    transition:.22s;cursor:pointer;}
  .slider:before{content:"";position:absolute;height:24px;width:24px;left:3px;top:3px;
    background:#fff;border-radius:50%;transition:.22s;box-shadow:0 1px 3px rgba(0,0,0,.22);}
  .switch input:checked + .slider{background:#6366f1;}
  .switch input:checked + .slider:before{transform:translateX(20px);}

  .perm-status{font-size:13px;color:#8e8e93;margin-bottom:10px;}
  .perm-status.ok{color:#16a34a;}
  .perm-status.warn{color:#ef4444;}

  /* 计划管理列表 */
  .plan-row{
    display:flex;align-items:center;gap:12px;padding:12px 14px;
    border-radius:14px;background:#fafafa;margin-bottom:8px;
    border:2px solid transparent;transition:background .15s,border-color .15s;
  }
  .plan-row.active{background:#eef2ff;border-color:#c7d2fe;}
  .plan-row .pr-icon{font-size:22px;line-height:1;flex-shrink:0;}
  .plan-row .pr-info{flex:1;min-width:0;}
  .plan-row .pr-name{font-size:15px;font-weight:600;overflow:hidden;
    text-overflow:ellipsis;white-space:nowrap;}
  .plan-row .pr-sub{font-size:12px;color:#8e8e93;margin-top:3px;
    overflow:hidden;text-overflow:ellipsis;white-space:nowrap;}
  .plan-row .pr-act{display:flex;gap:6px;flex-shrink:0;}
  .pr-btn{
    width:34px;height:34px;border:none;border-radius:10px;background:#fff;
    font-size:15px;cursor:pointer;font-family:inherit;
    display:flex;align-items:center;justify-content:center;color:#6366f1;
    box-shadow:0 1px 2px rgba(0,0,0,.06);
  }
  .pr-btn:active{background:#f0f0f5;}
  .pr-btn.danger{color:#ef4444;}

  /* 按钮 */
  .btn-primary{flex:1;height:48px;border:none;border-radius:14px;background:#6366f1;
    color:#fff;font-size:16px;font-weight:600;cursor:pointer;font-family:inherit;}
  .btn-primary:active{background:#4f46e5;}
  .btn-primary:disabled{background:#c7d2fe;cursor:default;}
  .btn-ghost{flex:1;height:48px;border:none;border-radius:14px;background:#f2f2f7;
    color:#3a3a3c;font-size:16px;font-weight:500;cursor:pointer;font-family:inherit;}
  .btn-ghost:active{background:#e5e5ea;}
  .btn-ghost:disabled{color:#c7c7cc;cursor:default;background:#f7f7fa;}
  .btn-danger{
    width:100%;height:46px;border:none;border-radius:14px;background:#fef2f2;
    color:#ef4444;font-size:15px;font-weight:500;cursor:pointer;
    font-family:inherit;margin-bottom:4px;
  }
  .btn-danger:active{background:#fee2e2;}

  .tip{text-align:center;font-size:12px;color:#c7c7cc;margin-top:16px;line-height:1.6;}

  /* Toast */
  .toast{position:fixed;left:50%;bottom:44px;transform:translateX(-50%) translateY(16px);
    background:rgba(0,0,0,.82);color:#fff;padding:11px 22px;border-radius:999px;
    font-size:14px;opacity:0;transition:.26s;pointer-events:none;z-index:200;
    white-space:nowrap;max-width:90vw;overflow:hidden;text-overflow:ellipsis;}
  .toast.show{opacity:1;transform:translateX(-50%) translateY(0);}
</style>
</head>
<body>
<div class="app">
  <header>
    <div class="header-top">
      <h1 id="title">打卡计划</h1>
      <button class="icon-btn" id="manageBtn" aria-label="管理计划">☰</button>
    </div>
    <p id="today"></p>
  </header>

  <div class="plan-tabs" id="planTabs"></div>

  <div id="banner" class="banner hidden"></div>

  <div class="goal-card">
    <div class="goal-top">
      <span class="goal-label" id="goalLabel">今日目标</span>
      <span class="goal-value" id="goalValue">0 / 1</span>
    </div>
    <div class="progress-track"><div class="progress-fill" id="progressFill"></div></div>
    <div class="goal-sub" id="goalSub"></div>
  </div>

  <button class="check-btn" id="checkBtn">点击打卡</button>
  <div class="btn-row">
    <button class="mini-btn" id="undoBtn">撤销一次</button>
    <button class="mini-btn" id="editPlanBtn">编辑计划</button>
  </div>

  <div class="stats">
    <div class="stat"><span class="num" id="streak">0</span><span class="label">连续天数</span></div>
    <div class="stat"><span class="num" id="total">0</span><span class="label">累计天数</span></div>
    <div class="stat"><span class="num" id="monthCount">0</span><span class="label">本月打卡</span></div>
  </div>

  <div class="calendar">
    <div class="cal-head">
      <button id="prevMonth" aria-label="上个月">‹</button>
      <span id="monthLabel"></span>
      <button id="nextMonth" aria-label="下个月">›</button>
    </div>
    <div class="cal-grid" id="calGrid"></div>
  </div>

  <p class="tip">点日历任意日期可补签 · 可写当天备忘录<br>数据保存在本机 · 打包 App 请用原生本地通知</p>
</div>

<!-- 管理计划弹窗 -->
<div class="modal-mask" id="manageMask">
  <div class="modal">
    <div class="modal-head">
      <span>我的打卡计划</span>
      <button class="icon-btn" id="closeManage" aria-label="关闭">✕</button>
    </div>
    <div class="modal-body">
      <div id="planList"></div>
    </div>
    <div class="modal-foot">
      <button class="btn-primary" id="newPlanBtn">＋ 新建计划</button>
    </div>
  </div>
</div>

<!-- 编辑计划弹窗 -->
<div class="modal-mask" id="editMask">
  <div class="modal">
    <div class="modal-head">
      <span id="editTitle">编辑计划</span>
      <button class="icon-btn" id="closeEdit" aria-label="关闭">✕</button>
    </div>
    <div class="modal-body">
      <label class="field">
        <span class="field-label">计划名称</span>
        <input type="text" id="inputName" maxlength="12" placeholder="例如：喝水、跑步、读书">
      </label>

      <div class="field">
        <span class="field-label">图标</span>
        <div class="icon-grid" id="iconGrid"></div>
      </div>

      <div class="field">
        <span class="field-label">主题色</span>
        <div class="color-grid" id="colorGrid"></div>
      </div>

      <label class="field">
        <span class="field-label">目标类型</span>
        <select id="inputGoalType">
          <option value="daily">每天打卡次数</option>
          <option value="weekly">每周打卡天数</option>
          <option value="streak">连续打卡天数</option>
          <option value="total">累计打卡天数</option>
        </select>
        <div class="field-hint" id="goalHint">例如填 8，表示每天想打卡 8 次</div>
      </label>

      <label class="field">
        <span class="field-label">目标数值</span>
        <input type="number" id="inputGoalTarget" min="1" max="999" value="1" inputmode="numeric">
      </label>

      <div class="field">
        <div class="field-row">
          <span class="field-label" style="margin:0">每日提醒</span>
          <label class="switch">
            <input type="checkbox" id="inputReminderEnabled">
            <span class="slider"></span>
          </label>
        </div>
      </div>

      <div class="field" id="reminderListWrap">
        <span class="field-label">提醒时间</span>
        <div id="reminderList"></div>
        <button class="mini-btn" id="addReminder" style="margin-top:6px">＋ 添加提醒时间</button>
      </div>

      <div class="field">
        <span class="field-label">系统通知权限</span>
        <div id="permStatus" class="perm-status">未开启</div>
        <button class="mini-btn" id="requestPerm">开启系统通知</button>
      </div>

      <button class="btn-danger" id="deletePlanBtn" style="display:none">删除这个计划</button>
    </div>
    <div class="modal-foot">
      <button class="btn-ghost" id="cancelEdit">取消</button>
      <button class="btn-primary" id="saveEdit">保存</button>
    </div>
  </div>
</div>

<!-- 日期详情弹窗 -->
<div class="modal-mask" id="dateMask">
  <div class="modal">
    <div class="modal-head">
      <span id="dateTitle">日期</span>
      <button class="icon-btn" id="closeDate" aria-label="关闭">✕</button>
    </div>
    <div class="modal-body">
      <div class="date-status" id="dateStatus">未打卡</div>

      <div class="date-action-row">
        <button class="btn-primary" id="addCheckin" style="height:46px;font-size:15px">+ 补签一次</button>
        <button class="btn-ghost" id="minusCheckin" style="height:46px;font-size:15px">- 取消一次</button>
      </div>

      <label class="field" style="margin-top:20px">
        <span class="field-label">当天备忘录</span>
        <textarea id="dateMemo" class="textarea" placeholder="记录一下今天的感受、状态或完成情况…"></textarea>
      </label>

      <div class="field-hint" style="text-align:center;margin-top:-6px">
        未来日期不能打卡，但可以提前写备忘录
      </div>
    </div>
    <div class="modal-foot">
      <button class="btn-ghost" id="cancelDate">取消</button>
      <button class="btn-primary" id="saveDate">保存</button>
    </div>
  </div>
</div>

<div class="toast" id="toast"></div>

<script>
(function(){
  'use strict';

  /* ==================== 常量 ==================== */
  var KEY = 'daily_checkin_v3';
  var V2KEY = 'daily_checkin_v2';
  var WEEK = ['日','一','二','三','四','五','六'];
  var WEEK_ORDER = [1,2,3,4,5,6,0];

  var COLORS = [
    { main:'#6366f1', grad:'#8b5cf6' },
    { main:'#0ea5e9', grad:'#22d3ee' },
    { main:'#10b981', grad:'#34d399' },
    { main:'#f59e0b', grad:'#fbbf24' },
    { main:'#ec4899', grad:'#f472b6' },
    { main:'#ef4444', grad:'#f87171' },
    { main:'#8b5cf6', grad:'#a78bfa' },
    { main:'#475569', grad:'#64748b' }
  ];

  var ICONS = ['✅','💧','🏃','📚','🧘','💪','🥗','😴','🚭','✍️','🎯','🌱',
               '☀️','🎵','🧹','💊','🦷','🚶','🍎','📝','🏋️','🚴','🧴','🐶'];

  var HINTS = {
    daily:  '例如填 8，表示每天想打卡 8 次',
    weekly: '例如填 5，表示每周想打卡 5 天',
    streak: '例如填 30，表示想连续打卡 30 天',
    total:  '例如填 100，表示累计想打卡 100 天'
  };

  /* ==================== 状态 ==================== */
  var state = { plans: [], activePlanId: '' };
  var viewYear, viewMonth;
  var editing = { id:null, icon:'🎯', color:'#6366f1', reminders:[] };
  var dateEdit = { key:null, count:0 };

  /* ==================== 工具 ==================== */
  function $(id){ return document.getElementById(id); }
  function pad(n){ return n < 10 ? '0' + n : '' + n; }
  function keyOf(d){ return d.getFullYear() + '-' + pad(d.getMonth()+1) + '-' + pad(d.getDate()); }
  function uid(){ return 'p' + Date.now().toString(36) + Math.random().toString(36).slice(2,6); }

  function showToast(msg){
    var t = $('toast');
    t.textContent = msg;
    t.classList.add('show');
    clearTimeout(showToast._t);
    showToast._t = setTimeout(function(){ t.classList.remove('show'); }, 1700);
  }

  function gradOf(main){
    for(var i=0;i<COLORS.length;i++) if(COLORS[i].main === main) return COLORS[i].grad;
    return '#8b5cf6';
  }

  function goalDesc(p){
    var t = p.goal.type, n = p.goal.target;
    if(t === 'daily') return '每天 ' + n + ' 次';
    if(t === 'weekly') return '每周 ' + n + ' 天';
    if(t === 'streak') return '连续 ' + n + ' 天';
    return '累计 ' + n + ' 天';
  }

  /* ==================== 数据读写 ==================== */
  function createPlan(){
    return {
      id: uid(),
      name: '新计划',
      icon: '🎯',
      color: '#6366f1',
      goal: { type:'daily', target:1 },
      records: {},
      memos: {},
      reminderEnabled: false,
      reminders: ['09:00'],
      lastNotified: {}
    };
  }

  function getPlan(id){
    for(var i=0;i<state.plans.length;i++) if(state.plans[i].id === id) return state.plans[i];
    return null;
  }

  function activePlan(){
    var p = getPlan(state.activePlanId);
    if(!p && state.plans.length){
      p = state.plans[0];
      state.activePlanId = p.id;
    }
    return p;
  }

  function save(){
    try{ localStorage.setItem(KEY, JSON.stringify(state)); }catch(e){}
  }

  function migrateV2(){
    try{
      var raw = localStorage.getItem(V2KEY);
      if(!raw) return false;
      var o = JSON.parse(raw);
      if(!o || typeof o !== 'object' || !o.records) return false;
      var p = createPlan();
      p.name = o.name || '每日打卡';
      p.icon = '✅';
      p.records = o.records;
      p.memos = {};
      if(o.goal && o.goal.type) p.goal = { type:o.goal.type, target:parseInt(o.goal.target,10) || 1 };
      p.reminderEnabled = !!o.reminderEnabled;
      if(Array.isArray(o.reminders) && o.reminders.length) p.reminders = o.reminders.slice();
      p.lastNotified = o.lastNotified || {};
      state.plans.push(p);
      state.activePlanId = p.id;
      save();
      localStorage.removeItem(V2KEY);
      return true;
    }catch(e){ return false; }
  }

  function load(){
    var loaded = false;
    try{
      var raw = localStorage.getItem(KEY);
      if(raw){
        var o = JSON.parse(raw);
        if(o && Array.isArray(o.plans) && o.plans.length){
          state.plans = o.plans;
          state.activePlanId = o.activePlanId || '';
          loaded = true;
        }
      }
    }catch(e){}

    if(!loaded) migrateV2();

    if(!state.plans.length){
      var p = createPlan();
      p.name = '每日打卡';
      p.icon = '✅';
      state.plans.push(p);
      state.activePlanId = p.id;
    }

    // 数据修复
    state.plans.forEach(function(p){
      if(!p.id) p.id = uid();
      if(!p.name) p.name = '打卡';
      if(!p.icon) p.icon = '🎯';
      if(!p.color) p.color = '#6366f1';
      if(!p.goal || !p.goal.type) p.goal = { type:'daily', target:1 };
      if(!p.goal.target || p.goal.target < 1) p.goal.target = 1;
      if(!p.records || typeof p.records !== 'object') p.records = {};
      if(!p.memos || typeof p.memos !== 'object') p.memos = {};
      if(!Array.isArray(p.reminders) || !p.reminders.length) p.reminders = ['09:00'];
      if(!p.lastNotified || typeof p.lastNotified !== 'object') p.lastNotified = {};
      if(typeof p.reminderEnabled !== 'boolean') p.reminderEnabled = false;
    });

    if(!getPlan(state.activePlanId)) state.activePlanId = state.plans[0].id;

    var t = new Date();
    viewYear = t.getFullYear();
    viewMonth = t.getMonth();
  }

  /* ==================== 统计 ==================== */
  function hasCheckin(p, k){ return (p.records[k] || 0) > 0; }
  function todayCount(p){ return p.records[keyOf(new Date())] || 0; }

  function planStreak(p){
    var n = 0, d = new Date();
    if(!hasCheckin(p, keyOf(d))) d.setDate(d.getDate() - 1);
    while(hasCheckin(p, keyOf(d))){ n++; d.setDate(d.getDate() - 1); }
    return n;
  }

  function planTotal(p){
    var n = 0;
    for(var k in p.records){ if(p.records[k] > 0) n++; }
    return n;
  }

  function planMonthCount(p, y, m){
    var n = 0, days = new Date(y, m+1, 0).getDate();
    for(var d = 1; d <= days; d++){
      if(hasCheckin(p, keyOf(new Date(y, m, d)))) n++;
    }
    return n;
  }

  function planWeekDays(p){
    var d = new Date();
    var offset = (d.getDay() + 6) % 7;
    var mon = new Date(d.getFullYear(), d.getMonth(), d.getDate() - offset);
    var n = 0;
    for(var i = 0; i < 7; i++){
      var dd = new Date(mon.getFullYear(), mon.getMonth(), mon.getDate() + i);
      if(hasCheckin(p, keyOf(dd))) n++;
    }
    return n;
  }

  function planProgress(p){
    var g = p.goal, cur = 0, label = '';
    if(g.type === 'daily'){ cur = todayCount(p); label = '今日目标'; }
    else if(g.type === 'weekly'){ cur = planWeekDays(p); label = '本周目标'; }
    else if(g.type === 'streak'){ cur = planStreak(p); label = '连续目标'; }
    else { cur = planTotal(p); label = '累计目标'; }
    return {
      cur: cur, target: g.target, label: label,
      pct: g.target > 0 ? Math.min(100, cur / g.target * 100) : 0
    };
  }

  function goalMet(p){
    var pr = planProgress(p);
    return pr.cur >= pr.target;
  }

  /* ==================== 渲染 ==================== */
  function applyTheme(p){
    document.documentElement.style.setProperty('--theme', p.color);
    document.documentElement.style.setProperty('--theme-grad', gradOf(p.color));
  }

  function renderHeader(){
    var d = new Date();
    $('title').textContent = activePlan() ? activePlan().name : '打卡计划';
    $('today').textContent = d.getFullYear() + '年' + (d.getMonth()+1) + '月' +
      d.getDate() + '日 星期' + WEEK[d.getDay()];
  }

  function renderTabs(){
    var wrap = $('planTabs');
    wrap.innerHTML = '';

    state.plans.forEach(function(p){
      var chip = document.createElement('button');
      chip.type = 'button';
      chip.className = 'plan-chip' + (p.id === state.activePlanId ? ' active' : '');

      var ic = document.createElement('span');
      ic.className = 'chip-icon';
      ic.textContent = p.icon;

      var nm = document.createElement('span');
      nm.className = 'chip-name';
      nm.textContent = p.name;

      chip.appendChild(ic);
      chip.appendChild(nm);
      chip.addEventListener('click', function(){
        if(state.activePlanId === p.id) return;
        state.activePlanId = p.id;
        save();
        renderAll();
      });
      wrap.appendChild(chip);
    });

    var add = document.createElement('button');
    add.type = 'button';
    add.className = 'plan-chip add';
    add.textContent = '+';
    add.setAttribute('aria-label', '新建计划');
    add.addEventListener('click', function(){ openEdit(null); });
    wrap.appendChild(add);
  }

  function renderGoal(p){
    var pr = planProgress(p);
    $('goalLabel').textContent = pr.label;
    $('goalValue').textContent = pr.cur + ' / ' + pr.target;
    $('progressFill').style.width = pr.pct + '%';

    var sub;
    if(pr.cur >= pr.target){
      sub = '🎉 目标已达成，继续保持！';
    }else{
      var left = pr.target - pr.cur;
      if(p.goal.type === 'daily') sub = '还差 ' + left + ' 次完成今日目标';
      else if(p.goal.type === 'weekly') sub = '本周还差 ' + left + ' 天';
      else if(p.goal.type === 'streak') sub = '再坚持 ' + left + ' 天达成连续目标';
      else sub = '还差 ' + left + ' 天完成累计目标';
    }
    $('goalSub').textContent = sub;
  }

  function renderButton(p){
    var btn = $('checkBtn');
    var c = todayCount(p);
    var met = goalMet(p);

    if(c === 0){
      btn.textContent = '点击打卡';
      btn.classList.remove('done');
    }else if(met){
      btn.textContent = '✓ 目标已达成\n今日 ' + c + ' 次';
      btn.classList.add('done');
    }else{
      btn.textContent = '今日已打卡 ' + c + ' 次\n再点可继续 +1';
      btn.classList.add('done');
    }
    $('undoBtn').disabled = c === 0;
  }

  function renderStats(p){
    $('streak').textContent = planStreak(p);
    $('total').textContent = planTotal(p);
    var d = new Date();
    $('monthCount').textContent = planMonthCount(p, d.getFullYear(), d.getMonth());
  }

  function renderCalendar(p){
    $('monthLabel').textContent = viewYear + '年' + (viewMonth + 1) + '月';
    var grid = $('calGrid');
    grid.innerHTML = '';

    var i, el;
    for(i = 0; i < 7; i++){
      el = document.createElement('div');
      el.className = 'cal-week';
      el.textContent = WEEK[WEEK_ORDER[i]];
      grid.appendChild(el);
    }

    var offset = (new Date(viewYear, viewMonth, 1).getDay() + 6) % 7;
    for(i = 0; i < offset; i++){
      el = document.createElement('div');
      el.className = 'cal-cell empty';
      grid.appendChild(el);
    }

    var days = new Date(viewYear, viewMonth + 1, 0).getDate();
    var todayKey = keyOf(new Date());
    for(var d = 1; d <= days; d++){
      var k = keyOf(new Date(viewYear, viewMonth, d));
      el = document.createElement('div');
      el.className = 'cal-cell';
      el.textContent = d;
      if(hasCheckin(p, k)) el.classList.add('done');
      if(k === todayKey) el.classList.add('today');
      if(p.memos && p.memos[k]) el.classList.add('has-memo');

      (function(kk){
        el.addEventListener('click', function(){ openDateModal(kk); });
      })(k);

      grid.appendChild(el);
    }
  }

  function renderBanner(p){
    var banner = $('banner');
    if(!p || !p.reminderEnabled || !p.reminders.length){
      banner.classList.add('hidden');
      return;
    }
    var now = new Date();
    var curMin = now.getHours() * 60 + now.getMinutes();
    var passed = p.reminders.some(function(t){
      var parts = t.split(':');
      return curMin >= (parseInt(parts[0],10) * 60 + parseInt(parts[1],10));
    });
    if(passed && !goalMet(p)){
      banner.textContent = '⏰ 已经过了提醒时间，「' + p.name + '」今天还没完成哦～';
      banner.classList.remove('hidden');
    }else{
      banner.classList.add('hidden');
    }
  }

  function renderAll(){
    var p = activePlan();
    if(!p) return;
    applyTheme(p);
    renderHeader();
    renderTabs();
    renderGoal(p);
    renderButton(p);
    renderStats(p);
    renderCalendar(p);
    renderBanner(p);
  }

  /* ==================== 打卡交互 ==================== */
  $('checkBtn').addEventListener('click', function(){
    var p = activePlan();
    if(!p) return;
    var k = keyOf(new Date());
    var c = p.records[k] || 0;
    if(c >= 999) return;
    p.records[k] = c + 1;
    save();
    renderAll();
    if(navigator.vibrate) navigator.vibrate(28);
    showToast(goalMet(p) ? '🎉 目标达成！' : '打卡成功 +1');
  });

  $('undoBtn').addEventListener('click', function(){
    var p = activePlan();
    if(!p) return;
    var k = keyOf(new Date());
    var c = p.records[k] || 0;
    if(c <= 0) return;
    if(c === 1) delete p.records[k];
    else p.records[k] = c - 1;
    save();
    renderAll();
  });

  /* ==================== 日历切换 ==================== */
  $('prevMonth').addEventListener('click', function(){
    viewMonth--;
    if(viewMonth < 0){ viewMonth = 11; viewYear--; }
    renderCalendar(activePlan());
  });
  $('nextMonth').addEventListener('click', function(){
    viewMonth++;
    if(viewMonth > 11){ viewMonth = 0; viewYear++; }
    renderCalendar(activePlan());
  });

  /* ==================== 日期弹窗（补签+备忘录） ==================== */
  function openDateModal(k){
    var p = activePlan();
    if(!p) return;
    dateEdit.key = k;
    dateEdit.count = p.records[k] || 0;

    var parts = k.split('-');
    var y = parseInt(parts[0],10), m = parseInt(parts[1],10), d = parseInt(parts[2],10);
    var dt = new Date(y, m-1, d);
    $('dateTitle').textContent = y + '年' + m + '月' + d + '日 星期' + WEEK[dt.getDay()];

    $('dateMemo').value = (p.memos && p.memos[k]) || '';
    updateDateModal();

    $('dateMask').classList.add('show');
    syncBodyLock();
  }

  function updateDateModal(){
    var k = dateEdit.key;
    var todayKey = keyOf(new Date());
    var isFuture = k > todayKey;

    $('dateStatus').textContent = dateEdit.count > 0
      ? '已打卡 ' + dateEdit.count + ' 次'
      : (isFuture ? '未来日期' : '未打卡');
    $('dateStatus').className = 'date-status' + (dateEdit.count > 0 ? ' done' : '');

    $('addCheckin').disabled = isFuture || dateEdit.count >= 999;
    $('minusCheckin').disabled = isFuture || dateEdit.count <= 0;
    $('addCheckin').textContent = isFuture ? '未来不能打卡' : '+ 补签一次';
  }

  $('addCheckin').addEventListener('click', function(){
    if(dateEdit.count >= 999) return;
    dateEdit.count++;
    updateDateModal();
    if(navigator.vibrate) navigator.vibrate(20);
  });

  $('minusCheckin').addEventListener('click', function(){
    if(dateEdit.count <= 0) return;
    dateEdit.count--;
    updateDateModal();
  });

  function closeDateModal(){
    $('dateMask').classList.remove('show');
    syncBodyLock();
  }

  $('saveDate').addEventListener('click', function(){
    var p = activePlan();
    if(!p || !dateEdit.key) return;
    var k = dateEdit.key;

    if(dateEdit.count > 0) p.records[k] = dateEdit.count;
    else delete p.records[k];

    if(!p.memos) p.memos = {};
    var memo = $('dateMemo').value.trim();
    if(memo) p.memos[k] = memo;
    else delete p.memos[k];

    save();
    closeDateModal();
    renderAll();
    showToast('已保存');
  });

  $('closeDate').addEventListener('click', closeDateModal);
  $('cancelDate').addEventListener('click', closeDateModal);
  $('dateMask').addEventListener('click', function(e){
    if(e.target === $('dateMask')) closeDateModal();
  });

  /* ==================== 弹窗控制 ==================== */
  function syncBodyLock(){
    var open = $('manageMask').classList.contains('show') ||
               $('editMask').classList.contains('show') ||
               $('dateMask').classList.contains('show');
    document.body.classList.toggle('modal-open', open);
  }

  function openManage(){
    renderPlanList();
    $('manageMask').classList.add('show');
    syncBodyLock();
  }
  function closeManage(){
    $('manageMask').classList.remove('show');
    syncBodyLock();
  }

  function renderPlanList(){
    var wrap = $('planList');
    wrap.innerHTML = '';
    state.plans.forEach(function(p){
      var pr = planProgress(p);

      var row = document.createElement('div');
      row.className = 'plan-row' + (p.id === state.activePlanId ? ' active' : '');

      var ic = document.createElement('div');
      ic.className = 'pr-icon';
      ic.textContent = p.icon;

      var info = document.createElement('div');
      info.className = 'pr-info';

      var nm = document.createElement('div');
      nm.className = 'pr-name';
      nm.textContent = p.name;

      var sub = document.createElement('div');
      sub.className = 'pr-sub';
      sub.textContent = goalDesc(p) + ' · 当前 ' + pr.cur + '/' + pr.target;

      info.appendChild(nm);
      info.appendChild(sub);

      var act = document.createElement('div');
      act.className = 'pr-act';

      var editBtn = document.createElement('button');
      editBtn.type = 'button';
      editBtn.className = 'pr-btn';
      editBtn.textContent = '✎';
      editBtn.setAttribute('aria-label', '编辑');
      editBtn.addEventListener('click', function(e){
        e.stopPropagation();
        openEdit(p.id);
      });

      var delBtn = document.createElement('button');
      delBtn.type = 'button';
      delBtn.className = 'pr-btn danger';
      delBtn.textContent = '🗑';
      delBtn.setAttribute('aria-label', '删除');
      delBtn.addEventListener('click', function(e){
        e.stopPropagation();
        removePlan(p.id);
      });

      act.appendChild(editBtn);
      act.appendChild(delBtn);

      row.appendChild(ic);
      row.appendChild(info);
      row.appendChild(act);

      row.addEventListener('click', function(){
        state.activePlanId = p.id;
        save();
        renderAll();
        closeManage();
      });

      wrap.appendChild(row);
    });
  }

  function removePlan(id){
    if(state.plans.length <= 1){
      showToast('至少保留一个计划');
      return;
    }
    var p = getPlan(id);
    if(!p) return;
    if(!confirm('确定删除「' + p.name + '」吗？\n所有打卡记录和备忘录会一起删除。')) return;

    state.plans = state.plans.filter(function(x){ return x.id !== id; });
    if(state.activePlanId === id) state.activePlanId = state.plans[0].id;
    save();
    renderPlanList();
    renderAll();
    showToast('已删除');
  }

  /* ==================== 编辑计划 ==================== */
  function renderIconGrid(){
    var wrap = $('iconGrid');
    wrap.innerHTML = '';
    ICONS.forEach(function(ic){
      var b = document.createElement('button');
      b.type = 'button';
      b.className = 'icon-opt' + (ic === editing.icon ? ' active' : '');
      b.textContent = ic;
      b.addEventListener('click', function(){
        editing.icon = ic;
        renderIconGrid();
      });
      wrap.appendChild(b);
    });
  }

  function renderColorGrid(){
    var wrap = $('colorGrid');
    wrap.innerHTML = '';
    COLORS.forEach(function(c){
      var b = document.createElement('button');
      b.type = 'button';
      b.className = 'color-opt' + (c.main === editing.color ? ' active' : '');
      b.style.background = 'linear-gradient(135deg,' + c.main + ',' + c.grad + ')';
      b.addEventListener('click', function(){
        editing.color = c.main;
        renderColorGrid();
      });
      wrap.appendChild(b);
    });
  }

  function renderReminderList(){
    var wrap = $('reminderList');
    wrap.innerHTML = '';
    if(!editing.reminders.length){
      var empty = document.createElement('div');
      empty.className = 'empty-hint';
      empty.textContent = '暂无提醒，点下方按钮添加';
      wrap.appendChild(empty);
      return;
    }
    editing.reminders.forEach(function(t, i){
      var row = document.createElement('div');
      row.className = 'reminder-item';

      var inp = document.createElement('input');
      inp.type = 'time';
      inp.value = t;
      inp.addEventListener('change', function(){
        if(inp.value) editing.reminders[i] = inp.value;
      });

      var del = document.createElement('button');
      del.type = 'button';
      del.textContent = '✕';
      del.addEventListener('click', function(){
        editing.reminders.splice(i, 1);
        renderReminderList();
      });

      row.appendChild(inp);
      row.appendChild(del);
      wrap.appendChild(row);
    });
  }

  function openEdit(planId){
    var p = planId ? getPlan(planId) : null;
    editing.id = p ? p.id : null;
    editing.icon = p ? p.icon : '🎯';
    editing.color = p ? p.color : COLORS[0].main;
    editing.reminders = p ? p.reminders.slice() : ['09:00'];

    $('editTitle').textContent = p ? '编辑计划' : '新建计划';
    $('inputName').value = p ? p.name : '';
    $('inputGoalType').value = p ? p.goal.type : 'daily';
    $('inputGoalTarget').value = p ? p.goal.target : 1;
    $('inputReminderEnabled').checked = p ? p.reminderEnabled : false;
    $('deletePlanBtn').style.display = p ? '' : 'none';
    $('goalHint').textContent = HINTS[p ? p.goal.type : 'daily'];

    renderIconGrid();
    renderColorGrid();
    renderReminderList();
    updatePermUI();

    $('editMask').classList.add('show');
    syncBodyLock();
  }

  function closeEdit(){
    $('editMask').classList.remove('show');
    syncBodyLock();
  }

  $('inputGoalType').addEventListener('change', function(){
    $('goalHint').textContent = HINTS[this.value] || '';
  });

  $('addReminder').addEventListener('click', function(){
    if(editing.reminders.length >= 6){
      showToast('最多添加 6 个提醒');
      return;
    }
    var d = new Date();
    d.setHours(d.getHours() + 1, 0, 0, 0);
    editing.reminders.push(pad(d.getHours()) + ':00');
    renderReminderList();
  });

  $('saveEdit').addEventListener('click', function(){
    var name = $('inputName').value.trim() || '打卡计划';
    var type = $('inputGoalType').value;
    var target = parseInt($('inputGoalTarget').value, 10);

    if(!target || target < 1) target = 1;
    if(target > 999) target = 999;

    var valid = editing.reminders.filter(function(x){ return /^\d{2}:\d{2}$/.test(x); });
    var reminders = valid.length ? valid : ['09:00'];

    if(editing.id){
      var p = getPlan(editing.id);
      if(p){
        p.name = name.slice(0, 12);
        p.icon = editing.icon;
        p.color = editing.color;
        p.goal = { type: type, target: target };
        p.reminderEnabled = $('inputReminderEnabled').checked;
        p.reminders = reminders;
      }
    }else{
      var np = createPlan();
      np.name = name.slice(0, 12);
      np.icon = editing.icon;
      np.color = editing.color;
      np.goal = { type: type, target: target };
      np.reminderEnabled = $('inputReminderEnabled').checked;
      np.reminders = reminders;
      state.plans.push(np);
      state.activePlanId = np.id;
    }

    save();
    closeEdit();
    renderAll();
    if($('manageMask').classList.contains('show')) renderPlanList();
    showToast(editing.id ? '已保存' : '计划已创建');
  });

  $('deletePlanBtn').addEventListener('click', function(){
    if(!editing.id) return;
    var id = editing.id;
    closeEdit();
    removePlan(id);
  });

  $('manageBtn').addEventListener('click', openManage);
  $('closeManage').addEventListener('click', closeManage);
  $('manageMask').addEventListener('click', function(e){
    if(e.target === $('manageMask')) closeManage();
  });

  $('newPlanBtn').addEventListener('click', function(){ openEdit(null); });

  $('editPlanBtn').addEventListener('click', function(){
    var p = activePlan();
    if(p) openEdit(p.id);
  });

  $('closeEdit').addEventListener('click', closeEdit);
  $('cancelEdit').addEventListener('click', closeEdit);
  $('editMask').addEventListener('click', function(e){
    if(e.target === $('editMask')) closeEdit();
  });

  /* ==================== 通知权限 ==================== */
  function updatePermUI(){
    var el = $('permStatus');
    var btn = $('requestPerm');
    if(!('Notification' in window)){
      el.textContent = '当前环境不支持通知（打包 App 后需用原生通知）';
      el.className = 'perm-status warn';
      btn.style.display = 'none';
      return;
    }
    btn.style.display = '';
    var p = Notification.permission;
    if(p === 'granted'){
      el.textContent = '✅ 已开启';
      el.className = 'perm-status ok';
      btn.textContent = '发送测试通知';
    }else if(p === 'denied'){
      el.textContent = '❌ 已被拒绝，请在浏览器设置中手动允许';
      el.className = 'perm-status warn';
      btn.textContent = '查看说明';
    }else{
      el.textContent = '未开启（不开启收不到提醒）';
      el.className = 'perm-status';
      btn.textContent = '开启系统通知';
    }
  }

  $('requestPerm').addEventListener('click', function(){
    if(!('Notification' in window)){
      showToast('当前环境不支持通知');
      return;
    }
    if(Notification.permission === 'denied'){
      alert('通知权限已被拒绝。\n请在浏览器地址栏左侧的锁形图标里，把「通知」改为「允许」，然后刷新页面。');
      return;
    }
    if(Notification.permission === 'granted'){
      fireNotification([{ name:'通知测试', icon:'⏰' }], true);
      return;
    }
    Notification.requestPermission().then(function(p){
      updatePermUI();
      if(p === 'granted'){
        showToast('通知已开启');
        fireNotification([{ name:'通知测试', icon:'⏰' }], true);
      }else{
        showToast('未获得通知权限');
      }
    }).catch(function(){ updatePermUI(); });
  });

  /* ==================== 提醒逻辑 ==================== */
  function fireNotification(plans, isTest){
    if(!('Notification' in window) || Notification.permission !== 'granted') return;

    var title, body;
    if(isTest){
      title = '⏰ 通知测试';
      body = '通知已开启，到点会提醒你打卡～';
    }else if(plans.length === 1){
      title = '⏰ ' + plans[0].name;
      body = '别忘了今天的打卡目标哦～';
    }else{
      title = '⏰ 还有 ' + plans.length + ' 个计划待打卡';
      body = plans.map(function(p){ return p.icon + ' ' + p.name; }).join('\n');
    }

    try{
      var n = new Notification(title, {
        body: body,
        tag: 'daily-checkin-' + Date.now(),
        renotify: true
      });
      n.onclick = function(){ window.focus(); n.close(); };
    }catch(e){}

    if(navigator.vibrate) navigator.vibrate([120, 70, 120]);
  }

  function checkReminders(){
    if(!('Notification' in window) || Notification.permission !== 'granted') return;

    var now = new Date();
    var todayKey = keyOf(now);
    var curMin = now.getHours() * 60 + now.getMinutes();
    var pending = [];

    state.plans.forEach(function(p){
      if(!p.reminderEnabled) return;
      p.reminders.forEach(function(t){
        var parts = t.split(':');
        var rMin = parseInt(parts[0],10) * 60 + parseInt(parts[1],10);
        if(curMin >= rMin && curMin - rMin <= 1 && p.lastNotified[t] !== todayKey){
          p.lastNotified[t] = todayKey;
          if(!goalMet(p)) pending.push(p);
        }
      });
    });

    if(pending.length){
      save();
      fireNotification(pending, false);
    }
    renderBanner(activePlan());
  }

  /* ==================== 启动 ==================== */
  load();
  renderAll();

  setInterval(checkReminders, 20000);

  document.addEventListener('visibilitychange', function(){
    if(!document.hidden){
      var t = new Date();
      viewYear = t.getFullYear();
      viewMonth = t.getMonth();
      renderAll();
      checkReminders();
    }
  });
  window.addEventListener('focus', checkReminders);

})();
</script>
</body>
</html>