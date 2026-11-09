var VV_BASE=(document.currentScript&&document.currentScript.src)?document.currentScript.src.replace(/[^\/]*$/,''):'';

(function(){
  var API='https://script.google.com/macros/s/AKfycbyUhWhsCt2r6xUu8RYc9qwdD41X-7SlS_L6oshyOsyohnlA2XLJmSxXz9ySBKsMdDTTjA/exec', NONCE='voy_bf26_17f72bae138c733b', VERSAO_REGULAMENTO='tc-v4-2026-11-06';

  var inicio=new Date('2026-11-09T00:00:00-03:00').getTime(), fim=new Date('2026-12-06T23:59:59-03:00').getTime();
  var agora=Date.now(), previa=/\.(pages\.dev|webflow\.io)$/.test(location.hostname)||location.protocol==='file:';
  var fase=agora>fim?'fim':(agora<inicio&&!previa?'antes':'aberto');
  var dias=Math.ceil((fim-agora)/86400000), el=document.getElementById('faltam');
  el.textContent=fase==='fim'?'inscrições encerradas':fase==='antes'?'abrem em 09/11':dias>1?'faltam '+dias+' dias':'último dia';

  var topo=document.getElementById('topo'), fixo=document.getElementById('fixo'), hero=document.querySelector('.hero'), form=document.getElementById('participar'), fimPagina=document.querySelector('.seam--rodape');
  function onScroll(){
    topo.classList.toggle('rolou', window.scrollY>40);
    var h=hero.getBoundingClientRect(), f=form.getBoundingClientRect(), vh=window.innerHeight;
    fixo.classList.toggle('on', fase==='aberto' && h.bottom<0 && (f.top>vh || f.bottom<0) && fimPagina.getBoundingClientRect().top>vh);
  }
  window.addEventListener('scroll',onScroll,{passive:true}); onScroll();

  var vid=document.getElementById('heroVideo'), bp=document.getElementById('pausa'), EM_PE='(max-width:767px), (max-aspect-ratio:1/1)';
  var pausado=window.matchMedia('(prefers-reduced-motion: reduce)').matches, visivel=true;
  vid.muted=true;
  function toca(){ if(pausado||!visivel||document.hidden) vid.pause(); else { var p=vid.play(); if(p&&p.catch) p.catch(function(){}); }
    bp.classList.toggle('parado',pausado); bp.setAttribute('aria-label',pausado?'Tocar o vídeo':'Pausar o vídeo'); }
  function fonte(){ var f=window.matchMedia(EM_PE).matches?'9x16':'16x9'; if(vid.dataset.fmt===f) return;
    vid.dataset.fmt=f; vid.poster=VV_BASE+'video/BFV26_LP_concurso_topo_'+f+'_poster.jpg?v=7'; vid.src=VV_BASE+'video/BFV26_LP_concurso_topo_'+f+'_web.mp4?v=7'; toca(); }
  fonte(); window.matchMedia(EM_PE).addEventListener('change',fonte);
  bp.addEventListener('click',function(){ pausado=!pausado; toca(); });
  new IntersectionObserver(function(es){ visivel=es[0].isIntersecting; toca(); }).observe(hero);
  document.addEventListener('visibilitychange',toca);

  var cpf=document.getElementById('cpf'), tel=document.getElementById('tel'), resp=document.getElementById('resposta'), conta=document.getElementById('conta');
  cpf.addEventListener('input',function(){ var d=cpf.value.replace(/\D/g,'').slice(0,11);
    cpf.value=d.replace(/(\d{3})(\d)/,'$1.$2').replace(/(\d{3})(\d)/,'$1.$2').replace(/(\d{3})(\d{1,2})$/,'$1-$2'); });
  tel.addEventListener('input',function(){ var d=tel.value.replace(/\D/g,'').slice(0,11);
    if(d.length>10) tel.value=d.replace(/(\d{2})(\d{5})(\d{0,4})/,'($1) $2-$3');
    else if(d.length>6) tel.value=d.replace(/(\d{2})(\d{4})(\d{0,4})/,'($1) $2-$3');
    else if(d.length>2) tel.value=d.replace(/(\d{2})(\d{0,5})/,'($1) $2');
    else tel.value=d; });
  var medidor=form.querySelector('.medidor i');
  resp.addEventListener('input',function(){ conta.textContent=resp.value.length+'/500'; medidor.style.setProperty('--p',resp.value.length/500); });
  resp.addEventListener('focus',function(){ form.classList.add('escrevendo'); });
  resp.addEventListener('blur',function(){ form.classList.remove('escrevendo'); });
  new IntersectionObserver(function(es){ form.classList.toggle('visivel',es[0].isIntersecting); }).observe(form);

  function cpfOk(v){ var d=v.replace(/\D/g,''); if(d.length!==11||/^(\d)\1{10}$/.test(d)) return false;
    for(var t=9;t<11;t++){ var s=0; for(var i=0;i<t;i++) s+=d[i]*((t+1)-i); var r=((10*s)%11)%10; if(r!==+d[t]) return false; } return true; }

  function marca(nome,msg){ var c=document.querySelector('[data-campo="'+nome+'"]'); if(!c) return;
    c.classList.toggle('erro',!!msg); var m=c.querySelector('.msg'); if(m) m.textContent=msg||''; }

  var formEl=document.getElementById('form'), folha=document.getElementById('folha'), t0=Date.now(), enviando=false;
  var envioErro=document.getElementById('envioErro'), btEnvio=formEl.querySelector('button[type=submit]');
  var FALHA='Não foi possível enviar agora. Tente de novo em instantes.';
  function falhou(msg){ envioErro.textContent=msg; envioErro.hidden=false; }
  if(fase!=='aberto'){ formEl.hidden=true; document.getElementById('fechadoTxt').textContent=fase==='fim'?'As inscrições foram encerradas. O resultado sai em 10/12/2026.':'As inscrições abrem em 09/11/2026.'; document.getElementById('fechado').hidden=false; }
  function utm(k){ return new URLSearchParams(location.search).get('utm_'+k)||''; }
  formEl.addEventListener('submit',function(e){
    e.preventDefault();
    var erros=0, v;
    v=document.getElementById('nome').value.trim(); if(v.split(/\s+/).length<2){ marca('nome','Digite nome e sobrenome.'); erros++; } else marca('nome');
    if(!cpfOk(cpf.value)){ marca('cpf','CPF inválido.'); erros++; } else marca('cpf');
    if(tel.value.replace(/\D/g,'').length<10){ marca('tel','Telefone com DDD.'); erros++; } else marca('tel');
    v=document.getElementById('email').value.trim(); if(!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v)){ marca('email','E-mail inválido.'); erros++; } else marca('email');
    if(resp.value.trim().length<10){ marca('resposta','Escreva sua resposta.'); erros++; } else marca('resposta');
    var ac=document.getElementById('aceite'); document.querySelector('[data-campo="aceite"]').classList.toggle('erro',!ac.checked); if(!ac.checked) erros++;
    document.getElementById('msgAceite').textContent=ac.checked?'':'Aceite o regulamento para participar.';
    if(erros){ var p=formEl.querySelector('.erro input,.erro textarea'); if(p) p.focus(); return; }
    if(enviando) return;
    enviando=true; envioErro.hidden=true; btEnvio.disabled=true; var rotulo=btEnvio.textContent; btEnvio.textContent='Enviando...';
    var ctl=new AbortController(), vigia=setTimeout(function(){ ctl.abort(); },25000);
    fetch(API,{method:'POST',headers:{'Content-Type':'text/plain;charset=utf-8'},signal:ctl.signal,body:JSON.stringify({
      nonce:NONCE, campo_extra:document.getElementById('campoExtra').value, t_ms:Date.now()-t0,
      nome:document.getElementById('nome').value, cpf:cpf.value, tel:tel.value, email:document.getElementById('email').value, resposta:resp.value,
      aceite:ac.checked, versao:VERSAO_REGULAMENTO, pagina:location.origin+location.pathname,
      utm_source:utm('source'), utm_medium:utm('medium'), utm_campaign:utm('campaign'), utm_content:utm('content'), utm_term:utm('term')
    })}).then(function(r){ return r.json(); }).then(function(r){
      if(r.ok){ folha.classList.add('enviado'); form.classList.add('enviado'); folha.scrollIntoView({block:'center'}); return; }
      if(r.erro==='cpf_repetido'){ marca('cpf','Este CPF já tem uma inscrição.'); cpf.focus(); return; }
      falhou(r.erro==='encerrado'?'As inscrições foram encerradas.':FALHA);
    }).catch(function(){ falhou(FALHA); }).then(function(){ clearTimeout(vigia); enviando=false; btEnvio.disabled=false; btEnvio.textContent=rotulo; });
  });
  document.getElementById('voltar').addEventListener('click',function(){ folha.classList.remove('enviado'); form.classList.remove('enviado'); });

  var reg=document.getElementById('regDialog'), overflowAntes='';
  function abreReg(){ if(!reg||reg.open) return; overflowAntes=document.documentElement.style.overflow; document.documentElement.style.overflow='hidden';
    if(reg.showModal) reg.showModal(); else reg.setAttribute('open',''); var c=reg.querySelector('.reg-corpo'); if(c) c.scrollTop=0; }
  function fechaReg(){ if(!reg) return; if(reg.close) reg.close(); else reg.removeAttribute('open'); }
  if(reg){
    reg.addEventListener('close',function(){ document.documentElement.style.overflow=overflowAntes; });
    reg.addEventListener('click',function(e){ if(e.target===reg) fechaReg(); });
    Array.prototype.forEach.call(document.querySelectorAll('[data-abre-regulamento]'),function(b){ b.addEventListener('click',function(e){ e.preventDefault(); e.stopPropagation(); abreReg(); }); });
    Array.prototype.forEach.call(reg.querySelectorAll('[data-fecha-regulamento]'),function(b){ b.addEventListener('click',fechaReg); });
    if(location.hash==='#regulamento') abreReg();
  }
})();
