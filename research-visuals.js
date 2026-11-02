'use strict';
function researchAccessibility(){
  if(sid()===12)return '视觉反馈关闭到开启：目标状态感知5.83到6.09，阶段理解与动作预测5.72到6.04，均为七点评分，差异显著。';
  if(sid()===13)return '文本到语音：工作台停留占比40.71%到44.12%，状态屏2.92%到1.80%。探索性头显朝向分析，N等于31。';
  if(sid()===14)return '六种组合采用意愿详见可操作矩阵。';
  if(sid()===15)return state.armContext==='settings'?'保存个人设置6.53，随时调整6.22，固定默认4.66，七点评分，未报告显著性比较。':state.armContext==='complex'?'32人中18人选择复杂任务需要任务理解反馈。':'32人中20人选择相似目标需要视觉识别反馈。';
  if(sid()===16)return '计划披露使表达容易程度增加0.45分、执行前信息充分性增加1.63分；启动意愿在目标级指令下增加1.59分，在步骤级指令下增加1.03分。均为评分差值。';
  if(sid()===17)return homeFeedback.map(d=>d.label+'：'+(state.homeCompare==='none'?'按阶段、朝向抑制、转向触发，相对不主动反馈分别增加'+d.gains.join('、')+'分':'按阶段比转向触发高'+d.contrast+'分')).join('。');
  if(sid()===18){const d=homeScenarios.find(s=>s.key===state.homeScenario);return d.label+'。'+(d.leaders.length?'评分较高：'+d.leaders.join('、')+'。':'')+d.comparison;}
  return '研究动画示意。';
}
function renderPreferenceGrid(){
  const host=$('preferenceGrid'),visible=sid()===14;
  host.hidden=!visible;canvas.style.opacity=visible?'0':'1';canvas.setAttribute('aria-hidden',String(visible));
  if(!visible)return;
  const d=armPreference[state.preference];
  host.innerHTML='<div class="matrix-heading"><span>采用意愿</span><small>模型估计均值 · 1–7 分</small></div><div class="pref-layout"><span class="matrix-axis">视觉识别<br>反馈</span>'+['无理解反馈','文本','语音'].map(s=>'<span class="matrix-col">'+s+'</span>').join('')+armPreference.map((v,i)=>(i%3===0?'<span class="matrix-row">'+(v.visual?'开启':'关闭')+'</span>':'')+'<button class="pref-cell" data-choice="'+i+'" aria-label="'+v.mode+'，视觉'+(v.visual?'开启':'关闭')+'，采用意愿'+v.mean.toFixed(2)+'分" aria-pressed="'+(i===state.preference)+'" style="--cell-fill:rgba(155,232,203,'+(.07+(v.mean-1)/6*.35)+')"><b>'+v.mean.toFixed(2)+'</b><small>'+(i===5?'均值最高':' / 7')+'</small></button>').join('')+'</div><div class="matrix-selection" aria-live="polite"><span>'+d.mode+' ＋ 视觉'+(d.visual?'开启':'关闭')+'</span><strong>'+d.mean.toFixed(2)+' <small>/ 7</small></strong><p>95% CI ['+d.ci.map(n=>n.toFixed(2)).join(', ')+']<br>评 6–7 分的参与者：'+d.high+'%</p></div><p class="matrix-caption">评分排序 ≠ 已证明显著优于其他组合</p>';
}
function openData(){
  const d=researchDetails[sid()];if(!d)return;play(false);stopVoice();
  $('dataEyebrow').textContent=d.study===2?'EVIDENCE / STUDY 02':'EVIDENCE / STUDY 01';
  $('dataTitle').textContent=d.title;$('dataType').textContent=d.type;
  $('dataBody').innerHTML='<p class="dialog-intro">'+d.intro+'</p><div class="data-table-wrap"><table><thead><tr>'+d.heads.map(v=>'<th scope="col">'+v+'</th>').join('')+'</tr></thead><tbody>'+d.rows.map(row=>'<tr>'+row.map((v,i)=>i===0?'<th scope="row">'+v+'</th>':'<td>'+v+'</td>').join('')+'</tr>').join('')+'</tbody></table></div><ul class="data-notes">'+d.notes.map(n=>'<li>'+n+'</li>').join('')+'</ul><p class="source-locator">'+d.source+'</p><p class="method-footer">'+(d.study===2?'两阶段研究的量表与分析分别解释。Holm 校正按结果指标或情境内比较进行，未跨所有结果统一校正。':'主研究所有条件均保留实时语音转写。具体比较使用论文报告的校正；研究未对所有结果指标统一进行多重比较校正。')+'完整限制见“研究与依据”。</p>';
  $('dataDialog').showModal();
}
function initResearch(){
  $('researchNav').addEventListener('click',e=>{const b=e.target.closest('button[data-result]');if(b){play(false);go(scenes.findIndex(s=>s.id===Number(b.dataset.result)));}});
  $('preferenceGrid').addEventListener('click',e=>{const b=e.target.closest('button[data-choice]');if(b){play(false);state.preference=Number(b.dataset.choice);renderPreferenceGrid();$('preferenceGrid').querySelector('[data-choice="'+state.preference+'"]').focus({preventScroll:true});}});
  $('closeData').onclick=()=>$('dataDialog').close();
  $('dataDialog').addEventListener('click',e=>{if(e.target===$('dataDialog')){const r=e.target.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)e.target.close();}});
}
function awarenessChart(t){
  text('视觉识别反馈',86,76,18,colors.white);
  circle(95,116,5,'#607781');text('关闭',109,116,12,colors.muted);circle(182,116,5,colors.mint);text('开启',196,116,12,colors.mint);
  const x=v=>85+(v-1)/6*500;
  [0,1].forEach(i=>{const d=armAwareness[i],y=210+i*135;
    text(d.name,85,y-57,15,colors.white);
    line(85,y,585,y,colors.line,2);for(let k=1;k<=7;k++){line(x(k),y-4,x(k),y+4,colors.line);mono(String(k),x(k),y+27,10,colors.muted,'center');}
    line(x(d.off),y,x(d.on),y,colors.mint,4);circle(x(d.off),y,6,'#607781',colors.bg,2);circle(x(d.on),y,6,colors.mint,colors.bg,2);
    mono(d.off.toFixed(2),x(d.off)-8,y-21,15,colors.muted,'right');mono(d.on.toFixed(2),x(d.on)+10,y-21,15,colors.mint,'left');
    mono('p = '+d.p,585,y-57,12,colors.mint,'right');
  });
  text('七点评分 · 完整 1–7 刻度',350,431,12,colors.muted,'center');
  text('看得更清楚，是主观体验上的改善。',350,471,15,colors.white,'center');
}
function attentionChart(t){
  text('文本 → 语音：注意方向的变化',80,77,18,colors.white);
  rect(80,125,540,147,'#11252b','#2d464e',6);
  text('工作台',100,153,15,colors.white);text('更多时间朝向手头的工作',600,153,11,colors.muted,'right');
  mono('40.71%',100,205,33,colors.blue);arrow(290,205,350,205,colors.line);mono('44.12%',380,205,33,colors.mint);
  text('文本',102,246,11,colors.blue);text('语音',382,246,11,colors.mint);mono('p = .025',600,246,11,colors.muted,'right');
  rect(80,295,540,147,'#11252b','#2d464e',6);
  text('语音／状态屏',100,323,15,colors.white);text('更少时间朝向反馈显示',600,323,11,colors.muted,'right');
  mono('2.92%',100,375,33,colors.blue);arrow(290,375,350,375,colors.line);mono('1.80%',380,375,33,colors.mint);
  text('文本',102,416,11,colors.blue);text('语音',382,416,11,colors.mint);mono('p = .021',600,416,11,colors.muted,'right');
  text('占五个 AOI 总有效停留时间的比例',350,483,12,colors.muted,'center');
}
function armContextChart(t){
  if(state.armContext==='settings'){
    text('希望如何设置反馈？',80,88,19,colors.white);
    const names=['保存个人设置','使用中随时调整','固定默认设置'],values=[6.53,6.22,4.66];
    values.forEach((v,i)=>{const y=162+i*92;text(names[i],80,y-21,13,colors.white);rect(80,y,480,25,'#172b30',null,2);rect(80,y,480*v/7,25,i===2?'#52686b':colors.orange,null,2);mono(v.toFixed(2),96+480*v/7,y+12,17,i===2?colors.muted:colors.orange);});
    line(80,400,560,400,colors.line);for(let k=0;k<=7;k++)mono(String(k),80+480*k/7,419,10,colors.muted,'center');
    text('七点评分 · 描述性结果，未报告选项间显著性比较',350,475,12,colors.muted,'center');return;
  }
  const complex=state.armContext==='complex',n=complex?18:20;
  text(complex?'复杂任务：需要理解反馈':'相似目标：需要视觉反馈',350,90,19,colors.white,'center');
  if(complex){rect(195,136,310,56,'#192d30','#3f615b');text('取出目标，放到指定工作区…',350,164,16,colors.mint,'center');}
  else{cylinder(270,197,23,50,colors.red);cylinder(350,197,23,50,'#d39983');cylinder(430,197,23,50,'#c78577');brackets(237,132,66,79);}
  text(n+' / 32',350,255,41,colors.orange,'center',500);text('参与者选择此情境',350,294,12,colors.muted,'center');
  for(let i=0;i<32;i++)circle(171+(i%8)*51,337+Math.floor(i/8)*29,7,i<n?colors.orange:'#253d42');
  text('情境多选题 · 需求偏好，不是效果验证',350,480,12,colors.muted,'center');
}

function homePlanChart(t){
 text('计划披露带来的评分提升',350,65,22,colors.white,'center');
 text('相对未披露计划 · 评分差值（分）',350,94,13,colors.muted,'center');
 [{x:90,value:'0.45',label:'表达任务更容易'},{x:370,value:'1.63',label:'执行前信息更充分'}].forEach(d=>{
  rect(d.x,122,240,104,'#152a2d','#3a554e',6);
  mono('+'+d.value,d.x+120,160,39,colors.orange,'center');text(d.label,d.x+120,203,16,colors.white,'center');
 });
 text('启动任务的意愿提升',85,278,19,colors.white);
 [['人只说目标',1.59],['人已说明步骤',1.03]].forEach(([label,value],i)=>{
  const y=329+i*81;text(label,85,y-17,15,colors.white);
  rect(85,y,440,19,'#1a3035',null,2);rect(85,y,440*value/2,19,colors.orange,null,2);
  mono('+'+value.toFixed(2),103+440*value/2,y+10,20,colors.orange);
 });
 line(85,463,525,463,colors.line);[0,1,2].forEach(v=>mono(String(v),85+220*v,482,12,colors.muted,'center'));
}
function homeFeedbackChart(t){
 const againstNone=state.homeCompare==='none';
 text(againstNone?'主动反馈，比不主动高多少？':'按阶段报告，比转向触发高多少？',350,59,22,colors.white,'center');
 if(againstNone){
  ['按阶段','朝向抑制','转向触发'].forEach((s,i)=>text(s,180+i*170,94,15,colors.orange,'center'));
  homeFeedback.forEach((d,i)=>{
   const y=117+i*114;rect(80,y,540,97,'#12272c','#2e494b',6);
   text(d.label,350,y+23,17,colors.white,'center');
   d.gains.forEach((v,k)=>mono('+'+v.toFixed(2),180+k*170,y+64,30,colors.orange,'center'));
  });
 }else{
  homeFeedback.forEach((d,i)=>{
   const y=120+i*112;rect(80,y,540,94,'#12272c','#2e494b',6);
   text(d.label,102,y+30,17,colors.white);mono('+'+d.contrast.toFixed(2),590,y+31,31,colors.orange,'right');
   rect(102,y+64,350,8,'#233b40',null,2);rect(102,y+64,350*d.contrast/1.5,8,colors.orange,null,2);
  });
 }
 text('平均评分差值（分）',350,486,13,colors.muted,'center');
}
function homeScenarioChart(t){
 const d=homeScenarios.find(s=>s.key===state.homeScenario);
 text(d.label,350,66,24,colors.white,'center');
 text('情境适切性评分',350,113,17,colors.orange,'center');
 ['不主动反馈','按阶段反馈','朝向抑制','转向触发'].forEach((label,i)=>{
  const x=85+i%2*280,y=163+Math.floor(i/2)*114,chosen=d.leaders.includes(label);
  rect(x,y,250,88,chosen?'#26372c':'#10232a',chosen?colors.orange:'#32484f',6);
  text(label,x+125,y+44,23,chosen?colors.orange:colors.muted,'center',500);
 });
 text(d.comparison,350,431,14,colors.white,'center');
}
