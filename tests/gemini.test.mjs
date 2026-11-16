import test from 'node:test';
import assert from 'node:assert/strict';
import {handleAI} from '../server/ai.mjs';

const statement={id:'s1',revision:1,country:'FRA',date:'2050-11-01',week:'Week 1',title:'Statement',text:'France supports the proposal on Diego Garcia.'};
const body={statement,proposals:[{id:'diego-garcia',title:'Second elevator',description:'UK proposal'}],previous:[]};
const validResult={
 country:'FRA',statementId:'s1',
 summary:['France discusses the initiative.','France supports the proposed project.','The text mentions Diego Garcia.'],
 topics:['Diego Garcia'],
 assessments:[{kind:'proposal',target:'diego-garcia',category:'strong_support',coalitionType:'',quote:'France supports the proposal on Diego Garcia.',interpretation:'Explicit support',confidence:0.95,explicit:true}],
 changes:[],uncertainties:[]
};
const env={GEMINI_API_KEY:'test-not-real',GEMINI_MODEL:'gemini-2.5-flash',OWNER_TOKEN:'a'.repeat(40)};
const req=(token='a'.repeat(40))=>new Request('https://diplomatic-atlas.example/api/analyze',{method:'POST',headers:{'content-type':'application/json',authorization:'Bearer '+token},body:JSON.stringify(body)});
test('Gemini request uses server-side key, schema, and returns source-validated analysis',async()=>{
 let called=false;
 const response=await handleAI(req(),env,async()=>true,async(url,init)=>{
  called=true;
  assert.match(url,/generativelanguage.googleapis.com\/v1beta\/models\/gemini-2.5-flash:generateContent/);
  assert.equal(init.headers['x-goog-api-key'],env.GEMINI_API_KEY);
  const payload=JSON.parse(init.body);
  assert.equal(payload.generationConfig.responseMimeType,'application/json');
  assert.ok(payload.generationConfig.responseJsonSchema);
  assert.equal(JSON.parse(payload.contents[0].parts[0].text).statement.country,'FRA');
  return new Response(JSON.stringify({candidates:[{finishReason:'STOP',content:{parts:[{text:JSON.stringify(validResult)}]}}]}),{status:200});
 });
 assert.equal(response.status,200);
 assert.equal((await response.json()).analysis.assessments[0].target,'diego-garcia');
 assert.ok(called);
});
test('rejects bad owner token before any provider call',async()=>{
 const response=await handleAI(req('wrong'),env,async()=>true,async()=>{throw Error('must not call Gemini');});
 assert.equal(response.status,401);
});
test('rejects fabricated evidence',async()=>{
 const bad={...validResult,assessments:[{...validResult.assessments[0],quote:'Fabricated quote.'}]};
 const response=await handleAI(req(),env,async()=>true,async()=>new Response(JSON.stringify({candidates:[{finishReason:'STOP',content:{parts:[{text:JSON.stringify(bad)}]}}]}),{status:200}));
 assert.equal(response.status,502);
});
