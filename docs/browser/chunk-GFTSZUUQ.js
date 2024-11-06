import{$ as tt,C as V,D as $,E as A,F as G,G as R,H as j,I as B,J as L,O as z,R as H,T as J,U as K,V as Q,W as U,X as W,Y as X,Z as Y,_ as Z,a as D,b as u,c as I,d as y,e as x,f as N,g as O,h as q,i as w,z as P}from"./chunk-G65XUD3Z.js";import{Cb as M,Nb as _,Ob as s,Pb as E,Sa as m,Ta as d,Vb as h,ga as S,hb as c,mb as l,oa as f,pa as g,sc as F,tc as b,ub as n,vb as r,vc as C,wb as k,zb as T}from"./chunk-RK7RCK4A.js";function rt(a,t){a&1&&(n(0,"mat-error"),s(1," Title is required "),r())}function ot(a,t){a&1&&(n(0,"mat-error"),s(1," Minimum 3 characters required "),r())}function at(a,t){a&1&&(n(0,"mat-error"),s(1," Date is required "),r())}function nt(a,t){if(a&1&&(n(0,"mat-option",12),s(1),r()),a&2){let o=t.$implicit;l("value",o),m(),E(o)}}function mt(a,t){a&1&&(n(0,"mat-error"),s(1," Start time is required "),r())}var et=class a{constructor(t,o,i,e){this.fb=t;this.taskService=o;this.dialogRef=i;this.data=e;this.taskForm=this.fb.group({title:[e.title,[u.required,u.minLength(3)]],date:[e.date?new Date(e.date):"",u.required],startTime:[this.formatStartTime(e.start_time),u.required]}),this.generateTimeOptions()}taskForm;timeOptions=[];formatStartTime(t){if(t.split(" ").length>1)return t;let[i,e]=t.split(":").map(Number),p=i>=12?"PM":"AM";return`${i%12||12}:${e<10?"0"+e:e} ${p}`}generateTimeOptions(){let t=[],o=(i,e)=>{let p=i>=12?"PM":"AM",v=i%12||12,it=e<10?`0${e}`:e;return`${v}:${it} ${p}`};for(let i=0;i<24;i++)for(let e=0;e<60;e+=15)t.push(o(i,e));this.timeOptions=t}onSubmit(){if(this.taskForm.valid){let t=this.taskForm.value,o={id:this.data.id,title:t.title,date:t.date.toISOString().split("T")[0],start_time:t.startTime};this.taskService.updateTask(o),console.log("Task updated:",o),this.dialogRef.close()}}onDelete(){let t=this.data.id;this.taskService.deleteTask(t),console.log("Task deleted:",t),this.dialogRef.close()}static \u0275fac=function(o){return new(o||a)(d(q),d(Y),d(Z),d(tt))};static \u0275cmp=S({type:a,selectors:[["app-edit"]],standalone:!0,features:[h],decls:26,vars:9,consts:[["datePicker",""],[1,"task-form-container"],[3,"ngSubmit","formGroup"],["appearance","outline"],["matInput","","formControlName","title","placeholder","Enter task title"],[4,"ngIf"],["matInput","","formControlName","date","placeholder","Choose a date",3,"matDatepicker"],["matSuffix","",3,"for"],["formControlName","startTime"],[3,"value",4,"ngFor","ngForOf"],["mat-raised-button","","color","primary","type","submit",3,"disabled"],["mat-raised-button","","color","warn","type","button",3,"click"],[3,"value"]],template:function(o,i){if(o&1){let e=T();n(0,"div",1)(1,"form",2),M("ngSubmit",function(){return f(e),g(i.onSubmit())}),n(2,"mat-form-field",3)(3,"mat-label"),s(4,"Task"),r(),k(5,"input",4),c(6,rt,2,0,"mat-error",5)(7,ot,2,0,"mat-error",5),r(),n(8,"mat-form-field",3)(9,"mat-label"),s(10,"Date"),r(),k(11,"input",6)(12,"mat-datepicker-toggle",7)(13,"mat-datepicker",null,0),c(15,at,2,0,"mat-error",5),r(),n(16,"mat-form-field",3)(17,"mat-label"),s(18,"Start Time"),r(),n(19,"mat-select",8),c(20,nt,2,2,"mat-option",9),r(),c(21,mt,2,0,"mat-error",5),r(),n(22,"button",10),s(23," Edit Task "),r(),n(24,"button",11),M("click",function(){return f(e),g(i.onDelete())}),s(25," Delete Task "),r()()()}if(o&2){let e=_(14);m(),l("formGroup",i.taskForm),m(5),l("ngIf",i.taskForm.controls.title.hasError("required")),m(),l("ngIf",i.taskForm.controls.title.hasError("minlength")),m(4),l("matDatepicker",e),m(),l("for",e),m(3),l("ngIf",i.taskForm.controls.date.hasError("required")),m(5),l("ngForOf",i.timeOptions),m(),l("ngIf",i.taskForm.controls.startTime.hasError("required")),m(),l("disabled",i.taskForm.invalid)}},dependencies:[L,B,R,$,A,G,U,J,K,Q,P,H,z,w,x,D,I,y,N,O,j,C,F,b,X,W,V],styles:[".task-form-container[_ngcontent-%COMP%]{z-index:1000;max-width:400px;margin:0 auto;padding:20px}mat-form-field[_ngcontent-%COMP%]{z-index:1000;width:100%;margin-bottom:16px}"]})};export{et as a};