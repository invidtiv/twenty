const {test} = require('node:test');
const assert = require('node:assert/strict');
const {buildSync} = require('esbuild');
const path = require('node:path');
const code = buildSync({entryPoints:[path.join(__dirname,'../src/domain/kairos-operations-service.ts')],bundle:true,platform:'node',format:'cjs',write:false,tsconfig:path.join(__dirname,'../tsconfig.json')}).outputFiles[0].text;
const mod = {exports:{}}; new Function('module','exports','require',code)(mod,mod.exports,require);
const {KairosOperationsService} = mod.exports;
function fixture({phoneChanged=false, extended=false}={}) {
 const now = new Date('2026-10-24T12:00:00Z');
 const watch = {id:'watch-old',bookingId:'booking-1',serviceEventId:'event-1',contactMethodId:'contact-1',normalizedPhone:'+351910000101',activatedAt:'2026-10-20T12:00:00Z',monitorUntil:extended?'2026-10-23T12:00:00Z':'2026-10-30T12:00:00Z',status:'ACTIVE',metadata:{autoArmed:true}};
 const event = {id:'event-1',bookingId:'booking-1',eventType:'CHECK_IN',startsAt:'2026-10-22T12:00:00Z',status:'COMPLETED',kairosRemindersEnabled:true};
 const writes=[];
 const repo={async findMany(object){return object==='whatsappContactWatches'?[watch]:object==='serviceEvents'?[event]:[];},async update(object,id,data){writes.push({object,id,data});Object.assign(watch,data);return watch;},async upsert(object,data){writes.push({object,data});return {id:'watch-new',...data};}};
 const service=new KairosOperationsService(repo,()=>now);
 service.getUpcomingEvents=async()=>[];
 service.getBooking=async()=>({id:'booking-1',name:'Guest',status:'CONFIRMED',checkoutAt:'2026-10-30T12:00:00Z'});
 service.getPreferredContact=async()=>({id:phoneChanged?'contact-2':'contact-1',contactType:'WHATSAPP',contactValue:phoneChanged?'+351910000102':'+351910000101'});
 return {service,writes,watch};
}
test('contact change during a stay retires immutable identity and creates a fresh watch',async()=>{
 const {service,writes}=fixture({phoneChanged:true});
 const armed=await service.autoArmUpcomingWatches(744);
 assert.equal(armed.length,1);assert.equal(writes[0].data.status,'ENDED');
 assert.equal(writes[1].data.normalizedPhone,'+351910000102');
 assert.match(writes[1].data.watchKey,/AUTO_ARM:booking-1:/);
});
test('extended checkout refreshes the window without resetting activation',async()=>{
 const {service,writes}=fixture({extended:true});
 assert.equal((await service.getActiveWhatsappContactWatches('2026-10-24T12:00:00Z')).length,1);
 await service.autoArmUpcomingWatches(744);
 assert.equal(writes.length,1);assert.equal(writes[0].data.monitorUntil,'2026-10-30T12:00:00Z');assert.equal(writes[0].data.activatedAt,undefined);
});
test('manual activation and unchanged watches are not replaced',async()=>{
 for(const manual of [false,true]) {const {service,writes,watch}=fixture(); if(manual)watch.metadata={}; await service.autoArmUpcomingWatches(744);assert.equal(writes.length,0);}
});
