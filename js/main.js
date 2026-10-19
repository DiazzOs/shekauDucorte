(function(){
  var reel=document.getElementById('reel'),count=document.getElementById('count');
  var slides=reel.children;
  function step(d){var w=slides[0].getBoundingClientRect().width+16;reel.scrollBy({left:d*w,behavior:'smooth'});}
  document.getElementById('prev').onclick=function(){step(-1)};
  document.getElementById('next').onclick=function(){step(1)};
  reel.addEventListener('scroll',function(){
    var i=Math.round(reel.scrollLeft/(slides[0].getBoundingClientRect().width+16))+1;
    count.textContent=Math.min(i,slides.length)+' / '+slides.length;
  },{passive:true});

  var tabs=document.querySelectorAll('.tabs button'),items=document.querySelectorAll('.svc li');
  function show(g){
    tabs.forEach(function(t){t.setAttribute('aria-selected',t.dataset.t===g)});
    items.forEach(function(li){li.hidden=li.dataset.g!==g});
  }
  tabs.forEach(function(t){t.onclick=function(){show(t.dataset.t)}});
  show('corte');

  var form=document.getElementById('form');
  form.dia.min=new Date().toISOString().slice(0,10);
  form.addEventListener('submit',function(e){
    e.preventDefault();
    var bad=false;
    form.querySelectorAll('[required]').forEach(function(f){
      var v=f.value.trim()!=='';
      f.setAttribute('aria-invalid',!v);if(!v)bad=true;
    });
    if(bad){form.querySelector('[aria-invalid=true]').focus();return;}
    var d=new Date(form.dia.value+'T00:00');
    var dia=d.toLocaleDateString('pt-BR',{weekday:'long',day:'2-digit',month:'2-digit'});
    var t='Olá! Quero agendar '+form.servico.value+' para '+dia+' às '+form.hora.value+'. Meu nome é '+form.nome.value.trim()+'.';
    if(form.msg.value.trim())t+=' Obs: '+form.msg.value.trim();
    window.open('https://wa.me/5599984676987?text='+encodeURIComponent(t),'_blank','noopener');
  });
})();
