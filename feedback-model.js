/* Timed, page-local demonstration. Times are illustrative, not experimental data. */
(function(scope){
  class FeedbackRun {
    constructor(strategy='stage'){this.reset(strategy);}
    reset(strategy=this.strategy){
      this.strategy=strategy;this.elapsed=0;this.stage=0;this.duration=24;
      this.running=false;this.started=false;this.facing=false;
      this.lastReportAt=-Infinity;this.reportedStages=new Set();this.count=0;
    }
    get finished(){return this.elapsed>=this.duration;}
    report(event){
      const allowed=this.strategy==='stage'&&event==='stage'
        ||this.strategy==='suppressed'&&event==='stage'&&!this.facing
        ||this.strategy==='triggered'&&event==='facing'&&this.facing;
      if(!allowed)return [];
      this.lastReportAt=this.elapsed;this.reportedStages.add(this.stage);this.count++;
      return [{type:'speak',stage:this.stage,at:this.elapsed,event}];
    }
    play(){
      if(this.finished){const facing=this.facing;this.reset();this.facing=facing;}
      this.running=true;
      if(!this.started){this.started=true;return this.report('stage');}
      return [];
    }
    pause(){this.running=false;}
    look(facing){
      const entered=facing&&!this.facing;this.facing=facing;
      // The interactive adaptation interrupts speech on the same gaze event.
      if(entered&&this.strategy==='suppressed')return [{type:'stop',stage:this.stage,at:this.elapsed,event:'facing'}];
      return this.running&&entered?this.report('facing'):[];
    }
    tick(delta){
      if(!this.running)return [];
      const next=Math.min(this.duration,this.elapsed+Math.max(0,delta));
      const reports=[];
      while(this.stage<3&&next>=(this.stage+1)*8){
        this.elapsed=(this.stage+1)*8;this.stage++;
        reports.push(...this.report('stage'));
      }
      this.elapsed=next;if(this.finished)this.running=false;
      return reports;
    }
    seek(seconds){
      const facing=this.facing;this.reset();this.facing=facing;
      this.elapsed=Math.max(0,Math.min(this.duration,seconds));
      this.stage=Math.min(3,Math.floor(this.elapsed/8));
    }
  }
  scope.FeedbackRun=FeedbackRun;
  if(typeof module!=='undefined')module.exports={FeedbackRun};
})(typeof globalThis!=='undefined'?globalThis:this);
