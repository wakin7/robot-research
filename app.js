'use strict';
const $ = id => document.getElementById(id);
const scenes = [
  {duration:14,chapter:'序章 / 当机器人开始自主行动',tag:'A STORY ABOUT HUMAN–ROBOT COMMUNICATION',title:'它会做。<br>你能<em>放心吗？</em>',description:'从一起搭积木，到把家务交给它。机器人越能自主行动，我们越需要知道：它理解了什么，正在做什么。',thesis:'让自主行动，与人的理解保持连接。',visual:'COMMUNICATION / CONNECTION',kind:'概念示意',note:'两项人机交互研究 · 动态叙事与可交互演示'},
  {duration:16,chapter:'第一章 / 看见理解',tag:'01 / FROM WORDS TO ACTION',title:'人负责拼装，<br>机械臂<em>帮忙取料。</em>',description:'人按任务板拼装积木，用语音索取够不到的材料。机械臂把积木送到人的工作区；人一边拼装，一边检查它是否拿对，必要时取消操作。',thesis:'人既要完成自己的拼装任务，也要判断机器人是否理解正确。',visual:'STUDY 01 / ASSEMBLER × ROBOT ASSISTANT',kind:'任务分工示意 · VR 研究',note:'研究一 §4.3–4.4、Fig. 3：人拼装并提交成品；机器人取放积木。可用语音或按钮取消错误操作。'},
  {duration:16,chapter:'第一章 / 看见理解',tag:'02 / WHERE DID IT GO WRONG?',title:'错在理解，<br>还是<em>错在识别？</em>',description:'同样是拿错了积木，错误可能发生在不同阶段。看见它选错了，还不等于知道它为什么选错。',thesis:'要及时干预，先要知道偏差发生在哪里。',visual:'ERROR / TWO DIFFERENT STAGES',kind:'改编情境 · 可切换',note:'两个错误类型来自研究设计；本动画为简化演示。'},
  {duration:20,chapter:'第一章 / 看见理解',tag:'03 / MAKE THE INTERMEDIATE VISIBLE',title:'让中间状态，<br>变得<em>可见。</em>',description:'试着切换反馈方式：机器人可以用文字或语音说明任务理解，也可以展示它选择的目标。你会先看哪里？',thesis:'说出任务理解，标出目标对象。',visual:'TRANSPARENCY / EXPLORE THE CONDITIONS',kind:'交互示意 · 非原始实验',note:'研究一：预研究 N = 31；主研究 N = 32。3 × 2 条件组合。'},
  {duration:18,chapter:'第二章 / 证据与代价',tag:'04 / WHAT DID THE STUDY FIND?',title:'更早察觉，<br><em>更快介入。</em>',description:'在成功取消错误的事件中，语音反馈缩短了任务理解错误的干预响应时间。视觉反馈也缩短了目标识别错误的响应时间。',thesis:'反馈的作用，与它揭示的处理阶段相对应。',visual:'INTERVENTION RESPONSE TIME / SECONDS',kind:'研究数据 · 模型估计值',note:'仅分析成功取消事件；未发现取消成功概率的显著提升。来源：研究一 §5.2.2，p. 16。'},
  {duration:14,chapter:'第二章 / 证据与代价',tag:'05 / INFORMATION HAS A COST',title:'信息有帮助，<br>也会<em>占用注意。</em>',description:'语音让人不必一直看反馈屏，却也可能打断手头的工作。研究中，语音条件下每完成一项任务的总体耗时更长。',thesis:'更快纠错，并不意味着所有任务表现都会改善。',visual:'BENEFIT ↔ COORDINATION COST',kind:'研究数据与概念示意',note:'20.80 → 23.15 秒 / 完成任务；总体回合耗时 ÷ 完成数，非单项成功任务时长。研究一 §5.2.1。'},
  {duration:17,chapter:'第三章 / 放心交给它',tag:'06 / BEFORE HANDING OVER',title:'把家务交给它，<br>人继续<em>自己的事。</em>',description:'人提出家务目标，机器人负责整理、备饮。人则观看纪录片或校对文字，间歇关注进展。交出去之前，机器人怎样说明计划，才能让人心中有数？',thesis:'从一起动手，到委托后间歇关注：人的角色与信息需求都变了。',visual:'STUDY 02 / DELEGATOR × AUTONOMOUS ROBOT',kind:'委托情境改编 · 可切换',note:'研究二：阶段一为委托情境问卷（30/32 人偏好计划披露）；阶段二 VR 中，人观看纪录片或校对文字，每组 16 人。'},
  {duration:20,chapter:'第三章 / 放心交给它',tag:'07 / WHILE THE ROBOT WORKS',title:'它在忙。<br>你也有<em>自己的事。</em>',description:'选择一种反馈条件，播放完整整理任务。鼠标在场景内移动，人物视线会跟随；看向机器人或移开，体验同一流程下不同的播报时机。',thesis:'任务阶段与人的朝向，会触发不同的信息时机。',visual:'PROGRESS FEEDBACK / FOUR STRATEGIES',kind:'即时朝向交互 · 改编演示',note:'鼠标模拟头部朝向，不是眼动追踪。本页按即时交互改编：转向就播报，朝向就停止；原研究的间隔与去重规则见研究与依据。触屏可拖动，聚焦画面后可用方向键。'},
  {duration:17,chapter:'第四章 / 恰当的沟通',tag:'08 / LOOKING IS NOT ALWAYS ASKING',title:'看向它，<br>未必是<em>在提问。</em>',description:'你可能在确认动作，也可能只是随意一瞥。真正影响信息需求的，还有任务是否清楚、是否异常，以及你手头的事情。',thesis:'朝向是情境线索，不能直接等同于“请告诉我”。',visual:'INFORMATION NEED / CHANGING CONTEXT',kind:'问卷结果 · 情境切换',note:'研究二实验后问卷（N = 32）。情境偏好支持设计方向，未验证完整自适应系统。'},
  {duration:14,chapter:'第四章 / 恰当的沟通',tag:'09 / DESIGN FOR THE MOMENT',title:'关键时说清，<br>平常时<em>可查看。</em>',description:'让重要状态有机会被看见，让关键事件及时被听见，也让人可以调整常规反馈的频率与细节。',thesis:'要回答两个问题：什么值得说，什么时候、说多少？',visual:'CONTENT × TIMING × CONTROL',kind:'研究启示 · 非已验证产品',note:'综合两份研究的讨论与设计启示；不代表已实现或验证的自适应机器人。'},
  {duration:14,chapter:'终章 / 自主与理解之间',tag:'HUMAN × ROBOT / KEEP THE CONNECTION',title:'把任务交出去。<br>把<em>理解</em>留下来。',description:'好的沟通，让人能够理解、检查与介入，也能够继续自己的生活。自主的机器人，需要与人保持恰当的连接。',thesis:'知其所为，然后放心同行。',visual:'AUTONOMY / WITH HUMAN UNDERSTANDING',kind:'研究叙事总结',note:'基于两项受控 VR 研究。真实家庭环境、物理风险与长期使用仍待进一步研究。'}
];

scenes.forEach((scene,i)=>scene.id=i);
scenes[7].duration=24;
scenes[3].note='主研究 N = 32，3 × 2 条件。所有条件均保留实时语音转写；“无”指无额外任务理解反馈。';
scenes[4].description='在成功取消错误的事件中，语音让任务理解错误的干预响应更快；视觉反馈则帮助更快干预目标识别错误。';
scenes[5].title='更快介入，<br>也有<em>时间成本。</em>';
scenes[5].description='从整轮任务来看，语音条件下每完成一项任务的总体耗时更长。纠错响应与任务效率，衡量的是不同的事情。';
scenes[5].kind='主效应与比较 · 统计显著';
scenes[5].visual='OVERALL TIME PER COMPLETED TASK / SECONDS';
const awarenessScene={id:12,duration:16,chapter:'第二章 / 证据与代价',tag:'04 / UNDERSTANDING THE ROBOT',title:'看见目标，<br>更理解<em>它的行动。</em>',description:'开启视觉识别反馈后，参与者对目标状态的感知，以及对任务阶段与下一步动作的理解，评分都更高。',thesis:'更清楚它选了什么，也更容易预期它将做什么。',visual:'VISUAL FEEDBACK / PERCEIVED UNDERSTANDING',kind:'主效应 · 统计显著',note:'N = 32；七点评分的模型估计均值。主观感知，不是客观正确率。'};
const attentionScene={id:13,duration:16,chapter:'第二章 / 证据与代价',tag:'06 / WHERE ATTENTION GOES',title:'听着反馈，<br>看着<em>手头的工作。</em>',description:'相比文字，语音条件下，参与者朝向工作台的停留占比更高，朝向状态屏的占比更低。信息的呈现方式，改变了查看信息的方式。',thesis:'信息可以被听见，视觉便能更多地留在工作区域。',visual:'ATTENTION ALLOCATION / DWELL-TIME PROPORTION',kind:'探索性分析 · 差异显著',note:'N = 31；头显朝向近似注视，非眼动追踪。占比相对于五个 AOI 总有效停留时间。'};
const preferenceScene={id:14,duration:18,chapter:'第二章 / 证据与代价',tag:'08 / WHAT PEOPLE WOULD CHOOSE',title:'有成本，<br>仍愿意<em>拥有这些信息。</em>',description:'六种组合中，“语音＋视觉”的采用意愿评分最高。参与者的偏好，与任务表现需要分别理解。点击矩阵，查看每种组合。',thesis:'最想使用的组合，不必在每个表现指标上都最好。',visual:'ADOPTION INTENTION / SIX COMBINATIONS',kind:'描述性评分 · 不声明显著优胜',note:'N = 32；1–7 分。显示均值排序，不表示任意两组之间都存在显著差异。'};
const explorationScene={id:15,duration:16,chapter:'第二章 / 证据与代价',tag:'09 / EXPLORE INFORMATION NEEDS',title:'什么信息，<br>在此刻<em>值得出现？</em>',description:'指令变得复杂、目标变得相似，所需的信息也不同。参与者还希望保存自己的设置，并在使用时随时调整。',thesis:'让反馈回应不确定性，也给个人偏好留下空间。',visual:'CONTEXT & CUSTOMIZATION / EXPLORE',kind:'描述性问卷 · 非效果验证',note:'N = 32；情境题可多选。设置为七点评分，未报告选项间显著性比较。'};
scenes.splice(4,0,awarenessScene);
scenes.splice(6,0,attentionScene);
scenes.splice(8,0,preferenceScene,explorationScene);
scenes.splice(scenes.findIndex(s=>s.id===6)+1,0,{"id": 16, "duration": 18, "chapter": "第三章 / 放心交给它", "tag": "11 / BEFORE THE FIRST ACTION", "title": "先说清计划，<br>再<em>放心交付。</em>", "description": "机器人说明执行计划后，人觉得信息更充分，也更愿意启动任务。只交代目标时，计划披露带来的启动意愿提升更大。", "note": "研究二阶段一，N = 32。1–7 分主观评分；图示为计划披露相对未披露的评分增益。"});
scenes.splice(scenes.findIndex(s=>s.id===7)+1,0,{"id": 17, "duration": 18, "chapter": "第三章 / 放心交给它", "tag": "13 / PROGRESS BUILDS UNDERSTANDING", "title": "知道它在做什么，<br>更愿意<em>相信它。</em>", "description": "三种主动反馈都获得了更高的状态理解与表现信任评分。相比等人转头再说，按阶段报告获得了更高评分。切换比较，查看差异。", "note": "研究二阶段二，N = 32。图示为报告的平均评分差值；按阶段并非显著优于所有策略。"},{"id": 18, "duration": 18, "chapter": "第四章 / 恰当的沟通", "tag": "14 / FEEDBACK FITS THE CONTEXT", "title": "情境变了，<br>合适的反馈<em>也变了。</em>", "description": "专注、放松、遇到异常，适合的沟通方式并不相同。切换情境，看看参与者认为哪种策略更合适。", "note": "研究二实验后情境评分，N = 32。策略 × 情境交互显著；不是各情境中的实际任务效果。"});
const chapterStarts=[0,1,4,scenes.findIndex(s=>s.id===6),scenes.findIndex(s=>s.id===18)];
document.querySelectorAll('[data-go]').forEach((button,i)=>button.dataset.go=chapterStarts[i]);
scenes.find(s=>s.id===8).description='看一眼、反复看、看不懂，期待的回应并不一样。短暂一瞥可能希望安静，异常时则更希望得到详细解释。';
scenes.forEach((scene,i)=>{scene.tag=scene.tag.replace(/^\d{2} \//,String(i).padStart(2,'0')+' /');});
function sid(){return scenes[index].id;}

let starts=[], total=0;scenes.forEach(s=>{starts.push(total);total+=s.duration;});
let time=0,index=0,playing=false,lastFrame=0,frameHandle=0;
const state={error:'understanding',mode:'speech',vision:true,metric:'understanding',plan:true,strategy:'stage',facing:false,stage:0,lastSpokenAt:-Infinity,lastSpokenStage:-1,feedback:'机器人正在执行任务。',context:'glance',homeCompare:'none',homeScenario:'complex',music:false,preference:5,armContext:'complex'};
const reduceMotion=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
let speechTimer=null,audioCtx=null,audioGain=null,audioTimer=null;
const robotSpeech=document.createElement('audio');robotSpeech.id='robotSpeech';robotSpeech.preload='auto';robotSpeech.hidden=true;document.body.appendChild(robotSpeech);
let voiceGeneration=0,feedbackVoiceStarted=false;
function updateSpeechUI(){
 const button=document.querySelector('[data-action="speak"]');
 if(button)button.textContent=voiceUnavailable?'语音未能播放 · 点击重试':!robotSpeech.paused?'正在播报 · 重听':'▷ 再听一次';
}
function resumeVoice(){
 if(!robotSpeech.hasAttribute('src')||robotSpeech.ended)return;
 const generation=voiceGeneration;
 robotSpeech.play().catch(e=>{if(generation===voiceGeneration&&e.name!=='AbortError'){voiceUnavailable=true;updateSpeechUI();if(sid()===7)updateTaskUI();}});
}
function speakClip(key){
 stopVoice();voiceUnavailable=false;robotSpeech.src=window.robotSpeechClips[key];resumeVoice();
}
['play','pause','ended'].forEach(event=>robotSpeech.addEventListener(event,updateSpeechUI));
const taskRun=new FeedbackRun(state.strategy);
let gazePoint={x:462,y:319},gazeAngle=2.13,voiceUnavailable=false;
const readerHead={x:494,y:269};
const stageNames=['收好书本','整理桌面','归置衣物','完成整理'];
const canvas=$('sceneCanvas'),ctx=canvas.getContext('2d');
let cw=700,ch=540,dpr=1;
const colors={mint:'#9be8cb',orange:'#e6b47d',red:'#e58b80',blue:'#8bafdf',white:'#e4eceb',muted:'#8299a1',line:'#294049',bg:'#0a1117'};
function fmt(t){return `${Math.floor(t/60).toString().padStart(2,'0')}:${Math.floor(t%60).toString().padStart(2,'0')}`;}
function localTime(){return time-starts[index];}
function stopVoice(){voiceGeneration++;robotSpeech.pause();robotSpeech.removeAttribute('src');robotSpeech.load();if('speechSynthesis'in window)speechSynthesis.cancel();clearTimeout(speechTimer);}
function sceneHasTaskControls(){return [1,2,3,6,7].includes(sid());}
function sceneHasAnimation(){return [0,1,2,3,6,7,9,10].includes(sid());}
function play(on){
  on=Boolean(on)&&sceneHasAnimation();
  if(on&&localTime()>=scenes[index].duration){feedbackVoiceStarted=false;time=starts[index];if(sid()===7)resetTask();}
  playing=on;
  if(sid()===7){if(on){if(!taskRun.started){state.feedback=state.strategy==='none'?'不主动反馈：本轮只执行任务，不播报进度。':state.strategy==='triggered'?'任务已开始；将视线转向机器人，体验触发播报。':'任务已开始。';updateMessage();}deliverReports(taskRun.play());}else taskRun.pause();}
  if(on){
    if(sid()===3&&state.mode==='speech'&&!feedbackVoiceStarted){feedbackVoiceStarted=true;speakClip('grab');}
    else resumeVoice();
  }else robotSpeech.pause();
  updatePlayer();
}
function go(n){
  play(false);stopVoice();feedbackVoiceStarted=false;index=Math.max(0,Math.min(scenes.length-1,n));time=starts[index];
  renderScene();play(sceneHasAnimation());if(window.innerWidth<=700)window.scrollTo({top:0,behavior:'instant'});
}
function updatePlayer(){
  const elapsed=localTime(),duration=scenes[index].duration,finished=elapsed>=duration;
  $('prevBtn').disabled=index===0;$('nextBtn').disabled=index===scenes.length-1;
  $('animationControls').hidden=!sceneHasTaskControls();
  $('visualColumn').classList.toggle('has-animation',sceneHasTaskControls());
  const label=playing?'暂停演示':finished?'重新演示':'继续演示';
  $('playLabel').textContent=label;$('playBtn').firstElementChild.textContent=playing?'Ⅱ':finished?'↻':'▶';
  $('playBtn').setAttribute('aria-label',label);
  if(sid()===7)updateTaskUI();
}
function resetTask(){
  taskRun.reset(state.strategy);state.stage=0;state.facing=false;
  gazePoint={x:462,y:319};gazeAngle=Math.atan2(gazePoint.y-readerHead.y,gazePoint.x-readerHead.x);
  state.feedback='选择一种条件，或播放整理动画。';stopVoice();
}
function restartCondition(){
  time=starts[index];resetTask();state.feedback=state.strategy==='none'?'不主动反馈：本轮只执行任务，不播报进度。':state.strategy==='triggered'?'任务已开始；将视线转向机器人，体验触发播报。':'任务已开始。';renderControls();updateMessage();play(true);
}
function updateTaskUI(){
  if($('gazeStatus'))$('gazeStatus').textContent=state.facing?'视线：机器人':'视线：已移开';
  if($('reportStatus'))$('reportStatus').textContent='本轮播报 '+taskRun.count+' 次'+(voiceUnavailable?' · 语音未能播放，显示文字':'');
  canvas.setAttribute('aria-label','整理任务：'+stageNames[state.stage]+'。'+(state.facing?'人物正看向机器人。':'人物视线已移开。')+'在画面内移动鼠标或拖动可控制视线。');
}
function deliverReports(reports){
  for(const report of reports){
    if(report.type==='stop'){
      stopVoice();state.feedback='已看向机器人，播报立即停止。';continue;
    }
    const phrase=report.stage===3?'整理完成。':'我正在'+['收拾书本','整理桌面','归置衣物'][report.stage]+'。';
    state.feedback='机器人：“'+phrase+'”';
    speakClip(['books','table','clothes','done'][report.stage]);
  }
  if(reports.length)updateMessage();
  updateTaskUI();
}
function chip(text,key,value,selected){return `<button class="chip" data-key="${key}" data-value="${value}" aria-pressed="${selected}">${text}</button>`;}
function renderControls(){
  let html='';
  if(sid()===0)html='<button class="primary-button" data-action="enter">进入研究 <span>→</span></button><button class="text-button" data-action="explore">直接探索</button>';
  if(sid()===2)html=chip('任务理解错误','error','understanding',state.error==='understanding')+chip('目标识别错误','error','recognition',state.error==='recognition');
  if(sid()===3)html='<span class="control-label">任务理解反馈</span><div class="control-row">'+['none','text','speech'].map((v,i)=>chip(['无反馈','文本','语音'][i],'mode',v,state.mode===v)).join('')+'</div><div class="control-row">'+chip('视觉识别反馈 '+(state.vision?'开启':'关闭'),'vision','toggle',state.vision)+(state.mode==='speech'?'<button class="secondary-button" data-action="speak">▷ 试听语音</button>':'')+'</div><p class="control-help">切换条件后重播本页，可随时暂停比较。</p>';
  if(sid()===4)html=chip('任务理解错误','metric','understanding',state.metric==='understanding')+chip('目标识别错误','metric','recognition',state.metric==='recognition');
  if(sid()===6)html=chip('仅确认收到','plan','false',!state.plan)+chip('披露执行计划','plan','true',state.plan);
  if(sid()===7)html='<div class="control-row">'+['none','stage','suppressed','triggered'].map((v,i)=>chip(['不主动反馈','按阶段反馈','朝向时抑制','转向时触发'][i],'strategy',v,state.strategy===v)).join('')+'</div><p class="control-help">'+strategyDescription()+'</p><div class="task-indicators"><span id="gazeStatus"></span><span id="reportStatus"></span></div>';
  if(sid()===8)html=Object.entries(homeResponses).map(([key,d])=>chip(d.label,'context',key,state.context===key)).join('');
  if(sid()===17)html=chip('主动反馈 vs. 不主动','homeCompare','none',state.homeCompare==='none')+chip('按阶段 vs. 转向触发','homeCompare','triggered',state.homeCompare==='triggered');
  if(sid()===18)html=homeScenarios.map(d=>chip(d.label,'homeScenario',d.key,state.homeScenario===d.key)).join('');
  if(sid()===10)html='<button class="primary-button" data-action="restart">回到开场 <span>↻</span></button><button class="text-button" data-action="sources">查看研究与局限 ↗</button>';

  if(sid()===15)html=chip('复杂指令','armContext','complex',state.armContext==='complex')+chip('相似目标','armContext','similar',state.armContext==='similar')+chip('个人设置','armContext','settings',state.armContext==='settings');
  if(researchDetails[sid()])html+='<button class="secondary-button data-button" data-action="data">查看数据与统计 ↗</button>';
  $('sceneControls').innerHTML=html;
  const topics=[16,17,18].includes(sid())?homeResearchTopics:researchTopics;
  $('researchNav').setAttribute('aria-label',[16,17,18].includes(sid())?'家庭机器人研究结果':'机械臂研究结果');
  $('researchNav').hidden=!topics.some(d=>d.id===sid());
  $('researchNav').innerHTML=topics.map((d,i)=>'<button data-result="'+d.id+'" aria-current="'+(d.id===sid()?'step':'false')+'"><span>0'+(i+1)+'</span> '+d.label+'</button>').join('');
  renderPreferenceGrid();

  const descriptions={0:'人和机器人之间以信息连接。',1:'人是拼装者与协作者：按任务板拼装、语音请求积木、检查并取消错误操作；机械臂负责从远端取料并送到人的工作区。连续演示请求、抓取、递送与人的拼装。',2:state.error==='understanding'?'红色圆柱请求被理解成蓝色圆柱。':'任务理解为红色圆柱，但目标识别选中蓝色对象。',3:'反馈模式：'+({none:'无反馈',text:'文本',speech:'语音'}[state.mode])+'；视觉反馈'+(state.vision?'开启，标出红色圆柱。':'关闭。'),4:state.metric==='understanding'?'任务理解错误，成功取消事件的响应时间：无反馈6.66秒，文本6.88秒，语音4.41秒。':'目标识别错误，成功取消事件的响应时间：视觉关闭7.27秒，开启6.61秒。',5:'语音条件下干预响应更快，同时总体每完成任务耗时从20.80增至23.15秒。',6:'人是家务委托者：提出目标，随后观看纪录片或校对文字，间歇关注机器人。机器人是执行者，负责家务。'+(state.plan?'示意计划：先收好书本，再整理桌面，最后归置衣物。':'机器人仅确认收到，未展示执行计划。'),7:'当前任务：'+stageNames[state.stage]+'。用户'+(state.facing?'看向机器人。':'正在阅读。'),8:homeResponses[state.context].scene+'：最常见回应为'+homeResponses[state.context].response+'，'+homeResponses[state.context].n+'/32人。',9:'恰当的沟通需要协调内容、时机与用户控制。',10:'自主机器人与人的理解保持连接，支持理解、检查和介入。'};
  canvas.setAttribute('role','img');canvas.tabIndex=sid()===7?0:-1;canvas.classList.toggle('gaze-interactive',sid()===7);if(sid()===7)updateTaskUI();canvas.setAttribute('aria-label',descriptions[sid()] || researchAccessibility());
}
function strategyDescription(){return {none:'全过程不主动播报进度。',stage:'每进入一个新的任务阶段，播报当前进度。',suppressed:'阶段变化且未看向机器人时播报；一看向它，立即停止当前语音。',triggered:'每次从移开转为看向机器人，立即播报当前进度；无需等待，可重复触发。'}[state.strategy];}
function renderScene(){
  const s=scenes[index];$('chapterLabel').textContent=s.chapter;$('sceneNumber').textContent=String(index+1).padStart(2,'0');$('sceneTotal').textContent=scenes.length;$('eyebrow').textContent=s.tag;$('headline').innerHTML=s.title;$('description').textContent=s.description;
  document.documentElement.style.setProperty('--accent',[5,6,7,8,15,16,17,18].includes(sid())?colors.orange:colors.mint);
  $('copyPanel').classList.remove('enter');void $('copyPanel').offsetWidth;$('copyPanel').classList.add('enter');
  $('visualText').innerHTML='';if(sid()===7)resetTask();
  const group=[...chapterStarts].reverse().find(start=>start<=index);document.querySelectorAll('[data-go]').forEach(b=>{b.classList.toggle('active',Number(b.dataset.go)===group);if(Number(b.dataset.go)===group)b.setAttribute('aria-current','step');else b.removeAttribute('aria-current');});
  renderRoles();renderControls();updateMessage();
}
function renderRoles(){
  const roles={
    1:[['人 · 协作者','拼装与提交成品；请求材料、检查并取消错误'],['机械臂 · 助手','理解请求，取放积木，送到人的工作区']],
    6:[['人 · 委托者','提出家务目标；继续自己的活动，间歇关注进展'],['机器人 · 执行者','自主完成多阶段家务，按反馈策略报告进度']]
  }[sid()];
  $('roleSummary').hidden=!roles;
  $('roleSummary').innerHTML=roles?roles.map(([label,detail],i)=>`<div class="role-row role-${i}"><dt>${label}</dt><dd>${detail}</dd></div>`).join(''):'';
}
function updateMessage(){
  let message='',warning=false;
  if(sid()===2){message=state.error==='understanding'?'你说「红色圆柱」 → 任务却被理解为「蓝色圆柱」':'任务理解为「红色圆柱」 → 视觉却选中了蓝色对象';warning=true;}
  if(sid()===3)message=state.mode==='none'?'任务理解信息未显示':state.mode==='text'?'文本反馈：将红色圆柱移到你的工作区。':'';
  if(sid()===6)message=state.plan?'“我会先收好书本，再整理桌面，最后归置衣物。”':'“好的，收到。”';
  if(sid()===7)message=state.feedback;
  $('visualText').innerHTML=message?`<div class="floating-message${warning?' warning':''}">${message}</div>`:'';
}
function updateGaze(){
  if(sid()!==7)return;
  gazeAngle=Math.atan2(gazePoint.y-readerHead.y,gazePoint.x-readerHead.x);
  const pose=taskRobotPose(),dx=pose.x-readerHead.x,dy=pose.y-10-readerHead.y;
  const along=dx*Math.cos(gazeAngle)+dy*Math.sin(gazeAngle);
  const across=Math.abs(dx*Math.sin(gazeAngle)-dy*Math.cos(gazeAngle));
  const facing=along>0&&across<(state.facing?35:28);
  if(facing!==state.facing){state.facing=facing;deliverReports(taskRun.look(facing));updateTaskUI();}
}
function pointGaze(e){
  if(sid()!==7)return;
  const r=canvas.getBoundingClientRect(),scale=Math.min(r.width/700,r.height/540);
  gazePoint={x:(e.clientX-r.left-(r.width-700*scale)/2)/scale,y:(e.clientY-r.top-(r.height-540*scale)/2)/scale};
  updateGaze();
}
canvas.addEventListener('pointermove',pointGaze);
canvas.addEventListener('pointerdown',e=>{if(sid()!==7)return;canvas.focus({preventScroll:true});if(e.pointerType!=='mouse')canvas.setPointerCapture(e.pointerId);pointGaze(e);});
canvas.addEventListener('pointerleave',()=>{if(sid()===7){gazePoint={x:462,y:319};updateGaze();}});
canvas.addEventListener('keydown',e=>{
  if(sid()!==7||!['ArrowLeft','ArrowRight','ArrowUp','ArrowDown'].includes(e.key))return;
  e.preventDefault();e.stopPropagation();gazeAngle+=(['ArrowLeft','ArrowUp'].includes(e.key)?-1:1)*Math.PI/18;
  gazePoint={x:readerHead.x+250*Math.cos(gazeAngle),y:readerHead.y+250*Math.sin(gazeAngle)};updateGaze();
});
$('sceneControls').addEventListener('click',e=>{
 const b=e.target.closest('button');if(!b)return;
 if(b.dataset.key){
   const {key,value}=b.dataset;
   if(key==='strategy'){state.strategy=value;restartCondition();return;}
   play(false);stopVoice();state[key]=value==='toggle'?!state[key]:value==='true'?true:value==='false'?false:value;
   time=starts[index];feedbackVoiceStarted=false;renderControls();updateMessage();play(true);return;
 }
 switch(b.dataset.action){case 'enter':go(1);break;case 'explore':go(3);break;case 'restart':go(0);break;case 'sources':openSources();break;case 'data':openData();break;case 'speak':speakFeedback(b);break;}
});
function speakFeedback(){feedbackVoiceStarted=true;speakClip('grab');}
$('playBtn').onclick=()=>play(!playing);$('prevBtn').onclick=()=>go(index-1);$('nextBtn').onclick=()=>go(index+1);
document.querySelectorAll('[data-go]').forEach(b=>b.onclick=()=>{play(false);go(Number(b.dataset.go));});document.querySelector('.brand').onclick=e=>{e.preventDefault();play(false);go(0);};
function openSources(){play(false);stopVoice();$('sceneResearchNotes').replaceChildren(...scenes.map((scene,i)=>{const note=document.createElement('p');note.textContent=String(i+1).padStart(2,'0')+' · '+scene.title.replace(/<[^>]*>/g,'')+'：'+scene.note;return note;}));$('sourcesDialog').showModal();}$('sourcesBtn').onclick=openSources;$('closeSources').onclick=()=>$('sourcesDialog').close();$('sourcesDialog').addEventListener('click',e=>{if(e.target===$('sourcesDialog')){const r=e.target.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)e.target.close();}});
document.addEventListener('keydown',e=>{if($('sourcesDialog').open||$('dataDialog').open||/INPUT|BUTTON|SELECT|TEXTAREA/.test(e.target.tagName))return;if(e.code==='Space'&&sceneHasTaskControls()){e.preventDefault();play(!playing);}if(e.key==='ArrowRight'){e.preventDefault();go(index+1);}if(e.key==='ArrowLeft'){e.preventDefault();go(index-1);}});
$('fullBtn').onclick=async()=>{try{if(document.fullscreenElement)await document.exitFullscreen();else await document.documentElement.requestFullscreen();}catch{$('fullBtn').title='当前浏览器不支持全屏';}};
document.addEventListener('fullscreenchange',()=>{$('fullBtn').setAttribute('aria-label',document.fullscreenElement?'退出全屏':'进入全屏');});
function resumeAmbientAnimation(){if(!sceneHasTaskControls()&&sceneHasAnimation()&&!document.hidden&&!$('sourcesDialog').open&&!$('dataDialog').open)play(true);}
['sourcesDialog','dataDialog'].forEach(id=>$(id).addEventListener('close',resumeAmbientAnimation));
document.addEventListener('visibilitychange',()=>{if(document.hidden){play(false);stopVoice();}else resumeAmbientAnimation();});
function tone(freq,start,length,gain,type='sine'){const o=audioCtx.createOscillator(),g=audioCtx.createGain();o.type=type;o.frequency.value=freq;g.gain.setValueAtTime(0,start);g.gain.linearRampToValueAtTime(gain,start+.06);g.gain.exponentialRampToValueAtTime(.0001,start+length);o.connect(g);g.connect(audioGain);o.start(start);o.stop(start+length+.05);}
let beat=0;function musicStep(){if(!audioCtx||!state.music)return;const now=audioCtx.currentTime,notes=[130.81,164.81,196,246.94,146.83,174.61,220,261.63];tone(notes[beat%8],now,.8,.1);if(beat%4===0)tone(65.4,now,1.7,.18);if(beat%2===0)tone(notes[(beat+2)%8]*2,now,.28,.025,'triangle');beat++;}
function syncAudio(){clearInterval(audioTimer);if(audioGain)audioGain.gain.setTargetAtTime(state.music?.22:0,audioCtx.currentTime,.1);if(state.music){audioCtx.resume().catch(()=>{});musicStep();audioTimer=setInterval(musicStep,430);}}
$('soundBtn').onclick=()=>{try{if(!audioCtx){audioCtx=new (window.AudioContext||window.webkitAudioContext)();audioGain=audioCtx.createGain();audioGain.connect(audioCtx.destination);}state.music=!state.music;$('soundBtn').setAttribute('aria-pressed',state.music);$('soundBtn').querySelector('span').textContent=state.music?'音乐开':'音乐关';syncAudio();}catch{$('soundBtn').title='当前浏览器不支持音频';}};
// All scenes use deterministic vector drawing. No external media or tracking.
function resize(){const r=canvas.getBoundingClientRect();cw=r.width;ch=r.height;dpr=Math.min(window.devicePixelRatio||1,2);canvas.width=Math.round(cw*dpr);canvas.height=Math.round(ch*dpr);}
new ResizeObserver(resize).observe(canvas);
function line(x1,y1,x2,y2,color=colors.line,width=1,dash=[]){ctx.beginPath();ctx.strokeStyle=color;ctx.lineWidth=width;ctx.setLineDash(dash);ctx.moveTo(x1,y1);ctx.lineTo(x2,y2);ctx.stroke();ctx.setLineDash([]);}
function poly(points,fill,stroke,width=1){ctx.beginPath();points.forEach(([x,y],i)=>i?ctx.lineTo(x,y):ctx.moveTo(x,y));ctx.closePath();if(fill){ctx.fillStyle=fill;ctx.fill();}if(stroke){ctx.strokeStyle=stroke;ctx.lineWidth=width;ctx.stroke();}}
function circle(x,y,r,fill,stroke,width=1){ctx.beginPath();ctx.arc(x,y,r,0,Math.PI*2);if(fill){ctx.fillStyle=fill;ctx.fill();}if(stroke){ctx.strokeStyle=stroke;ctx.lineWidth=width;ctx.stroke();}}
function ellipse(x,y,rx,ry,fill,stroke){ctx.beginPath();ctx.ellipse(x,y,rx,ry,0,0,Math.PI*2);if(fill){ctx.fillStyle=fill;ctx.fill();}if(stroke){ctx.strokeStyle=stroke;ctx.lineWidth=1;ctx.stroke();}}
function rect(x,y,w,h,fill,stroke,r=5){ctx.beginPath();ctx.roundRect(x,y,w,h,r);if(fill){ctx.fillStyle=fill;ctx.fill();}if(stroke){ctx.strokeStyle=stroke;ctx.lineWidth=1;ctx.stroke();}}
function text(str,x,y,size=12,color=colors.muted,align='left',weight=400){ctx.fillStyle=color;ctx.font=`${weight} ${size}px "Noto Sans SC","PingFang SC",sans-serif`;ctx.textAlign=align;ctx.textBaseline='middle';ctx.fillText(str,x,y);}
function mono(str,x,y,size=10,color=colors.muted,align='left'){ctx.fillStyle=color;ctx.font=`${size}px monospace`;ctx.textAlign=align;ctx.textBaseline='middle';ctx.fillText(str,x,y);}
function glowDot(x,y,color=colors.mint,r=3){ctx.save();ctx.shadowBlur=18;ctx.shadowColor=color;circle(x,y,r,color);ctx.restore();}
function arrow(x1,y1,x2,y2,color=colors.mint){line(x1,y1,x2,y2,color);const a=Math.atan2(y2-y1,x2-x1);line(x2,y2,x2-7*Math.cos(a-.5),y2-7*Math.sin(a-.5),color);line(x2,y2,x2-7*Math.cos(a+.5),y2-7*Math.sin(a+.5),color);}
function grid(){ctx.save();ctx.globalAlpha=.45;for(let x=20;x<700;x+=35)for(let y=45;y<500;y+=35)circle(x,y,.7,'#39545c');ctx.restore();}
function floor(x=350,y=355,scale=1){ctx.save();ctx.translate(x,y);ctx.scale(scale,scale);poly([[-250,0],[0,-115],[260,0],[5,120]],'#13232a66','#2a444a');for(let i=1;i<6;i++){const f=i/6;line(-250+250*f,-115*f,5+255*f,120-120*f,'#20383d');line(-250+255*f,120*f,260*f,-115+115*f,'#20383d');}ctx.restore();}
function cube(x,y,size,color=colors.red,height=size){const w=size,h=height;poly([[x,y-h],[x+w,y-h-w*.48],[x+2*w,y-h],[x+w,y-h+w*.48]],color,colors.bg);poly([[x,y-h],[x+w,y-h+w*.48],[x+w,y+w*.48],[x,y]],color,colors.bg);ctx.save();ctx.globalAlpha=.42;poly([[x+w,y-h+w*.48],[x+2*w,y-h],[x+2*w,y],[x+w,y+w*.48]],color,colors.bg);ctx.restore();}
function cylinder(x,y,r,h,color=colors.red){ctx.fillStyle=color;ctx.fillRect(x-r,y-h,r*2,h);ellipse(x,y,r,r*.38,color);ellipse(x,y-h,r,r*.38,color,'#edf1ef55');ctx.save();ctx.globalAlpha=.2;ctx.fillStyle='#071315';ctx.fillRect(x,y-h,r,h);ctx.restore();}
function arm(x,y,s=1,reach=0,t=0){ctx.save();ctx.translate(x,y);ctx.scale(s,s);ellipse(0,16,52,20,'#071418','#355953');rect(-29,-16,58,32,'#1a3537','#78988f',4);ellipse(0,-16,29,10,'#3c5c56','#96b8a8');const pts=[[0,-23],[-25+reach*10,-112],[-110+reach*75,-165],[ -146+reach*100,-98+Math.sin(t*.7)*6]];for(let i=0;i<3;i++){const a=pts[i],b=pts[i+1];ctx.lineCap='round';line(...a,...b,'#88a89d',23-i*4);line(...a,...b,'#1c3638',18-i*4);line(a[0]-2,a[1]-2,b[0]-2,b[1]-2,'#557970',2);}pts.slice(0,3).forEach(([px,py],i)=>{circle(px,py,14-i*2,'#173234','#9be8cbaa',2);circle(px,py,5-i,'#9be8cb');});const tip=pts[3];circle(tip[0],tip[1],6,'#9be8cb');line(tip[0]-10,tip[1]+4,tip[0]-10,tip[1]+23,colors.white,3);line(tip[0]+10,tip[1]+4,tip[0]+10,tip[1]+23,colors.white,3);line(tip[0]-10,tip[1]+23,tip[0]-4,tip[1]+28,colors.white,3);line(tip[0]+10,tip[1]+23,tip[0]+4,tip[1]+28,colors.white,3);ctx.restore();}
function robot(x,y,s=1,t=0){ctx.save();ctx.translate(x,y);ctx.scale(s,s);ellipse(0,79,42,12,'#0b161c','#3b555a');rect(-31,39,62,33,'#223a3d','#7b9d96',9);circle(-22,73,8,'#13242a','#72988e');circle(22,73,8,'#13242a','#72988e');poly([[-26,36],[-21,-15],[21,-15],[26,36]],'#1c3338','#749a92');rect(-32,-66,64,43,'#213c40','#a3c9ba',12);rect(-25,-59,50,25,'#08191f','#355b61',6);circle(-12,-46,3.5,colors.mint);circle(12,-46,3.5,colors.mint);line(0,-67,0,-78,colors.mint,2);glowDot(0,-81,colors.mint,3);line(-29,-3,-47,17+Math.sin(t)*4,'#749a92',7);line(29,-3,47,8+Math.sin(t)*4,'#749a92',7);circle(0,6,8,'#2a4b4b','#6e9b8d');ctx.restore();}
function human(x,y,s=1,facing=false){ctx.save();ctx.translate(x,y);ctx.scale(s,s);circle(0,-45,18,'#2a3035',colors.orange,1.4);poly([[-20,-18],[15,-18],[27,36],[-26,36]],'#292b2d','#8a7c67');line(-10,36,-25,72,colors.orange,5);line(16,36,35,72,colors.orange,5);line(-16,-5,-37,17,colors.orange,4);line(13,-4,35,14,colors.orange,4);const dir=facing?1:-1;circle(8*dir,-47,2,colors.orange);line(18*dir,-45,23*dir,-42,colors.orange);if(!facing){poly([[-48,8],[-23,17],[-20,36],[-45,26]],'#385158','#9bafa8');poly([[-23,17],[2,8],[5,27],[-20,36]],'#243f48','#9bafa8');}ctx.restore();}
function ring(x,y,r,t,color=colors.mint){circle(x,y,r,null,color+'35');ctx.save();ctx.translate(x,y);ctx.rotate(t*.12);ctx.beginPath();ctx.strokeStyle=color+'88';ctx.lineWidth=1;ctx.arc(0,0,r,-.3,.5);ctx.stroke();glowDot(Math.cos(.5)*r,Math.sin(.5)*r,color,2.5);ctx.restore();}
function labelPill(str,x,y,color=colors.mint){const w=str.length*12+24;rect(x-w/2,y-14,w,28,'#102027',color+'66',3);text(str,x,y,11,color,'center');}
function brackets(x,y,w,h,color=colors.mint){const a=12;[[x,y,1,1],[x+w,y,-1,1],[x,y+h,1,-1],[x+w,y+h,-1,-1]].forEach(([px,py,dx,dy])=>{line(px,py,px+dx*a,py,color,2);line(px,py,px,py+dy*a,color,2);});}
function wave(x,y,width,t,color=colors.mint){ctx.beginPath();for(let i=0;i<=width;i++){const amp=Math.sin(i/width*Math.PI)*12;const yy=y+Math.sin(i*.19-t*4)*amp;i?ctx.lineTo(x+i,yy):ctx.moveTo(x+i,yy);}ctx.strokeStyle=color;ctx.lineWidth=1.5;ctx.stroke();}
function intro(t,final=false){
 floor(350,380,.95);ring(353,256,157,t);ring(353,256,197,-t*.65,colors.orange);robot(450,275,1.2,t);human(230,295,1.03,true);
 const a=(t*.17)%1;ctx.save();ctx.setLineDash([4,7]);line(270,247,402,247,'#628c8177',1,[4,7]);ctx.restore();glowDot(275+a*121,247,colors.mint,4);
 labelPill(final?'保持理解':'自主行动',458,147);labelPill(final?'保留控制':'人的判断',218,170,colors.orange);
 if(final){text('理解  /  检查  /  介入',350,90,17,colors.white,'center',500);}else{mono('?',350,246,36,colors.white,'center');text('它会怎么做？',350,86,16,colors.white,'center');}
}
function assemblingHuman(x,y,showRight=true){
 ctx.save();ctx.translate(x,y);
 circle(0,-62,21,'#2a3035',colors.orange,1.6);circle(8,-65,2,colors.orange);
 poly([[-22,-33],[19,-33],[28,28],[-28,28]],'#292b2d','#8a7c67');
 line(-11,28,-23,82,colors.orange,5);line(14,28,32,82,colors.orange,5);
 line(-20,-22,-39,15,colors.orange,5);line(-39,15,2,30,colors.orange,4);
 if(showRight){line(18,-22,39,8,colors.orange,5);line(39,8,56,29,colors.orange,4);}
 ctx.restore();
}
function pipeline(t){
 const ease=(start,end)=>{const p=Math.max(0,Math.min(1,(t-start)/(end-start)));return p*p*(3-2*p);};
 const mix=(a,b,p)=>a+(b-a)*p;
 const lift=ease(6,8),travel=ease(8,11),lower=ease(11,12),assemble=ease(12.5,15),retract=ease(12.5,15.5);
 const blockX=mix(mix(450,270,travel),210,assemble);
 const blockY=mix(294-76*lift+48*lower,239,assemble);
 const baseX=mix(mix(552,400,travel),552,retract);
 let tipX=450,tipY=mix(183,242,ease(4,6));
 if(t>=6){tipX=mix(blockX,450,retract);tipY=mix(blockY-52,183,retract);}
 labelPill('人 · 拼装与检查',173,66,colors.orange);labelPill('机械臂 · 取料助手',506,66);
 floor(350,304,.84);assemblingHuman(180,222,t<12.5);
 poly([[104,257],[237,222],[309,260],[176,301]],'#263b39','#657b6c');
 line(119,265,119,318,'#657b6c',3);line(290,268,290,318,'#657b6c',3);
 cube(191,259,18,colors.blue);
 rect(68,127,83,62,'#12272d','#627b6e');text('任务板',109,141,10,colors.muted,'center');
 cube(91,174,11,colors.blue);cylinder(103,163,7,16,colors.red);
 rect(262,284,24,13,'#553b30',colors.orange,3);text('取消',288,312,11,colors.orange,'center');
 cube(525,310,22,colors.blue);
 // A sliding base and articulated links continuously follow the held object.
 line(400,287,552,287,'#36524d',5);
 ellipse(baseX,278,43,16,'#071418','#355953');rect(baseX-24,249,48,28,'#1a3537','#78988f',4);
 const root={x:baseX,y:247},dx=tipX-baseX,dy=tipY-247;
 const elbow={x:(baseX+tipX)/2-dy*.55,y:(247+tipY)/2+dx*.55-35};
 [[root,elbow],[elbow,{x:tipX,y:tipY}]].forEach(([a,b])=>{
   line(a.x,a.y,b.x,b.y,'#88a89d',16);line(a.x,a.y,b.x,b.y,'#1c3638',11);
 });
 [root,elbow].forEach(v=>{circle(v.x,v.y,9,'#173234','#9be8cbaa',2);circle(v.x,v.y,4,colors.mint);});
 if(t>=2&&t<6)brackets(426,247,48,53,colors.mint);
 cylinder(blockX,blockY,mix(14,12,assemble),mix(30,27,assemble),colors.red);
 circle(tipX,tipY,5,colors.mint);
 const grip=t>=6&&t<12.5?11:17;
 [-1,1].forEach(sign=>{line(tipX+sign*grip,tipY+4,tipX+sign*grip,tipY+23,colors.white,2);line(tipX+sign*grip,tipY+23,tipX+sign*7,tipY+27,colors.white,2);});
 if(t>=12.5){
   const handX=mix(blockX+13,236,ease(15,16)),handY=mix(blockY-10,251,ease(15,16));
   line(198,200,222,225,colors.orange,5);line(222,225,handX,handY,colors.orange,4);circle(handX,handY,3,colors.orange);
 }
 arrow(430,345,273,345,colors.mint);text('送到人的工作区',352,365,12,colors.mint,'center');
 const captions=t<2?'人：“把红色圆柱递给我。”':t<4?'机器人理解请求，定位红色圆柱':t<8?'抓取并抬起积木':t<12.5?'送到人的工作区':t<15?'人接过积木，完成拼装':'拼装完成 · 机器人回到取料位置';
 rect(100,5,500,36,'#11252a','#2e4a4b');text(captions,350,23,14,colors.white,'center');
 const steps=['听见请求','理解任务','选择目标','执行动作'],active=t<1?0:t<2?1:t<4?2:3;
 text('机器人的处理过程',72,405,11,colors.muted);
 steps.forEach((title,i)=>{const x=133+i*146;rect(x-61,427,122,39,i===active?'#244c42':'#12272d',i===active?colors.mint:'#34564f',4);text(title,x,447,13,i===active?colors.mint:colors.white,'center');if(i<3)arrow(x+65,447,x+79,447,colors.mint);});
}
function mismatch(t){
 floor(355,365,1);cylinder(210,369,27,65,colors.red);cylinder(372,390,27,65,colors.blue);cube(464,368,23,colors.orange);arm(494,321,1,.5,t);
 brackets(331,312,82,93,colors.orange);line(373,312,373,240,colors.orange,1,[3,4]);labelPill('选中的目标',374,224,colors.orange);
 rect(90,105,232,66,'#14272b','#49605c');text('任务理解',108,122,10,colors.muted);text(state.error==='understanding'?'抓取蓝色圆柱':'抓取红色圆柱',108,150,16,state.error==='understanding'?colors.orange:colors.mint);
 rect(360,105,232,66,'#25271f','#6f603d');text('视觉选择',378,122,10,colors.muted);text('蓝色对象',378,150,16,colors.orange);arrow(328,138,354,138,colors.muted);
 text('请求目标',210,446,11,colors.red,'center');text('选中目标',374,465,11,colors.blue,'center');
}
function transparent(t){
 floor(340,365,.95);cylinder(211,374,28,62,colors.red);cube(313,402,25,colors.blue);cylinder(444,377,24,51,colors.orange);arm(466,318,1.05,.1,t);
 if(state.vision){const g=ctx.createRadialGradient(211,339,8,211,339,95);g.addColorStop(0,'#9be8cb38');g.addColorStop(1,'#9be8cb00');circle(211,339,95,g);brackets(170,292,82,101);line(211,292,211,226,colors.mint,1,[3,4]);labelPill('已选择：红色圆柱',212,209);}
 else{labelPill('目标选择信息未显示',222,211,colors.muted);}
 if(state.mode==='text'){rect(350,102,290,70,'#11262a','#42675f');text('当前任务',368,121,10,colors.muted);text('抓取红色圆柱 → 工作区',368,149,15,colors.mint);}
 if(state.mode==='speech'){wave(385,141,200,t);text('语音反馈',486,183,11,colors.mint,'center');}
 if(state.mode==='none'){line(382,143,598,143,colors.line,1,[5,6]);text('无任务理解反馈',490,177,11,colors.muted,'center');}
}
function bars(t){
 const visual=state.metric==='recognition';const values=visual?[7.27,6.61]:[6.66,4.41],names=visual?['视觉反馈关闭','视觉反馈开启']:['无理解反馈','语音反馈'];
 text(visual?'目标识别错误':'任务理解错误',85,95,17,colors.white);text('成功取消事件 · 响应时间（秒）',85,125,12,colors.muted);
 const growth=1;
 values.forEach((v,i)=>{const y=197+i*83;const color=i===values.length-1?colors.mint:'#40565e';text(names[i],85,y-21,12,i===values.length-1?colors.mint:colors.muted);rect(85,y,495,24,'#15272d',null,2);rect(85,y,495*v/8*growth,24,color,null,2);mono(v.toFixed(2)+' s',Math.min(625,99+495*v/8*growth),y+12,16,i===values.length-1?colors.mint:colors.white);});
 const by=395;line(85,by,580,by,colors.line);[0,2,4,6,8].forEach(v=>{const x=85+495*v/8;line(x,by-4,x,by+4,colors.line);mono(v.toString(),x,by+18,10,colors.muted,'center');});
 text(visual?'7.27 → 6.61 秒':'6.66 → 4.41 秒',85,453,visual?26:22,colors.mint);text(visual?'视觉反馈主效应 p = .046':'语音 vs. 无反馈：Tukey p < .001',85,484,11,colors.muted);
}
function costs(t){
 text('总体每完成任务耗时',85,94,19,colors.white);
 text('回合总时长 ÷ 完成数量',85,124,12,colors.muted);
 const vals=[20.80,23.15],names=['无任务理解反馈','语音反馈'];
 vals.forEach((v,i)=>{const y=200+i*100; text(names[i],85,y-22,13,i?colors.orange:colors.muted);rect(85,y,495,29,'#15272d',null,2);rect(85,y,495*v/30,29,i?colors.orange:'#45616a',null,2);mono(v.toFixed(2)+' s',100+495*v/30,y+14,18,i?colors.orange:colors.white);});
 line(85,379,580,379,colors.line);[0,10,20,30].forEach(v=>{const x=85+495*v/30;line(x,375,x,383,colors.line);mono(String(v),x,399,11,colors.muted,'center');});
 text('20.80 → 23.15 秒',85,450,28,colors.orange);
 text('语音 vs. 无理解反馈：Tukey p = .024',85,483,12,colors.muted);
}

function room(t,withHuman=true,humanFacing=state.facing,task=false){
 floor(350,374,1);poly([[101,260],[350,149],[601,260],[350,377]],'#14262a55','#38514f');line(101,260,101,158,'#38514f');line(350,149,350,76,'#38514f');line(601,260,601,158,'#38514f');line(101,158,350,47,'#38514f');line(350,47,601,158,'#38514f');
 rect(130,193,90,79,'#243431','#6d8170',3);line(130,218,220,218,'#70816f');line(130,243,220,243,'#70816f');for(let i=0;i<7;i++){rect(138+i*10,200,7,16,i%2?colors.orange:'#637b71',null,1);rect(138+i*10,223,7,16,i%2?'#637b71':colors.blue,null,1);}
 // Sofa and coffee table are drawn as spatial shapes rather than stock imagery.
 poly([[427,314],[507,278],[567,307],[487,346]],'#323c39','#6b7b6b');poly([[427,314],[427,346],[487,378],[487,346]],'#293633','#6b7b6b');poly([[487,346],[567,307],[567,340],[487,378]],'#202f2d','#6b7b6b');poly([[427,314],[427,284],[490,316],[487,346]],'#414b40','#6b7b6b');
 poly([[288,367],[360,336],[410,360],[338,395]],'#3d4035','#8c896b');line(302,376,302,407,'#8c896b',3);line(394,369,394,401,'#8c896b',3);if(!task||taskRun.elapsed<4)cube(330,363,13,colors.orange,5);cylinder(375,357,8,17,colors.mint);
 if(task){
   const pose=taskRobotPose();robot(pose.x,pose.y,.72,t);
   if(taskRun.stage===0&&taskRun.elapsed>2&&taskRun.elapsed<6)cube(pose.x-7,pose.y+12,12,colors.orange,5);
   if(taskRun.stage===1){line(pose.x-23,pose.y+14,pose.x-47+Math.sin(t*3)*9,pose.y+30,colors.mint,3);}
   if(taskRun.elapsed<19)cube(437,333,17,colors.blue,7);
   if(taskRun.stage===2&&taskRun.elapsed>=19&&taskRun.elapsed<23)cube(pose.x-9,pose.y+12,14,colors.blue,7);
   rect(482,193,56,31,'#263f3c','#6b8f80',3);text('收纳',510,209,10,colors.muted,'center');
   if(taskRun.elapsed>=23)rect(492,186,32,8,colors.blue,null,1);
 }else robot(281,257,.72,t);
 if(withHuman){if(task)gazeHuman();else human(494,301,.72,humanFacing);}
 // Small house plant.
 cylinder(568,266,14,28,'#435a4c');line(568,242,568,185,'#7da78b',2);ellipse(555,216,14,5,'#406a55');ellipse(581,205,14,5,'#58876a');ellipse(555,193,12,5,'#406a55');
}
function planScene(t){
 room(t,true,false);labelPill('机器人 · 执行家务',210,111);labelPill('人 · 委托后继续活动',506,111,colors.orange);line(210,127,258,202,colors.mint,1,[3,5]);line(506,127,506,247,colors.orange,1,[3,5]);text('示意：校对文字',506,397,12,colors.orange,'center');if(state.plan){const steps=['收好书本','整理桌面','归置衣物'];steps.forEach((v,i)=>{const x=130+i*210;circle(x,432,13,'#152a2c',colors.orange);mono(String(i+1),x,432,10,colors.orange,'center');text(v,x+22,432,12,colors.white);if(i<2)arrow(x+114,432,x+185,432,colors.line);});}else{line(130,432,570,432,colors.line,1,[5,8]);text('执行步骤尚未披露',350,465,12,colors.muted,'center');}
}
function taskRobotPose(){
 const seconds=taskRun.elapsed,p=(seconds%8)/8;
 const mix=(a,b,v)=>({x:a.x+(b.x-a.x)*v,y:a.y+(b.y-a.y)*v});
 if(seconds<8){const a={x:281,y:257},b={x:335,y:307},c={x:203,y:248};return p<.3?mix(a,b,p/.3):p<.75?mix(b,c,(p-.3)/.45):c;}
 if(seconds<16){const a={x:203,y:248},b={x:321,y:302};return p<.3?mix(a,b,p/.3):{x:321+Math.sin((p-.3)*Math.PI*5)*12,y:302};}
 if(seconds<24){const a={x:321,y:302},b={x:423,y:284},c={x:497,y:245};return p<.35?mix(a,b,p/.35):p<.85?mix(b,c,(p-.35)/.5):c;}
 return {x:497,y:245};
}
function gazeHuman(){
 // Keep the reading posture while turning the head and showing the gaze direction.
 human(494,301,.72,false);
 circle(readerHead.x,readerHead.y,13,'#2a3035',colors.orange,1.2);
 circle(readerHead.x+7*Math.cos(gazeAngle),readerHead.y+7*Math.sin(gazeAngle),1.8,colors.orange);
 line(readerHead.x+13*Math.cos(gazeAngle),readerHead.y+13*Math.sin(gazeAngle),readerHead.x+18*Math.cos(gazeAngle),readerHead.y+18*Math.sin(gazeAngle),colors.orange,1.4);
}
function feedbackScene(t){
 room(t,true,state.facing,true);
 const head=readerHead,len=state.facing?220:125,spread=.12;
 poly([[head.x,head.y],[head.x+len*Math.cos(gazeAngle-spread),head.y+len*Math.sin(gazeAngle-spread)],[head.x+len*Math.cos(gazeAngle+spread),head.y+len*Math.sin(gazeAngle+spread)]],state.facing?'#e6b47d25':'#e6b47d0d',null);
 line(head.x,head.y,head.x+len*Math.cos(gazeAngle),head.y+len*Math.sin(gazeAngle),colors.orange,1,[3,5]);
 if(state.facing){const pose=taskRobotPose();ellipse(pose.x,pose.y,37,60,null,colors.orange);}
 text(state.facing?'正在看向机器人':'视线已移开',506,410,12,colors.orange,'center');
 text('当前任务：'+stageNames[state.stage],145,94,13,colors.white);
 const progress=taskRun.elapsed/taskRun.duration;
 line(100,463,600,463,colors.line,2);line(100,463,100+500*progress,463,colors.mint,2);
 stageNames.forEach((v,i)=>{const x=100+i*500/3;circle(x,463,6,i<=state.stage?colors.mint:'#21393e');text(v,x,487,10,i===state.stage?colors.white:colors.muted,'center');});
}
function contextScene(t){
 const d=homeResponses[state.context];
 text(d.scene,350,100,18,colors.white,'center');
 text(d.response,350,170,36,colors.orange,'center',500);
 mono(d.n+' / 32',350,238,38,colors.white,'center');
 text('此情境下，最多人选择的回应',350,281,13,colors.muted,'center');
 for(let i=0;i<32;i++)circle(178+(i%8)*49,335+Math.floor(i/8)*31,8,i<d.n?colors.orange:'#24383f');
}
function principles(t){
 const data=[{x:350,y:100,n:'01',title:'内容',sub:'理解 · 目标 · 计划',c:colors.mint},{x:170,y:385,n:'02',title:'时机',sub:'阶段 · 关键 · 异常',c:colors.orange},{x:530,y:385,n:'03',title:'控制',sub:'频率 · 细节 · 可查看',c:colors.blue}];
 // Keep each caption outside both its node and the central communication ring.
 poly(data.map(v=>[v.x,v.y]),'#16313722','#385753');
 for(let i=0;i<3;i++){const a=data[i],b=data[(i+1)%3],p=(t*.15)%1;glowDot(a.x+(b.x-a.x)*p,a.y+(b.y-a.y)*p,colors.mint,2.5);}
 circle(350,270,67,colors.bg);ring(350,270,67,t);text('恰当的',350,257,16,colors.white,'center');text('沟通',350,286,23,colors.mint,'center',500);
 data.forEach(d=>{
   circle(d.x,d.y,46,'#10242a',d.c+'88');mono(d.n,d.x,d.y-17,10,d.c,'center');text(d.title,d.x,d.y+9,23,d.c,'center',500);
   rect(d.x-94,d.y+59,188,24,colors.bg);text(d.sub,d.x,d.y+71,13,colors.muted,'center');
 });
}
function draw(){
 ctx.setTransform(dpr,0,0,dpr,0,0);ctx.clearRect(0,0,cw,ch);const scale=Math.min(cw/700,ch/540);ctx.translate((cw-700*scale)/2,(ch-540*scale)/2);ctx.scale(scale,scale);grid();const t=reduceMotion?4:time-starts[index];
 switch(sid()){case 0:intro(t);break;case 1:pipeline(t);break;case 2:mismatch(t);break;case 3:transparent(t);break;case 4:bars(t);break;case 5:costs(t);break;case 6:planScene(t);break;case 7:feedbackScene(t);break;case 8:contextScene(t);break;case 9:principles(t);break;case 10:intro(t,true);break;case 12:awarenessChart(t);break;case 13:attentionChart(t);break;case 14:break;case 15:armContextChart(t);break;case 16:homePlanChart(t);break;case 17:homeFeedbackChart(t);break;case 18:homeScenarioChart(t);break;}
}
function frame(now){
 const delta=lastFrame?Math.min((now-lastFrame)/1000,.1):0;lastFrame=now;
 if(playing){
   if(sid()===7){
     const reports=taskRun.tick(delta);time=starts[index]+taskRun.elapsed;state.stage=taskRun.stage;
     deliverReports(reports);updateGaze();if(taskRun.finished)playing=false;
   }else if(sceneHasTaskControls()){time=Math.min(starts[index]+scenes[index].duration,time+delta);if(localTime()>=scenes[index].duration)playing=false;}else{time+=delta;}
   updatePlayer();
 }
 draw();frameHandle=requestAnimationFrame(frame);
}
initResearch();renderScene();play(sceneHasAnimation());resize();frameHandle=requestAnimationFrame(frame);
