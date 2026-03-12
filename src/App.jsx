import React,{useState,useEffect} from "react";
import{Shield,ChevronLeft,Database,RefreshCcw,Camera,Heart,Scale,MessageSquare,Flame,HardHat,MonitorCheck,Fingerprint,Award,Send,Mail} from "lucide-react";
const IM={Shield,Scale,MessageSquare,Heart,Camera,MonitorCheck,HardHat,Flame};
const Q=[
{"c":"UPDF","i":"Shield","k":"text-blue-500","q":"Primer nivel de fuerza ante ciudadano cooperativo?","o":["Presencia Policial","Armas no letales","Dialogo","Tecnicas defensivas"],"a":0},
{"c":"UPDF","i":"Shield","k":"text-blue-500","q":"Uso de fuerza mortal legitimo cuando?","o":["Amenaza inminente de muerte","Agresion verbal","Huye sin armas","Orden sin causa"],"a":0},
{"c":"UPDF","i":"Shield","k":"text-blue-500","q":"La fuerza aplicada debe ser:","o":["Maxima posible","Proporcional a la resistencia","Solo verbal","Discrecional"],"a":1},
{"c":"Derechos Humanos","i":"Scale","k":"text-purple-500","q":"Principio fundamental en detencion:","o":["Respeto integridad y dignidad","Incomunicacion","Fuerza disuasoria","Sin presencia legal"],"a":0},
{"c":"Derechos Humanos","i":"Scale","k":"text-purple-500","q":"Maltrato sin marcas permitido?","o":["Solo delitos graves","No, prohibido","Si supervisor autoriza","Depende comportamiento"],"a":1},
{"c":"Derechos Humanos","i":"Scale","k":"text-purple-500","q":"Proteger derecho a la vida de:","o":["Solo companeros","Todas las personas","Solo autoridades","Solo con ID"],"a":1},
{"c":"Atencion al Publico","i":"MessageSquare","k":"text-green-500","q":"Ante usuario agresivo verbal:","o":["Ignorar","Responder agresivo","Mediacion verbal","Fuerza fisica"],"a":2},
{"c":"Atencion al Publico","i":"MessageSquare","k":"text-green-500","q":"Clave excelencia servicio:","o":["Escucha activa y respeto","Ordenes en voz alta","Distancia","Delegar"],"a":0},
{"c":"Atencion al Publico","i":"MessageSquare","k":"text-green-500","q":"Usuario pide oficina desconocida:","o":["Decir no se","Orientar al mapa o supervisor","Inventar","Pedirle retirarse"],"a":1},
{"c":"Primeros Auxilios","i":"Heart","k":"text-red-500","q":"Primero verificar ante desmayo:","o":["Signos vitales","Darle de beber","Sentarlo","Llamar taxi"],"a":0},
{"c":"Primeros Auxilios","i":"Heart","k":"text-red-500","q":"Control hemorragia abundante:","o":["Torniquete cuello","Presion directa","Lavar alcohol","Elevar cabeza"],"a":1},
{"c":"Primeros Auxilios","i":"Heart","k":"text-red-500","q":"Numero emergencias Venezuela:","o":["171","0800-Ayuda","911","800"],"a":2},
{"c":"CCTV/CECOM","i":"Camera","k":"text-gray-500","q":"Movimiento sospechoso en camaras:","o":["Apagar monitor","Seguimiento visual y radio","Ir solo","Esperar"],"a":1},
{"c":"CCTV/CECOM","i":"Camera","k":"text-gray-500","q":"Libro de novedades digital:","o":["Trazabilidad y auditoria","Recreativo","Sustituir vigilancia","Solo asistencia"],"a":0},
{"c":"CCTV/CECOM","i":"Camera","k":"text-gray-500","q":"Bolso abandonado en pasillo:","o":["Abrirlo","Reportar sospechoso","Dejarlo","Llevarselo"],"a":1},
{"c":"Ciberseguridad","i":"MonitorCheck","k":"text-cyan-600","q":"Pendrive en estacionamiento:","o":["Conectar","Entregar a IT sin conectar","Regalar","Usar en PC"],"a":1},
{"c":"Ciberseguridad","i":"MonitorCheck","k":"text-cyan-600","q":"Contrasena sistema camaras:","o":["Publica","Personal e intransferible","Misma para todos","Anotar post-it"],"a":1},
{"c":"Ciberseguridad","i":"MonitorCheck","k":"text-cyan-600","q":"Correo pide claves acceso:","o":["Enviar rapido","Posible Phishing, reportar","Preguntar companero","Borrar sin decir"],"a":1},
{"c":"Seguridad Industrial","i":"HardHat","k":"text-orange-500","q":"Proposito EPP:","o":["Estetica","Prevenir riesgos accidentes","Identificar rangos","Cumplir horario"],"a":1},
{"c":"Seguridad Industrial","i":"HardHat","k":"text-orange-500","q":"Piso mojado sin senal:","o":["Ignorar","Senalizar y reportar","Esperar caida","Pasar corriendo"],"a":1},
{"c":"Seguridad Industrial","i":"HardHat","k":"text-orange-500","q":"Reporte accidente trabajo:","o":["24 horas","Inmediatamente al supervisor","Semana siguiente","No si es leve"],"a":1},
{"c":"Incendios","i":"Flame","k":"text-red-600","q":"Extintor equipos electricos C:","o":["Agua","CO2 o Polvo Quimico","Arena","Manta humeda"],"a":1},
{"c":"Incendios","i":"Flame","k":"text-red-600","q":"Humo en pasillo evacuacion:","o":["Caminar erguido","Agachado o gateando","Gritar","Encender luces"],"a":1},
{"c":"Incendios","i":"Flame","k":"text-red-600","q":"Descarga extintor dirigir a:","o":["Parte superior llama","Base del fuego","El aire","Donde hay humo"],"a":1},
];
const App=()=>{
const miCorreo="globalservices.ven@gmail.com";
const[step,setStep]=useState("welcome");
const[userData,setUserData]=useState({name:"",idCard:""});
const[cq,setCq]=useState(0);
const[ans,setAns]=useState({});
const[hash,setHash]=useState("");
const[recs,setRecs]=useState([]);
const[loading,setLoading]=useState(false);
useEffect(()=>{const s=localStorage.getItem("enahp_db");if(s)setRecs(JSON.parse(s));},[]);
const gh=async d=>{const b=new TextEncoder().encode(d);const h=await crypto.subtle.digest("SHA-256",b);return Array.from(new Uint8Array(h)).map(x=>x.toString(16).padStart(2,"0")).join("").substring(0,16).toUpperCase();};
const score=()=>{let c=0;Q.forEach((q,i)=>{if(ans[i]===q.a)c++;});return Math.round(c/Q.length*100);};
const pick=(i)=>{setAns({...ans,[cq]:i});if(cq<Q.length-1)setCq(cq+1);else finish();};
const finish=async()=>{setLoading(true);const s=score();const h=await gh(userData.idCard+"-"+s+"-"+Date.now());setTimeout(()=>{setHash(h);const r={...userData,score:s,hash:h,date:new Date().toLocaleString()};const u=[r,...recs];setRecs(u);localStorage.setItem("enahp_db",JSON.stringify(u));setLoading(false);setStep("results");},1500);};
const rpt=()=>"CERTIFICADO ENAHP
Oficial: "+userData.name+"
Cedula: "+userData.idCard+"
Resultado: "+score()+"%
Hash: "+hash+"
Fecha: "+new Date().toLocaleString();
const wa=()=>window.open("https://wa.me/?text="+encodeURIComponent(rpt()));
const em=()=>window.open("mailto:"+miCorreo+"?subject=REPORTE%20ENAHP&body="+encodeURIComponent(rpt()));
const IC=IM[Q[cq]?.i]||Shield;
return(
<div className="min-h-screen bg-[#0a0e17] text-slate-100 font-sans flex flex-col items-center justify-center p-4">
<div className="fixed inset-0 overflow-hidden pointer-events-none opacity-20"><div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600 rounded-full blur-[120px]"/><div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-900 rounded-full blur-[120px]"/></div>
<div className="w-full max-w-md bg-[#161b22]/80 backdrop-blur-xl rounded-[2.5rem] shadow-2xl overflow-hidden relative border border-white/10">
<div className={"p-8 text-center relative overflow-hidden "+(step==="results"?"bg-emerald-600":"bg-gradient-to-b from-[#1a2332] to-[#161b22]")}>
<div className="flex justify-between items-center relative z-10"><div className="bg-yellow-400/20 p-2 rounded-xl border border-yellow-400/30"><Shield className="w-6 h-6 text-yellow-400"/></div>
<button onClick={()=>setStep("db")} className="p-2.5 bg-white/5 rounded-xl border border-white/10"><Database className="w-5 h-5 text-blue-400"/></button></div>
<div className="mt-4 relative z-10"><h1 className="text-xl font-black italic tracking-tight uppercase">ENAHP <span className="text-yellow-400">Security</span></h1>
<p className="text-[9px] font-bold text-blue-300 tracking-[0.3em] uppercase mt-1 opacity-80">Zentinel Global Strategy</p></div>
<div className="absolute -right-4 -bottom-4 opacity-5"><Fingerprint className="w-32 h-32"/></div></div>
<div className="p-8">
{loading&&<div className="flex flex-col items-center py-20 space-y-6"><RefreshCcw className="w-12 h-12 text-blue-500 animate-spin"/><p className="text-sm font-black uppercase tracking-widest animate-pulse">Cifrando...</p></div>}
{!loading&&step==="welcome"&&<div className="space-y-8"><div className="text-center mb-6"><h2 className="text-2xl font-bold">Diagnostico Capa 3</h2><p className="text-slate-400 text-xs mt-1">Evaluacion de Competencias</p></div><div className="space-y-4">
<input className="w-full p-4 bg-white/5 border border-white/10 rounded-2xl outline-none focus:border-blue-500 font-bold text-white" placeholder="Nombre del Oficial" onChange={e=>setUserData({...userData,name:e.target.value})}/>
<input className="w-full p-4 bg-white/5 border border-white/10 rounded-2xl outline-none focus:border-blue-500 font-bold font-mono text-white" placeholder="V- 00.000.000" onChange={e=>setUserData({...userData,idCard:e.target.value})}/></div>
<button onClick={()=>setStep("quiz")} disabled={!userData.name||!userData.idCard} className="w-full bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-5 rounded-[1.5rem] font-black uppercase text-xs tracking-[0.2em] disabled:opacity-20 shadow-xl">Iniciar Evaluacion</button></div>}
{!loading&&step==="quiz"&&<div className="space-y-8"><div className="flex justify-between items-end"><div className="flex items-center gap-2 bg-white/5 px-3 py-1.5 rounded-xl border border-white/10"><span className={Q[cq].k}><IC className="w-5 h-5"/></span>
<span className="text-[10px] font-black uppercase tracking-widest text-slate-300">{Q[cq].c}</span></div><div className="text-right"><span className="text-2xl font-black text-white/20">{cq+1}</span><span className="text-[10px] font-bold text-slate-500 block">DE 24</span></div></div>
<div className="w-full bg-white/5 h-2 rounded-full overflow-hidden"><div className="bg-gradient-to-r from-blue-500 to-indigo-500 h-full transition-all" style={{width:((cq+1)/24*100)+"%"}}/></div>
<h3 className="text-xl font-bold text-white min-h-[100px]">{Q[cq].q}</h3>
<div className="space-y-3">{Q[cq].o.map((o,i)=><button key={i} onClick={()=>pick(i)} className="w-full text-left p-5 bg-white/5 border border-white/10 rounded-2xl hover:border-blue-500 hover:bg-blue-500/10 font-bold text-sm">{o}</button>)}</div></div>}
{!loading&&step==="results"&&<div className="text-center space-y-6"><div className="bg-[#0d1117] p-8 rounded-[2rem] border-4 border-[#161b22] shadow-inner">
<Award className="w-16 h-16 text-emerald-400 mx-auto mb-4"/><h2 className="text-2xl font-black uppercase italic">Certificado Tecnico</h2>
<div className="my-6 py-6 border-y border-white/5 flex flex-col items-center"><div className="text-7xl font-black text-emerald-500">{score()}%</div><p className="text-[10px] font-black text-slate-500 uppercase mt-3">Indice de Aptitud</p></div>
<div className="text-[10px] font-bold space-y-2 text-left bg-black/40 p-4 rounded-2xl"><p className="flex justify-between"><span className="text-slate-500 uppercase">Personal:</span><span className="text-white uppercase">{userData.name}</span></p>
<div className="border-t border-white/5 pt-2 mt-2"><span className="text-blue-400 text-[8px] uppercase tracking-widest">Hash SHA-256</span><span className="text-[9px] font-mono text-blue-500 break-all bg-blue-500/10 p-2 rounded-lg mt-1 block">{hash}</span></div></div></div>
<div className="grid grid-cols-2 gap-3"><button onClick={wa} className="bg-emerald-500 text-white py-4 rounded-2xl font-black uppercase text-[10px] flex flex-col items-center gap-2"><Send className="w-5 h-5"/>WhatsApp</button>
<button onClick={em} className="bg-blue-500 text-white py-4 rounded-2xl font-black uppercase text-[10px] flex flex-col items-center gap-2"><Mail className="w-5 h-5"/>Correo</button></div>
<button onClick={()=>{setStep("welcome");setCq(0);setAns({});}} className="w-full py-2 text-[10px] font-black text-slate-500 uppercase tracking-widest hover:text-blue-400">Reiniciar</button></div>}
{step==="db"&&<div className="space-y-6"><div className="flex justify-between items-center border-b border-white/10 pb-4"><h2 className="text-sm font-black uppercase flex items-center gap-2"><Database className="w-4 h-4 text-blue-500"/>Archivo Capa 3</h2>
<button onClick={()=>setStep("welcome")} className="bg-white/5 p-2 rounded-lg"><ChevronLeft className="w-5 h-5 text-slate-400"/></button></div>
<div className="max-h-[350px] overflow-y-auto space-y-3">{recs.map((r,i)=><div key={i} className="p-4 bg-white/5 border border-white/10 rounded-2xl"><div className="flex justify-between"><span className="text-xs font-black uppercase text-white">{r.name}</span>
<span className="text-xs font-black text-emerald-500">{r.score}%</span></div><div className="flex justify-between mt-3 pt-3 border-t border-white/5"><span className="text-[8px] font-black text-slate-600 uppercase">{r.date}</span>
<span className="text-[8px] font-mono text-blue-500">#{r.hash.substring(0,8)}</span></div></div>)}{recs.length===0&&<p className="text-center py-20 text-slate-500 text-xs italic">No hay registros.</p>}</div></div>}
</div></div>
<p className="mt-8 text-[9px] font-black text-slate-600 uppercase tracking-[0.5em]">Zentinel Global Strategy</p>
</div>);};
export default App;
